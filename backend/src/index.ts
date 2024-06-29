import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error-handler.js";
import { userRouter } from "./routes/user.js";
import { branchRouter } from "./routes/branch.js";
import { roleRouter } from "./routes/role.js";

const app = express();

//middlewares
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("combined"));

//api routes
app.use("/api/users", userRouter);
app.use("/api/branches", branchRouter);
app.use("/api/roles", roleRouter);

// error handler
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
