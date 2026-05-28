// POST /api/coach-application
// Receives the coach application form, emails it to David via Resend.
// Env: RESEND_API_KEY  (set in Vercel project settings)

const TO = ["david@vitality.training"];
const FROM = "Vitality Coaches <coaches@vitality.training>";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, c => (
    { "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]
  ));
}

function row(label, value) {
  if (value === undefined || value === null || value === "") return "";
  const v = Array.isArray(value) ? value.join(", ") : value;
  return `<tr><td style="padding:8px 14px;border-bottom:1px solid #eee;color:#666;font:13px/1.4 -apple-system,sans-serif;width:160px;vertical-align:top">${escapeHtml(label)}</td>` +
         `<td style="padding:8px 14px;border-bottom:1px solid #eee;color:#111;font:14px/1.5 -apple-system,sans-serif">${escapeHtml(v)}</td></tr>`;
}

export default async function handler(req, res) {
  // CORS preflight
  if (req.method === "OPTIONS") {
    Object.entries(corsHeaders()).forEach(([k, v]) => res.setHeader(k, v));
    return res.status(204).end();
  }
  Object.entries(corsHeaders()).forEach(([k, v]) => res.setHeader(k, v));

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY not set");
    return res.status(500).json({ error: "Server email not configured" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  body = body || {};

  // Required-field guard (light — the HTML form already validates client-side)
  const required = ["name", "email", "location"];
  for (const k of required) {
    if (!body[k] || String(body[k]).trim() === "") {
      return res.status(400).json({ error: `Missing required field: ${k}` });
    }
  }

  const fields = [
    ["Name", body.name],
    ["Email", body.email],
    ["Phone", body.phone],
    ["Based", body.location],
    ["Link", body.link],
    ["Specialty", body.specialty],
    ["Years of experience", body.experience],
    ["Credentials", body.credentials],
    ["Philosophy", body.philosophy],
    ["Open to group coaching", body.group_coaching],
    ["Uses delivery platform", body.uses_platform],
    ["Which platform", body.platform_name],
    ["Availability", body.availability],
    ["Notes", body.notes],
  ];

  const tableRows = fields.map(([l, v]) => row(l, v)).join("");
  const html = `
    <div style="font:14px/1.5 -apple-system,Helvetica,Arial,sans-serif;color:#111;max-width:640px">
      <h2 style="font:600 18px/1.3 -apple-system,Helvetica,Arial,sans-serif;margin:0 0 16px">New coach application</h2>
      <p style="color:#666;margin:0 0 18px">Submitted via vitality.training/coaches</p>
      <table cellspacing="0" cellpadding="0" style="border-collapse:collapse;border-top:1px solid #eee;width:100%">
        ${tableRows}
      </table>
    </div>
  `.trim();

  const text = fields
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([l, v]) => `${l}: ${Array.isArray(v) ? v.join(", ") : v}`)
    .join("\n");

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: TO,
        reply_to: body.email,
        subject: `New coach application — ${body.name}`,
        html,
        text,
      }),
    });
    if (!r.ok) {
      const detail = await r.text();
      console.error("Resend error:", r.status, detail);
      return res.status(502).json({ error: "Email send failed" });
    }
  } catch (err) {
    console.error("Resend request failed:", err);
    return res.status(502).json({ error: "Email send failed" });
  }

  return res.status(200).json({ ok: true });
}
