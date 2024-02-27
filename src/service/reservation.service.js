import ReservationRepository from "../repository/reservation.repository.js";

class ReservationService {
  static async createReservation(
    userId,
    sitterId,
    reservation,
    petName,
    petType,
    request,
  ) {
    const reser = reservation.split("-").join("");
    const date = sitterId + reser;

    const resInfo = await ReservationRepository.findReservationByDate(date);
    if (resInfo) {
      throw new Error("이미 예약된 날짜입니다.");
    }

    await ReservationRepository.createReservation(
      userId,
      sitterId,
      reservation,
      petName,
      petType,
      request,
      date,
    );
  }

  static async getReservations(userId) {
    const reservations =
      await ReservationRepository.findReservationsByUserId(userId);
    if (!reservations.length) {
      throw new Error("예약이 없습니다.");
    }
    return reservations;
  }

  static async updateReservation(
    postId,
    sitterId,
    reservation,
    petName,
    petType,
    request,
  ) {
    const reser = reservation.split("-").join("");
    const date = sitterId + reser;

    const resInfo = await ReservationRepository.findReservationByDate(date);
    if (resInfo) {
      throw new Error("이미 예약된 날짜입니다.");
    }

    await ReservationRepository.updateReservation(
      postId,
      sitterId,
      reservation,
      petName,
      petType,
      request,
      date,
    );
  }

  static async deleteReservation(postId) {
    await ReservationRepository.deleteReservation(postId);
  }
}

export default ReservationService;
