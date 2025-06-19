// type Props = {
//   label: string
//   lang: string
//   onChange: (val: string) => void
// }

// const languages = [
//   { code: 'en-US', name: 'English (US)' },
//   { code: 'hi-IN', name: 'Hindi' },
//   { code: 'es-ES', name: 'Spanish' },
//   { code: 'fr-FR', name: 'French' },
//   { code: 'zh-CN', name: 'Chinese' },
// ]

// export default function LanguageSelector({ label, lang, onChange }: Props) {
//   return (
//     <div>
//       <label className="block text-sm">{label}</label>
//       <select value={lang} onChange={(e) => onChange(e.target.value)} className="border rounded p-2">
//         {languages.map((l) => (
//           <option key={l.code} value={l.code}>{l.name}</option>
//         ))}
//       </select>
//     </div>
//   )
// }

type Props = {
  label: string
  lang: string
  onChange: (val: string) => void
}

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ar', name: 'Arabic' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ru', name: 'Russian' },
  { code: 'it', name: 'Italian' },
]

export default function LanguageSelector({ label, lang, onChange }: Props) {
  return (
    <div>
      <label className="block text-sm">{label}</label>
      <select value={lang} onChange={(e) => onChange(e.target.value)} className="border rounded p-2">
        {languages.map((l) => (
          <option key={l.code} value={l.code}>{l.name}</option>
        ))}
      </select>
    </div>
  )
}

