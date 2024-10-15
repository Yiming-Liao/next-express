import Joi from "joi";

export const verifyEmailSchema = Joi.object({
  verifyEmailToken: Joi.string().required().messages({
    "string.base": `"verifyEmailToken" 必須是文字`,
    "string.empty": `"verifyEmailToken" 不能為空`,
    "any.required": `"verifyEmailToken" 是必填的`,
  }),
});
