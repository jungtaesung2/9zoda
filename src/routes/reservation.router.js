import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {ReservationController} from "../controller/reservation.controller.js";

const router = express.Router();

router.post(
  "/reservation",
  authMiddleware,
  ReservationController.createReservation,
);
router.get(
  "/reservation",
  authMiddleware,
  ReservationController.getReservations,
);
router.put(
  "/reservation/:postId",
  authMiddleware,
  ReservationController.updateReservation,
);
router.delete(
  "/reservation/:postId",
  authMiddleware,
  ReservationController.deleteReservation,
);

export default router;
