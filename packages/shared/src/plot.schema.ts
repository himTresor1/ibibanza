import { z } from "zod";
import { LandUse, PlotStatus } from "./enums";
import { NonEmptyStringSchema, PositiveMoneySchema, PositiveSizeSchema } from "./common";

export const CreatePlotSchema = z.object({
  title: NonEmptyStringSchema,
  district: NonEmptyStringSchema,
  sector: NonEmptyStringSchema,
  cell: NonEmptyStringSchema,
  village: NonEmptyStringSchema,
  priceRwf: PositiveMoneySchema,
  sizeSqm: PositiveSizeSchema,
  landUse: z.enum(LandUse),
  status: z.enum(PlotStatus).default(PlotStatus.PendingReview),
  photoUrls: z.array(z.string().url()).min(1),
  accessNotes: z.string().trim().optional(),
  publicNotes: z.string().trim().optional(),
  tags: z.array(z.string().min(1).max(60)).max(10).default([]),
});

export type CreatePlotInput = z.infer<typeof CreatePlotSchema>;
