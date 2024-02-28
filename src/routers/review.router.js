import express from 'express';
import { prisma } from '../utils/prisma/index.js';
import { ReviewsController } from '../controller/review.controller.js';
import { ReviewsService } from '../service/review.service.js';
import { ReviewsRepository } from '../repository/review.repository.js';
import authMiddleware from '../middlewares/auth.middleware.js';


const router = express.Router();
const reviewsRepository = new ReviewsRepository(prisma);
const reviewsService = new ReviewsService(reviewsRepository);
const reviewsController = new ReviewsController(reviewsService);


// 리뷰 작성
router.post('/:sitterId', authMiddleware, reviewsController.createReview);
// 리뷰 조회
router.get('/:reviewId', reviewsController.findReview);
// 리뷰 수정
router.put('/:reviewId', authMiddleware, reviewsController.changeReview);
// 리뷰 삭제
router.delete('/:reviewId', authMiddleware, reviewsController.deleteReview);

export default router;