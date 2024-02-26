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
        name
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

    const accessToken = jwt.sign(
      { userId: user.userId },
      process.env.ACCESS_SecretKey,
      { expiresIn: "12h" }
    );
    const refreshToken = jwt.sign(
      { userId: user.userId },
      process.env.REFRESH_SecretKey,
      { expiresIn: "7d" }
    );
    return { accessToken, refreshToken };
  };
}
