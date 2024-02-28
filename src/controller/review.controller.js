export class ReviewsController {
    constructor(reviewsService) {
        this.reviewsService = reviewsService;
    }

    // 리뷰 작성
    createReview = async (req, res, next) => {
        try {
            const { title, content, rating } = req.body;
            const { sitterId } = req.params;
            const { userId } = req.user;

            await this.reviewsService.findSitter(sitterId);
            await this.reviewsService.checkReservation(sitterId, userId);
            const createReview = await this.reviewsService.createReview(
                userId,
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
            const { sitterId } = req.params;

            const findReview = await this.reviewsService.findReview(sitterId);

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

            const findReview = await this.reviewsService.findReview(reviewId);
            const changeReview = await this.reviewsService.changeReview(
                userId,
                reviewId,
                title,
                content,
                rating,
                findReview.userId
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

            const findReview = await this.reviewsService.findReview(reviewId);
            const deleteReview = await this.reviewsService.deleteReview(
                reviewId,
                userId,
                findReview.userId
            );
            
            return res.status(200).json({ data: deleteReview});
        }
        catch(err) {
            next(err);
        }
    }

}