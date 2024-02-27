import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import reservationController from "../controller/reservation.controller.js";

const router = express.Router();

router.post(
  "/reservation",
  authMiddleware,
  reservationController.createReservation,
);
router.get(
  "/reservation",
  authMiddleware,
  reservationController.getReservations,
);
router.put(
  "/reservation/:postId",
  authMiddleware,
  reservationController.updateReservation,
);
router.delete(
  "/reservation/:postId",
  authMiddleware,
  reservationController.deleteReservation,
);

export default router;
