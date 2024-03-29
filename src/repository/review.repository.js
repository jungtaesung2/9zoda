export class ReviewsRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  // 시터 아이디 찾기
  findSitter = async (sitterId) => {
    const sitter = await this.prisma.Petsitter.findFirst({
      where: {
        sitterId: +sitterId,
      },
    });
    return sitter;
  };

  // 예약 확인
  checkReservation = async (sitterId, userId) => {
    const reservation = await this.prisma.Reservation.findFirst({
      where: {
        sitterId: +sitterId,
        userId: +userId,
      },
    });
    return reservation;
  };

  // 리뷰 작성
  createReview = async (userId, sitterId, title, content, rating) => {
    const review = await this.prisma.Review.create({
      data: {
        userId: +userId,
        sitterId: +sitterId,
        title: title,
        content: content,
        rating: rating,
      },
    });
    return review;
  };

  // 리뷰 조회
  findReview = async (sitterId) => {
    const reviews = await this.prisma.Review.findMany({
      where: {
        sitterId: +sitterId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return reviews;
  };

  // 리뷰 수정
  changeReview = async (userId, sitterId, reviewId, title, content, rating) => {
    const changeReview = await this.prisma.Review.update({
      where: {
        reviewId: +reviewId,
        userId: +userId,
        sitterId: +sitterId, // 여기에 sitterId를 추가했습니다.
      },
      data: {
        title,
        content,
        rating,
      },
    });
    return changeReview;
  };

  // 리뷰 삭제
  deleteReview = async (reviewId, userId) => {
    const deleteReview = await this.prisma.Review.delete({
      where: {
        reviewId: +reviewId,
        userId: +userId,
      },
    });
    return deleteReview;
  };
}
