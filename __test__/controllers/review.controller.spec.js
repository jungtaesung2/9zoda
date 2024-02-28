import { expect } from '@jest/globals';
import { test } from '@jest/globals';
import { jest } from '@jest/globals';
import { ReviewsController } from '../../src/controller/review.controller.js'

describe('review Controller Unit test', () => {
    let mockReviewService;
    let reviewsController;
    let mockReq, mockRes;

    beforeEach(() => {
        jest.resetAllMocks();
        mockReviewService = {
            findSitter: jest.fn(),
            checkReservation: jest.fn(),
            createReview: jest.fn(),
            findReview: jest.fn(),
            changeReview: jest.fn(),
            deleteReview: jest.fn()
        };

        mockReq = { params: {}, body: {} };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
            cookie: jest.fn().mockReturnThis(),
        };
        reviewsController = new ReviewsController(mockReviewService);
    });
    const mockNext = jest.fn();
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
    

    test('createReview Method', async () => {
        // 가짜로 만든 mockPrisma.Reservation.findFirst 를 실행했을 때의 결과가 reservation라고 만들어주었다.
        const mockfindSitter = mockReviewService.findSitter.mockResolvedValue();
        const mockfindReview = mockReviewService.checkReservation.mockResolvedValue(findSitter);
        const mockcreateReview = mockReviewService.createReview.mockResolvedValue(checkReservation);
        
        

        
    });


});