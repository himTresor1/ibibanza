import { z } from "zod";
import { LandUse } from "./enums";
import { NonEmptyStringSchema, PositiveMoneySchema, PositiveSizeSchema, RwandaPhoneSchema } from "./common";

export const SellerSubmissionSchema = z.object({
  sellerName: NonEmptyStringSchema,
  sellerPhone: RwandaPhoneSchema,
  district: NonEmptyStringSchema,
  sector: NonEmptyStringSchema,
  priceRwf: PositiveMoneySchema,
  sizeSqm: PositiveSizeSchema,
  landUse: z.enum(LandUse),
  photoUrls: z.array(z.string().url()).min(1),
  accessNotes: z.string().trim().optional(),
  sellerNotes: z.string().trim().optional(),
});

export type SellerSubmissionInput = z.infer<typeof SellerSubmissionSchema>;
