'use client'

import ShortVideo from './ShortVideo'
import ButtonRowWithIcon from './ButtonRowWithIcon'
import VideoInfo from './VideoInfo'

interface VideoCardProps {
  videoOffsetY?: string
  videoOffsetX?: string
  buttonsOffsetY?: string
  buttonsOffsetX?: string
  infoOffsetY?: string
  infoOffsetX?: string
}

export default function VideoCard({
  videoOffsetY = "58px",
  videoOffsetX = "0px",
  buttonsOffsetY = "-105px",
  buttonsOffsetX = "35px",
  infoOffsetY = "-130px",
  infoOffsetX = "0px",
}: VideoCardProps) {
  return (
    <div className="flex flex-col items-center justify-center relative h-full">
      <div
        className="relative"
        style={{
          top: videoOffsetY,
          left: videoOffsetX,
        }}
      >
        <ShortVideo />
      </div>

      <div
        className="relative"
        style={{
          top: buttonsOffsetY,
          left: buttonsOffsetX,
        }}
      >
        <ButtonRowWithIcon />
      </div>

      <div
        className="relative"
        style={{
          top: infoOffsetY,
          left: infoOffsetX,
        }}
      >
        <VideoInfo
          profilePic="/assets/images/profile.jpg"
          name="Abebe Kebede"
          description="Explore Newton's First Law: Objects stay still or move at constant speed unless a force acts on them."
          hashtags={['#Physics #Newton’s First Law ']}
        />
      </div>
    </div>
  )
}
