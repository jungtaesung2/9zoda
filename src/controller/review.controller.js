export class ReviewsController {
    constructor(reviewsService) {
        this.reviewsService = reviewsService;
    }

    // 리뷰 작성
    createReview = async (req, res, next) => {
        try {
            const { title, content, rating } = req.body;
            const { sitterId } = req.params;

            await this.reviewsService.findSitter(sitterId);
            const createReview = await this.reviewsService.createReview(
                sitterId,
                title,
                content,
                rating
            );

            return res.status(201).json({ data: createReview });

        } catch(err) {
            next(err);
        }
    }

    // 리뷰 조회
    findReview = async (req, res, next) => {
        try {
            const { reviewId } = req.params;

            const findReview = await this.reviewsService.findReview(reviewId)

            return res.status(200).json({ data: findReview });

        } catch(err) {
            next(err);
        }
    }

    // 리뷰 수정
    changeReview = async ( req, res, next) => {
        try {
            const { reviewId } = req.params;
            const { title, content, rating } = req.body;
            const { userId } = req.user;

            const changeReview = await this.reviewsService.changeReview(
                userId,
                reviewId,
                title,
                content,
                rating,
            );

            return res.status(201).json({ data: changeReview });

        } catch(err) {
            next(err);
        }
    }

    // 리뷰 삭제
    deleteReview = async (req, res, next) => {
        try {
            const { reviewId } = req.params;
            const { userId } = req.user;
            const deleteReview = await this.reviewsService.deleteReview(
                reviewId,
                userId
            )
            return res.status(200).json({ data: deleteReview});
        }
        catch(err) {
            next(err);
        }
    }

}