import Joi from "joi";

export const resetPasswordSchema = Joi.object({
  resetPasswordToken: Joi.string().required().messages({
    "string.base": `"resetPasswordToken" 必須是文字`,
    "string.empty": `"resetPasswordToken" 不能為空`,
    "any.required": `"resetPasswordToken" 是必填的`,
  }),
  password: Joi.string().min(6).required().messages({
    "string.base": `"password" 必須是文字`,
    "string.empty": `"password" 不能為空`,
    "string.min": `"password" 必須至少有 {#limit} 個字符`,
    "any.required": `"password" 是必填的`,
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "密碼與確認密碼必須相同",
  }),
});
