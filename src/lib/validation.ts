export type LeadInput = {
  name?: unknown;
  phone?: unknown;
  vehicle?: unknown;
  problem?: unknown;
  preferredTime?: unknown;
  personalDataConsent?: unknown;
};

export type LeadData = {
  name: string;
  phone: string;
  vehicle: string;
  problem: string;
  preferredTime: string;
  personalDataConsent: boolean;
};

export type LeadFieldErrors = Partial<Record<keyof LeadData, string>>;

export type LeadValidationResult =
  | { ok: true; data: LeadData }
  | { ok: false; fieldErrors: LeadFieldErrors };

const MAX_LENGTHS: Record<keyof LeadData, number> = {
  name: 80,
  phone: 40,
  vehicle: 120,
  problem: 1000,
  preferredTime: 120,
  personalDataConsent: 0
};

function asCleanString(value: unknown): string {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";
}

function hasValidPhoneShape(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

export function validateLeadInput(input: LeadInput): LeadValidationResult {
  const data: LeadData = {
    name: asCleanString(input.name),
    phone: asCleanString(input.phone),
    vehicle: asCleanString(input.vehicle),
    problem: asCleanString(input.problem),
    preferredTime: asCleanString(input.preferredTime),
    personalDataConsent: input.personalDataConsent === true
  };

  const fieldErrors: LeadFieldErrors = {};

  if (!data.name) {
    fieldErrors.name = "Укажите имя";
  } else if (data.name.length > MAX_LENGTHS.name) {
    fieldErrors.name = "Имя слишком длинное";
  }

  if (!data.phone) {
    fieldErrors.phone = "Укажите телефон";
  } else if (!hasValidPhoneShape(data.phone)) {
    fieldErrors.phone = "Укажите корректный телефон";
  } else if (data.phone.length > MAX_LENGTHS.phone) {
    fieldErrors.phone = "Телефон слишком длинный";
  }

  if (data.vehicle.length > MAX_LENGTHS.vehicle) {
    fieldErrors.vehicle = "Марка и модель слишком длинные";
  }

  if (!data.problem) {
    fieldErrors.problem = "Опишите задачу или проблему";
  } else if (data.problem.length > MAX_LENGTHS.problem) {
    fieldErrors.problem = "Описание слишком длинное";
  }

  if (data.preferredTime.length > MAX_LENGTHS.preferredTime) {
    fieldErrors.preferredTime = "Время слишком длинное";
  }

  if (!data.personalDataConsent) {
    fieldErrors.personalDataConsent = "Подтвердите согласие на обработку персональных данных";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  return { ok: true, data };
}
