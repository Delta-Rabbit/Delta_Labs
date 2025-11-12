/**
 * Delta Labs Course Analysis Tab
 * Display course statistics: enrollment, completion, and rating
 */

import React from 'react';
import { DeltaCard } from '../../../../../../../components/theme';

interface StatCard {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  trend: {
    value: string;
    isPositive: boolean;
  };
  period?: string;
}

const CourseAnalysisTab: React.FC = () => {
  const stats: StatCard[] = [
    {
      id: 'enrollment',
      title: 'Enrollment',
      value: '122',
      subtitle: 'Enrollment / Year',
      icon: (
        <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
          <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
          </svg>
        </div>
      ),
      trend: {
        value: '+0.25%',
        isPositive: true,
      },
      period: 'Year',
    },
    {
      id: 'completion',
      title: 'Completion',
      value: '122',
      subtitle: 'Completion / Year',
      icon: (
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      ),
      trend: {
        value: '+0.75%',
        isPositive: true,
      },
      period: 'Year',
    },
    {
      id: 'rating',
      title: 'Rating',
      value: '4.7',
      subtitle: '(578 Reviews)',
      icon: (
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      ),
      trend: {
        value: '4.7',
        isPositive: true,
      },
    },
  ];

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          if (star <= fullStars) {
            return (
              <svg
                key={star}
                className="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            );
          } else if (star === fullStars + 1 && hasHalfStar) {
            return (
              <svg
                key={star}
                className="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <defs>
                  <linearGradient id={`half-star-${star}`}>
                    <stop offset="50%" stopColor="currentColor" />
                    <stop offset="50%" stopColor="transparent" />
                  </linearGradient>
                </defs>
                <path
                  fill={`url(#half-star-${star})`}
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            );
          } else {
            return (
              <svg
                key={star}
                className="w-5 h-5 text-text-tertiary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            );
          }
        })}
      </div>
    );
  };

  return (
    <div className="w-full font-primary">
      {/* Title */}
      <h1 className="text-2xl font-bold text-text-primary mb-6 font-primary">Course Analysis</h1>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <DeltaCard key={stat.id} className="p-6 font-primary">
            <div className="flex items-start justify-between mb-4">
              {/* Icon */}
              {stat.icon}
              
              {/* Trend Indicator */}
              {stat.id !== 'rating' && (
                <div className={`flex items-center gap-1 ${
                  stat.trend.isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  <svg
                    className={`w-4 h-4 ${stat.trend.isPositive ? '' : 'rotate-180'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  <span className="text-sm font-medium font-primary">{stat.trend.value}</span>
                </div>
              )}
              
              {/* Rating Value (for rating card) */}
              {stat.id === 'rating' && (
                <div className="text-2xl font-bold text-text-primary font-primary">{stat.trend.value}</div>
              )}
            </div>

            {/* Main Value */}
            {stat.id !== 'rating' && (
              <div className="mb-2">
                <div className="text-3xl font-bold text-text-primary mb-1 font-primary">{stat.value}</div>
                <div className="flex items-center gap-2 text-sm text-text-secondary font-primary">
                  <span>{stat.subtitle}</span>
                  {stat.period && (
                    <button 
                      className="text-primary-600 hover:text-primary-700"
                      aria-label={`Change time period for ${stat.title}`}
                      title={`Change time period for ${stat.title}`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Rating Stars (for rating card) */}
            {stat.id === 'rating' && (
              <div className="mb-2">
                {renderStars(parseFloat(stat.value))}
                <div className="text-sm text-text-secondary mt-1 font-primary">{stat.subtitle}</div>
              </div>
            )}

            {/* Title */}
            <div className="text-sm font-medium text-text-primary font-primary">{stat.title}</div>
          </DeltaCard>
        ))}
      </div>
    </div>
  );
};

export default CourseAnalysisTab;

