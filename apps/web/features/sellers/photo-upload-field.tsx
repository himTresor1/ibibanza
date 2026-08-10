"use client";

import { Button } from "@ibibanza/ui";
import { RiCloseLine, RiFileVideoLine, RiUploadCloud2Line } from "@remixicon/react";
import { useRef, type Dispatch, type SetStateAction } from "react";
import { ALLOWED_UPLOAD_TYPES, uploadPlotMedia, validateUploadFile } from "../../lib/supabase-storage";

export interface UploadedMedia {
  id: string;
  name: string;
  status: "uploading" | "done" | "error";
  url?: string;
  error?: string;
  previewUrl?: string;
  isVideo: boolean;
}

interface PhotoUploadFieldProps {
  id?: string;
  media: UploadedMedia[];
  onChange: Dispatch<SetStateAction<UploadedMedia[]>>;
}

function randomId() {
  return Math.random().toString(36).slice(2, 10);
}

export function PhotoUploadField({ id = "plot-media-input", media, onChange }: PhotoUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;

    const files = Array.from(fileList);
    const nextItems: UploadedMedia[] = files.map((file) => {
      const validationError = validateUploadFile(file);
      const isVideo = file.type.startsWith("video/");
      return {
        id: randomId(),
        name: file.name,
        status: validationError ? "error" : "uploading",
        error: validationError ?? undefined,
        previewUrl: !validationError && !isVideo ? URL.createObjectURL(file) : undefined,
        isVideo,
      };
    });

    onChange([...media, ...nextItems]);

    files.forEach((file, index) => {
      const item = nextItems[index];
      if (item.status !== "uploading") return;

      uploadPlotMedia(file)
        .then((url) => {
          onChange((prev) => updateItem(prev, item.id, { status: "done", url }));
        })
        .catch((error: unknown) => {
          const message = error instanceof Error ? error.message : "Kohereza byanze.";
          onChange((prev) => updateItem(prev, item.id, { status: "error", error: message }));
        });
    });

    if (inputRef.current) inputRef.current.value = "";
  }

  function updateItem(
    list: UploadedMedia[],
    id: string,
    patch: Partial<UploadedMedia>,
  ): UploadedMedia[] {
    return list.map((entry) => (entry.id === id ? { ...entry, ...patch } : entry));
  }

  function removeItem(id: string) {
    onChange(media.filter((entry) => entry.id !== id));
  }

  return (
    <div className="space-y-3">
      <label
        htmlFor={id}
        className="flex min-h-24 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[var(--stroke-sub-300)] bg-[var(--bg-weak-50)] px-4 py-6 text-center transition hover:bg-[var(--bg-soft-100)]"
      >
        <RiUploadCloud2Line className="size-6 text-[var(--primary-base)]" />
        <span className="text-sm font-semibold text-[var(--text-strong-950)]">Kanda hano wongereho amafoto cyangwa videwo</span>
        <span className="text-xs text-[var(--text-soft-400)]">JPG, PNG, WEBP, GIF, MP4, MOV, WEBM — ntirenze 20MB kuri buri dosiye</span>
      </label>
      <input
        ref={inputRef}
        id={id}
        type="file"
        multiple
        accept={ALLOWED_UPLOAD_TYPES.join(",")}
        className="sr-only"
        onChange={(event) => handleFiles(event.target.files)}
      />

      {media.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {media.map((item) => (
            <div key={item.id} className="relative overflow-hidden rounded-2xl border border-[var(--stroke-soft-200)] bg-white">
              <div className="relative aspect-square w-full bg-[var(--bg-weak-50)]">
                {item.previewUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element -- local object URL preview, not an optimizable remote image
                  <img src={item.previewUrl} alt={item.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <RiFileVideoLine className="size-8 text-[var(--text-soft-400)]" />
                  </div>
                )}
                {item.status === "uploading" ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-xs font-semibold text-white">
                    Kohereza...
                  </div>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                aria-label={`Kuraho ${item.name}`}
                className="absolute right-1.5 top-1.5 inline-flex size-7 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
              >
                <RiCloseLine className="size-4" />
              </button>
              {item.status === "error" ? (
                <p className="px-2 py-1 text-xs text-[var(--danger)]">{item.error}</p>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}

      <Button type="button" size="small" variant="neutral" mode="stroke" onClick={() => inputRef.current?.click()}>
        Ongeraho amafoto
      </Button>
    </div>
  );
}
