import { z } from "zod";
import { NonEmptyStringSchema, PositiveSizeSchema } from "./common";

export const AlertDraftSchema = z.object({
  plotId: NonEmptyStringSchema,
  remainingCount: PositiveSizeSchema.optional(),
  visitWindow: z.string().trim().optional(),
  message: z.string().trim().min(20),
});

export type AlertDraftInput = z.infer<typeof AlertDraftSchema>;
