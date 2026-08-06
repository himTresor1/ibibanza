import { z } from "zod";
import { BuyerType, BuyerUrgency, LandUse, PreferredLanguage } from "./enums";
import { NonEmptyStringSchema, PositiveMoneySchema, RwandaPhoneSchema } from "./common";

export const BuyerPreferenceSchema = z
  .object({
    name: NonEmptyStringSchema,
    phone: RwandaPhoneSchema,
    locations: z.array(NonEmptyStringSchema).min(1),
    minBudget: PositiveMoneySchema.optional(),
    maxBudget: PositiveMoneySchema.optional(),
    landUses: z.array(z.enum(LandUse)).min(1),
    urgency: z.enum(BuyerUrgency),
    buyerType: z.enum(BuyerType),
    language: z.enum(PreferredLanguage).default(PreferredLanguage.Kinyarwanda),
    consentWhatsapp: z.literal(true, {
      error: "Ugomba kwemera kwakira ubutumwa kuri WhatsApp.",
    }),
  })
  .refine(
    (value) =>
      value.minBudget === undefined ||
      value.maxBudget === undefined ||
      value.minBudget <= value.maxBudget,
    {
      path: ["maxBudget"],
      message: "Ingengo y'imari ntarengwa igomba kuba iri hejuru y'iyo utangiriraho.",
    },
  );

export type BuyerPreferenceInput = z.infer<typeof BuyerPreferenceSchema>;
