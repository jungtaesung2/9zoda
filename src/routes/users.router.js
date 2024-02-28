import express from "express";
import { prisma } from "../utils/prisma/index.js";
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

//모든 사용자 조회
router.get("/", usersController.AllUserById);
//사용자 조회
router.get("/:userId", usersController.getUserById);
//회원가입
router.post("/sign-up", usersController.signUp);
//로그인
router.post("/sign-in", usersController.signIn);
//로그아웃
router.post("/sign-out", usersController.signOut);

export default router;
