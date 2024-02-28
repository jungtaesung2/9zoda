import { jest } from "@jest/globals";
import { UsersRepository } from "../../src/repository/user.repository.js";

describe("UsersRepository", () => {
  let usersRepository;

  beforeEach(() => {
    const mockPrisma = {
      users: {
        create: jest.fn(),
        findFirst: jest.fn(),
        findUnique: jest.fn(),
        findMany: jest.fn(),
      },
      refreshTokens: {
        deleteMany: jest.fn(),
      },
    };

    usersRepository = new UsersRepository(mockPrisma);
  });

  describe("signUp", () => {
    it("회원 정보를 생성해야 합니다", async () => {
      const email = "test@example.com";
      const hashedPassword = "hashedPassword";
      const name = "Test User";

      const mockUser = { id: 1, email, name };
      usersRepository.prisma.users.create.mockResolvedValueOnce(mockUser);

      const result = await usersRepository.signUp(email, hashedPassword, name);

      expect(result).toEqual(mockUser);
      expect(usersRepository.prisma.users.create).toHaveBeenCalledWith({
        data: { email, password: hashedPassword, name },
      });
    });
  });

  describe("signIn", () => {
    it("signIn 메서드를 호출해야 합니다", async () => {
      const email = "test@example.com";
      const password = "password";

      const mockResult = { id: 1, email };
      usersRepository.prisma.users.findFirst.mockResolvedValueOnce(mockResult);

      const result = await usersRepository.getUserByEmail(email);

      expect(result).toEqual(mockResult);
    });
  });

  describe("getUserByEmail", () => {
    it("이메일로 사용자 정보를 조회해야 합니다", async () => {
      const email = "test@example.com";

      const mockUser = { id: 1, email, name: "Test User" };
      usersRepository.prisma.users.findFirst.mockResolvedValueOnce(mockUser);

      const result = await usersRepository.getUserByEmail(email);

      expect(result).toEqual(mockUser);
      expect(usersRepository.prisma.users.findFirst).toHaveBeenCalledWith({
        where: { email },
      });
    });
  });

  describe("getUserById", () => {
    it("사용자 ID로 사용자 정보를 조회해야 합니다.", async () => {
      const userId = 1;
      const mockUser = {
        id: userId,
        email: "test@example.com",
        name: "Test User",
      };
      usersRepository.prisma.users.findUnique.mockResolvedValueOnce(mockUser);

      const result = await usersRepository.getUserById(userId);

      expect(result).toEqual(mockUser);
      expect(usersRepository.prisma.users.findUnique).toHaveBeenCalledWith({
        where: { userId: userId },
      });
    });

    it("사용자를 찾을 수 없는 경우 null을 반환해야 합니다.", async () => {
      const userId = 1;
      usersRepository.prisma.users.findUnique.mockResolvedValueOnce(null);

      const result = await usersRepository.getUserById(userId);

      expect(result).toBeNull();
    });
  });

  describe("getAllUserById", () => {
    it("모든 사용자를 조회한 후 데이터를 반환해야 합니다.", async () => {
      const mockUsers = [
        { id: 1, email: "user1@example.com", name: "User 1" },
        { id: 2, email: "user2@example.com", name: "User 2" },
      ];
      usersRepository.prisma.users.findMany.mockResolvedValueOnce(mockUsers);

      const result = await usersRepository.getAllUserById();

      expect(result).toEqual(mockUsers);
    });

    it("사용자가 없는 경우 빈 배열을 반환해야 합니다.", async () => {
      usersRepository.prisma.users.findMany.mockResolvedValueOnce([]);

      const result = await usersRepository.getAllUserById();

      expect(result).toEqual([]);
    });
  });

  describe("signOut", () => {
    it("리프레시 토큰을 삭제하고 성공 메시지를 반환해야 합니다", async () => {
      const userId = 1;

      const expectedResult = { message: "로그아웃 성공" };
      usersRepository.prisma.refreshTokens.deleteMany.mockResolvedValueOnce(
        expectedResult,
      );

      const result = await usersRepository.signOut(userId);

      expect(result).toEqual(expectedResult);
    });

    it("삭제 실패 시 에러를 처리해야 합니다", async () => {
      const userId = 1;

      const errorMessage = "리프레시 토큰 삭제 실패";
      usersRepository.prisma.refreshTokens.deleteMany.mockRejectedValueOnce(
        new Error(errorMessage),
      );

      await expect(usersRepository.signOut(userId)).rejects.toThrow(
        errorMessage,
      );
    });
  });
});
