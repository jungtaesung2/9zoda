import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export class UsersService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  //회원가입//
  signUp = async (email, password, passwordConfirm, name) => {
    try {
      const isExistUser = await this.usersRepository.getUserByEmail(email);
      if (isExistUser) {
        return {
          status: 409,
          data: { message: "이미 존재하는 이메일입니다." },
        };
      }
      if (!(password.length >= 6)) {
        return {
          status: 400,
          data: { message: "비밀번호는 6자리 이상을 입력해주세요" },
        };
      }
      if (password !== passwordConfirm) {
        return {
          status: 400,
          data: { message: "비밀번호가 일치하지 않습니다" },
        };
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.usersRepository.signUp(
        email,
        hashedPassword,
        name,
      );

      return {
        status: 201,
        data: { data: user },
      };
    } catch (err) {
      throw new Error(err.message);
    }
  };

  //로그인//
  signIn = async (email, password) => {
    const user = await this.usersRepository.getUserByEmail(email);

    // 사용자가 없는 경우
    if (!user) {
      throw new Error("존재하지 않는 이메일입니다.");
    }
    // 비밀번호를 확인합니다.
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      // 비밀번호가 일치하지 않는 경우
      throw new Error("비밀번호가 일치하지 않습니다.");
    }

    const accessToken = jwt.sign(
      { userId: user.userId },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: "12h" },
    );
    const refreshToken = jwt.sign(
      { userId: user.userId },
      process.env.REFRESH_TOKEN_SECRET_KEY,
      { expiresIn: "7d" },
    );
    return { accessToken, refreshToken };
  };

  // 로그아웃
  signOut = async (userId) => {
    try {
      await this.usersRepository.deleteRefreshToken(userId);
      return { message: "로그아웃 성공" };
    } catch (err) {
      throw new Error(err.message);
    }
  };
  // 유저 프로필 조회
  findUserProfiles = async (userId) => {
    const user = await this.usersRepository.findUserProfiles(userId);
    return {
      userId: user.userId,
      email: user.email,
      name: user.name,
      reservations: user.reservation, // 예약 내역 추가
    };
  };

  // 유저 프로필 수정
  updateUserProfile = async (userId, name) => {
    console.log(userId, name); // 로깅 코드 수정
    if (!name || name.trim() === "") {
      throw new Error("이름을 입력하세요.");
    }

    const updateUser = await this.usersRepository.updateUserProfiles(
      userId,
      name,
    );

    return {
      name: updateUser.name,
    };
  };
}

export default UsersService;
