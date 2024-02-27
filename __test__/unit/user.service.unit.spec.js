import { jest } from "@jest/globals";
import { UsersService } from "../../src/service/user.service.js";

describe("UsersService", () => {
  let usersService;
  let mockUsersRepository;

  beforeEach(() => {
    mockUsersRepository = {
      getUserByEmail: jest.fn(),
      signUp: jest.fn(),
      deleteRefreshToken: jest.fn(),
    };

    usersService = new UsersService(mockUsersRepository);
  });

  describe("signUp", () => {
    it("이미 존재하는 이메일이면 충돌 상태와 메시지를 반환해야 합니다.", async () => {
      mockUsersRepository.getUserByEmail.mockResolvedValueOnce({});

      const result = await usersService.signUp(
        "test@example.com",
        "password",
        "password",
        "Test User",
      );

      expect(result).toEqual({
        status: 409,
        data: { message: "이미 존재하는 이메일입니다." },
      });
    });

    it("비밀번호가 6자리 이상이 아니면 잘못된 요청 상태와 메시지를 반환해야 합니다.", async () => {
      const result = await usersService.signUp(
        "test@example.com",
        "pass",
        "pass",
        "Test User",
      );

      expect(result).toEqual({
        status: 400,
        data: { message: "비밀번호는 6자리 이상을 입력해주세요" },
      });
    });

    it("비밀번호와 비밀번호 확인이 일치하지 않으면 잘못된 요청 상태와 메시지를 반환해야 합니다.", async () => {
      const result = await usersService.signUp(
        "test@example.com",
        "password",
        "differentPassword",
        "Test User",
      );

      expect(result).toEqual({
        status: 400,
        data: { message: "비밀번호가 일치하지 않습니다" },
      });
    });

    it("회원가입에 성공하면 성공 상태와 사용자 데이터를 반환해야 합니다.", async () => {
      mockUsersRepository.getUserByEmail.mockResolvedValueOnce(null);
      bcrypt.hash.mockResolvedValueOnce("hashedPassword");
      mockUsersRepository.signUp.mockResolvedValueOnce({
        id: 1,
        email: "test@example.com",
        name: "Test User",
      });

      const result = await usersService.signUp(
        "test@example.com",
        "password",
        "password",
        "Test User",
      );

      expect(result).toEqual({
        status: 201,
        data: { data: { id: 1, email: "test@example.com", name: "Test User" } },
      });
    });
  });

  describe("signIn", () => {
    it("로그인에 성공하면 액세스 토큰 및 리프레시 토큰을 반환해야 합니다.", async () => {
      const mockUser = { userId: 1 };
      mockUsersRepository.getUserByEmail.mockResolvedValueOnce(mockUser);
      jwt.sign.mockReturnValueOnce("fakeAccessToken");
      jwt.sign.mockReturnValueOnce("fakeRefreshToken");

      const result = await usersService.signIn("test@example.com", "password");

      expect(result).toEqual({
        accessToken: "fakeAccessToken",
        refreshToken: "fakeRefreshToken",
      });
    });
  });

  describe("signOut", () => {
    it("로그아웃에 성공하면 성공 메시지를 반환해야 합니다.", async () => {
      const userId = 1;
      mockUsersRepository.deleteRefreshToken.mockResolvedValueOnce({
        message: "로그아웃 성공",
      });

      const result = await usersService.signOut(userId);

      expect(result).toEqual({ message: "로그아웃 성공" });
    });
  });
});
