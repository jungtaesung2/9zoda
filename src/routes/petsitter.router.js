import express from 'express';
import { prisma } from '../utils/prisma/index.js';

const router = express.Router();

router.get('/petsitter', async (req, res, next) => {
    const sitter = await prisma.petsitter.findMany({
        select: {
            sitterId: true,
            name: true,
        }
    })

    return res.status(201).json({ data: sitter });
});

router.get('/petsitter/:sitterId', async (req, res, next) => {
    const { sitterId } = req.params;

    const sitter = await prisma.petsitter.findFirst({
        where: { sitterId: +sitterId },
        select: {
            sitterId: true,
            name: true,
            career: true,
            region: true
        }
    })

    return res.status(201).json({ data: sitter });
})

export default router;