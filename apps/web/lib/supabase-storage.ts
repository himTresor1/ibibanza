import { createClient } from "@supabase/supabase-js";

const PLOT_PHOTOS_BUCKET = "plot-photos";
export const MAX_UPLOAD_BYTES = 20 * 1024 * 1024;
export const ALLOWED_UPLOAD_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "video/mp4",
  "video/quicktime",
  "video/webm",
];

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error("Supabase storage is not configured.");
  }
  return createClient(url, anonKey);
}

export interface UploadValidationError {
  file: File;
  reason: string;
}

export function validateUploadFile(file: File): string | null {
  if (!ALLOWED_UPLOAD_TYPES.includes(file.type)) {
    return "Ubu bwoko bw'idosiye ntibwemewe. Koresha ifoto (JPG, PNG, WEBP, GIF) cyangwa video (MP4, MOV, WEBM).";
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return "Idosiye ni nini cyane. Ntirenze 20MB.";
  }
  return null;
}

function randomId() {
  return Math.random().toString(36).slice(2, 10);
}

export async function uploadPlotMedia(file: File): Promise<string> {
  const supabase = getSupabaseClient();
  const extension = file.name.includes(".") ? file.name.split(".").pop() : "bin";
  const path = `submissions/${Date.now()}-${randomId()}.${extension}`;

  const { error } = await supabase.storage.from(PLOT_PHOTOS_BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type,
  });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage.from(PLOT_PHOTOS_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
