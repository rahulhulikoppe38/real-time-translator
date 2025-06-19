export default function PlaybackControls({ volume, setVolume, rate, setRate }: any) {
  return (
    <div className="flex justify-center gap-8">
      <div>
        <label className="block text-sm">Volume</label>
        <input type="range" min="0" max="1" step="0.1" value={volume} onChange={(e) => setVolume(Number(e.target.value))} />
      </div>
      <div>
        <label className="block text-sm">Speed</label>
        <input type="range" min="0.5" max="2" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
      </div>
    </div>
  )
}
