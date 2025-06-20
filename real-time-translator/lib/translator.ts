export async function translateText(text: string, from: string, to: string): Promise<string> {
  const response = await fetch('/api/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, from, to }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error('Translation failed: ' + error);
  }

  const data = await response.json();
  return data.translatedText;
}


