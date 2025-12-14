import React from 'react';
import type { Sponsor } from '../types';

interface SponsorCardProps {
  sponsor: Sponsor;
  onRequestSponsorship: () => void;
  onViewProfile: () => void;
}

export const SponsorCard: React.FC<SponsorCardProps> = ({
  sponsor,
  onRequestSponsorship,
  onViewProfile
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
      {/* Header with Avatar */}
      <div className="flex items-start gap-4 mb-4">
        <img 
          src={sponsor.avatar} 
          alt={sponsor.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-lg truncate">{sponsor.name}</h3>
          {sponsor.organization && (
            <p className="text-sm text-gray-500 truncate">{sponsor.organization}</p>
          )}
          <div className="mt-1 flex items-center gap-3">
            {sponsor.isActive ? (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                Active
              </span>
            ) : (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                Inactive
              </span>
            )}
            <button
              onClick={onViewProfile}
              className="text-xs text-[#174A5F] hover:text-[#123644] font-medium transition-colors"
            >
              View Profile
            </button>
          </div>
        </div>
      </div>

      {/* Bio */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{sponsor.bio}</p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
        <div>
          <p className="text-xs text-gray-500 mb-1">Total Sponsored</p>
          <p className="text-lg font-bold text-[#174A5F]">${sponsor.totalSponsored.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Students Helped</p>
          <p className="text-lg font-bold text-[#174A5F]">{sponsor.studentsHelped}</p>
        </div>
      </div>

      {/* Categories */}
      {sponsor.categories.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2">Interested in:</p>
          <div className="flex flex-wrap gap-1">
            {sponsor.categories.slice(0, 3).map((category, idx) => (
              <span 
                key={idx}
                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
              >
                {category}
              </span>
            ))}
            {sponsor.categories.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{sponsor.categories.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={onRequestSponsorship}
        disabled={!sponsor.isActive}
        className="w-full py-2.5 bg-[#174A5F] text-white font-semibold rounded-lg hover:bg-[#123644] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Request Sponsorship
      </button>
    </div>
  );
};
