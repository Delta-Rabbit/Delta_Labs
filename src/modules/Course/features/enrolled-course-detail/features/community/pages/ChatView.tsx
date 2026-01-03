/**
 * Delta Labs Community - Chat View
 * Real-time chat interface for course community
 */

import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage, OnlineMember } from '../types';

interface ChatViewProps {
  messages: ChatMessage[];
  onlineMembers: OnlineMember[];
  onSendMessage: (message: string) => void;
}

const ChatView: React.FC<ChatViewProps> = ({
  messages,
  onlineMembers,
  onSendMessage,
}) => {
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (messageInput.trim()) {
      onSendMessage(messageInput);
      setMessageInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const filteredMessages = searchQuery
    ? messages.filter((msg) =>
        msg.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.author.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : messages;

  return (
    <div className="w-full p-6 pl-24">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white rounded-lg h-[calc(100vh-7rem)]">
        {/* Header */}
        <div className="border-b border-border-primary px-6 py-4">
          <div className="mb-3">
            <h2 className="text-xl font-bold text-text-primary">Course Chat</h2>
            <p className="text-sm text-text-secondary">
              {onlineMembers.length} members online
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search messages..."
              className="w-full px-4 py-2 pl-10 border border-border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-tertiary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Messages Area */}
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {filteredMessages.map((message) => {
            const isCurrentUser = message.author.name === 'You';
            const isTA = message.author.role === 'ta';
            const isInstructor = message.author.role === 'instructor';

            return (
              <div
                key={message.id}
                className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start gap-3 max-w-[70%] ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
                  {/* Avatar */}
                  {!isCurrentUser && (
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0 ${
                      isInstructor ? 'bg-purple-500' : isTA ? 'bg-primary-600' : 'bg-primary-400'
                    }`}>
                      {message.author.name.charAt(0)}
                    </div>
                  )}

                  {/* Message Content */}
                  <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
                    {/* Author & Time */}
                    {!isCurrentUser && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-text-primary">
                          {message.author.name}
                        </span>
                        {(isTA || isInstructor) && (
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            isInstructor ? 'bg-purple-100 text-purple-700' : 'bg-primary-100 text-primary-700'
                          }`}>
                            {isInstructor ? 'Instructor' : 'TA'}
                          </span>
                        )}
                        <span className="text-xs text-text-tertiary">{message.timestamp}</span>
                      </div>
                    )}

                    {/* Message Bubble */}
                    <div
                      className={`px-4 py-2 rounded-lg ${
                        isCurrentUser
                          ? 'bg-primary-500 text-white'
                          : 'bg-surface-secondary text-text-primary'
                      } ${message.isPinned ? 'ring-2 ring-warning-400' : ''}`}
                    >
                      {message.isPinned && (
                        <div className="flex items-center gap-1 mb-1 text-xs text-warning-600">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                          </svg>
                          <span>Pinned</span>
                        </div>
                      )}
                      <p className="text-sm break-words">{message.content}</p>
                    </div>

                    {/* Reactions */}
                    {message.reactions && message.reactions.length > 0 && (
                      <div className="flex items-center gap-1 mt-1">
                        {message.reactions.map((reaction, idx) => (
                          <button
                            key={idx}
                            className="flex items-center gap-1 px-2 py-1 bg-surface-secondary hover:bg-surface-tertiary rounded-full text-xs transition-colors"
                          >
                            <span>{reaction.emoji}</span>
                            <span className="text-text-secondary">{reaction.count}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Timestamp for current user */}
                    {isCurrentUser && (
                      <span className="text-xs text-text-tertiary mt-1">{message.timestamp}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

        </div>

        {/* Input Area */}
        <div className="border-t border-border-primary px-6 py-4">
          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message... (Press Enter to send, Shift+Enter for new line)"
                className="w-full px-4 py-3 border border-border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none text-sm"
                rows={2}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                className="p-2 text-text-tertiary hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                title="Attach file"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>

              <button
                className="p-2 text-text-tertiary hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                title="Add emoji"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>

              <button
                onClick={handleSend}
                disabled={!messageInput.trim()}
                className="px-6 py-2.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
