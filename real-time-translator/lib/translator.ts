// export async function translateText(text: string, from: string, to: string) {
//   // For now, use a dummy implementation
//   // Replace with Google Translate API or similar
//   return `Translated (${to}): ${text}`
// }


export async function translateText(text: string, from: string, to: string): Promise<string> {
  const url = 'https://libretranslate.com/translate'

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      q: text,
      source: from,
      target: to,
      format: 'text',
    }),
  })

  if (!response.ok) {
    throw new Error('Translation failed')
  }

  const data = await response.json()
  return data.translatedText
}
