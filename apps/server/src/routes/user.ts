import { Router } from "express";
import { createUserHandler, getUsersHandler } from "../controllers/userController";
import { validate } from "../middlewares/validate";
import { createUserSchema, createUserQuerySchema, userQuerySchema } from "../schemas/user.schema";

const userRouter = Router();

userRouter.post(
  "/create",
  validate({ body: createUserSchema, query: createUserQuerySchema }),
  createUserHandler,
);

userRouter.get("/", validate({ query: userQuerySchema }), getUsersHandler);

export { userRouter };
