export enum LandUse {
  Residential = "residential",
  Commercial = "commercial",
  Farming = "farming",
  Mixed = "mixed",
  Unknown = "unknown",
}

export enum PlotStatus {
  Draft = "draft",
  PendingReview = "pending_review",
  Published = "published",
  Reserved = "reserved",
  Sold = "sold",
  Archived = "archived",
}

export enum LeadStatus {
  New = "new",
  Called = "called",
  VisitScheduled = "visit_scheduled",
  Visited = "visited",
  Negotiating = "negotiating",
  Won = "won",
  Lost = "lost",
}

export enum BuyerUrgency {
  Now = "now",
  ThisMonth = "this_month",
  Later = "later",
}

export enum BuyerType {
  Local = "local",
  Diaspora = "diaspora",
}

export enum PreferredLanguage {
  Kinyarwanda = "rw",
  English = "en",
  French = "fr",
}
