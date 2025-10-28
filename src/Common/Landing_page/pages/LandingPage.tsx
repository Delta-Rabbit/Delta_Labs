'use client';

import TopBar from '../components/TopBar';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';
import SearchBar from '../components/SearchBar';
import VideoFeed from '../components/VideoFeed'; 
import AIBotModal from '../components/AIBotModal';
import LoginModal from '../components/LoginModal';
import SignUpModal from '../components/SignUpModal';

export default function LandingPage() {
  return (
    <div className="flex flex-col h-screen bg-D9D9D9 text-white">
      <TopBar />

      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar />

        <main className="flex-1 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/18 to-black/0 z-0"></div>

          <div
            className="absolute z-20"
            style={{
              top: 20,                 
              left: '50%',             
              transform: 'translateX(-50%)',
              width: '400px',
              maxWidth: '100%',
            }}
          >
            <SearchBar
              leftIconSrc="/assets/icons/menu.svg"
              rightIconSrc="/assets/icons/search.svg"
            />
          </div>

          <div className="relative z-10 flex justify-center items-center h-full w-full">
            <VideoFeed />
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
