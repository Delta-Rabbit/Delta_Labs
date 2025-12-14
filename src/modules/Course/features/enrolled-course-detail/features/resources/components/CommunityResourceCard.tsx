import React from 'react';
import type { ResourceItem } from '../types';


interface CommunityResourceCardProps {
    item: ResourceItem;
}

export const CommunityResourceCard: React.FC<CommunityResourceCardProps> = ({ item }) => {
    return (
        <div className="bg-white rounded-xl overflow-hidden border border-gray-100 transition-all duration-300 group flex flex-col">
             {/* Image Section */}
             <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
                 <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                 />
                 
                 {/* Badges */}
                 <div className="absolute top-3 left-3 flex flex-col gap-2">
                     {item.badges.map((badge, idx) => (
                         <span 
                            key={idx} 
                            className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider
                            ${badge.color === 'orange' ? 'bg-amber-400 text-white' : ''}
                            ${badge.color === 'green' ? 'bg-emerald-500 text-white' : ''}
                            ${badge.color === 'blue' ? 'bg-blue-500 text-white' : ''}
                            ${badge.color === 'red' ? 'bg-red-500 text-white' : ''}
                            `}
                         >
                             {badge.label}
                         </span>
                     ))}
                 </div>
             </div>

             {/* Content */}
             <div className="p-4 flex flex-col gap-3">
                 {/* Share Button (Moved here per design) */}
                 <button className="w-full py-2 border border-blue-900 rounded text-sm font-semibold text-blue-900 hover:bg-blue-50 transition-colors">
                     Share
                 </button>

                 <div className="flex flex-col gap-3">
                     {/* Title */}
                     <h3 className="font-semibold text-gray-900 truncate" title={item.title}>
                         {item.title}
                     </h3>

                     {/* University / Organization */}
                     <div className="flex items-center gap-2">
                         <div className="w-5 h-5 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                            {item.seller.logo ? (
                                <img src={item.seller.logo} alt={item.seller.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-[#174A5F] flex items-center justify-center text-[8px] text-white">
                                    {item.seller.name.substring(0,2)}
                                </div>
                            )}
                         </div>
                         <span className="text-xs text-gray-500 truncate">{item.seller.name}</span>
                     </div>

                     {/* Shared With */}
                     <div className="flex items-center gap-2">
                         <span className="text-xs font-bold text-gray-700">Shared with</span>
                         <div className="flex -space-x-2">
                             {item.sharedWith?.map((avatar, idx) => (
                                 <div key={idx} className="w-6 h-6 rounded-full border-2 border-white overflow-hidden bg-gray-200">
                                     <img src={avatar.avatar} alt="User" className="w-full h-full object-cover" />
                                 </div>
                             ))}
                             {/* Fallback for others */}
                             <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[8px] font-medium text-gray-500 z-10">
                                +3
                             </div>
                         </div>
                         <span className="text-xs text-gray-500 font-medium">+ 3 others</span>
                     </div>

                     {/* Rating */}
                     <div className="flex items-center gap-1">
                         <div className="flex text-yellow-400 text-xs">
                             {'★'.repeat(5)}
                         </div>
                         <span className="text-xs text-gray-400">({item.ratingCount})</span>
                     </div>

                     {/* Location */}
                     <div className="flex items-center gap-1 text-gray-400">
                         <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                         </svg>
                         <span className="text-xs">{item.location}</span>
                     </div>
                 </div>
             </div>
        </div>
    );
};
