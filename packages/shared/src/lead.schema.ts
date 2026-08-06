import { z } from "zod";
import { LeadStatus } from "./enums";
import { NonEmptyStringSchema, RwandaPhoneSchema } from "./common";

export const BuyerInterestSchema = z.object({
  plotId: NonEmptyStringSchema,
  buyerName: NonEmptyStringSchema,
  buyerPhone: RwandaPhoneSchema,
  preferredVisitTime: z.string().trim().optional(),
  note: z.string().trim().optional(),
});

export const LeadStatusUpdateSchema = z.object({
  status: z.enum(LeadStatus),
  note: z.string().trim().optional(),
});

export type BuyerInterestInput = z.infer<typeof BuyerInterestSchema>;
export type LeadStatusUpdateInput = z.infer<typeof LeadStatusUpdateSchema>;
