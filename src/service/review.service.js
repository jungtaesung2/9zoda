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

    // 리뷰 작성
    createResume = async (title, content, rating) => {

        if ( !title ) {
            throw new Error('제목을 입력하셔야하옵니다.');
        } else if ( !content ) {
            throw new Error('내용을 입력하세요');
        } else if ( !rating ) {
            throw new Error('별점을 입력하세요.');
        } 

        const createReview = await this.reviewsRepository.createReview(
            title,
            content,
            rating,
        );

        return createReview;
    }

    // 리뷰 조회
    findReview = async() => {
        const reviews = await this.reviewsRepository.findReview();

        if (!reviews) {
            throw new Error('리뷰가 존재하지 않습니다.');
        }

        return reviews;
    };

    // 리뷰 수정
    changeReview = async(userId, reviewId, title, content, rating) => {

        if ( !title ) {
            throw new Error('제목을 입력하셔야하옵니다.');
        } else if (!content) {
            throw new Error('내용을 입력하세요');
        } else if (!rating) {
            throw new Error('별점을 입력하세요');
        } 

        const checkReview = await this.reviewsRepository.findReview(reviewId);

        if(!checkReview) {
            throw new Error ('해당하는 리뷰가 존재하지 않습니다.')
        } else if (checkReview.userId !== userId) {
            throw new Error ('수정할 수 있는 권한이 없습니다.')
        }

        const changeReview = await this.reviewsRepository.changeReview(
            userId,
            resumeId,
            title,
            content,
            rating,
        );

        return changeReview;
    };

    // 리뷰 삭제
    deleteReview = async (resumeId, userId) => {

        const checkReview = await this.reviewsRepository.findReview(reviewId);
        
        if(!checkReview) {
            throw new Error ('해당하는 리뷰가 존재하지 않습니다.')
        } else if (checkReview.userId !== userId) {
            throw new Error ('삭제할 수 있는 권한이 없습니다.')
        }

        const deleteReview = await this.reviewsRepository.deleteReview(
            resumeId,
            userId
        )
        
        return deleteReview;
    }


}