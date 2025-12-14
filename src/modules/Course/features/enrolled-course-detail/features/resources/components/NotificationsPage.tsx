/**
 * NotificationsPage Component for Resources
 * Displays resource-related notifications (orders, rentals, sharing, etc.)
 */

import React, { useState } from 'react';

interface ResourceNotification {
  id: string;
  type: 'order' | 'rent' | 'share' | 'return' | 'payment' | 'general';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  author?: {
    name: string;
    avatar: string;
  };
}

interface NotificationsPageProps {
  onBack: () => void;
}

export const NotificationsPage: React.FC<NotificationsPageProps> = ({ onBack }) => {
  const [notifications, setNotifications] = useState<ResourceNotification[]>([
    {
      id: 'n1',
      type: 'order',
      title: 'New Purchase Order',
      message: 'Abebe Kebede wants to purchase your IPS LCD Gaming Monitor (2 items)',
      timestamp: '2 hours ago',
      isRead: false,
      author: {
        name: 'Abebe Kebede',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=32&h=32&fit=crop'
      }
    },
    {
      id: 'n2',
      type: 'rent',
      title: 'New Rent Request',
      message: 'Fikir Twelde requested to rent your Chemistry Glassware Set for 30 days',
      timestamp: '5 hours ago',
      isRead: false,
      author: {
        name: 'Fikir Twelde',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop'
      }
    },
    {
      id: 'n3',
      type: 'payment',
      title: 'Payment Received',
      message: 'You received br. 1,160 for IPS LCD Gaming Monitor from Sara Ahmed',
      timestamp: 'Yesterday',
      isRead: true,
      author: {
        name: 'Sara Ahmed',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop'
      }
    },
    {
      id: 'n4',
      type: 'return',
      title: 'Item Return Reminder',
      message: 'Lab Safety Goggles rented to Dawit Hailu is due in 3 days',
      timestamp: '2 days ago',
      isRead: true,
      author: {
        name: 'Dawit Hailu',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=32&h=32&fit=crop'
      }
    },
    {
      id: 'n5',
      type: 'share',
      title: 'Resource Shared',
      message: 'You shared Scientific Calculator with 5 classmates',
      timestamp: '3 days ago',
      isRead: true
    },
    {
      id: 'n6',
      type: 'general',
      title: 'Order Completed',
      message: 'Your order for Microscope has been delivered successfully',
      timestamp: '1 week ago',
      isRead: true
    }
  ]);

  const getNotificationIcon = (type: ResourceNotification['type']) => {
    switch (type) {
      case 'order':
        return (
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
        );
      case 'rent':
        return (
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
        );
      case 'share':
        return (
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </div>
        );
      case 'return':
        return (
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'payment':
        return (
          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
        );
    }
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="w-full font-primary py-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900 pb-2 border-b-2 border-[#174A5F] inline-block">
            Notifications
          </h1>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="text-sm text-[#174A5F] hover:text-[#123644] font-medium"
            >
              Mark all as read
            </button>
          )}
        </div>
        {unreadCount > 0 && (
          <p className="text-sm text-gray-500">
            You have <span className="font-semibold text-[#174A5F]">{unreadCount} unread</span> notifications
          </p>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white border rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer ${
              !notification.isRead ? 'border-[#174A5F]/30 bg-[#E8F4F8]' : 'border-gray-200'
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="flex-shrink-0">
                {getNotificationIcon(notification.type)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-base font-semibold text-gray-900">
                    {notification.title}
                  </h3>
                  {!notification.isRead && (
                    <span className="px-2 py-0.5 bg-[#174A5F] text-white text-xs font-medium rounded">
                      New
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {notification.message}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    {notification.timestamp}
                  </span>
                  {!notification.isRead && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarkAsRead(notification.id);
                      }}
                      className="text-xs text-[#174A5F] hover:text-[#123644] font-medium"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>

              {/* Author Avatar */}
              {notification.author && (
                <div className="flex-shrink-0">
                  <img
                    src={notification.author.avatar}
                    alt={notification.author.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {notifications.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No notifications</h3>
          <p className="text-gray-500">You're all caught up! Check back later for updates.</p>
        </div>
      )}
    </div>
  );
};
