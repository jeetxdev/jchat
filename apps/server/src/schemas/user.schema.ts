import { z } from "zod";
import { parsePhoneNumberFromString, isSupportedCountry } from "libphonenumber-js";
import { ERROR_MESSAGES } from "../constants/errorMessages.js";

export const createUserSchema = z
  .object({
    fullName: z.string().min(3).max(50),
    email: z.email().max(100),
    countryCode: z.string().refine((value) => isSupportedCountry(value), {
      message: ERROR_MESSAGES.INVALID_COUNTRY_CODE,
    }),
    mobile: z.string(),
    age: z.coerce.number().int().min(13).max(120),
    password: z.string().min(8).max(24),
    // profileImage: z.file()
    //   .max(10 * 1024 * 1024)
    //   .mime(["image/jpeg", "image/png"]), // 10MB max size
  })
  .superRefine((data, ctx) => {
    const phoneNumber = parsePhoneNumberFromString(data.mobile, {
      defaultCountry: data.countryCode,
    });
    if (!phoneNumber || !phoneNumber.isValid()) {
      ctx.addIssue({
        code: "custom",
        message: ERROR_MESSAGES.INVALID_PHONE_NUMBER,
        path: ["mobile"],
      });
    }
  });
export const createUserQuerySchema = z.object({
  admin: z.stringbool().optional(),
});
export const userQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
});
export type CreateUserInputType = z.infer<typeof createUserSchema>;
export type CreateUserQueryType = z.infer<typeof createUserQuerySchema>;
export type UserQueryType = z.infer<typeof userQuerySchema>;
