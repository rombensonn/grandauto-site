import { NextResponse } from "next/server";
import { saveLead } from "@/lib/leads-store";
import { sendTelegramLead } from "@/lib/telegram";
import { validateLeadInput } from "@/lib/validation";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Некорректный JSON" }, { status: 400 });
  }

  const validation = validateLeadInput(payload && typeof payload === "object" ? payload : {});

  if (!validation.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: "Проверьте поля формы",
        fieldErrors: validation.fieldErrors
      },
      { status: 400 }
    );
  }

  try {
    const storedLead = await saveLead(validation.data);

    try {
      await sendTelegramLead(storedLead);
    } catch (error) {
      console.error("Telegram lead notification failed:", error);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Lead saving failed:", error);
    return NextResponse.json(
      { ok: false, error: "Не удалось сохранить заявку. Позвоните в сервис." },
      { status: 500 }
    );
  }
}
