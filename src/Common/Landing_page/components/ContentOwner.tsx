'use client'

import VideoDetails from './VideoDetails'
import FollowButton from './FollowButton'

interface VideoInfoProps {
  profilePic: string
  name: string
  description: string
  hashtags: string[]
}

export default function VideoInfo({
  profilePic,
  name,
  description,
  hashtags,
}: VideoInfoProps) {
  return (
    <div className="relative w-full max-w-[500px] p-4 z-20">
      <div className="flex-1 min-w-0">
        <VideoDetails
          profilePic={profilePic}
          name={name}
          description={description}
          hashtags={hashtags}
        />
      </div>

      <div className="absolute top-5 right-2">
        <FollowButton />
      </div>
    </div>
  )
}
