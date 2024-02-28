export class UsersRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }

//유저 프로필 조회
findUserProfiles = async (userId) => {
    const users = await this.prisma.users.findMany({
        where: { userId},
    });
    return users;
};

//유저 프로필 수정

updateUserProfiles = async (userId, name, region, reservationhistory) => {
    const updateUserProfiles = await this.prisma.users.update({
        where: {
            userId : +userId
        },
        data: {
            name: name,
            region: region,
            reservationhistory: reservationhistory
        }
    });   
    return updateUserProfiles;
}};
