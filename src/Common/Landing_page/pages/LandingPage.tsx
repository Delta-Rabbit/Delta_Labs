'use client';

import TopBar from '../components/TopBar';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';
import VideoCard from '../components/VideoCard';
import AIBotModal from '../components/AIBotModal';
import LoginModal from '../components/LoginModal';
import SignUpModal from '../components/SignUpModal';

export default function LandingPage() {
  return (
    <div className="flex flex-col h-screen bg-D9D9D9 text-white">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar />
        <main className="flex-1 flex justify-center items-center overflow-auto p-4 relative">
          <div className="absolute inset-0 bg-black/50 z-0"></div>
          <div className="relative z-10">
            <VideoCard />
          </div>
        </main>
        <RightSidebar />
      </div>
      <AIBotModal />
      <LoginModal />
      <SignUpModal />
    </div>
  );
}
