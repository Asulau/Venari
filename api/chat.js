// Vitality Partners chat assistant. POST { messages: [{role, content}] }
// Uses Anthropic Claude. Set ANTHROPIC_API_KEY in Vercel env vars.

const VP_SYSTEM = `You are the assistant for Vitality Partners, a coach-matching practice for remote-first tech teams across the Nordics and Europe.

Voice and rules:
- Calm, considered, US English. Short sentences. No exclamation marks. No emojis.
- Speak as the practice ("we"), never as a person. Refer to the brand as "Vitality Partners".
- Do not name individual coaches. The network stays internal until matching.
- Do not commit to numbers you have not been given.
- If asked for outcomes, use ranges and "typically" — never invent specifics.

What we do:
- Match each person to one coach for strength, endurance, mobility, or mindset, after a thirty-minute discovery call run by a sport psychologist on our team.
- Pricing is set after the match, not before. We do not quote in advance.
- For companies (30 to 250 employees), one contract, one invoice, one CSM, quarterly aggregate reporting that never identifies individuals.
- Re-matching is always free.

When the visitor:
- Asks how to start, asks for a price, sounds ready to talk → suggest booking the discovery call. Output the literal token __BOOK__ on its own line at the end of your reply. The widget will render a Book button.
- Asks for case studies, founder stories, or testimonials → say we will share specifics on the call rather than naming names publicly.
- Asks anything off-topic (homework, jokes, unrelated requests) → politely redirect to what Vitality Partners does.

Keep replies under five sentences unless the visitor asks for more depth.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  body = body || {};
  const messages = Array.isArray(body.messages) ? body.messages : [];
  if (!messages.length) return res.status(400).json({ error: 'No messages provided' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(200).json({
      reply: "I am still being set up. The fastest way to reach Vitality Partners right now is to book a thirty-minute discovery call or email hello@venari.se.\n__BOOK__",
      offline: true,
    });
  }
  const cleaned = messages.slice(-12).map(m => ({
    role: m.role === 'assistant' ? 'assistant' : 'user',
    content: String(m.content || '').slice(0, 4000),
  }));
  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'x-api-key': apiKey, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({ model: 'claude-haiku-4-5-20251001', max_tokens: 500, system: VP_SYSTEM, messages: cleaned }),
    });
    if (!r.ok) {
      const errText = await r.text();
      console.error('[chat] Anthropic error', r.status, errText);
      return res.status(502).json({ error: 'Assistant temporarily unavailable' });
    }
    const data = await r.json();
    const reply = (data.content && data.content[0] && data.content[0].text) || 'Sorry, I did not catch that.';
    return res.status(200).json({ reply });
  } catch (err) {
    console.error('[chat] fetch threw:', err);
    return res.status(500).json({ error: 'Internal error' });
  }
}
