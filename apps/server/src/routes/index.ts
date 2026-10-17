import { Router } from "express";
import { healthRouter } from "./health.js";
import { userRouter } from "./user.js";
const router = Router();

router.use(healthRouter);
router.use("/users", userRouter);

export { router };
