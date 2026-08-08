import { describe, expect, it } from "vitest";
import {
  BuyerPreferenceSchema,
  PreferredLanguage,
  SellerSubmissionSchema,
  kinyarwandaLabels,
} from "./index";

describe("shared land schemas", () => {
  it("accepts a buyer WhatsApp opt-in with Rwanda phone and clear preferences", () => {
    const result = BuyerPreferenceSchema.safeParse({
      name: "Uwineza Alice",
      phone: "+250788123456",
      locations: ["Bugesera", "Kigali"],
      minBudget: 5_000_000,
      maxBudget: 15_000_000,
      landUses: ["residential"],
      urgency: "now",
      buyerType: "local",
      language: PreferredLanguage.Kinyarwanda,
      consentWhatsapp: true,
    });

    expect(result.success).toBe(true);
  });

  it("rejects WhatsApp alerts when consent is missing", () => {
    const result = BuyerPreferenceSchema.safeParse({
      name: "Mugisha Eric",
      phone: "0788123456",
      locations: ["Bugesera"],
      maxBudget: 12_000_000,
      landUses: ["residential"],
      urgency: "this_month",
      buyerType: "diaspora",
      language: PreferredLanguage.Kinyarwanda,
      consentWhatsapp: false,
    });

    expect(result.success).toBe(false);
  });

  it("rejects seller submissions without a usable phone number", () => {
    const result = SellerSubmissionSchema.safeParse({
      sellerName: "Niyonsenga",
      sellerPhone: "123",
      district: "Bugesera",
      sector: "Nyamata",
      priceRwf: 12_000_000,
      sizeSqm: 300,
      landUse: "residential",
      photoUrls: ["https://example.com/plot.jpg"],
    });

    expect(result.success).toBe(false);
  });

  it("rejects a buyer budget range where min exceeds max", () => {
    const result = BuyerPreferenceSchema.safeParse({
      name: "Keza Diane",
      phone: "+250788123456",
      locations: ["Kigali"],
      minBudget: 20_000_000,
      maxBudget: 10_000_000,
      landUses: ["commercial"],
      urgency: "later",
      buyerType: "local",
      language: PreferredLanguage.Kinyarwanda,
      consentWhatsapp: true,
    });

    expect(result.success).toBe(false);
  });

  it("accepts a seller submission with free-text plot tags", () => {
    const result = SellerSubmissionSchema.safeParse({
      sellerName: "Niyonsenga",
      sellerPhone: "+250788123456",
      district: "Bugesera",
      sector: "Nyamata",
      priceRwf: 12_000_000,
      sizeSqm: 300,
      landUse: "residential",
      photoUrls: ["https://example.com/plot.jpg"],
      tags: ["Metero 300 uvuye ku muhanda", "Amazi arahari"],
    });

    expect(result.success).toBe(true);
  });

  it("rejects a plot submission with more than 10 tags", () => {
    const result = SellerSubmissionSchema.safeParse({
      sellerName: "Niyonsenga",
      sellerPhone: "+250788123456",
      district: "Bugesera",
      sector: "Nyamata",
      priceRwf: 12_000_000,
      sizeSqm: 300,
      landUse: "residential",
      photoUrls: ["https://example.com/plot.jpg"],
      tags: Array.from({ length: 11 }, (_, index) => `Tag ${index}`),
    });

    expect(result.success).toBe(false);
  });

  it("rejects a plot tag longer than 60 characters", () => {
    const result = SellerSubmissionSchema.safeParse({
      sellerName: "Niyonsenga",
      sellerPhone: "+250788123456",
      district: "Bugesera",
      sector: "Nyamata",
      priceRwf: 12_000_000,
      sizeSqm: 300,
      landUse: "residential",
      photoUrls: ["https://example.com/plot.jpg"],
      tags: ["a".repeat(61)],
    });

    expect(result.success).toBe(false);
  });

  it("provides Kinyarwanda labels for primary CTAs", () => {
    expect(kinyarwandaLabels.cta.callNow).toBe("Hamagara ubu");
    expect(kinyarwandaLabels.cta.requestVisit).toBe("Saba gusura ikibanza");
  });
});
