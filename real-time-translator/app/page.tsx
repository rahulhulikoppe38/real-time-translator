'use client'
import { useEffect, useState } from 'react'
import LanguageSelector from '@/components/LanguageSelector'
import ListenButton from '@/components/ListenButton'
import PlaybackControls from '@/components/PlaybackControls'
import StatusIndicator from '@/components/StatusIndicator'
import { translateText } from '@/lib/translator'
import { speak } from '@/utils/speech'

export default function Home() {
  // const [sourceLang, setSourceLang] = useState('en-US')
  // const [targetLang, setTargetLang] = useState('hi-IN')
  const [sourceLang, setSourceLang] = useState('en')
const [targetLang, setTargetLang] = useState('hi')

  const [status, setStatus] = useState<'idle' | 'listening' | 'processing' | 'speaking'>('idle')
  const [volume, setVolume] = useState(1)
  const [rate, setRate] = useState(1)

  const handleListen = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true }) // ✅ Force mic permission

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser.')
      return
    }

    console.log("🟢 Starting recognition...")
    setStatus('listening')

    const recognition = new SpeechRecognition()
    recognition.lang = sourceLang
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onstart = () => console.log("🎤 Listening...")
    recognition.onresult = async (event: SpeechRecognitionEvent) => {
      const text = event.results[0][0].transcript
      console.log("📝 Recognized text:", text)
      setStatus('processing')

      try {
        const translated = await translateText(text, sourceLang, targetLang)
        console.log("🌐 Translated text:", translated)
        setStatus('speaking')
        speak(translated, targetLang, volume, rate)
      } catch (err) {
        console.error("Translation error:", err)
      } finally {
        setStatus('idle')
      }
    }

    recognition.onerror = (event) => {
      console.error("❌ Speech recognition error:", event.error)
      setStatus('idle')
    }

    recognition.onend = () => {
      console.log("🔚 Recognition ended")
      if (status !== 'speaking') setStatus('idle')
    }

    recognition.start()
  } catch (error) {
    console.error("🎙️ Microphone access failed:", error)
    alert('Microphone access denied or not available.')
    setStatus('idle')
  }
}



  return (
    <main className="p-6 max-w-2xl mx-auto space-y-6 text-center">
      <h1 className="text-3xl font-bold">Real-Time Translator</h1>
      <div className="flex justify-center gap-4">
        <LanguageSelector label="From" lang={sourceLang} onChange={setSourceLang} />
        <LanguageSelector label="To" lang={targetLang} onChange={setTargetLang} />
      </div>
      <ListenButton onClick={handleListen} status={status} />
      <PlaybackControls volume={volume} setVolume={setVolume} rate={rate} setRate={setRate} />
      <StatusIndicator status={status} />
    </main>
  )
}
