import { expect, jest } from "@jest/globals";
import ReservationService from "../service/reservation.service.js";
import ReservationController from "../controller/reservation.controller.js";

jest.mock("../service/reservation.service.js", () => ({
  createReservation: jest.fn(),
  getReservations: jest.fn(),
  updateReservation: jest.fn(),
  deleteReservation: jest.fn(),
}));

describe("Reservation Controller", () => {
  // 예약하기 테스트
  test("createReservation - success", async () => {
    const req = {
      body: {
        sitterId: "1",
        reservation: "2024-03-01",
        petName: "부끄",
        petType: "large",
        request: "부끄야~ 하면 뒤뚱뒤뚱 뛰어와요",
      },
      user: { userId: "1" },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await ReservationController.createReservation(req, res);

    expect(ReservationService.createReservation).toHaveBeenCalledWith(
      "1",
      "1",
      "2024-03-01",
      "부끄",
      "large",
      "부끄야~ 하면 뒤뚱뒤뚱 뛰어와요",
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: "예약 성공했습니다." });
  });

  // 수정하기 테스트
  test("updateReservation - success", async () => {
    const req = {
      params: { postId: "1" },
      body: {
        sitterId: "1",
        reservation: "2024-03-01",
        petName: "부끄",
        petType: "large",
        request: "부끄야~ 하면 뒤뚱뒤뚱 뛰어와요",
      },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await ReservationController.updateReservation(req, res);

    expect(ReservationService.updateReservation).toHaveBeenCalledWith(
      "1",
      "1",
      "2024-03-01",
      "부끄",
      "large",
      "부끄야~ 하면 뒤뚱뒤뚱 뛰어와요",
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "예약 변경이 완료되었습니다.",
    });
  });

  // 조회하기 테스트
  test("getReservations - success", async () => {
    const req = { user: { userId: "1" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const reservations = [
      {
        postId: 1,
        sitterId: "1",
        reservation: "2024-03-01",
        petName: "부끄",
        petType: "large",
        request: "부끄야~ 하면 뒤뚱뒤뚱 뛰어와요",
      },
    ];

    ReservationService.getReservations.mockResolvedValueOnce(reservations);
    await ReservationController.getReservations(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ reservations });
  });

  // 삭제하기 테스트
  test("deleteReservation - success", async () => {
    const req = { params: { postId: "1" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await ReservationController.deleteReservation(req, res);

    expect(ReservationService.deleteReservation).toHaveBeenCalledWith("1");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "예약 취소되었습니다." });
  });
});

export {};
