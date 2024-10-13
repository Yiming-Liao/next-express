import Joi from "joi";

export const registerSchema = Joi.object({
  username: Joi.string().min(3).required().messages({
    "string.base": `"username" 必須是文字`,
    "string.empty": `"username" 不能為空`,
    "string.min": `"username" 必須至少有 {#limit} 個字符`,
    "any.required": `"username" 是必填的`,
  }),
  email: Joi.string().email().required().messages({
    "string.base": `"email" 必須是文字`,
    "string.empty": `"email" 不能為空`,
    "string.email": `"email" 必須是有效的電子郵件地址`,
    "any.required": `"email" 是必填的`,
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
