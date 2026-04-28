import { appendFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import type { LeadData } from "./validation";

export type StoredLead = LeadData & {
  createdAt: string;
  source: "grandauto-landing";
};

export function getLeadsFilePath(): string {
  return process.env.LEADS_FILE_PATH ?? join(process.cwd(), "data", "leads.jsonl");
}

export async function saveLead(lead: LeadData): Promise<StoredLead> {
  const storedLead: StoredLead = {
    ...lead,
    createdAt: new Date().toISOString(),
    source: "grandauto-landing"
  };
  const filePath = getLeadsFilePath();

  await mkdir(dirname(filePath), { recursive: true });
  await appendFile(filePath, `${JSON.stringify(storedLead)}\n`, "utf8");

  return storedLead;
}
