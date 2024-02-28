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
      process.env.ACCESS_SecretKey,
      { expiresIn: "12h" },
    );
    const refreshToken = jwt.sign(
      { userId: user.userId },
      process.env.REFRESH_SecretKey,
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
  //사용자 조회(상세조회)
  getUserById = async (userId) => {
    try {
      const user = await this.usersRepository.getUserById(userId);
      return {
        userId: user.userId,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      };
    } catch (error) {
      throw new Error("사용자 정보를 조회할 수 없습니다.");
    }
  };
  //모든 사용자 조회//
  getAllUserById = async () => {
    const user = await this.usersRepository.getAllUserById();
    //가장 최신 사용자부터 정렬.
    user.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
    //로직 이후 사용자에게 보여줄 데이터.
    return user.map((user) => {
      return {
        usersId: user.userId,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      };
    });
  };
}
