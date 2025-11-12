/**
 * Delta Labs Reviews & Rating Tab
 * Display course reviews, ratings breakdown, and individual reviews
 */

import React from 'react';
import { DeltaCard, DeltaBadge } from '../../../../../../../components/theme';

interface Review {
  id: string;
  reviewer: string;
  date: string;
  rating: number;
  text: string;
  likes: number;
  dislikes: number;
}

const ReviewsRatingTab: React.FC = () => {
  const overallRating = 4.8;
  const totalRatings = 1631;

  // Star rating breakdown
  const ratingBreakdown = [
    { stars: 5, percentage: 82 },
    { stars: 4, percentage: 15 },
    { stars: 3, percentage: 1.8 },
    { stars: 2, percentage: 0.4 },
    { stars: 1, percentage: 0.5 },
  ];

  // Sample reviews
  const reviews: Review[] = [
    {
      id: '1',
      reviewer: 'Kristy Allen',
      date: 'Feb 24, 2023',
      rating: 4,
      text: "I would recommend this course to all who aspire to learn front-end web development, It will help you in filling your knowledge gaps, even if you have prior knowledge of this topic :-)",
      likes: 1254,
      dislikes: 125,
    },
    {
      id: '2',
      reviewer: 'Kristy Allen',
      date: 'Feb 24, 2023',
      rating: 4,
      text: "I would recommend this course to all who aspire to learn front-end web development, It will help you in filling your knowledge gaps, even if you have prior knowledge of this topic :-)",
      likes: 1254,
      dislikes: 125,
    },
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          if (star <= Math.floor(rating)) {
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
          } else if (star === Math.ceil(rating) && rating % 1 !== 0) {
            return (
              <svg
                key={star}
                className="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <defs>
                  <linearGradient id={`half-${star}`}>
                    <stop offset="50%" stopColor="currentColor" />
                    <stop offset="50%" stopColor="transparent" stopOpacity="1">
                      <animate attributeName="stop-opacity" values="1;0" dur="0.001s" />
                    </stop>
                  </linearGradient>
                </defs>
                <path
                  fill={`url(#half-${star})`}
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
      <h1 className="text-2xl font-bold text-text-primary mb-6 font-primary">Reviews</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Overall Rating & Breakdown */}
        <div className="lg:col-span-1 space-y-6">
          {/* Overall Rating Card */}
          <DeltaCard className="p-6 text-center font-primary">
            <div className="text-5xl font-bold text-text-primary mb-2 font-primary">{overallRating}</div>
            <div className="flex items-center justify-center gap-2 mb-2">
              {renderStars(overallRating)}
              <span className="text-sm text-text-secondary font-primary">Rate</span>
            </div>
            <div className="text-sm text-text-secondary font-primary">{totalRatings.toLocaleString()} ratings</div>
          </DeltaCard>

          {/* Star Rating Breakdown */}
          <DeltaCard className="p-6 font-primary">
            <h3 className="text-lg font-bold text-text-primary mb-4 font-primary">Rating Breakdown</h3>
            <div className="space-y-3">
              {ratingBreakdown.map((item) => (
                <div key={item.stars} className="space-y-1">
                  <div className="flex items-center justify-between text-sm font-primary">
                    <span className="text-text-secondary">{item.stars} stars</span>
                    <span className="text-text-primary font-medium">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-surface-secondary rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-primary-600 h-full rounded-full transition-all"
                      style={{ width: `${item.percentage}%` }}
                      aria-label={`${item.percentage}% of ratings are ${item.stars} stars`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </DeltaCard>
        </div>

        {/* Right Column - Reviews List */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-text-primary font-primary">TOP REVIEWS</h2>
          
          <div className="space-y-6">
            {reviews.map((review) => (
              <DeltaCard key={review.id} className="p-6 font-primary">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-text-primary font-primary">{review.reviewer}</h3>
                      <span className="text-sm text-text-secondary font-primary">{review.date}</span>
                    </div>
                    <div className="mb-3">{renderStars(review.rating)}</div>
                    <p className="text-text-secondary leading-relaxed font-primary">{review.text}</p>
                  </div>
                  
                  {/* Engagement Actions */}
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-text-secondary hover:text-text-primary text-sm font-primary">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                        {review.likes}
                      </button>
                      <button className="flex items-center gap-1 text-text-secondary hover:text-text-primary text-sm font-primary">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                        </svg>
                        {review.dislikes}
                      </button>
                    </div>
                    <button className="flex items-center gap-1 text-primary-600 hover:text-primary-700 text-sm font-primary">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                      </svg>
                      Report
                    </button>
                  </div>
                </div>
              </DeltaCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsRatingTab;

