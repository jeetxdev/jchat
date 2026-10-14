import { Router } from "express";
import { createUserHandler, getUsersHandler } from "../controllers/userController.js";
import { validate } from "../middlewares/validate.js";
import {
  createUserSchema,
  createUserQuerySchema,
  userQuerySchema,
} from "../schemas/user.schema.js";

const userRouter = Router();

userRouter.post(
  "/create",
  validate({ body: createUserSchema, query: createUserQuerySchema }),
  createUserHandler,
);

userRouter.get("/", validate({ query: userQuerySchema }), getUsersHandler);

export { userRouter };
