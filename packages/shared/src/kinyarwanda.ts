import { BuyerType, BuyerUrgency, LandUse, PreferredLanguage } from "./enums";

export const kinyarwandaLabels = {
  cta: {
    callNow: "Hamagara ubu",
    requestVisit: "Saba gusura ikibanza",
    whatsappAlerts: "Ohereza ubutaka bushya kuri WhatsApp",
  },
  landUse: {
    [LandUse.Residential]: "Guturwamo",
    [LandUse.Commercial]: "Ubucuruzi",
    [LandUse.Farming]: "Ubuhinzi",
    [LandUse.Mixed]: "Bivanze",
    [LandUse.Unknown]: "Ntibizwi neza",
  },
  urgency: {
    [BuyerUrgency.Now]: "Ubu",
    [BuyerUrgency.ThisMonth]: "Muri uku kwezi",
    [BuyerUrgency.Later]: "Nyuma",
  },
  buyerType: {
    [BuyerType.Local]: "Uri mu Rwanda",
    [BuyerType.Diaspora]: "Diaspora",
  },
  language: {
    [PreferredLanguage.Kinyarwanda]: "Kinyarwanda",
    [PreferredLanguage.English]: "English",
    [PreferredLanguage.French]: "Francais",
  },
} as const;
