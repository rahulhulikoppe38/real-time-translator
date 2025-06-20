// app/api/translate/route.ts
export async function POST(req: Request) {
  const { text, from, to } = await req.json();

  const res = await fetch('http://127.0.0.1:5000/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      q: text,
      source: from,
      target: to,
      format: 'text',
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    return new Response(error, { status: 500 });
  }

  const data = await res.json();
  return new Response(JSON.stringify({ translatedText: data.translatedText }));
}
