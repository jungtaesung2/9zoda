import { expect, jest } from "@jest/globals";
import ReservationService from "../service/reservation.service.js";
import ReservationRepository from "../repository/reservation.repository.js";

jest.mock("../repository/reservation.repository.js");

describe("ReservationService", () => {
  describe("createReservation", () => {
    it("should create a reservation", async () => {
      const userId = 1;
      const sitterId = 2;
      const reservation = "2024-03-01";
      const petName = "빡빡이";
      const petType = "middle";
      const request = "간식";

      const expectedDate = sitterId + "20240301";

      ReservationRepository.findReservationByDate.mockResolvedValue(null);
      await ReservationService.createReservation(
        userId,
        sitterId,
        reservation,
        petName,
        petType,
        request,
      );

      expect(ReservationRepository.createReservation).toHaveBeenCalledWith(
        userId,
        sitterId,
        reservation,
        petName,
        petType,
        request,
        expectedDate,
      );
    });

    it("should throw an error if the date is already reserved", async () => {
      const userId = 1;
      const sitterId = 2;
      const reservation = "2024-03-01";
      const petName = "빡빡이";
      const petType = "middle";
      const request = "간식";

      ReservationRepository.findReservationByDate.mockResolvedValue({
        // Mocking a reservation already exists for the given date
      });

      await expect(
        ReservationService.createReservation(
          userId,
          sitterId,
          reservation,
          petName,
          petType,
          request,
        ),
      ).rejects.toThrow("이미 예약된 날짜입니다.");
    });
  });

  describe("ReservationService", () => {
    describe("getReservations", () => {
      it("should get reservations for a user", async () => {
        const userId = 1;
        const expectedReservations = [{ id: 1, userId: 1 }];

        ReservationRepository.findReservationsByUserId.mockResolvedValue(
          expectedReservations,
        );

        const reservations = await ReservationService.getReservations(userId);

        expect(reservations).toEqual(expectedReservations);
      });

      it("should throw an error if there are no reservations for the user", async () => {
        const userId = 1;

        ReservationRepository.findReservationsByUserId.mockResolvedValue([]);

        await expect(
          ReservationService.getReservations(userId),
        ).rejects.toThrow("예약이 없습니다.");
      });
    });

    describe("updateReservation", () => {
      it("should update a reservation", async () => {
        const postId = 1;
        const sitterId = 2;
        const reservation = "2024-03-01";
        const petName = "빡빡이";
        const petType = "middle";
        const request = "간식";

        const expectedDate = sitterId + "20240301";

        ReservationRepository.findReservationByDate.mockResolvedValue(null);
        await ReservationService.updateReservation(
          postId,
          sitterId,
          reservation,
          petName,
          petType,
          request,
        );

        expect(ReservationRepository.updateReservation).toHaveBeenCalledWith(
          postId,
          sitterId,
          reservation,
          petName,
          petType,
          request,
          expectedDate,
        );
      });

      it("should throw an error if the date is already reserved", async () => {
        const postId = 1;
        const sitterId = 2;
        const reservation = "2024-03-01";
        const petName = "빡빡이";
        const petType = "middle";
        const request = "간식";

        ReservationRepository.findReservationByDate.mockResolvedValue({
          // Mocking a reservation already exists for the given date
        });

        await expect(
          ReservationService.updateReservation(
            postId,
            sitterId,
            reservation,
            petName,
            petType,
            request,
          ),
        ).rejects.toThrow("이미 예약된 날짜입니다.");
      });
    });

    describe("deleteReservation", () => {
      it("should delete a reservation", async () => {
        const postId = 1;

        await ReservationService.deleteReservation(postId);

        expect(ReservationRepository.deleteReservation).toHaveBeenCalledWith(
          postId,
        );
      });
    });
  });
});
