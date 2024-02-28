import express from "express";
import { prisma } from "../utils/prisma/index.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

//프로필 조회
router.get("/profile", authMiddleware, async (req, res, next) => {
  const { userId } = req.user;
  const profile = await prisma.users.findFirst({
    where: { userId: +userId },
    select: {
      email: true,
      name: true,
    },
  });

  return res.status(201).json({ data: profile });
});

//프로필 수정
router.patch("/profile", authMiddleware, async (req, res, next) => {
  const { name, password } = req.body;
  const { userId } = req.user;

  await prisma.users.update({
    where: { userId: +userId },
    data: {
      name: name,
      password: password,
    },
  });

  return res.status(201).json({ message: "프로필 수정이 완료되었습니다." });
});

export default router;
