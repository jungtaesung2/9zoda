import express from "express";
import { prisma } from "../utils/prisma/index.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UsersController } from "../controller/user.controller.js";
import { UsersRepository } from "../repository/user.repository.js";
import { UsersService } from "../service/user.service.js";

dotenv.config();
const router = express.Router();
const usersRepository = new UsersRepository(prisma);
const usersService = new UsersService(usersRepository);
const usersController = new UsersController(usersService);
//회원가입
router.post("/sign-up", usersController.signUp);
//로그인
router.post("/sign-in", usersController.signIn);
//로그아웃
router.post("/sign-out", usersController.signOut);
//유저 프로필 조회
router.get("/user", authMiddleware, usersController.findUserProfiles);
// 프로필 수정 라우터
router.put("/user", authMiddleware, usersController.updateUserProfiles);
export default router;
