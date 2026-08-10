"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Badge, Button, Card, Select } from "@ibibanza/ui";
import { AdminKeyGate } from "../../../features/admin/admin-key-gate";
import { adminGetJson, adminPatchJson } from "../../../lib/admin-client";

type LeadStatus = "new" | "called" | "visit_scheduled" | "visited" | "negotiating" | "won" | "lost";

const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new: "Nshya",
  called: "Yahamagawe",
  visit_scheduled: "Gusura byateganyijwe",
  visited: "Yasuye",
  negotiating: "Barimo kuganira",
  won: "Byagenze neza",
  lost: "Byanze",
};

const LEAD_STATUS_OPTIONS = Object.keys(LEAD_STATUS_LABELS) as LeadStatus[];

interface AdminLeadPlot {
  id: string;
  slug: string;
  title: string;
}

interface AdminLeadBuyer {
  id: string;
  name: string;
  phone: string;
}

interface AdminLead {
  id: string;
  plotId: string;
  buyerId: string | null;
  buyerName: string;
  buyerPhone: string;
  preferredVisitTime: string | null;
  note: string | null;
  status: LeadStatus;
  statusNote: string | null;
  createdAt: string;
  updatedAt: string;
  plot: AdminLeadPlot;
  buyer: AdminLeadBuyer | null;
}

function AdminLeadsContent() {
  const [leads, setLeads] = useState<AdminLead[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all");

  const load = useCallback(async () => {
    setError(null);
    try {
      const data = await adminGetJson<AdminLead[]>("/admin/leads");
      setLeads(data);
    } catch {
      setError("Ntibyakunze gushakisha leads. Ongera ugerageze.");
    }
  }, []);

  useEffect(() => {
    // Imperative fetch-on-mount: setLeads/setError only run after the `await` below resolves,
    // never synchronously during this effect. eslint-plugin-react-hooks's set-state-in-effect
    // rule can't see across that await boundary and flags it anyway; there is no
    // useSyncExternalStore equivalent for a one-off REST fetch like this.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  async function updateStatus(id: string, status: LeadStatus) {
    setPendingId(id);
    setError(null);
    try {
      await adminPatchJson(`/admin/leads/${id}/status`, { status });
      await load();
    } catch {
      setError("Ntibyakunze guhindura status. Ongera ugerageze.");
    } finally {
      setPendingId(null);
    }
  }

  const filteredLeads = useMemo(() => {
    if (!leads) return leads;
    if (statusFilter === "all") return leads;
    return leads.filter((lead) => lead.status === statusFilter);
  }, [leads, statusFilter]);

  if (leads === null && error) {
    return (
      <Card className="space-y-3 p-6 text-center">
        <p className="text-sm text-[var(--text-sub-600)]">{error}</p>
        <Button size="small" onClick={load}>
          Ongera ugerageze
        </Button>
      </Card>
    );
  }

  if (leads === null) {
    return (
      <Card className="p-6 text-center text-sm text-[var(--muted-foreground)]">Turimo gushakisha...</Card>
    );
  }

  return (
    <div className="space-y-4">
      {error ? <p className="text-sm text-[var(--danger)]">{error}</p> : null}
      <div className="max-w-xs">
        <Select
          aria-label="Shungura ukurikije status"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value as LeadStatus | "all")}
        >
          <option value="all">Status zose</option>
          {LEAD_STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {LEAD_STATUS_LABELS[status]}
            </option>
          ))}
        </Select>
      </div>

      {leads.length === 0 ? (
        <Card className="p-6 text-center text-sm text-[var(--muted-foreground)]">Nta leads zihari.</Card>
      ) : filteredLeads && filteredLeads.length === 0 ? (
        <Card className="p-6 text-center text-sm text-[var(--muted-foreground)]">
          Nta leads zihuye n&apos;iyi status.
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredLeads?.map((lead) => (
            <Card key={lead.id} className="space-y-3 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-[var(--text-strong-950)]">{lead.buyerName}</p>
                  <p className="text-sm text-[var(--muted-foreground)]">{lead.buyerPhone}</p>
                </div>
                <Badge>{LEAD_STATUS_LABELS[lead.status] ?? lead.status}</Badge>
              </div>

              <div className="text-sm text-[var(--text-sub-600)]">
                Ikibanza:{" "}
                <a href={`/plots/${lead.plot.slug}`} className="font-medium underline">
                  {lead.plot.title}
                </a>
              </div>

              {lead.preferredVisitTime ? (
                <p className="text-sm text-[var(--text-sub-600)]">
                  Igihe yifuza gusura: {lead.preferredVisitTime}
                </p>
              ) : null}

              {lead.note ? <p className="text-sm text-[var(--text-sub-600)]">Icyo yanditse: {lead.note}</p> : null}

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <a href={`tel:${lead.buyerPhone}`}>
                  <Button size="small">Hamagara</Button>
                </a>
                <a href={`https://wa.me/${lead.buyerPhone.replace("+", "")}`}>
                  <Button size="small" variant="neutral" mode="stroke">
                    WhatsApp
                  </Button>
                </a>
                <div className="w-48">
                  <Select
                    aria-label="Hindura status ya lead"
                    value={lead.status}
                    disabled={pendingId === lead.id}
                    onChange={(event) => updateStatus(lead.id, event.target.value as LeadStatus)}
                  >
                    {LEAD_STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>
                        {LEAD_STATUS_LABELS[status]}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminLeadsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-[var(--text-strong-950)]">Leads desk</h1>
      <AdminKeyGate>
        <AdminLeadsContent />
      </AdminKeyGate>
    </div>
  );
}
