export class PetsitterService {
  constructor(petsitterRepository) {
    this.petsitterRepository = petsitterRepository;
  }

  // 펫시터 조회
  getPetsitters = async () => {
    const petsitters = await this.petsitterRepository.getPetsitters();
    return petsitters.map((petsitter) => ({
      name: petsitter.name,
      region: petsitter.region,
    }));
  };

  //펫시터 상세조회
  //펫시터 상세조회
  getPetsittersById = async (sitterId) => {
    try {
      const petsitter =
        await this.petsitterRepository.getPetsittersById(sitterId);
      return {
        name: petsitter.name,
        region: petsitter.region,
        review: petsitter.review, // 리뷰 정보를 추가합니다.
      };
    } catch (err) {
      throw err;
    }
  };
}
