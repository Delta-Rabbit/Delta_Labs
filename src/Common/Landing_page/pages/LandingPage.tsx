'use client';

import { useState } from 'react';
import TopBar from '../components/TopBar';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';
import SearchBar from '../components/SearchBar';
import VideoFeed from '../components/VideoFeed';
import AudioFeed from '../components/AudioFeed';
import BotChat from '../components/BotChat';
import SimulationCalculator from '../components/SimulationCalculator';
import AIBotModal from '../components/AIBotModal';
import LoginModal from '../components/LoginModal';
import SignUpModal from '../components/SignUpModal';
import CommentsView from '../components/CommentsView';

export default function LandingPage() {
  const [currentFeed, setCurrentFeed] = useState<'video' | 'audio' | 'bot' | 'simulation'>('video');
  const [showComments, setShowComments] = useState(false);

  const handleCommentClick = () => {
    setShowComments(!showComments);
  };

  const handleCloseComments = () => {
    setShowComments(false);
  };

  return (
    <div className="flex flex-col h-screen bg-D9D9D9 text-white">
      <TopBar />

      <div className="flex flex-1 overflow-hidden">

        <div className="flex">
          {showComments ? (
            <div className="h-full bg-[#A5A5A5]">
              <RightSidebar 
                onSelectFeed={(feed) => setCurrentFeed(feed)}
                currentFeed={currentFeed}
              />
            </div>
          ) : (
            
            <LeftSidebar />
          )}
        </div>

       
        <main className="flex-1 flex items-center justify-center relative overflow-hidden">
          
          <div className="absolute inset-0 bg-gradient-to-r from-[#A5A5A5]/100 via-[#A5A5A5]/60 to-[#A5A5A5]/0 z-0 pointer-events-none"></div>

          <div
            className="absolute z-40"
            style={{
              top: 6,
              left: '58%',
              transform: 'translateX(-50%)',
              width: '400px',
              maxWidth: '100%',
            }}
          >
            <SearchBar />
          </div>

          <div className="relative z-10 flex justify-center items-center h-full w-full">
            {currentFeed === 'video' && (
              <VideoFeed 
                onCommentClick={handleCommentClick}
                hideReactionButtons={showComments}
              />
            )}
            {currentFeed === 'audio' && (
              <AudioFeed 
                onCommentClick={handleCommentClick}
                hideReactionButtons={showComments}
              />
            )}
            {currentFeed === 'bot' && (
              <BotChat 
                hideReactionButtons={showComments}
              />
            )}
            {currentFeed === 'simulation' && (
              <SimulationCalculator 
                onCommentClick={handleCommentClick}
                hideReactionButtons={showComments}
              />
            )}
          </div>
        </main>

        <div className="flex">
          {showComments ? (
            
            <CommentsView onClose={handleCloseComments} />
          ) : (
        
            <RightSidebar 
              onSelectFeed={(feed) => setCurrentFeed(feed)}
              currentFeed={currentFeed}
            />
          )}
        </div>
      </div>

      <AIBotModal />
      <LoginModal />
      <SignUpModal />
    </div>
  );
}