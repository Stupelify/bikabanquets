import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface Enquiry {
  name?: string;
  phone?: string;
  event_type?: string;
  event_date?: string;
  guests?: string;
  venue?: string;
  message?: string;
  company?: string; // honeypot
}

const esc = (s: string) =>
  s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] as string));

export async function POST(req: Request) {
  let data: Enquiry;
  try {
    data = (await req.json()) as Enquiry;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: a real user never fills this. Accept silently so bots think they won.
  if (data.company) return NextResponse.json({ ok: true });

  const name = (data.name ?? "").trim();
  const phone = (data.phone ?? "").trim();
  if (!name || !phone) {
    return NextResponse.json({ error: "Name and phone are required." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL || "contact@bikabanquets.com";
  // Until a domain is verified in Resend, onboarding@resend.dev works for testing.
  const from = process.env.ENQUIRY_FROM_EMAIL || "Bika Banquets <onboarding@resend.dev>";

  if (!apiKey) {
    return NextResponse.json(
      { error: "Email isn't set up yet." },
      { status: 503 },
    );
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Phone", phone],
    ["Event type", data.event_type || "—"],
    ["Event date", data.event_date || "—"],
    ["Guests", data.guests || "—"],
    ["Preferred venue", data.venue || "—"],
    ["Details", data.message || "—"],
  ];

  const html = `<h2 style="font-family:Georgia,serif">New website enquiry</h2>
<table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">
${rows
  .map(
    ([k, v]) =>
      `<tr><td style="padding:6px 14px 6px 0;color:#6B6358;vertical-align:top"><strong>${esc(k)}</strong></td><td style="padding:6px 0">${esc(v)}</td></tr>`,
  )
  .join("\n")}
</table>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `New enquiry — ${name}${data.event_type ? ` (${data.event_type})` : ""}`,
        html,
        text,
      }),
    });
    if (!res.ok) {
      console.error("Resend error", res.status, await res.text().catch(() => ""));
      return NextResponse.json(
        { error: "Could not send your enquiry." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Enquiry send failed", e);
    return NextResponse.json({ error: "Could not send your enquiry." }, { status: 502 });
  }
}
