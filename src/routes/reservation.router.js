import express from 'express';
import { prisma } from '../utils/prisma/index.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();


//예약하기
router.post('/reservation', authMiddleware, async (req, res, next) => {
    const { sitterId, reservation, petName, petType, request } = req.body;
    const { userId } = req.user;

    const reser = reservation.split('-').join("");
    const date = sitterId + reser;

    console.log(date);
    console.log(typeof (date));

    const resInfo = await prisma.reservation.findFirst({
        where: { date: date }
    });

    if (resInfo) {
        return res.status(400).json({ message: "이미 예약된 날짜입니다." });
    }

    const pet = await prisma.reservation.create({
        data: {
            userId: +userId,
            sitterId, reservation, petName, petType, request,
            date: date,
        }
    });

    return res.status(201).json({ message: "예약 성공했습니다." });
})

//예약 확인
router.get("/reservation", authMiddleware, async (req, res, next) => {
    const { userId } = req.user;

    const pet = await prisma.reservation.findMany({
        where: { userId: +userId },
        select: {
            postId: true,
            sitterId: true,
            reservation: true,
            petName: true,
            petType: true,
            request: true,
        }
    });

    if (!pet) {
        return res.status(404).json({ message: "예약이 없습니다." });
    };

    return res.status(201).json({ date: pet });
});

//예약 변경
router.patch("/reservation/:postId", authMiddleware, async (req, res, next) => {
    const { postId } = req.params;
    const { reservation, petName, petType, request } = req.body;

    const post = await prisma.reservation.findFirst({
        where: { postId: +postId }
    });

    if (!post) {
        return res.status(404).json({ message: "예약 조회에 실패하였습니다." });
    };

    await prisma.reservation.update({
        where: { postId: +postId },
        select: {
            reservation, petName, petType, request
        }
    });

    return res.status(200).json({ message: "예약 변경이 완료되었습니다." })
})


//예약 취소
router.delete('/reservation/:postId', authMiddleware, async (req, res, next) => {
    const { postId } = req.params;

    await prisma.reservation.delete({
        where: { postId: +postId }
    });

    return res.status(201).json({ message: "예약 취소되었습니다." });
});

export default router;