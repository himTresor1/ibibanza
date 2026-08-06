import { Badge, Button, Card, Checkbox, FormField, Input, Select, Table, TableCell, TableHead, Textarea } from "@ibibanza/ui";

export default function AdminUiPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-8 text-[var(--foreground)]">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[var(--brand)]">Ibibanza UI</p>
          <h1 className="mt-2 text-3xl font-semibold">Ibikoresho bya form</h1>
        </div>

        <Card className="space-y-5">
          <FormField id="seller-name" label="Amazina y'ugurisha" description="Andika amazina agaragara ku makuru y'ikibanza.">
            <Input placeholder="Urugero: Mugabo Jean" />
          </FormField>
          <FormField id="seller-phone" label="Telefone" error="Andika telefone ikora.">
            <Input placeholder="+250 7XX XXX XXX" />
          </FormField>
          <FormField id="district" label="Akarere">
            <Select defaultValue="bugesera">
              <option value="bugesera">Bugesera</option>
              <option value="kigali">Kigali</option>
              <option value="musanze">Musanze</option>
            </Select>
          </FormField>
          <FormField id="notes" label="Ibisobanuro">
            <Textarea placeholder="Vuga umuhanda, amazi, amashanyarazi cyangwa ibindi byafasha." />
          </FormField>
          <label className="flex items-center gap-3 text-sm">
            <Checkbox /> Nemeye kwakira amakuru kuri WhatsApp.
          </label>
          <div className="flex flex-wrap gap-3">
            <Button>Ohereza</Button>
            <Button variant="secondary">Bika nka draft</Button>
            <Button variant="danger">Siba</Button>
          </div>
        </Card>

        <Card>
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge>Byagenzuwe</Badge>
            <Badge>Gusura birashoboka</Badge>
            <Badge>WhatsApp</Badge>
          </div>
          <Table>
            <thead>
              <tr>
                <TableHead>Ikibanza</TableHead>
                <TableHead>Igiciro</TableHead>
                <TableHead>Status</TableHead>
              </tr>
            </thead>
            <tbody>
              <tr>
                <TableCell>Bugesera, Nyamata</TableCell>
                <TableCell>12M RWF</TableCell>
                <TableCell>Published</TableCell>
              </tr>
            </tbody>
          </Table>
        </Card>
      </div>
    </main>
  );
}
