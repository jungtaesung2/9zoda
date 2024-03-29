import express from "express";
import cookieParser from "cookie-parser";
import UsersRouter from "./routes/users.router.js";
import ReservationRouter from "./routes/reservation.router.js";
import PetsitterRouter from "./routes/petsitter.router.js";
import ReviewRouter from "./routes/review.router.js";

const app = express();
const PORT = 3018;

app.use(express.json());
app.use(cookieParser());

app.use("/api", [UsersRouter, ReservationRouter, PetsitterRouter]);
app.use("/api/reviews", ReviewRouter);

app.listen(PORT, () => {
  console.log(PORT, "포트로 서버가 열렸어요!");
});
