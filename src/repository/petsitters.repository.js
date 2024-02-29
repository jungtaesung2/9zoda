export class PetsitterRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  // 펫시터 조회
  async getPetsitters() {
    const petsitter = await this.prisma.petsitter.findMany({});
    return petsitter;
  }

  // 펫시터 상세조회
  async getPetsittersById(sitterId) {
    const detailedPetsitter = await this.prisma.petsitter.findUnique({
      where: {
        sitterId: parseInt(sitterId), // sitterId를 정수로 변환합니다.
      },
      include: {
        review: {
          select: {
            reviewId: true,
            userId: true,
            sitterId: true,
            title: true,
            rating: true,
            content: true,
            image: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    return detailedPetsitter;
  }
}
