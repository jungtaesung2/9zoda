export class PetsitterService {
  constructor(petsittersService) {
    this.petsittersService = petsittersService;
  }

  // 펫시터 조회
  getPetsitters = async () => {
    const petsitters = await this.petsittersService.findAllpetsitters();
    return petsitters.map((petsitter) => ({
      name: petsitter.name,
      region: petsitter.region,
    }));
  };

  //펫시터 상세조회
  getPetsittersById = async (req, res, next) => {
    try {
      const { sitterId } = req.params;
      const petsitter =
        await this.petsittersService.findPetsitterById(sitterId);

      return res.status(200).json({ data: petsitter });
    } catch (err) {
      next(err);
    }
  };
}
