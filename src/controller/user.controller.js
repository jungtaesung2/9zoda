export class UsersController {
  constructor(usersService) {
    this.usersService = usersService;
  }

  //회원가입//
  signUp = async (req, res, next) => {
    try {
      const { email, password, passwordConfirm, name } = req.body;
      const result = await this.usersService.signUp(
        email,
        password,
        passwordConfirm,
        name,
      );
      res.status(result.status).json(result.data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  //로그인//
  signIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      console.log(req.body);
      const tokens = await this.usersService.signIn(email, password);

      res.cookie("authorization", `Bearer ${tokens.accessToken}`);
      res.cookie("refreshToken", tokens.refreshToken);

      return res.status(200).json({ message: "로그인 완료" });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message });
    }
  };

  // 로그아웃
  signOut = async (req, res, next) => {
    try {
      // 로그아웃을 위한 사용자의 정보를 추출하거나 세션을 종료하는 등의 작업을 수행합니다.
      // 이 부분은 사용하는 인증 방식에 따라 다를 수 있습니다.
      // 여기에서는 간단히 쿠키를 삭제하는 방식으로 로그아웃을 처리합니다.
      res.clearCookie("authorization");
      res.clearCookie("refreshToken");

      return res.status(200).json({ message: "로그아웃 완료" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  // 유저 프로필 조회
  findUserProfiles = async (req, res, next) => {
    try {
      const userId = req.user.userId; // 미들웨어에서 저장한 사용자 정보를 가져옴

      const findUserProfiles = await this.usersService.findUserProfiles(userId);

      return res.status(200).json({ data: findUserProfiles });
    } catch (err) {
      next(err);
    }
  };

  // 유저 프로필 수정
  updateUserProfiles = async (req, res, next) => {
    try {
      const userId = req.user.userId; // userId 값을 req.user에서 추출
      const { name } = req.body;
      const updateUserProfiles = await this.usersService.updateUserProfile(
        userId,
        name,
      );

      return res.status(201).json({ data: updateUserProfiles });
    } catch (err) {
      next(err);
    }
  };
}
// 사용자 조회
//   getUserById = async (req, res, next) => {
//     try {
//       const { userId } = req.params;
//       const user = await this.usersService.getUserById(userId);
//       if (!user) {
//         return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
//       }
//       return res.status(200).json(user);
//     } catch (err) {
//       return res.status(500).json({ message: err.message });
//     }
//   };
