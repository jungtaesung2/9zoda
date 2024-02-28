export class PetsitterController {
    constructor(petsittersService) {
        this.petsittersService = petsittersService;
    }

    // 펫시터 조회
    getPetsitters = async (req, res, next) => {
        try {
            const getPetsitters = await this.petsittersService.getPetsitters();
            return res.status(200).json({ data: getPetsitters });

        } catch(err) {
            next(err);
        }
    }

    //펫시터 상세조회
    getPetsittersById = async (req, res, next) => {
        try {
            const { sitterId } = req.params;
            const petsitter = await this.petsittersService.findPetsittersById(sitterId);
            
            return res.status(200).json({ data: petsitter });
        } catch(err) {
            next(err);
        }
    }
}