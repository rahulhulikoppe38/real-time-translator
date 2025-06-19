export default function StatusIndicator({ status }: { status: string }) {
  return <p className="text-sm text-gray-600">Status: <strong>{status}</strong></p>
}
