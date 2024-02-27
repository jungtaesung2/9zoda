import ReservationService from "../service/reservation.service.js";

class ReservationController {
  static async createReservation(req, res, next) {
    try {
      const { sitterId, reservation, petName, petType, request } = req.body;
      const { userId } = req.user;

      await ReservationService.createReservation(
        userId,
        sitterId,
        reservation,
        petName,
        petType,
        request,
      );

      return res.status(201).json({ message: "예약 성공했습니다." });
    } catch (error) {
      next(error);
    }
  }

  static async getReservations(req, res, next) {
    try {
      const { userId } = req.user;
      const reservations = await ReservationService.getReservations(userId);

      return res.status(200).json({ reservations });
    } catch (error) {
      next(error);
    }
  }

  static async updateReservation(req, res, next) {
    try {
      const { postId } = req.params;
      const { sitterId, reservation, petName, petType, request } = req.body;

      await ReservationService.updateReservation(
        postId,
        sitterId,
        reservation,
        petName,
        petType,
        request,
      );

      return res.status(200).json({ message: "예약 변경이 완료되었습니다." });
    } catch (error) {
      next(error);
    }
  }

  static async deleteReservation(req, res, next) {
    try {
      const { postId } = req.params;
      await ReservationService.deleteReservation(postId);

      return res.status(200).json({ message: "예약 취소되었습니다." });
    } catch (error) {
      next(error);
    }
  }
}

export default ReservationController;
