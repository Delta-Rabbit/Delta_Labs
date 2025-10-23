'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Heart, MessageCircle, Share2, Play, Pause } from 'lucide-react';

type VideoData = {
  id: string;
  src: string;
  caption: string;
  likes: number;
  comments: number;
  shares: number;
};

const videos: VideoData[] = [
  {
    id: '1',
    src: 'assets/videos/video1.mp4',
    caption: 'First amazing video 🎥',
    likes: 230,
    comments: 12,
    shares: 5,
  },
  {
    id: '2',
    src: 'assets/videos/video2.mp4',
    caption: 'Second trending video 🔥',
    likes: 800,
    comments: 73,
    shares: 21,
  },
  {
    id: '3',
    src: 'assets/videos/video3.mp4',
    caption: 'Third viral clip 🌍',
    likes: 1550,
    comments: 240,
    shares: 89,
  },
];

type Props = {
  videoWidth?: number;
  videoHeight?: number;
};

export default function ShortVideoFeed({ videoWidth = 400, videoHeight = 550 }: Props) {
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const [iconState, setIconState] = useState<{ [key: number]: 'play' | 'pause' | null }>({});
  const [likedState, setLikedState] = useState<{ [key: number]: boolean }>({});
  const [likesCount, setLikesCount] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const initialLikes: { [key: number]: number } = {};
    videos.forEach((v, i) => (initialLikes[i] = v.likes));
    setLikesCount(initialLikes);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.intersectionRatio >= 0.9) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: [0.9] }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    if (videoRefs.current[0]) {
      videoRefs.current[0].play().catch(() => {});
    }

    return () => observer.disconnect();
  }, []);

  const handleVideoClick = (video: HTMLVideoElement, index: number) => {
    if (video.paused) {
      video.play().catch(() => {});
      showIcon(index, 'play');
    } else {
      video.pause();
      showIcon(index, 'pause');
    }
  };

  const showIcon = (index: number, type: 'play' | 'pause') => {
    setIconState((prev) => ({ ...prev, [index]: type }));
    setTimeout(() => {
      setIconState((prev) => ({ ...prev, [index]: null }));
    }, 800);
  };

  const handleLikeToggle = (index: number) => {
    setLikedState((prev) => {
      const newLiked = !prev[index];
      setLikesCount((prevLikes) => ({
        ...prevLikes,
        [index]: prevLikes[index] + (newLiked ? 1 : -1),
      }));
      return { ...prev, [index]: newLiked };
    });
  };

  return (
    <div
      className="
        h-screen
        overflow-y-scroll
        snap-y
        snap-mandatory
        bg-black
        no-scrollbar
        flex flex-col items-center
      "
      style={{
        scrollBehavior: 'smooth',
        overscrollBehavior: 'contain',
      }}
    >
      {videos.map((video, index) => (
        <div
          key={video.id}
          className="h-screen w-full flex items-center justify-center snap-start"
        >
          <div
            className="relative bg-black rounded-2xl overflow-hidden shadow-lg flex justify-center items-center"
            style={{ width: `${videoWidth}px`, height: `${videoHeight}px` }}
          >
            <video
              ref={(el) => {
                if (el) videoRefs.current[index] = el;
              }}
              src={video.src}
              loop
              muted
              playsInline
              onClick={(e) => handleVideoClick(e.currentTarget, index)}
              className="w-full h-full object-cover cursor-pointer"
            />

            {iconState[index] && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300">
                {iconState[index] === 'play' ? (
                  <Play size={60} className="text-white opacity-90" />
                ) : (
                  <Pause size={60} className="text-white opacity-90" />
                )}
              </div>
            )}

            <div className="absolute bottom-4 left-4 right-16 text-white z-10">
              <p className="text-sm font-medium mb-2">{video.caption}</p>
            </div>

            <div className="absolute bottom-4 right-4 flex flex-col items-center gap-4 z-10">
              <button
                onClick={() => handleLikeToggle(index)}
                className={`flex flex-col items-center ${
                  likedState[index] ? 'text-red-500' : 'text-white'
                } hover:opacity-80`}
              >
                <Heart size={28} fill={likedState[index] ? 'currentColor' : 'none'} />
                <span className="text-xs">{likesCount[index]}</span>
              </button>

              <button className="flex flex-col items-center text-white hover:opacity-80">
                <MessageCircle size={28} />
                <span className="text-xs">{video.comments}</span>
              </button>

              <button className="flex flex-col items-center text-white hover:opacity-80">
                <Share2 size={28} />
                <span className="text-xs">{video.shares}</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
