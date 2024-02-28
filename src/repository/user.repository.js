import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class UsersRepository {
  constructor() {}

  //회원가입//
  signUp = async (email, hashedPassword, name) => {
    const user = await prisma.users.create({
      data: { email, password: hashedPassword, name },
    });

    return user;
  };
  getUserByEmail = async (email) => {
    const user = await prisma.users.findFirst({
      where: { email: email },
    });
    return user;
  };

  //로그인//
  signIn = async (email, password) => {
    const user = await prisma.users.findFirst({ where: { email, password } });
    return user;
  };

  // 로그아웃 (리프레시 토큰 삭제)
  signOut = async (userId) => {
    try {
      await prisma.refreshTokens.deleteMany({
        where: { userId },
      });
      return { message: "로그아웃 성공" };
    } catch (err) {
      throw new Error(err.message);
    }
  };

  //유저 프로필 조회
  findUserProfiles = async (userId) => {
    const user = await prisma.users.findUnique({
      where: { userId },
      include: { reservation: true }, // 예약 정보를 포함하도록 수정
    });
    return user;
  };

  //유저 프로필 수정
  updateUserProfiles = async (userId, name) => {
    const updatedUser = await prisma.users.update({
      where: {
        userId: +userId,
      },
      data: {
        name: name,
      },
    });
    return updatedUser;
  };
}

export default UsersRepository;
