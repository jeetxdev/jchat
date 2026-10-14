import { z } from "zod";

z.config({
  customError: (issue) => {
    if (issue.code === "invalid_value" || issue.code === "invalid_type") {
      return `please enter a valid ${issue.path?.join(".") || "value"}`;
    }
    return issue.message;
  },
});
