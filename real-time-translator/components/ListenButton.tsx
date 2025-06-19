export default function ListenButton({ onClick, status }: { onClick: () => void, status: string }) {
  const text = {
    idle: 'Listen',
    listening: 'Listening...',
    processing: 'Translating...',
    speaking: 'Speaking...'
  }[status]

  return (
    <button
      onClick={onClick}
      disabled={status !== 'idle'}
      className="bg-blue-600 text-white px-6 py-3 rounded text-lg disabled:bg-gray-400"
    >
      {text}
    </button>
  )
}
