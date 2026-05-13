// Vitality chat assistant — Cloudflare Pages Function.
// POST { messages: [{role, content}] }
// Uses Anthropic Claude. Set ANTHROPIC_API_KEY in Pages env vars.

const VP_SYSTEM = `You are the assistant for Vitality, a coach-matching practice for remote-first tech teams across the Nordics and Europe.

Voice and rules:
- Calm, considered, US English. Short sentences. No exclamation marks. No emojis.
- Speak as the practice ("we"), never as a person. Refer to the brand as "Vitality".
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
- Asks anything off-topic (homework, jokes, unrelated requests) → politely redirect to what Vitality does.

Keep replies under five sentences unless the visitor asks for more depth.`;

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export async function onRequestPost({ request, env }) {
  let body;
  try { body = await request.json(); } catch { body = {}; }
  const messages = Array.isArray(body.messages) ? body.messages : [];
  if (!messages.length) return json({ error: 'No messages provided' }, 400);

  const apiKey = env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return json({
      reply: "I am still being set up. The fastest way to reach Vitality right now is to book a thirty-minute discovery call or email David@vitality.training.\n__BOOK__",
      offline: true,
    });
  }

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 600,
        system: VP_SYSTEM,
        messages: messages.map(m => ({
          role: m.role === 'assistant' ? 'assistant' : 'user',
          content: String(m.content || '').slice(0, 4000),
        })),
      }),
    });

    if (!r.ok) {
      const t = await r.text();
      console.error('[chat] upstream', r.status, t.slice(0, 300));
      return json({
        reply: "I am offline right now. Email David@vitality.training or book a discovery call.\n__BOOK__",
        offline: true,
      });
    }

    const data = await r.json();
    const reply = (data?.content?.[0]?.text || '').trim() ||
      "I did not catch that. Try asking again, or book a call directly.";
    return json({ reply });
  } catch (e) {
    console.error('[chat] error', e);
    return json({
      reply: "Connection trouble. Please try again, email David@vitality.training, or book a call.\n__BOOK__",
      offline: true,
    });
  }
}

// Method-not-allowed for non-POST
export async function onRequest({ request }) {
  return json({ error: 'Method not allowed' }, 405);
}
