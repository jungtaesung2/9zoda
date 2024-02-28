export class ReviewsService {
  constructor(reviewsRepository) {
    this.reviewsRepository = reviewsRepository;
  }

  findSitter = async (sitterId) => {
    if (!sitterId) {
      throw new Error("시터를 선택해주세요.");
    }
    const sitter = await this.reviewsRepository.findSitter(sitterId);
    if (!sitter) {
      throw new Error("해당하는 시터가 없습니다");
    }
    return sitter;
  };

  checkReservation = async (sitterId, userId) => {
    if (!sitterId) {
      throw new Error("시터를 선택해주세요.");
    }
    const reservation = await this.reviewsRepository.checkReservation(
      sitterId,
      userId,
    );
    if (!reservation) {
      throw new Error("해당 펫시터에 대한 리뷰 권한이 없습니다.");
    }
    return reservation;
  };

  createReview = async (userId, sitterId, title, content, rating) => {
    if (!sitterId || !title || !content || !rating) {
      throw new Error("시터를 선택하고, 제목, 내용, 별점을 모두 입력해주세요.");
    }
    const createReview = await this.reviewsRepository.createReview(
      userId,
      sitterId,
      title,
      content,
      rating,
    );
    return createReview;
  };

  findReview = async (sitterId) => {
    if (!sitterId) {
      throw new Error("시터를 선택해주세요.");
    }
    const reviews = await this.reviewsRepository.findReview(sitterId);
    if (reviews.length === 0) {
      throw new Error("리뷰가 존재하지 않습니다.");
    }
    return reviews;
  };
  // 리뷰 수정
  changeReview = async (userId, sitterId, reviewId, title, content, rating) => {
    if (!title || !content || !rating) {
      throw new Error("제목, 내용, 별점을 모두 입력해주세요.");
    }
    const changeReview = await this.reviewsRepository.changeReview(
      userId,
      sitterId,
      reviewId,
      title,
      content,
      rating,
    );
    return changeReview;
  };

  deleteReview = async (reviewId, userId) => {
    const deleteReview = await this.reviewsRepository.deleteReview(
      reviewId,
      userId,
    );
    return deleteReview;
  };
}
