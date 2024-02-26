export class ReservationController {
  constructor(ReservationService) {
    this.reservationService = ReservationService;
  }

  reservePost = async (req, res, next) => {
    try {
      const { reservation, petName, petType, request } = req.body;
      const { userId } = req.user;

      if (arr.includes(reservation.split("-").join(""))) {
        return res.status(400).json({ message: "이미 예약된 날짜입니다." });
      }

      arr.push(reservation.split("-").join(""));

      const pet = await prisma.reservation.create({
        data: {
          userId: +userId,
          reservation,
          petName,
          petType,
          request,
        },
      });

      return res.status(201).json({ message: "예약 성공했습니다." });
    } catch (err) {
      next(err);
    }
  };

  getReserve = async (req, res, next) => {
    try {
      const { userId } = req.user;

      const pet = await prisma.reservation.findMany({
        where: { userId: +userId },
        select: {
          reservation: true,
          petName: true,
          petType: true,
          request: true,
        },
      });

      if (!pet) {
        return res.status(404).json({ message: "예약이 없습니다." });
      }

      return res.status(201).json({ date: pet });
    } catch (err) {
      next(err);
    }
  };

  patchReserve = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { reservation, petName, petType, request } = req.body;

      const post = await prisma.reservation.findFirst({
        where: { postId: +postId },
      });

      if (!post) {
        return res.status(404).json({ message: "예약 조회에 실패하였습니다." });
      }

      await prisma.reservation.update({
        where: { postId: +postId },
        select: {
          reservation,
          petName,
          petType,
          request,
        },
      });

      return res.status(200).json({ message: "예약 변경이 완료되었습니다." });
    } catch (err) {
      next(err);
    }
  };

  deleteReserve = async (req, res, next) => {
    try {
      const { postId } = req.params;

      await prisma.reservation.delete({
        where: { postId: +postId },
      });

      return res.status(201).json({ message: "예약 취소되었습니다." });
    } catch (err) {
      next(err);
    }
  };
}
