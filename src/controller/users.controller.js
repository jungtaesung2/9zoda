export class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }

    // 유저 프로필 조회
    findUserProfiles = async (req, res, next) => {
        try {
            const { userId } = req.params;
            const findUserProfiles = await this.usersService.findUserProfiles(userId);

            return res.status(200).json({ data: findUserProfiles });

        } catch(err) {
            next(err);
        }
    }

    // 유저 프로필 수정
    updateUserProfiles = async (req, res, next) => {
        try {
            const { userId } = req.params;
            const { name, region, reservationhistory } = req.body;
            const updateUserProfiles = await this.usersService.updateUserProfile(
                userId,
                name,
                region,
                reservationhistory,
            );

            return res.status(201).json({ data: updateUserProfiles });

        } catch (err) {
            next(err);
        }
    }
}