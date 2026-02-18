import Image from 'next/image'

export default function Loading() {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-4">
      <Image
        src="/icons/lazyload.gif"
        alt="Loading..."
        width={80}
        height={80}
        unoptimized
      />
      <p className="text-sm text-gray-400 animate-pulse">Loading your account…</p>
    </div>
  )
}
