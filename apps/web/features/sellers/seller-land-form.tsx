"use client";

import { Button, FormField, Input, Select, Textarea, cn } from "@ibibanza/ui";
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { postJson } from "../../lib/api-client";
import { PhotoUploadField, type UploadedMedia } from "./photo-upload-field";

interface SellerFormValues {
  sellerName: string;
  sellerPhone: string;
  district: string;
  sector: string;
  cell: string;
  village: string;
  priceRwf: string;
  sizeSqm: string;
  landUse: string;
  tags: string;
  accessNotes: string;
  sellerNotes: string;
}

const initialValues: SellerFormValues = {
  sellerName: "",
  sellerPhone: "",
  district: "",
  sector: "",
  cell: "",
  village: "",
  priceRwf: "",
  sizeSqm: "",
  landUse: "residential",
  tags: "",
  accessNotes: "",
  sellerNotes: "",
};

const STEPS = [
  { number: 1, label: "Uwagurisha" },
  { number: 2, label: "Ikibanza" },
  { number: 3, label: "Amafoto" },
];

function StepProgress({ current }: { current: number }) {
  return (
    <div aria-label="Intambwe zo kohereza ikibanza">
      <div className="flex items-center">
        {STEPS.map((item, index) => (
          <div key={item.number} className="flex flex-1 items-center last:flex-none">
            <span
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                item.number <= current
                  ? "bg-[var(--primary-base)] text-white"
                  : "bg-white text-[var(--text-soft-400)] ring-1 ring-inset ring-[var(--stroke-soft-200)]",
              )}
            >
              {item.number}
            </span>
            {index < STEPS.length - 1 ? (
              <span
                className={cn(
                  "mx-2 h-px flex-1",
                  item.number < current ? "bg-[var(--primary-base)]" : "bg-[var(--stroke-soft-200)]",
                )}
              />
            ) : null}
          </div>
        ))}
      </div>
      <div className="mt-2 flex">
        {STEPS.map((item) => (
          <span
            key={item.number}
            className={cn(
              "flex-1 text-center text-xs font-medium",
              item.number === current ? "text-[var(--primary-base)]" : "text-[var(--text-soft-400)]",
            )}
          >
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function SellerLandForm() {
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<SellerFormValues>(initialValues);
  const [media, setMedia] = useState<UploadedMedia[]>([]);
  const [status, setStatus] = useState("");
  const [mediaError, setMediaError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  function update(field: keyof SellerFormValues) {
    return (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setValues((prev) => ({ ...prev, [field]: value }));
    };
  }

  function goNext() {
    if (formRef.current?.reportValidity()) {
      setStep((current) => current + 1);
    }
  }

  function goBack() {
    setStep((current) => current - 1);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < 3) {
      return;
    }

    if (media.some((item) => item.status === "uploading")) {
      setMediaError("Tegereza amafoto yose arangize kohereza.");
      return;
    }
    const photoUrls = media.filter((item) => item.status === "done" && item.url).map((item) => item.url as string);
    if (photoUrls.length === 0) {
      setMediaError("Ohereza nibura ifoto imwe y'ikibanza.");
      return;
    }
    setMediaError("");

    setStatus("Kohereza...");
    try {
      await postJson("/seller-submissions", {
        sellerName: values.sellerName,
        sellerPhone: values.sellerPhone,
        district: values.district,
        sector: values.sector,
        cell: values.cell,
        village: values.village,
        priceRwf: Number(values.priceRwf),
        sizeSqm: Number(values.sizeSqm),
        landUse: values.landUse,
        photoUrls,
        accessNotes: values.accessNotes,
        sellerNotes: values.sellerNotes,
        tags: values.tags.split(",").map((item) => item.trim()).filter(Boolean),
      });
      setStatus("Twakiriye ikibanza. Ikipe ya Ibibanza iraguhamagara nyuma yo kugenzura amakuru.");
    } catch {
      setStatus("Ntibyashobotse. Reba ko API iri gukora kandi amakuru yuzuye neza.");
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <StepProgress current={step} />
      </div>
      <form ref={formRef} onSubmit={onSubmit} className="grid gap-6">
        {step === 1 ? (
          <>
            <div>
              <h2
                ref={headingRef}
                tabIndex={-1}
                className="text-lg font-semibold text-[var(--text-strong-950)] outline-none"
              >
                Amakuru y&apos;uwagurisha
              </h2>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                Aya makuru abikwa mu ibanga. Ikipe ya Ibibanza izaguhamagara kugira ngo yemeze ibisobanuro
                by&apos;ikibanza mbere yo kubishyira ku rubuga.
              </p>
            </div>
            <FormField id="sellerName" label="Amazina y'ugurisha">
              <Input name="sellerName" value={values.sellerName} onChange={update("sellerName")} required />
            </FormField>
            <FormField id="sellerPhone" label="Telefone">
              <Input
                name="sellerPhone"
                placeholder="+250788123456"
                value={values.sellerPhone}
                onChange={update("sellerPhone")}
                required
              />
            </FormField>
            <Button type="button" onClick={goNext}>
              Komeza
            </Button>
          </>
        ) : null}

        {step === 2 ? (
          <>
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="text-lg font-semibold text-[var(--text-strong-950)] outline-none"
            >
              Amakuru y&apos;ikibanza
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField id="district" label="Akarere">
                <Input name="district" placeholder="Bugesera" value={values.district} onChange={update("district")} required />
              </FormField>
              <FormField id="sector" label="Umurenge">
                <Input name="sector" placeholder="Nyamata" value={values.sector} onChange={update("sector")} required />
              </FormField>
              <FormField id="cell" label="Akagari">
                <Input name="cell" placeholder="Rilima" value={values.cell} onChange={update("cell")} required />
              </FormField>
              <FormField id="village" label="Umudugudu">
                <Input name="village" placeholder="Kayenzi" value={values.village} onChange={update("village")} required />
              </FormField>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <FormField id="priceRwf" label="Igiciro RWF">
                <Input name="priceRwf" inputMode="numeric" value={values.priceRwf} onChange={update("priceRwf")} required />
              </FormField>
              <FormField id="sizeSqm" label="Ingano sqm">
                <Input name="sizeSqm" inputMode="numeric" value={values.sizeSqm} onChange={update("sizeSqm")} required />
              </FormField>
              <FormField id="landUse" label="Zoning">
                <Select name="landUse" value={values.landUse} onChange={update("landUse")}>
                  <option value="residential">Guturwamo</option>
                  <option value="commercial">Ubucuruzi</option>
                  <option value="farming">Ubuhinzi</option>
                </Select>
              </FormField>
            </div>
            <FormField id="tags" label="Ibiranga ikibanza" description="Tandukanya buri kimenyetso na comma (,)">
              <Input
                name="tags"
                placeholder="Urugero: metero 300 uvuye ku muhanda, hafi y'ishuri, amazi arahari"
                value={values.tags}
                onChange={update("tags")}
              />
            </FormField>
            <div className="flex gap-2">
              <Button type="button" variant="neutral" mode="stroke" onClick={goBack}>
                Subira inyuma
              </Button>
              <Button type="button" onClick={goNext}>
                Komeza
              </Button>
            </div>
          </>
        ) : null}

        {step === 3 ? (
          <>
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="text-lg font-semibold text-[var(--text-strong-950)] outline-none"
            >
              Amafoto n&apos;ibisobanuro
            </h2>
            <FormField id="photoUrls" label="Amafoto">
              <PhotoUploadField media={media} onChange={setMedia} />
            </FormField>
            {mediaError ? <p className="text-sm text-[var(--danger)]">{mediaError}</p> : null}
            <FormField id="accessNotes" label="Umuhanda n'ibindi">
              <Textarea name="accessNotes" value={values.accessNotes} onChange={update("accessNotes")} />
            </FormField>
            <FormField id="sellerNotes" label="Ibisobanuro by'imbere">
              <Textarea name="sellerNotes" value={values.sellerNotes} onChange={update("sellerNotes")} />
            </FormField>
            <div className="flex gap-2">
              <Button type="button" variant="neutral" mode="stroke" onClick={goBack}>
                Subira inyuma
              </Button>
              <Button type="submit">
                Ohereza ngo bigenzurwe
              </Button>
            </div>
          </>
        ) : null}

        {status ? (
          <p role="status" className="text-sm text-[var(--muted-foreground)]">
            {status}
          </p>
        ) : null}
      </form>
    </div>
  );
}
