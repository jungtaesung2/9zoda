export class PetsitterRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }

    // 펫시터 조회
    async getPetsitters() {
        const petsitter = await this.prisma.petsitter.findMany({
        });
        return petsitter;
    }

    // 펫시터 상세조회
    async getPetsittersById(sitterId) {
        const detailedPetsitter = await this.prisma.petsitter.findUnique({
            where: {
                sitterId: sitterId,
            },
            include: {
                reviews: true,
                contents: true,
                careers: true,
                images: true,
                requests: true,
            },
        });

        return detailedPetsitter;
    }
}