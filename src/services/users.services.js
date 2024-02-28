export class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }

    // 유저 프로필
    findUserProfiles = async () => {
        const users = await this.usersRepository.findUserProfiles();
        return users.map(user => ({
            userId: user.userId,
            name: user.name,
            region: user.region,
            reservationhistory: user.reservationhistory
        }));
    };

    // 유저 프로필 수정
    updateUserProfile = async (userId, name, region, reservationhistory) => {
        if (!name) {
            throw new Error('이름을 입력하세요.');
        } else if (!region) {
            throw new Error('사는 지역을 입력해주세요.');
        } else if (!reservationhistory) {
            throw new Error('예약 내역을 입력해주세요.');
        }

        const updateUser = await this.usersRepository.updateUserProfiles(userId, name, region, reservationhistory);

        return {
            name: updateUser.name,
            region: updateUser.region,
            reservationhistory: updateUser.reservationhistory,
        };
    }
}