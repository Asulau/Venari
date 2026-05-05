// Contact form submission handler.
// Uses Resend (https://resend.com) to send the email to the inbox.
// Set RESEND_API_KEY and CONTACT_TO_EMAIL in Vercel project env vars.
// Falls back to a friendly 200 response if env vars are missing so the
// form still gives the visitor a positive UX while it's being set up.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let body = req.body;
  // Vercel parses JSON automatically when content-type is application/json
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  body = body || {};

  const name = (body.name || '').toString().trim().slice(0, 200);
  const company = (body.company || '').toString().trim().slice(0, 200);
  const size = (body.size || '').toString().trim().slice(0, 80);
  const msg = (body.msg || '').toString().trim().slice(0, 5000);
  const email = (body.email || '').toString().trim().slice(0, 200);

  // Honeypot anti-spam
  if (body.website) {
    return res.status(200).json({ ok: true, sent: false });
  }
  if (!name && !company && !msg) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || 'hello@venari.se';
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'Vitalis <onboarding@resend.dev>';

  if (!apiKey) {
    console.warn('[contact] RESEND_API_KEY missing — submission accepted but not delivered');
    return res.status(200).json({
      ok: true,
      sent: false,
      note: 'Email service not configured. Submission logged.'
    });
  }

  const subject = `New enquiry — ${company || name || 'unknown'}`;
  const text = [
    `Name: ${name || '(not given)'}`,
    `Company: ${company || '(not given)'}`,
    `Group size: ${size || '(not given)'}`,
    `Email: ${email || '(not given)'}`,
    '',
    'Message:',
    msg || '(no message)',
    '',
    '— Sent from vitalis.se contact form',
  ].join('\n');

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email || undefined,
        subject,
        text,
      }),
    });
    if (!r.ok) {
      const errText = await r.text();
      console.error('[contact] Resend error:', r.status, errText);
      return res.status(502).json({ error: 'Email service error', details: errText });
    }
    return res.status(200).json({ ok: true, sent: true });
  } catch (err) {
    console.error('[contact] fetch threw:', err);
    return res.status(500).json({ error: 'Internal error' });
  }
}
