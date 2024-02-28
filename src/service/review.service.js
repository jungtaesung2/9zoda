export class ReviewsService {
    constructor(reviewsRepository) {
        this.reviewsRepository = reviewsRepository;
    }

    findSitter = async (sitterId) => {
        // 1. sitterId 가 제대로 있는지 값이 있는지 확인
        if (!sitterId) {
            throw new Error('시터를 선택해주세요.');
        }
        // 2. 레파지토리에서 시터아이디로 해당하는 시터가 있는지 확인
        const sitter = await this.reviewsRepository.findSitter(sitterId);

        // 3. 시터가 없는 경우
        if (!sitter) {
            throw new Error('해당하는 시터가 없습니다')
        }
        return sitter;
    }

    checkReservation = async (sitterId, userId) => {
        const reservation = await this.reviewsRepository.checkReservation(sitterId, userId);

        if (!reservation) {
            throw new Error('해당 펫시터에 대한 리뷰 권한이 없습니다.');
        }

        return reservation;
    }

    // 리뷰 작성
    createReview = async (userId, sitterId, title, content, rating) => {

        if (!title) {
            throw new Error('제목을 입력하셔야하옵니다.');
        } else if (!content) {
            throw new Error('내용을 입력하세요');
        } else if (!rating) {
            throw new Error('별점을 입력하세요.');
        }

        const createReview = await this.reviewsRepository.createReview(
            userId,
            sitterId
            title,
            content,
            rating,
        );

        return createReview;
    }

    // 리뷰 조회
    findReview = async (sitterId) => {
        if (!sitterId) {
            throw new Error('시터를 선택해주세요.')
        }

        const reviews = await this.reviewsRepository.findReview(
            sitterId
        );

        if (!reviews) {
            throw new Error('리뷰가 존재하지 않습니다.');
        }


        return reviews;
    };

    // 리뷰 수정
    changeReview = async (userId, reviewId, title, content, rating, checkUser) => {

        if (!title) {
            throw new Error('제목을 입력하셔야하옵니다.');
        } else if (!content) {
            throw new Error('내용을 입력하세요');
        } else if (!rating) {
            throw new Error('별점을 입력하세요');
        }

        if (checkUser !== userId) {
            throw new Error('수정할 수 있는 권한이 없습니다.')
        }

        const changeReview = await this.reviewsRepository.changeReview(
            reviewId,
            userId,
            title,
            content,
            rating,
        );

        return changeReview;
    };

    // 리뷰 삭제
    deleteReview = async (reviewId, userId, checkUser) => {

        if (checkUser !== userId) {
            throw new Error('삭제할 수 있는 권한이 없습니다.')
        }

        const deleteReview = await this.reviewsRepository.deleteReview(
            reviewId,
            userId
        )

        return deleteReview;
    }


}