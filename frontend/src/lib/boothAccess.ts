import type { UserBooth } from "@/components/dashboard/user/types";

export type BoothLookupMode = "scan" | "id";

export function resolveBoothByCredential(
  rawCredential: string,
  boothList: UserBooth[],
  mode: BoothLookupMode
): UserBooth | null {
  const credential = rawCredential.trim();
  if (!credential) return null;

  const parsedId = Number.parseInt(credential, 10);
  if (!Number.isNaN(parsedId)) {
    const byId = boothList.find((booth) => booth.id === parsedId) ?? null;
    if (byId || mode === "id") return byId;
  }

  if (mode === "id") {
    return null;
  }

  const normalized = credential.toLowerCase();
  return (
    boothList.find(
      (booth) =>
        normalized.includes(booth.locationName.toLowerCase()) ||
        normalized.includes(booth.name.toLowerCase())
    ) ?? null
  );
}
