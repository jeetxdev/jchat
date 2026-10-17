import { Router } from "express";
import { sendSuccess } from "../utils/apiResponse.js";
import { HTTP_STATUS } from "../constants/httpStatuses.js";

export const healthRouter = Router();

healthRouter.get("/health", (_req, res) => {
  const data = { uptime: process.uptime() };
  sendSuccess(res, HTTP_STATUS.OK, data);
});
