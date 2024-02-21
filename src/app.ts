import express, { json } from "express";
import "express-async-errors";
import helmet from "helmet";
import "reflect-metadata";
import { HandleErrors } from "./middlewares/handleErrors.middleware";
import { userRouter } from "./routers/user.router";
import cors from "cors";
export const app = express();

app.use(cors());
app.use(helmet());
app.use(json());

app.use("/users", userRouter)

app.use(HandleErrors.execute);