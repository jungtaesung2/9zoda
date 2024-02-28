import { jest } from "@jest/globals";
import { UsersController } from "../../src/controller/user.controller.js";

describe("UsersController", () => {
  let usersController;

  beforeEach(() => {
    const mockUsersService = {
      signUp: jest.fn(),
      signIn: jest.fn(),
      signOut: jest.fn(),
      getUserById: jest.fn(),
      getAllUserById: jest.fn(),
    };

    usersController = new UsersController(mockUsersService);
  });

  describe("signUp", () => {
    it("회원가입 성공 메시지를 반환해야 합니다", async () => {
      const req = {
        body: {
          email: "test@example.com",
          password: "password",
          passwordConfirm: "password",
          name: "Test User",
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const expectedResult = {
        status: 200,
        data: { message: "회원가입 성공" },
      };
      usersController.usersService.signUp.mockResolvedValueOnce(expectedResult);

      await usersController.signUp(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expectedResult.data);
    });

    it("에러를 처리해야 합니다", async () => {
      const req = {
        body: {
          email: "test@example.com",
          password: "password",
          passwordConfirm: "password",
          name: "Test User",
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const errorMessage = "내부 서버 오류";
      usersController.usersService.signUp.mockRejectedValueOnce(
        new Error(errorMessage),
      );

      await usersController.signUp(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe("signIn", () => {
    it("인증 및 refreshToken 쿠키를 설정해야 합니다", async () => {
      const req = { body: { email: "test@example.com", password: "password" } };
      const res = {
        cookie: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockTokens = {
        accessToken: "fakeAccessToken",
        refreshToken: "fakeRefreshToken",
      };
      usersController.usersService.signIn.mockResolvedValueOnce(mockTokens);

      await usersController.signIn(req, res);

      expect(res.cookie).toHaveBeenCalledWith(
        "authorization",
        "Bearer fakeAccessToken",
      );
      expect(res.cookie).toHaveBeenCalledWith(
        "refreshToken",
        "fakeRefreshToken",
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "로그인 완료" });
    });
  });

  describe("signOut", () => {
    it("authorization 및 refreshToken 쿠키를 삭제하고 성공 메시지를 반환해야 합니다", async () => {
      const req = {};
      const res = {
        clearCookie: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await usersController.signOut(req, res);

      expect(res.clearCookie).toHaveBeenCalledWith("authorization");
      expect(res.clearCookie).toHaveBeenCalledWith("refreshToken");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "로그아웃 완료" });
    });

    it("에러를 처리해야 합니다", async () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const errorMessage = "내부 서버 오류";
      usersController.usersService.signOut.mockRejectedValueOnce(
        new Error(errorMessage),
      );

      await usersController.signOut(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });
});

describe("getUserById", () => {
  it("사용자 ID로 사용자 정보를 조회하고 반환해야 합니다", async () => {
    const userId = "1";
    const req = { params: { userId } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    const mockUser = {
      id: userId,
      name: "Test User",
      email: "test@example.com",
    };
    usersController.usersService.getUserById.mockResolvedValueOnce(mockUser);

    await usersController.getUserById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ data: mockUser });
  });

  it("사용자를 찾을 수 없는 경우 404 상태를 반환해야 합니다", async () => {
    const userId = "1";
    const req = { params: { userId } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    usersController.usersService.getUserById.mockResolvedValueOnce(null);

    await usersController.getUserById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "사용자를 찾을 수 없습니다.",
    });
  });

  it("에러를 처리해야 합니다", async () => {
    const userId = "1";
    const req = { params: { userId } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    const errorMessage = "내부 서버 오류";
    usersController.usersService.getUserById.mockRejectedValueOnce(
      new Error(errorMessage),
    );

    await usersController.getUserById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});

describe("AllUserById", () => {
  it("모든 사용자를 조회하고 반환해야 합니다", async () => {
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    const mockUsers = [
      { id: "1", name: "User 1", email: "user1@example.com" },
      { id: "2", name: "User 2", email: "user2@example.com" },
    ];
    usersController.usersService.getAllUserById.mockResolvedValueOnce(
      mockUsers,
    );

    await usersController.AllUserById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ data: mockUsers });
  });

  it("에러를 처리해야 합니다", async () => {
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    const errorMessage = "내부 서버 오류";
    usersController.usersService.getAllUserById.mockRejectedValueOnce(
      new Error(errorMessage),
    );

    await usersController.AllUserById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});
