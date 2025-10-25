'use client'

interface VideoDetailsProps {
  profilePic: string
  name: string
  description: string
  hashtags: string[]
}

export default function VideoDetails({
  profilePic,
  name,
  description,
  hashtags,
}: VideoDetailsProps) {
  return (
    <div className="flex items-start gap-4 p-4 w-full max-w-[500px]">
      <div className="flex-shrink-0">
        <img
          src= 'assets/images/profile.png'
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
        />
      </div>

      <div className="flex flex-col">
        <span className="font-bold text-[#000000] text-sm">{name}</span>

        <p className="text-black text-sm mt-2">{description}</p>

        <div className="flex flex-wrap gap-2 mt-1">
          {hashtags.map((tag) => (
            <span
              key={tag}
              className="text-[#174A5F] text-xs font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
