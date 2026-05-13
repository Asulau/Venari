// Vitality contact form — Cloudflare Pages Function.
// Uses Resend (https://resend.com) to send the email.
// Set RESEND_API_KEY and CONTACT_TO_EMAIL in Pages env vars.

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export async function onRequestPost({ request, env }) {
  let body;
  try { body = await request.json(); } catch { body = {}; }

  const name    = String(body.name    || '').trim().slice(0, 200);
  const company = String(body.company || '').trim().slice(0, 200);
  const size    = String(body.size    || '').trim().slice(0,  80);
  const msg     = String(body.msg     || '').trim().slice(0, 5000);
  const email   = String(body.email   || '').trim().slice(0, 200);

  // honeypot — silently accept and discard
  if (body.website) return json({ ok: true, sent: false });

  if (!name && !company && !msg) {
    return json({ error: 'Missing required fields' }, 400);
  }

  const apiKey   = env.RESEND_API_KEY;
  const toEmail  = env.CONTACT_TO_EMAIL   || 'David@vitality.training';
  const fromEmail = env.CONTACT_FROM_EMAIL || 'Vitality <onboarding@resend.dev>';

  if (!apiKey) {
    console.warn('[contact] RESEND_API_KEY missing');
    return json({ ok: true, sent: false, note: 'Email service not configured.' });
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
    '— sent from vitality.training contact form',
  ].join('\n');

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject,
        text,
        reply_to: email || undefined,
      }),
    });

    if (!r.ok) {
      const t = await r.text();
      console.error('[contact] resend error', r.status, t.slice(0, 300));
      return json({ ok: false, sent: false, error: 'Email delivery failed' }, 502);
    }

    return json({ ok: true, sent: true });
  } catch (e) {
    console.error('[contact] error', e);
    return json({ ok: false, sent: false, error: 'Network error' }, 502);
  }
}

export async function onRequest({ request }) {
  return json({ error: 'Method not allowed' }, 405);
}
