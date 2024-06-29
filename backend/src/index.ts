import express from "express";
import userRouter from "./routes/user.js";
import { errorHandler } from "./middlewares/error-handler.js";

const app = express();

//middlewares
app.use(express.json());

//api routes
app.use("/api/users", userRouter);

// error handler
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
