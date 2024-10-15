import { Request } from "express";
import { ObjectSchema } from "joi";

export default function validateInput(
  schema: ObjectSchema,
  req: Request
): void {
  const { error } = schema.validate(req.body);
  if (error) throw error;
}
