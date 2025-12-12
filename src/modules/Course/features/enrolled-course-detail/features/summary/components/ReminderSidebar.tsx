/**
 * Delta Labs Fast Summary - Reminder Sidebar
 * Right sidebar displaying user reminders with simple clean design
 */

import React from 'react';
import type { Reminder } from '../types';

interface ReminderSidebarProps {
  reminders: Reminder[];
}

const ReminderSidebar: React.FC<ReminderSidebarProps> = ({ reminders }) => {
  return (
    <div className="w-full h-full p-6 overflow-y-auto">
      {/* Header */}
      <h2 className="text-xl font-bold text-text-primary mb-6 font-primary text-center">
        Reminder
      </h2>

      {/* Reminder List */}
      <div className="space-y-6">
        {reminders.map((reminder) => (
          <div key={reminder.id} className="flex items-start gap-3">
            {/* User Avatar */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm">
                  {reminder.user.name.split(' ').map(word => word[0]).join('').slice(0, 2)}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* User Name with blue dot */}
              <div className="flex items-center gap-2 mb-2">
                <p className="text-sm text-text-secondary font-medium font-primary">
                  {reminder.user.name}
                </p>
                <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></span>
              </div>

              {/* Title */}
              <p className="text-base text-text-primary font-primary leading-snug">
                {reminder.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReminderSidebar;

