import { z } from "zod";

export const RwandaPhoneSchema = z
  .string()
  .trim()
  .regex(/^(\+?250|0)?7[2389]\d{7}$/, "Andika telefone yo mu Rwanda ikora.");

export const PositiveMoneySchema = z.number().int().positive();
export const PositiveSizeSchema = z.number().int().positive();
export const NonEmptyStringSchema = z.string().trim().min(1);
