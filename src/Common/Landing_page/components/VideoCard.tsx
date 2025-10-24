'use client'

import ShortVideo from './ShortVideo'
import ButtonRow from './ButtonRow'

interface VideoCardProps {
  videoOffsetY?: string
  videoOffsetX?: string
  buttonsOffsetY?: string
  buttonsOffsetX?: string
}

export default function VideoCard({
  videoOffsetY = "0",
  videoOffsetX = "0",
  buttonsOffsetY = "-165px",
  buttonsOffsetX = "35px",
}: VideoCardProps) {
  return (
    <div className="flex flex-col items-center justify-center relative">
      <div
        className={`relative`}
        style={{
          top: videoOffsetY,
          left: videoOffsetX,
        }}
      >
        <ShortVideo />
      </div>
      <div
        className="w-full relative"
        style={{
          top: buttonsOffsetY,
          left: buttonsOffsetX,
        }}
      >
        <ButtonRow />
      </div>
    </div>
  )
}
