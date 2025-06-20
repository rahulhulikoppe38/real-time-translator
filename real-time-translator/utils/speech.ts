export function speak(text: string, lang: string, volume: number, rate: number) {
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = lang
  utterance.volume = volume
  utterance.rate = rate

  const voices = speechSynthesis.getVoices()
  const matchedVoice = voices.find(v => v.lang.startsWith(lang))
  if (matchedVoice) utterance.voice = matchedVoice

  speechSynthesis.speak(utterance)
}
