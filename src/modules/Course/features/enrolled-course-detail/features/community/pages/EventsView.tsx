/**
 * Delta Labs Community - Events View
 * Events calendar and meetup scheduler
 */

import React, { useState } from 'react';
import type { CommunityEvent } from '../types';

interface EventsViewProps {
  events: CommunityEvent[];
  onCreateEvent: () => void;
  onRSVP: (eventId: string) => void;
}

const EventsView: React.FC<EventsViewProps> = ({ events, onCreateEvent, onRSVP }) => {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  const upcomingEvents = events.filter((e) => new Date(e.startTime) > new Date());
  const pastEvents = events.filter((e) => new Date(e.startTime) <= new Date());

  const formatEventDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatEventTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  const EventCard = ({ event }: { event: CommunityEvent }) => (
    <div className="bg-white border border-border-primary rounded-lg p-5 hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        {/* Date Badge */}
        <div className="flex-shrink-0 w-16 h-16 bg-primary-50 rounded-lg flex flex-col items-center justify-center">
          <span className="text-xs text-primary-600 font-medium">
            {new Date(event.startTime).toLocaleDateString('en-US', { month: 'short' })}
          </span>
          <span className="text-xl font-bold text-primary-700">
            {new Date(event.startTime).getDate()}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-lg font-bold text-text-primary">{event.title}</h3>
            <span className={`px-2 py-1 text-xs font-medium rounded-full flex-shrink-0 ${
              event.type === 'study-session' ? 'bg-blue-100 text-blue-700' :
              event.type === 'workshop' ? 'bg-purple-100 text-purple-700' :
              event.type === 'social' ? 'bg-pink-100 text-pink-700' :
              event.type === 'exam-prep' ? 'bg-warning-100 text-warning-700' :
              'bg-surface-secondary text-text-secondary'
            }`}>
              {event.type.replace('-', ' ')}
            </span>
          </div>

          <p className="text-sm text-text-secondary line-clamp-2 mb-3">{event.description}</p>

          {/* Event Details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{formatEventTime(event.startTime)} - {formatEventTime(event.endTime)}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                {event.isVirtual ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                )}
              </svg>
              <span>{event.isVirtual ? 'Virtual' : event.location}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>by {event.organizer.name}</span>
              {(event.organizer.role === 'ta' || event.organizer.role === 'instructor') && (
                <span className={`px-2 py-0.5 text-xs rounded-full ${
                  event.organizer.role === 'instructor' ? 'bg-purple-100 text-purple-700' : 'bg-primary-100 text-primary-700'
                }`}>
                  {event.organizer.role.toUpperCase()}
                </span>
              )}
            </div>
          </div>

          {/* Attendees & RSVP */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {event.attendees.slice(0, 3).map((attendee, idx) => (
                  <div
                    key={idx}
                    className="w-8 h-8 rounded-full bg-primary-400 text-white flex items-center justify-center text-xs font-medium border-2 border-white"
                  >
                    {attendee.name.charAt(0)}
                  </div>
                ))}
              </div>
              <span className="text-sm text-text-secondary">
                {event.attendees.length}{event.maxAttendees && ` / ${event.maxAttendees}`} going
              </span>
            </div>

            <button
              onClick={() => onRSVP(event.id)}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium"
            >
              RSVP
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full p-6 pl-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Events</h2>
          <p className="text-sm text-text-secondary mt-1">{upcomingEvents.length} upcoming events</p>
        </div>
        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-surface-secondary p-1 rounded-lg">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                viewMode === 'list' ? 'bg-white text-primary-600 shadow-sm' : 'text-text-secondary'
              }`}
            >
              List
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                viewMode === 'calendar' ? 'bg-white text-primary-600 shadow-sm' : 'text-text-secondary'
              }`}
            >
              Calendar
            </button>
          </div>

          <button
            onClick={onCreateEvent}
            className="px-6 py-2.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Create Event
          </button>
        </div>
      </div>

      {/* Events List */}
      {viewMode === 'list' && (
        <div className="space-y-6">
          {/* Upcoming Events */}
          {upcomingEvents.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">Upcoming</h3>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}

          {/* Past Events */}
          {pastEvents.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-text-secondary mb-4">Past Events</h3>
              <div className="space-y-4 opacity-60">
                {pastEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}

          {upcomingEvents.length === 0 && pastEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-text-secondary">No events scheduled</p>
            </div>
          )}
        </div>
      )}

      {/* Calendar View Placeholder */}
      {viewMode === 'calendar' && (
        <div className="bg-white border border-border-primary rounded-lg p-8 text-center">
          <svg className="w-16 h-16 text-text-tertiary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-text-secondary">Calendar view coming soon</p>
        </div>
      )}
    </div>
  );
};

export default EventsView;
