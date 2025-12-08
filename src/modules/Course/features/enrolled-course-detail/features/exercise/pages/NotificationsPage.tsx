/**
 * Delta Labs Notifications Page
 * Shows user notifications with actions
 */

import React, { useState } from 'react';
import { DeltaButton } from '../../../../../../../components/theme';

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'exam' | 'resource' | 'rent' | 'request';
  isRead: boolean;
}

interface NotificationsPageProps {
  onGoToExercise?: (notificationId: string) => void;
}

// Simple Badge component matching Q&A design
const Badge: React.FC<{ children: React.ReactNode; variant?: 'primary' }> = ({ 
  children, 
  variant = 'primary' 
}) => {
  const variantClasses = {
    primary: 'bg-primary-50 text-primary-700 border-primary-200',
  };
  
  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-lg border ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
};

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'exam':
      return (
        <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case 'resource':
      return (
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case 'rent':
      return (
        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    default:
      return (
        <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      );
  }
};

export const NotificationsPage: React.FC<NotificationsPageProps> = ({
  onGoToExercise,
}) => {
  // Mock notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'notif-1',
      title: 'Your exam setup is ready',
      message: 'from kebede alemu',
      timestamp: '2 hours ago',
      type: 'exam',
      isRead: false,
    },
    {
      id: 'notif-2',
      title: 'Requested Resource Denied',
      message: 'resource denied',
      timestamp: '5 hours ago',
      type: 'resource',
      isRead: false,
    },
    {
      id: 'notif-3',
      title: 'Your Rent Request is accepted',
      message: 'you are requested',
      timestamp: '1 day ago',
      type: 'rent',
      isRead: true,
    },
    {
      id: 'notif-4',
      title: 'Requested on Resource',
      message: 'resource rent request',
      timestamp: '2 days ago',
      type: 'request',
      isRead: true,
    },
  ]);

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(notifications.map(n => 
      n.id === notificationId ? { ...n, isRead: true } : n
    ));
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary mb-6 pb-2 border-b-2 border-primary-600 inline-block">
          Notifications
        </h1>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white border border-border-primary rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer ${
              !notification.isRead ? 'bg-primary-50 border-primary-200' : ''
            }`}
            onClick={() => onGoToExercise?.(notification.id)}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="flex-shrink-0 mt-1">
                {getNotificationIcon(notification.type)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-base font-semibold text-text-primary">
                    {notification.title}
                  </h3>
                  {!notification.isRead && (
                    <Badge variant="primary">New</Badge>
                  )}
                </div>
                <p className="text-sm text-text-secondary mb-2">
                  {notification.message}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-tertiary">
                    {notification.timestamp}
                  </span>
                  {!notification.isRead && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarkAsRead(notification.id);
                      }}
                      className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;

