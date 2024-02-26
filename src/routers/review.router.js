import express from 'express';
import { prisma } from '../models/index.js';
import { ReviewsController } from '../controller/review.controller.js';
import { ReviewsService } from '../service/review.service.js';
import { ReviewsRepository } from '../repository/review.repository.js';


const router = express.Router();
const reviewsRepository = new ReviewsRepository(prisma);
const reviewsService = new ReviewsService(reviewsRepository);
const reviewsController = new ReviewsController(reviewsService);


// 리뷰 작성
router.post('/:sitterId', reviewsController.createReview);
// 리뷰 조회
router.get('/:reviewId', reviewsController.findReview);
// 리뷰 수정
router.put('/:reviewId', reviewsController.changeReview);
// 리뷰 삭제
router.delete('/:reviewId', reviewsController.deleteReview);

export default router;