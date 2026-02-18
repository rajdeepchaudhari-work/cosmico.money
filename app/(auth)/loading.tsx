import Image from 'next/image'

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center gap-4 flex-col">
      <Image
        src="/icons/lazyload.gif"
        alt="Loading..."
        width={80}
        height={80}
        unoptimized
      />
      <p className="text-sm text-gray-400 animate-pulse">Just a moment…</p>
    </div>
  )
}
