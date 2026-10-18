import type { Request, Response } from "express";
import type {
  CreateUserInputType,
  CreateUserQueryType,
  UserQueryType,
} from "../schemas/user.schema.js";
import { sendSuccess } from "../utils/apiResponse.js";
import { HTTP_STATUS } from "../constants/httpStatuses.js";

const createUserHandler = (
  req: Request<unknown, unknown, CreateUserInputType, CreateUserQueryType>,
  res: Response,
) => {
  const response: Record<string, unknown> = { ...req.body };
  delete response.password;
  sendSuccess(res, HTTP_STATUS.CREATED, response);
};
const getUsersHandler = (req: Request<unknown, unknown, unknown, UserQueryType>, res: Response) => {
  sendSuccess(res, HTTP_STATUS.OK, {
    pagination: {
      page: req.query.page,
      limit: req.query.limit,
      total: 2,
    },
    users: [
      {
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        age: 25,
        countryCode: "+91",
        mobile: "1234567890",
      },
      {
        id: "2",
        name: "Jane Doe",
        email: "jane.doe@example.com",
        age: 25,
        countryCode: "+91",
        mobile: "1234567890",
      },
    ],
  });
};
export { createUserHandler, getUsersHandler };
