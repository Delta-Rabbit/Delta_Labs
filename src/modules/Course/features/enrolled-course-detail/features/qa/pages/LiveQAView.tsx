/**
 * LiveQAView Page Component
 * Displays live Q&A sessions
 */

import React from 'react';
import { DeltaButton } from '../../../../../../../components/theme';
import type { LiveSession } from '../types';
import { Avatar, Badge } from '../ui';
import { TabBar } from '../components';

interface LiveQAViewProps {
  sessions: LiveSession[];
  activeTab: 'my-live' | 'community-live';
  onTabChange: (tab: 'my-live' | 'community-live') => void;
  isAvailableOnline: boolean;
  onAvailableOnlineChange: (available: boolean) => void;
  onJoinSession: (sessionId: string) => void;
  joinedSessionId: string | null;
  onLeaveSession: () => void;
  isMicMuted: boolean;
  onMicToggle: () => void;
  isCameraOn: boolean;
  onCameraToggle: () => void;
}

export const LiveQAView: React.FC<LiveQAViewProps> = ({
  sessions,
  activeTab,
  onTabChange,
  isAvailableOnline,
  onAvailableOnlineChange,
  onJoinSession,
  joinedSessionId,
  onLeaveSession,
  isMicMuted,
  onMicToggle,
  isCameraOn,
  onCameraToggle,
}) => {
  const tabs = [
    { id: 'my-live' as const, label: 'My Live' },
    { id: 'community-live' as const, label: 'Community Live' },
  ];

  if (joinedSessionId) {
    const session = sessions.find(s => s.id === joinedSessionId);
    if (!session) return null;

    return (
      <div className="w-full h-[calc(100vh-200px)] flex flex-col">
        {/* Session Title Bar */}
        <div className="bg-primary-100 px-6 py-3 flex items-center gap-3">
          <button
            onClick={onLeaveSession}
            className="p-1 hover:bg-primary-200 rounded transition-colors"
            aria-label="Back to sessions"
          >
            <svg className="w-5 h-5 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-lg font-semibold text-text-primary">{session.title}</h2>
        </div>

        {/* Video Feeds Area */}
        <div className="flex-1 flex gap-4 p-4 bg-surface-primary">
          {/* Main Video (Left) */}
          <div className="flex-1 bg-black rounded-lg overflow-hidden relative">
            <div className="w-full h-full flex items-center justify-center bg-gray-900">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-primary-500 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <p className="text-white text-sm">Main Video Feed</p>
              </div>
            </div>
            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
              <button className="p-2 bg-black/50 rounded hover:bg-black/70 transition-colors" aria-label="Layout options">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button className="p-2 bg-black/50 rounded hover:bg-black/70 transition-colors" aria-label="Screen share">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Participant Videos (Right) */}
          <div className="w-80 flex flex-col gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex-1 bg-black rounded-lg overflow-hidden relative">
                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-primary-500 mx-auto mb-2 flex items-center justify-center">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <p className="text-white text-xs">Participant {i}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Control Bar */}
        <div className="bg-white border-t border-border-primary px-6 py-4 flex items-center justify-center gap-4">
          <button
            onClick={onMicToggle}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              isMicMuted ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-100 hover:bg-gray-200'
            }`}
            aria-label={isMicMuted ? 'Unmute microphone' : 'Mute microphone'}
          >
            <svg className="w-5 h-5 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>
          <button
            onClick={onCameraToggle}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              isCameraOn ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-200 hover:bg-gray-300'
            }`}
            aria-label={isCameraOn ? 'Turn off camera' : 'Turn on camera'}
          >
            <svg className="w-5 h-5 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
          <button className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors" aria-label="Raise hand">
            <svg className="w-5 h-5 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2.5m6-9V9m0 0a1.5 1.5 0 001.5 1.5h1.5m-1.5-1.5h-3m-3.75 0H9m1.5-1.5v-3m0 3h-1.5m0 0H7.5m0 0v3m0-3v-3m0 3h3m-3 0h-1.5" />
            </svg>
          </button>
          <button
            onClick={onLeaveSession}
            className="w-12 h-12 rounded-full bg-error-500 hover:bg-error-600 flex items-center justify-center transition-colors"
            aria-label="End call"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M8 21l5-5 5 5M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
          </button>
          <DeltaButton variant="primary" size="md" className="bg-primary-500 hover:bg-primary-600 ml-4">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>Chat</span>
            </div>
          </DeltaButton>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header with Tabs and Controls */}
      <div className="flex items-center justify-between mb-6">
        <TabBar tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-secondary">Available online</span>
            <button
              onClick={() => onAvailableOnlineChange(!isAvailableOnline)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isAvailableOnline ? 'bg-primary-500' : 'bg-gray-300'
              }`}
              aria-label="Toggle available online"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAvailableOnline ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <DeltaButton variant="primary" size="md" className="bg-primary-500 hover:bg-primary-600">
            Create Question
          </DeltaButton>
        </div>
      </div>

      {/* Live Sessions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sessions.map((session) => (
          <div key={session.id} className="bg-white border border-border-primary rounded-lg p-6 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-text-primary mb-4">{session.title}</h3>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Avatar name={session.host.name} avatar={session.host.avatar} size="md" />
                <div>
                  <p className="text-sm font-medium text-text-primary">{session.host.name}</p>
                  <p className="text-xs text-text-secondary">
                    {session.invitationType === 'invited' ? 'Invited' : 'Invited By'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-text-secondary capitalize">{session.status}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <DeltaButton
                variant="primary"
                size="md"
                className="bg-primary-500 hover:bg-primary-600"
                onClick={() => onJoinSession(session.id)}
              >
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                  </svg>
                  <span>{session.action === 'live' ? 'Live' : 'Join'}</span>
                </div>
              </DeltaButton>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${session.viewers > 0 ? 'bg-orange-500' : 'bg-gray-400'}`} />
                <span className="text-sm text-text-secondary">
                  {session.viewers > 0 ? `${session.viewers} watching` : 'No one is here'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



