import { Router } from "express";
import { container, singleton } from "tsyringe";
import { UserServices } from "../services/user.services";
import { UserController } from "../controllers/user.controller";
import { validateToken } from "../middlewares/validateToken.middleware";
import { validateBody } from "../middlewares/validateBody.middleware";
import { userCreationSchema, userLoginSchema } from "../schemas/user.schemas";

const userRouter = Router();
container.registerSingleton("UserServices", UserServices);
const userController = container.resolve(UserController);

userRouter.post("/", validateBody(userCreationSchema), (req, res) => userController.create(req, res));
userRouter.post("/login", validateBody(userLoginSchema), (req, res) => userController.login(req, res));
userRouter.get("/:id", validateToken, (req, res) => userController.retrieve(req, res));

export { userRouter };
 