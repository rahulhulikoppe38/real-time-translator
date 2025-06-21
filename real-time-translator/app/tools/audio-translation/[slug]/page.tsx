/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import LanguageSelector from '@/components/LanguageSelector'
import ListenButton from '@/components/ListenButton'
import PlaybackControls from '@/components/PlaybackControls'
import StatusIndicator from '@/components/StatusIndicator'
import { translateText } from '@/lib/translator'
import { speak } from '@/utils/speech'
import { useParams, useRouter } from 'next/navigation'

// Language map
const languages = [
  { code: 'en', name: 'english' },
  { code: 'hi', name: 'hindi' },
  { code: 'es', name: 'spanish' },
  { code: 'fr', name: 'french' },
  { code: 'de', name: 'german' },
  { code: 'pt', name: 'portuguese' },
  { code: 'it', name: 'italian' },
  { code: 'ru', name: 'russian' },
  { code: 'zh', name: 'chinese' },
  { code: 'ja', name: 'japanese' },
  { code: 'ko', name: 'korean' },
  { code: 'ar', name: 'arabic' },
  { code: 'tr', name: 'turkish' },
  { code: 'bn', name: 'bengali' },
  { code: 'nl', name: 'dutch' },
  { code: 'pl', name: 'polish' },
  { code: 'sv', name: 'swedish' },
  { code: 'uk', name: 'ukrainian' },
  { code: 'id', name: 'indonesian' },
  { code: 'th', name: 'thai' },
]

// Helpers
const getCodeFromName = (name: string) =>
  languages.find(lang => lang.name === name.toLowerCase())?.code || name

const getNameFromCode = (code: string) =>
  languages.find(lang => lang.code === code)?.name || code

export default function Home() {
  const router = useRouter()
  const { slug } = useParams()
  const [sourceLang, setSourceLang] = useState('en')
  const [targetLang, setTargetLang] = useState('hi')

  const [status, setStatus] = useState<'idle' | 'listening' | 'processing' | 'speaking'>('idle')
  const [volume, setVolume] = useState(1)
  const [rate, setRate] = useState(1)

  // Convert name-from-URL to code on mount
  useEffect(() => {
    if (slug && typeof slug === 'string' && slug.includes('-to-')) {
      const [fromName, toName] = slug.split('-to-')
      setSourceLang(getCodeFromName(fromName))
      setTargetLang(getCodeFromName(toName))
    }
  }, [slug])

  // Update URL using names
  const updateRoute = (fromCode: string, toCode: string) => {
    const fromName = getNameFromCode(fromCode)
    const toName = getNameFromCode(toCode)
    router.push(`/tools/audio-translation/${fromName}-to-${toName}`)
  }

  const handleSourceChange = (lang: string) => {
    setSourceLang(lang)
    updateRoute(lang, targetLang)
  }

  const handleTargetChange = (lang: string) => {
    setTargetLang(lang)
    updateRoute(sourceLang, lang)
  }

  const handleListen = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        stream.getTracks().forEach((track) => track.stop())
      })

      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

      if (!SpeechRecognition) {
        alert('❌ Your browser does not support Speech Recognition.')
        return
      }

      const recognition = new SpeechRecognition()
      recognition.lang = sourceLang
      recognition.interimResults = false
      recognition.maxAlternatives = 1

      setStatus('listening')
      console.log('🎤 Listening...')

      recognition.onresult = async (event: SpeechRecognitionEvent) => {
        const text = event.results[0][0].transcript
        console.log('📝 Recognized:', text)
        setStatus('processing')

        try {
          const translated = await translateText(text, sourceLang, targetLang)
          console.log('🌐 Translated:', translated)
          setStatus('speaking')
          speak(translated, targetLang, volume, rate)
        } catch (err) {
          console.error('❌ Translation failed:', err)
        } finally {
          setStatus('idle')
        }
      }

      recognition.onerror = (event: any) => {
        console.error('❌ Recognition error:', event.error)
        alert('Speech recognition error: ' + event.error)
        setStatus('idle')
      }

      recognition.onend = () => {
        console.log('🔚 Recognition ended')
        if (status !== 'speaking') setStatus('idle')
      }

      recognition.start()
    } catch (error) {
      console.error('🎙️ Microphone access failed:', error)
      alert('Microphone access denied or not available.')
      setStatus('idle')
    }
  }

  return (
    <main className="p-6 max-w-2xl mx-auto space-y-6 text-center">
      <h1 className="text-3xl font-bold">Real-Time Translator</h1>
      <h2 className="text-lg font-medium">
        Translate: {getNameFromCode(sourceLang)} to {getNameFromCode(targetLang)}
      </h2>

      <div className="flex justify-center gap-4">
        <LanguageSelector label="From" lang={sourceLang} onChange={handleSourceChange} />
        <LanguageSelector label="To" lang={targetLang} onChange={handleTargetChange} />
      </div>

      <ListenButton onClick={handleListen} status={status} />
      <PlaybackControls volume={volume} setVolume={setVolume} rate={rate} setRate={setRate} />
      <StatusIndicator status={status} />
    </main>
  )
}


