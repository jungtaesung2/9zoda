import { test } from '@jest/globals';
import { expect } from '@jest/globals';
import { jest } from '@jest/globals';
import { ReviewsRepository } from '../../src/repository/review.repository.js';

describe('review Repository Unit test', () => {
    let mockPrisma;
    let reviewsRepository;

    beforeEach(() => {
        jest.resetAllMocks();
        mockPrisma = {
            Reviews: {
                create: jest.fn(),
                findMany: jest.fn(),
                update: jest.fn(),
                delete: jest.fn()
            },
            Petsitter: {
                findFirst: jest.fn()
            },
            Reservation: {
                findFirst: jest.fn()
            }
        };
        reviewsRepository = new ReviewsRepository(mockPrisma);
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

        const mockfindFirst = mockPrisma.Petsitter.findFirst.mockResolvedValue(sitter);

        const findSitter = await reviewsRepository.findSitter(sitter.sitterId);

        expect(findSitter).toEqual(sitter);
        expect(mockfindFirst).toHaveBeenCalledWith({
            where: {
                sitterId: sitter.sitterId
            }
        });
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
        }
        // reviewsRepository에 있는 checkReservation 메소드를 겁사하기 위해서
        // 가짜로 만든 mockPrisma.Reservation.findFirst 를 실행했을 때의 결과가 reservation라고 만들어주었다.
        const mockfindFirst = mockPrisma.Reservation.findFirst.mockResolvedValue(reservation);

        const checkReservation = await reviewsRepository.checkReservation(
            sitter.sitterId,
            reservation.userId
        );

        expect(checkReservation).toEqual(reservation);
        expect(mockfindFirst).toHaveBeenCalledWith({
            where: {
                sitterId: sitter.sitterId,
                userId: reservation.userId
            }
        })
    })
    test('createReview Method', async () => {
        const mockcreate = mockPrisma.Reviews.create.mockResolvedValue(review);
        const createReview = await reviewsRepository.createReview(
            review.title,
            review.content,
            review.rating
        );
        expect(createReview).toEqual(review);
        expect(mockcreate).toHaveBeenCalledWith({
            data: {
                title: review.title,
                content: review.content,
                rating: review.rating,
            }
        });
    })
    test('findReview Method', async () => {
        const mockfind = mockPrisma.Reviews.findMany.mockResolvedValue(reviews);
        const findReview = await reviewsRepository.findReview(sitter.sitterId);

        expect(findReview).toEqual(reviews);
        expect(mockfind).toHaveBeenCalledWith({
            where: {
                sitterId: sitter.sitterId
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    })
    test('changeReview Method', async () => {
        const mockchange = mockPrisma.Reviews.update.mockResolvedValue(review);
        const changeReview = await reviewsRepository.changeReview(
            review.reviewId, 
            review.userId,
            review.title,
            review.content,
            review.rating
        );

        expect(changeReview).toEqual(review);
        expect(mockchange).toHaveBeenCalledWith({
            where: {
                reviewId: review.reviewId,
                userId: review.userId
            },
            data: {
                title: review.title,
                content: review.content,
                rating: review.rating
            }
        });
    });
    test('deleteReview Method', async () => {
        const mockdelete = mockPrisma.Reviews.delete.mockResolvedValue(review);
        const deleteReview = await reviewsRepository.deleteReview(review.reviewId, review.userId);

        expect(deleteReview).toEqual(review);
        expect(mockdelete).toHaveBeenCalledWith({
            where: {
                reviewId : review.reviewId,
                userId : review.userId
            }
        })
    })
})