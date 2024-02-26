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
    const { email, password } = req.body;
    const tokens = await this.usersService.signIn(email, password);

    res.cookie("authorization", `Bearer ${tokens.accessToken}`);
    res.cookie("refreshToken", tokens.refreshToken);

    return res.status(200).json({ message: "로그인 완료" });
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
}
