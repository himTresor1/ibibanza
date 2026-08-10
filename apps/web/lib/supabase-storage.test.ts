import { describe, expect, it } from "vitest";
import { validateUploadFile } from "./supabase-storage";

function makeFile(name: string, type: string, size: number) {
  const file = new File([new Uint8Array(size)], name, { type });
  return file;
}

describe("validateUploadFile", () => {
  it("accepts a small JPEG", () => {
    expect(validateUploadFile(makeFile("plot.jpg", "image/jpeg", 1024))).toBeNull();
  });

  it("accepts a small MP4 video", () => {
    expect(validateUploadFile(makeFile("plot.mp4", "video/mp4", 1024))).toBeNull();
  });

  it("rejects an unsupported file type", () => {
    expect(validateUploadFile(makeFile("plot.pdf", "application/pdf", 1024))).not.toBeNull();
  });

  it("rejects a file over 20MB", () => {
    expect(validateUploadFile(makeFile("plot.jpg", "image/jpeg", 21 * 1024 * 1024))).not.toBeNull();
  });
});
