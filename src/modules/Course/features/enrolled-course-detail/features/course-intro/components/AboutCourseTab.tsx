/**
 * Delta Labs About Course Tab
 * Course information, target audience, benefits, and school details
 */

import React from 'react';
import { DeltaButton, DeltaCard, DeltaBadge } from '../../../../../../../components/theme';

const AboutCourseTab: React.FC = () => {
  const whoIsThisFor = [
    'This course is for everyone: Physics beginners',
    'Everyone who likes physics',
    'Science students, who want to explore',
    'High School students',
    'Final Exam Prep',
  ];

  const benefits = [
    'This course is for everyone: Physics beginners',
    'Everyone who likes physics',
    'Science students,',
    'High School students',
    'Final Exam Prep',
  ];

  const instructors = [
    { id: 1, name: 'Tim Doe', avatar: '/placeholder-instructor-1.jpg' },
    { id: 2, name: 'Mark Ben', avatar: '/placeholder-instructor-2.jpg' },
  ];

  return (
    <div className="w-full font-primary">
      {/* Banner Image */}
      <div className="w-full h-64 rounded-lg overflow-hidden mb-6 bg-gradient-to-br from-primary-500 to-primary-700">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center text-white">
            <svg className="w-20 h-20 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <p className="text-lg font-medium font-primary">Course Banner</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Course Title & Overview */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-text-primary font-primary">Biology for beginners</h1>
            
            {/* Rating and Enrollment */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-5 h-5 ${star <= 4 ? 'text-yellow-400' : star === 5 ? 'text-yellow-400 opacity-50' : 'text-text-tertiary'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-text-secondary font-primary">(475 Reviews)</span>
              </div>
              <span className="text-sm text-text-secondary font-primary">+18,000 already enrolled</span>
            </div>

            {/* Welcome Heading */}
            <h2 className="text-2xl font-bold text-text-primary font-primary">Welcome to the world of biology!</h2>
            
            {/* Description */}
            <p className="text-base text-text-secondary leading-relaxed font-primary">
              These courses provide a broad overview of the major topics in biology and are a great starting point for anyone interested in the subject. They often include lab simulations and virtual experiments.
            </p>
          </div>

          {/* Two Column Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Who this course is for */}
            <DeltaCard className="p-6 font-primary">
              <h3 className="text-lg font-bold text-text-primary mb-4 font-primary">Who this course is for</h3>
              <ul className="space-y-2">
                {whoIsThisFor.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-text-secondary font-primary">{item}</span>
                  </li>
                ))}
              </ul>
            </DeltaCard>

            {/* Benefits */}
            <DeltaCard className="p-6 font-primary">
              <h3 className="text-lg font-bold text-text-primary mb-4 font-primary">Benefits of taking the course</h3>
              <ul className="space-y-2">
                {benefits.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-text-secondary font-primary">{item}</span>
                  </li>
                ))}
              </ul>
            </DeltaCard>
          </div>

          {/* Message School Button */}
          <DeltaButton variant="primary" size="md" className="font-primary">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Message School
          </DeltaButton>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* About School Card */}
          <DeltaCard className="p-6 space-y-4 font-primary">
            <h3 className="text-lg font-bold text-text-primary font-primary">About school</h3>
            
            <div className="flex items-start gap-3">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-yellow-400 flex-shrink-0 flex items-center justify-center">
                <span className="text-white font-bold text-lg">HU</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-text-primary font-primary">Haramaya University</h4>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-4 h-4 ${star <= 4 ? 'text-yellow-400' : 'text-text-tertiary'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-text-secondary font-primary">4.7</span>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 pt-2">
              <DeltaBadge variant="default" size="sm" className="font-primary">Health</DeltaBadge>
              <DeltaBadge variant="default" size="sm" className="font-primary">Engineering</DeltaBadge>
              <DeltaBadge variant="default" size="sm" className="font-primary">Law</DeltaBadge>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center gap-3 pt-2 border-t border-border-primary">
              <button className="p-2 hover:bg-surface-secondary rounded-lg transition-colors" aria-label="Telegram">
                <svg className="w-5 h-5 text-text-secondary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </button>
              <button className="p-2 hover:bg-surface-secondary rounded-lg transition-colors" aria-label="Twitter">
                <svg className="w-5 h-5 text-text-secondary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </button>
              <button className="p-2 hover:bg-surface-secondary rounded-lg transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5 text-text-secondary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </button>
              <button className="p-2 hover:bg-surface-secondary rounded-lg transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5 text-text-secondary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
            </div>
          </DeltaCard>

          {/* Instructors Card */}
          <DeltaCard className="p-6 space-y-4 font-primary">
            <h3 className="text-lg font-bold text-text-primary font-primary">Instructors</h3>
            <div className="space-y-4">
              {instructors.map((instructor) => (
                <div key={instructor.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-200 to-primary-300 flex-shrink-0 flex items-center justify-center">
                    <span className="text-primary-700 font-bold text-sm">
                      {instructor.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-text-primary font-primary">{instructor.name}</span>
                </div>
              ))}
            </div>
          </DeltaCard>
        </div>
      </div>
    </div>
  );
};

export default AboutCourseTab;

