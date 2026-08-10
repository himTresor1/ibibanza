"use client";

import { useCallback, useEffect, useState } from "react";
import { Badge, Card } from "@ibibanza/ui";
import Link from "next/link";
import { AdminKeyGate } from "../../features/admin/admin-key-gate";
import { adminGetJson } from "../../lib/admin-client";

interface DashboardStats {
  totalPlots: number;
  pendingReview: number;
  newLeads: number;
  alertDrafts: number;
}

function AdminDashboardContent() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const [plots, leads, alerts] = await Promise.all([
        adminGetJson<{ status: string }[]>("/admin/plots"),
        adminGetJson<{ status: string }[]>("/admin/leads"),
        adminGetJson<unknown[]>("/admin/alerts"),
      ]);
      setStats({
        totalPlots: plots.length,
        pendingReview: plots.filter((plot) => plot.status === "pending_review").length,
        newLeads: leads.filter((lead) => lead.status === "new").length,
        alertDrafts: alerts.length,
      });
    } catch {
      setError("Ntibyakunze gushakisha imibare. Ongera ugerageze.");
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  if (error) {
    return <Card className="p-6 text-center text-sm text-[var(--text-sub-600)]">{error}</Card>;
  }

  if (!stats) {
    return <Card className="p-6 text-center text-sm text-[var(--muted-foreground)]">Turimo gushakisha...</Card>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-4">
      <Card className="p-4">
        <p className="text-sm text-[var(--muted-foreground)]">Ibibanza byose</p>
        <strong className="text-2xl">{stats.totalPlots}</strong>
      </Card>
      <Card className="p-4">
        <p className="text-sm text-[var(--muted-foreground)]">Bitegereje kugenzurwa</p>
        <strong className="text-2xl">{stats.pendingReview}</strong>
      </Card>
      <Card className="p-4">
        <p className="text-sm text-[var(--muted-foreground)]">Leads nshya</p>
        <strong className="text-2xl">{stats.newLeads}</strong>
      </Card>
      <Card className="p-4">
        <p className="text-sm text-[var(--muted-foreground)]">Alert drafts</p>
        <strong className="text-2xl">{stats.alertDrafts}</strong>
      </Card>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-[var(--text-strong-950)]">Ihuriro rya admin</h1>
      <AdminKeyGate>
        <AdminDashboardContent />
      </AdminKeyGate>
      <div className="flex flex-wrap gap-2">
        <Link href="/admin/plots"><Badge>Manage plots</Badge></Link>
        <Link href="/admin/leads"><Badge>Leads desk</Badge></Link>
        <Link href="/admin/alerts"><Badge>WhatsApp alerts</Badge></Link>
      </div>
    </div>
  );
}
