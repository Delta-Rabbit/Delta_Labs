/**
 * NotificationsView Page Component
 * Displays notifications
 */

import React from 'react';
import type { Notification } from '../types';
import { Avatar, Badge } from '../ui';

interface NotificationsViewProps {
  notifications: Notification[];
  onNotificationClick?: (notificationId: string) => void;
  onMarkAsRead?: (notificationId: string) => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  notifications,
  onNotificationClick,
  onMarkAsRead,
}) => {
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'answer':
        return (
          <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        );
      case 'mention':
        return (
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
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
            onClick={() => onNotificationClick?.(notification.id)}
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
                        onMarkAsRead?.(notification.id);
                      }}
                      className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>

              {/* Author Avatar */}
              {notification.author && (
                <div className="flex-shrink-0">
                  <Avatar name={notification.author.name} avatar={notification.author.avatar} size="sm" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



