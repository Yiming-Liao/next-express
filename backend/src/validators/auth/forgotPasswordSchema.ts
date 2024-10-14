import Joi from "joi";

export const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": `"email" 必須是文字`,
    "string.empty": `"email" 不能為空`,
    "string.email": `"email" 必須是有效的電子郵件地址`,
    "any.required": `"email" 是必填的`,
  }),
});
