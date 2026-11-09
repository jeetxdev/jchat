import { Router } from "express";
import { healthRouter } from "./health";
import { userRouter } from "./user";
const router = Router();

router.use(healthRouter);
router.use("/users", userRouter);

export { router };
