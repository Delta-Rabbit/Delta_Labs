/**
 * Delta Labs Content Icon Component
 * Icon for different content types (document, video, audio)
 */

import React from 'react';

export type ContentType = 'document' | 'video' | 'audio';

export interface ContentIconProps {
  type: ContentType;
  className?: string;
}

const ContentIcon: React.FC<ContentIconProps> = ({ type, className = 'w-6 h-6' }) => {
  switch (type) {
    case 'document':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      );
    case 'video':
      return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" fill="currentColor"/>
          <path d="M6 10.5a.75.75 0 01.75-.75h16.5a.75.75 0 01.75.75v8.25a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75v-8.25z" fill="currentColor"/>
        </svg>
      );
    case 'audio':
      return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.75L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" fill="currentColor"/>
        </svg>
      );
    default:
      return null;
  }
};

export default ContentIcon;

