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
        rating,
      );

      return res.status(201).json({ data: createReview });
    } catch (err) {
      next(err);
    }
  };

  // 리뷰 조회
  findReview = async (req, res, next) => {
    try {
      const { sitterId } = req.params; // 여기에서 sitterId를 가져옵니다.

      // 이 sitterId가 제대로 가져와지고 있는지 확인해보세요.
      console.log(sitterId);

      const findReview = await this.reviewsService.findReview(sitterId);
      return res.status(200).json({ data: findReview });
    } catch (err) {
      next(err);
    }
  };

  changeReview = async (req, res, next) => {
    try {
      const { reviewId, sitterId } = req.params; // sitterId를 추가했습니다.
      const { title, content, rating } = req.body;
      const { userId } = req.user;

      console.log(reviewId, userId, sitterId); // sitterId를 출력하도록 추가했습니다.

      const changeReview = await this.reviewsService.changeReview(
        userId,
        sitterId, // sitterId를 인자로 전달하도록 추가했습니다.
        reviewId,
        title,
        content,
        rating,
      );

      return res.status(201).json({ data: changeReview });
    } catch (err) {
      next(err);
    }
  };

  // 리뷰 삭제
  deleteReview = async (req, res, next) => {
    try {
      const { reviewId } = req.params;
      const { userId } = req.user;

      const deleteReview = await this.reviewsService.deleteReview(
        reviewId,
        userId,
      );

      return res.status(200).json({ data: deleteReview });
    } catch (err) {
      next(err);
    }
  };
}
