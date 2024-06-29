import express from "express";
import userRouter from "./routes/user.js";
import { errorHandler } from "./middlewares/error-handler.js";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

//middlewares
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("combined"));

//api routes
app.use("/api/users", userRouter);

// error handler
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
