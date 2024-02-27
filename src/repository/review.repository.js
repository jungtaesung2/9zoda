export class ReviewsRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }

    // 시터 아이디 찾기
    findSitter = async ( sitterId ) => {
        const sitter = await this.prisma.Petsitter.findFirst({
            where: {sitterId}
        });
        return sitter;
    }

    // 리뷰 작성
    createReview = async (title, content, rating) => {

        const review = await this.prisma.Reviews.create({
            data: {
                title: title,
                content: content,
                rating: rating,
            }
        });
        return review;
    }

    // 리뷰 조회
    findReview = async () => {
        const reviews = await this.prisma.Reviews.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        return reviews;
    };

    // 리뷰 수정
    changeReview = async(userId, reviewId, title, content, status) => {
        const changeReview = await this.prisma.Reviews.update({
            where: {
                reviewId: +reviewId,
                userId: +userId,
                sitterId
            },
            data: {
                title: title,
                content: content,
                status: status
            }
        });
        return changeReview;
    }

    // 리뷰 삭제
    deleteReview = async ( reviewId, userId ) => {
        const deleteReview = await this.prisma.Reviews.delete({
            where : { 
                reviewId : +reviewId,
                userId: +userId
            }
        });
        return deleteReview;
    }
}