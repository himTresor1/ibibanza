"use client";

import { useCallback, useEffect, useState } from "react";
import { Button, Card, FormField, Input, Select, Textarea } from "@ibibanza/ui";
import { AdminKeyGate } from "../../../features/admin/admin-key-gate";
import { adminGetJson, adminPostJson } from "../../../lib/admin-client";

type PlotStatus = "draft" | "pending_review" | "published" | "reserved" | "sold" | "archived";

interface AdminPlot {
  id: string;
  slug: string;
  title: string;
  district: string;
  sector: string;
  priceRwf: number;
  status: PlotStatus;
  remainingCount: number | null;
}

interface AlertRecipient {
  buyerId: string;
  phone: string;
  status: string;
}

interface AlertDraft {
  id: string;
  plotId: string;
  title: string;
  message: string;
  remainingCount: number | null;
  visitWindow: string | null;
  status: string;
  createdAt: string;
  sentAt: string | null;
  recipients: AlertRecipient[];
}

const CANDIDATE_STATUSES: PlotStatus[] = ["published", "reserved"];

function AdminAlertsContent() {
  const [plots, setPlots] = useState<AdminPlot[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedPlotId, setSelectedPlotId] = useState<string>("");
  const [remainingCount, setRemainingCount] = useState("");
  const [visitWindow, setVisitWindow] = useState("");
  const [draft, setDraft] = useState<AlertDraft | null>(null);
  const [generating, setGenerating] = useState(false);
  const [generateError, setGenerateError] = useState<string | null>(null);
  const [marking, setMarking] = useState(false);
  const [markError, setMarkError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const load = useCallback(async () => {
    setLoadError(null);
    try {
      const data = await adminGetJson<AdminPlot[]>("/admin/plots");
      const candidates = data.filter((plot) => CANDIDATE_STATUSES.includes(plot.status));
      setPlots(candidates);
      setSelectedPlotId((current) => current || candidates[0]?.id || "");
    } catch {
      setLoadError("Ntibyakunze gushakisha ibibanza. Ongera ugerageze.");
    }
  }, []);

  useEffect(() => {
    // Imperative fetch-on-mount: setPlots/setLoadError only run after the `await` below resolves,
    // never synchronously during this effect. eslint-plugin-react-hooks's set-state-in-effect
    // rule can't see across that await boundary and flags it anyway; there is no
    // useSyncExternalStore equivalent for a one-off REST fetch like this.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  async function generateDraft() {
    if (!selectedPlotId) return;
    setGenerating(true);
    setGenerateError(null);
    setMarkError(null);
    setCopied(false);
    try {
      const body: { remainingCount?: number; visitWindow?: string } = {};
      const trimmedRemaining = remainingCount.trim();
      if (trimmedRemaining) {
        const parsed = Number(trimmedRemaining);
        if (!Number.isNaN(parsed)) body.remainingCount = parsed;
      }
      const trimmedWindow = visitWindow.trim();
      if (trimmedWindow) body.visitWindow = trimmedWindow;

      const created = await adminPostJson<AlertDraft>(`/admin/alerts/draft-for-plot/${selectedPlotId}`, body);
      setDraft(created);
    } catch {
      setGenerateError("Ntibyakunze gukora ubutumwa. Ongera ugerageze.");
    } finally {
      setGenerating(false);
    }
  }

  async function markSent() {
    if (!draft) return;
    setMarking(true);
    setMarkError(null);
    try {
      const updated = await adminPostJson<AlertDraft>(`/admin/alerts/${draft.id}/mark-sent`, {});
      setDraft(updated);
    } catch {
      setMarkError("Ntibyakunze kwandika nk'uko byoherejwe. Ongera ugerageze.");
    } finally {
      setMarking(false);
    }
  }

  async function copyMessage() {
    if (!draft) return;
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(draft.message);
        setCopied(true);
      }
    } catch {
      // Clipboard access can be unavailable/denied — fail silently, no crash.
    }
  }

  if (plots === null && loadError) {
    return (
      <Card className="space-y-3 p-6 text-center">
        <p className="text-sm text-[var(--text-sub-600)]">{loadError}</p>
        <Button size="small" onClick={load}>
          Ongera ugerageze
        </Button>
      </Card>
    );
  }

  if (plots === null) {
    return (
      <Card className="p-6 text-center text-sm text-[var(--muted-foreground)]">Turimo gushakisha...</Card>
    );
  }

  if (plots.length === 0) {
    return (
      <Card className="p-6 text-center text-sm text-[var(--muted-foreground)]">
        Nta bibanza bihari byo koherezaho ubutumwa.
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {loadError ? <p className="text-sm text-[var(--danger)]">{loadError}</p> : null}
      <Card className="grid gap-4 p-4">
        <FormField id="plot" label="Hitamo ikibanza">
          <Select value={selectedPlotId} onChange={(event) => setSelectedPlotId(event.target.value)}>
            {plots.map((plot) => (
              <option key={plot.id} value={plot.id}>
                {plot.title} — {plot.district}/{plot.sector}
              </option>
            ))}
          </Select>
        </FormField>
        <FormField id="remaining" label="Ibisigaye (si ngombwa)">
          <Input
            type="number"
            min={0}
            value={remainingCount}
            onChange={(event) => setRemainingCount(event.target.value)}
            placeholder="Urugero: 3"
          />
        </FormField>
        <FormField id="visit-window" label="Igihe cyo gusura (si ngombwa)">
          <Input
            value={visitWindow}
            onChange={(event) => setVisitWindow(event.target.value)}
            placeholder="Urugero: Ku wa gatandatu"
          />
        </FormField>
        {generateError ? <p className="text-sm text-[var(--danger)]">{generateError}</p> : null}
        <Button
          size="small"
          className="w-fit"
          disabled={!selectedPlotId || generating}
          onClick={generateDraft}
        >
          {generating ? "Turimo gukora..." : "Kora ubutumwa"}
        </Button>
      </Card>

      {draft ? (
        <Card className="grid gap-4 p-4">
          <FormField id="message" label="Ubutumwa bwa WhatsApp">
            <Textarea readOnly value={draft.message} className="min-h-56 font-mono" />
          </FormField>
          <p className="text-sm text-[var(--muted-foreground)]">
            Abazabona ubu butumwa: {draft.recipients.length}
          </p>
          {markError ? <p className="text-sm text-[var(--danger)]">{markError}</p> : null}
          <div className="flex flex-wrap gap-2">
            <Button size="small" variant="neutral" mode="stroke" onClick={copyMessage}>
              {copied ? "Byakoporowe" : "Koporora ubutumwa"}
            </Button>
            <Button size="small" disabled={draft.status === "sent" || marking} onClick={markSent}>
              {draft.status === "sent" ? "Byoherejwe" : marking ? "Turimo kubika..." : "Kwandika nk'byoherejwe"}
            </Button>
          </div>
        </Card>
      ) : null}
    </div>
  );
}

export default function AdminAlertsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-[var(--text-strong-950)]">Kwandika ubutumwa bwa WhatsApp</h1>
      <AdminKeyGate>
        <AdminAlertsContent />
      </AdminKeyGate>
    </div>
  );
}
