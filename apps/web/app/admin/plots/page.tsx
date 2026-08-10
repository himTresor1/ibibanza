"use client";

import { useCallback, useEffect, useState } from "react";
import { Badge, Button, Card, Table, TableCell, TableHead } from "@ibibanza/ui";
import { AdminKeyGate } from "../../../features/admin/admin-key-gate";
import { adminGetJson, adminPatchJson } from "../../../lib/admin-client";
import { formatRwf } from "../../../lib/mock-data";

type PlotStatus = "draft" | "pending_review" | "published" | "reserved" | "sold" | "archived";

const STATUS_LABELS: Record<PlotStatus, string> = {
  draft: "Umushinga",
  pending_review: "Bitegereje kugenzurwa",
  published: "Byasohowe",
  reserved: "Byabitswe",
  sold: "Byagurishijwe",
  archived: "Byahagaritswe",
};

interface AdminSeller {
  name: string;
  phone: string;
}

interface AdminPlot {
  id: string;
  slug: string;
  title: string;
  district: string;
  sector: string;
  cell: string;
  village: string;
  priceRwf: number;
  status: PlotStatus;
  seller: AdminSeller | null;
}

function AdminPlotsContent() {
  const [plots, setPlots] = useState<AdminPlot[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const data = await adminGetJson<AdminPlot[]>("/admin/plots");
      setPlots(data);
    } catch {
      setError("Ntibyakunze gushakisha ibibanza. Ongera ugerageze.");
    }
  }, []);

  useEffect(() => {
    // Imperative fetch-on-mount: setPlots/setError only run after the `await` below resolves,
    // never synchronously during this effect. eslint-plugin-react-hooks's set-state-in-effect
    // rule can't see across that await boundary and flags it anyway; there is no
    // useSyncExternalStore equivalent for a one-off REST fetch like this.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  async function updateStatus(id: string, status: PlotStatus) {
    setPendingId(id);
    setError(null);
    try {
      await adminPatchJson(`/admin/plots/${id}/status`, { status });
      await load();
    } catch {
      setError("Ntibyakunze guhindura status. Ongera ugerageze.");
    } finally {
      setPendingId(null);
    }
  }

  if (plots === null && error) {
    return (
      <Card className="space-y-3 p-6 text-center">
        <p className="text-sm text-[var(--text-sub-600)]">{error}</p>
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
      <Card className="p-6 text-center text-sm text-[var(--muted-foreground)]">Nta bibanza bihari.</Card>
    );
  }

  return (
    <div className="space-y-4">
      {error ? <p className="text-sm text-[var(--danger)]">{error}</p> : null}
      <Card className="overflow-x-auto p-0">
        <Table>
          <thead>
            <tr>
              <TableHead>Ikibanza</TableHead>
              <TableHead>Aho kiri</TableHead>
              <TableHead>Igiciro</TableHead>
              <TableHead>Umucuruzi</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ibikorwa</TableHead>
            </tr>
          </thead>
          <tbody>
            {plots.map((plot) => (
              <tr key={plot.id}>
                <TableCell>{plot.title}</TableCell>
                <TableCell>
                  {plot.district} / {plot.sector}
                </TableCell>
                <TableCell>{formatRwf(plot.priceRwf)}</TableCell>
                <TableCell>
                  {plot.seller ? (
                    <div>
                      <div>{plot.seller.name}</div>
                      <div className="text-xs text-[var(--muted-foreground)]">{plot.seller.phone}</div>
                    </div>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell>
                  <Badge>{STATUS_LABELS[plot.status] ?? plot.status}</Badge>
                </TableCell>
                <TableCell>
                  {plot.status === "pending_review" ? (
                    <div className="flex gap-2">
                      <Button
                        size="small"
                        disabled={pendingId === plot.id}
                        onClick={() => updateStatus(plot.id, "published")}
                      >
                        Emeza
                      </Button>
                      <Button
                        size="small"
                        variant="neutral"
                        mode="stroke"
                        disabled={pendingId === plot.id}
                        onClick={() => updateStatus(plot.id, "archived")}
                      >
                        Hakana
                      </Button>
                    </div>
                  ) : plot.status === "published" || plot.status === "reserved" ? (
                    <Button
                      size="small"
                      variant="neutral"
                      mode="stroke"
                      disabled={pendingId === plot.id}
                      onClick={() => updateStatus(plot.id, "archived")}
                    >
                      Hagarika
                    </Button>
                  ) : null}
                </TableCell>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}

export default function AdminPlotsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-[var(--text-strong-950)]">Ibibanza byose</h1>
      <AdminKeyGate>
        <AdminPlotsContent />
      </AdminKeyGate>
    </div>
  );
}
