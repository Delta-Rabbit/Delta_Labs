'use client'

export default function ShortVideo() {
  const videoSrc = "/assets/videos/video1.mp4"

  const videoWidth = 500
  const videoHeight = 340

  return (
    <div className="flex-1 h-screen flex items-center justify-center p-6">
      <div
        className="relative w-full"
        style={{ width: `${videoWidth}px`, height: `${videoHeight}px` }}
      >
        <div className="relative w-full h-full overflow-hidden rounded-t-xl bg-black">
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}
