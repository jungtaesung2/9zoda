import { expect, jest } from "@jest/globals";
import ReservationService from "../service/reservation.service.js";
import ReservationRepository from "../repository/reservation.repository.js";

jest.mock("../repository/reservation.repository.js");

describe("ReservationService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new reservation", async () => {
    // Given
    const mockReservation = {
      userId: 1,
      sitterId: 2,
      reservation: "2024-03-01",
      petName: "플루피",
      petType: "middle",
      request: "특별한 요구사항 없음",
    };
    ReservationRepository.findReservationByDate.mockResolvedValue(null);
    ReservationRepository.createReservation.mockResolvedValue(mockReservation);

    // When
    await ReservationService.createReservation(
      mockReservation.userId,
      mockReservation.sitterId,
      mockReservation.reservation,
      mockReservation.petName,
      mockReservation.petType,
      mockReservation.request,
    );

    // Then
    expect(ReservationRepository.findReservationByDate).toBeCalledTimes(1);
    expect(ReservationRepository.createReservation).toBeCalledTimes(1);
  });

  // getReservations 테스트
  it("should get all reservations", async () => {
    // Given
    const mockUserId = 1;
    const mockReservations = [
      {
        userId: mockUserId,
        sitterId: 2,
        reservation: "2024-03-01",
        petName: "플루피",
        petType: "middle",
        request: "특별한 요구사항 없음",
      },
    ];
    ReservationRepository.findReservationsByUserId.mockResolvedValue(
      mockReservations,
    );

    // When
    const result = await ReservationService.getReservations(mockUserId);

    // Then
    expect(result).toEqual(mockReservations);
  });

  // updateReservation 테스트
  it("should update a reservation", async () => {
    // Given
    const mockReservation = {
      postId: 1,
      sitterId: 2,
      reservation: "2024-03-02",
      petName: "플루피",
      petType: "small",
      request: "특별한 요구사항 없음",
    };
    ReservationRepository.findReservationByDate.mockResolvedValue(null);
    ReservationRepository.updateReservation.mockResolvedValue(mockReservation);

    await ReservationService.updateReservation(
      mockReservation.postId,
      mockReservation.sitterId,
      mockReservation.reservation,
      mockReservation.petName,
      mockReservation.petType,
      mockReservation.request,
    );

    expect(ReservationRepository.updateReservation).toBeCalledTimes(1);
  });

  // deleteReservation
  it("should delete a reservation", async () => {
    const mockPostId = 1;
    ReservationRepository.deleteReservation.mockResolvedValue();

    await ReservationService.deleteReservation(mockPostId);

    expect(ReservationRepository.deleteReservation).toBeCalledTimes(1);
  });
});
