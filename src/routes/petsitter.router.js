import express from "express";
import { PrismaClient } from "@prisma/client";
import { PetsitterController } from "../controller/petsitters.controller.js";
import { PetsitterService } from "../service/petsitters.service.js";
import { PetsitterRepository } from "../repository/petsitters.repository.js";

const prisma = new PrismaClient();
const router = express.Router();
const petsitterRepository = new PetsitterRepository(prisma);
const petsitterService = new PetsitterService(petsitterRepository);
const petsitterController = new PetsitterController(petsitterService);

// 펫시터 프로필 조회
router.get("/petsitters", petsitterController.getPetsitters);

// 펫시터 상세조회
router.get("/petsitters/:petsitterId", petsitterController.getPetsittersById);

export default router;
