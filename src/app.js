import express from "express";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import UsersRouter from "./routes/users.router.js";
import ReservationRouter from "./routes/reservation.router.js";
import PetsitterRouter from "./routes/petsitter.router.js";
import ErrorHandlingMiddleware from "./middlewares/error-handling.middleware.js";


const app = express();
const PORT = 3018;

app.use(express.json());
app.use(cookieParser());

app.use("/api", [router, UsersRouter, ReservationRouter, PetsitterRouter]);
app.use(ErrorHandlingMiddleware);

app.listen(PORT, () => {
  console.log(PORT, "포트로 서버가 열렸어요!");
});
