import { prisma } from "../utils/prisma/index.js";

class ReservationRepository {
  static async findReservationByDate(date) {
    return await prisma.reservation.findFirst({
      where: { date: date },
    });
  }

  static async findReservationsByUserId(userId) {
    return await prisma.reservation.findMany({
      where: { userId: +userId },
      select: {
        postId: true,
        sitterId: true,
        reservation: true,
        petName: true,
        petType: true,
        request: true,
      },
    });
  }

  static async createReservation(
    userId,
    sitterId,
    reservation,
    petName,
    petType,
    request,
    date,
  ) {
    return await prisma.reservation.create({
      data: {
        userId: userId,
        sitterId: sitterId,
        reservation: reservation,
        petName: petName,
        petType: petType,
        request: request,
        date: date,
      },
    });
  }

  static async updateReservation(
    postId,
    sitterId,
    reservation,
    petName,
    petType,
    request,
    date,
  ) {
    return await prisma.reservation.update({
      where: { postId: +postId },
      data: {
        sitterId: sitterId,
        reservation: reservation,
        petName: petName,
        petType: petType,
        request: request,
        date: date,
      },
    });
  }

  static async deleteReservation(postId) {
    return await prisma.reservation.delete({
      where: { postId: +postId },
    });
  }
}

export default ReservationRepository;
