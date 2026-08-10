"use client";

import { useState, useSyncExternalStore, type FormEvent, type ReactNode } from "react";
import { Button, Card, Input } from "@ibibanza/ui";
import { getAdminKey, setAdminKey, subscribeAdminKey } from "../../lib/admin-client";

function getServerSnapshot() {
  return null;
}

export function AdminKeyGate({ children }: { children: ReactNode }) {
  const key = useSyncExternalStore(subscribeAdminKey, getAdminKey, getServerSnapshot);
  const [draft, setDraft] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) return;
    setAdminKey(trimmed);
  }

  if (!key) {
    return (
      <Card className="mx-auto max-w-sm space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-[var(--text-strong-950)]">Admin API key</h2>
          <p className="text-sm text-[var(--muted-foreground)]">
            Shyiramo admin API key kugira ngo ubone iyi paji.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="password"
            placeholder="Admin API key"
            aria-label="Admin API key"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            autoFocus
          />
          <Button type="submit" className="w-full" disabled={!draft.trim()}>
            Injira
          </Button>
        </form>
      </Card>
    );
  }

  return <>{children}</>;
}
