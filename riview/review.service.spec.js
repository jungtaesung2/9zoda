import { expect } from '@jest/globals';
import { test } from '@jest/globals';
import { jest } from '@jest/globals';
import { ReviewsService } from '../../src/service/review.service.js';

describe('review Repository Unit test', () => {
    let mockReviewRepository;
    let reviewsService;

    beforeEach(() => {
        jest.resetAllMocks();
        mockReviewRepository = {
            findSitter: jest.fn(),
            checkReservation: jest.fn(),
            createReview: jest.fn(),
            findReview: jest.fn(),
            changeReview: jest.fn(),
            deleteReview: jest.fn()
        };
        reviewsService = new ReviewsService(mockReviewRepository);
    });
    const review = {
        reviewId: 1,
        userId: 1,
        sitterId: 1,
        title: 'title',
        content: 'content',
        rating: '4',
        createdAt: "2024-02-02T02:03:23.920Z",
        updatedAt: "2024-02-02T02:03:23.920Z"
    };
    const reviews = [
        {
            reviewId: 1,
            userId: 1,
            sitterId: 1,
            title: 'title',
            rating: '4',
            content: 'content',
            createdAt: "2024-02-02T02:03:23.920Z",
            updatedAt: "2024-02-02T02:03:23.920Z"
        },
        {
            reviewId: 2,
            userId: 2,
            sitterId: 1,
            title: 'title',
            rating: '4',
            content: 'content',
            createdAt: "2024-02-02T02:03:23.920Z",
            updatedAt: "2024-02-02T02:03:23.920Z"
        }
    ];
    const sitter = {
        sitterId: 1,
        name: '성진',
        career: '2개월',
        region: '천안'
    };

    test('findSitter Method', async () => {
        const mockfindFirst = mockReviewRepository.findSitter.mockResolvedValue(sitter);
        const findSitter = await reviewsService.findSitter(sitter.sitterId);

        expect(findSitter).toEqual(sitter);
        expect(mockfindFirst).toHaveBeenCalledWith(sitter.sitterId);
    });

    test('checkReservation Method', async () => {
        const reservation = {
            postId: 1,
            userId: 1,
            sitterId: 1,
            reservation: '2월 14일',
            petName: '예삐',
            petType: '불독',
            request: '이쁘게봐주세요'
        };
        const mockcheckReservation = mockReviewRepository.checkReservation.mockResolvedValue(reservation);
        const checkReservation = await reviewsService.checkReservation(
            reservation.sitterId,
            reservation.userId
        );

        expect(checkReservation).toEqual(reservation);
        expect(mockcheckReservation).toHaveBeenCalledWith(reservation.sitterId, reservation.userId);
    });

    test('createReview Method', async () => {
        const mockcreateReview = mockReviewRepository.createReview.mockResolvedValue(review);
        const createReview = await reviewsService.createReview(
            review.title,
            review.content,
            review.rating
        );
        expect(createReview).toEqual(review);
        expect(mockcreateReview).toHaveBeenCalledWith(
            review.title,
            review.content,
            review.rating
        );
    });

    test('findReview Method', async () => {
        const mockfindReview = mockReviewRepository.findReview.mockResolvedValue(reviews);
        const findReviews = await reviewsService.findReview(review.sitterId);

        expect(findReviews).toEqual(reviews);
        expect(mockfindReview).toHaveBeenCalledWith(review.sitterId);
    });

    test('changeReview Method', async () => {
        const mockchangeReview = mockReviewRepository.changeReview.mockResolvedValue(review);
        const changeReview = await reviewsService.changeReview(
            review.userId,
            review.reviewId,
            review.title,
            review.content,
            review.rating,
            review.userId
        );
        expect(changeReview).toEqual(review);
        expect(mockchangeReview).toHaveBeenCalledWith(
            review.reviewId,
            review.userId,
            review.title,
            review.content,
            review.rating
        );
    });
    test ('deleteReview Method', async () => {
        const mockdeleteReview = mockReviewRepository.deleteReview.mockResolvedValue(review);
        const deleteReview = await reviewsService.deleteReview(
            review.userId,
            review.reviewId,
            review.userId
        );
        expect(deleteReview).toEqual(review);
        expect(mockdeleteReview).toHaveBeenCalledWith(
            review.reviewId,
            review.userId
        );
    });

});

