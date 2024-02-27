import { jest } from "@jest/globals";
import { UsersController } from "../../src/controller/user.controller.js";

describe("UsersController", () => {
  let usersController;

  beforeEach(() => {
    const mockUsersService = {
      signUp: jest.fn(),
      signIn: jest.fn(),
      signOut: jest.fn(),
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
