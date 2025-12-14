
import React from 'react';
import type { ResourceItem } from '../types';


interface ResourceMarketCardProps {
  item: ResourceItem;
  onAddToCart?: () => void;
}

export const ResourceMarketCard: React.FC<ResourceMarketCardProps> = ({ item, onAddToCart }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden font-primary cursor-pointer group">
      {/* Image Container */}
      <div className="relative h-48 bg-gray-50 flex items-center justify-center p-4">
        {/* Badge */}
        {item.badges.length > 0 && (
          <div className="absolute top-3 left-3 flex gap-2">
            {item.badges.map((badge, index) => (
               <span 
                key={index}
                className={`px-3 py-1 text-xs font-medium text-white rounded-md`}
                style={{
                    backgroundColor: badge.color === 'green' ? '#22C55E' : 
                                     badge.color === 'orange' ? '#F97316' : 
                                     badge.color === 'blue' ? '#3B82F6' : '#EF4444'
                }}
            >
                {badge.label}
            </span>
            ))}
          </div>
        )}

        <img 
            src={item.imageUrl} 
            alt={item.title} 
            className="max-h-full max-w-full object-contain mix-blend-multiply"
        />


        {/* Add to Cart Overlay */}
        <button 
           onClick={(e) => {
             e.stopPropagation();
             onAddToCart?.();
           }}
           className="absolute bottom-0 left-0 right-0 bg-[#174A5F] text-white py-2 px-4 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-[#123644]"
        >
           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
           </svg>
           <span className="text-sm font-medium">Add To Cart</span>
           <div className="ml-auto flex items-center gap-1 border-l border-white/20 pl-2">
               <span className="text-sm">1</span>
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
               </svg>
           </div>
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-gray-900 font-bold text-base mb-2 line-clamp-1">
            {item.title}
        </h3>

        {/* Seller Info */}
        <div className="flex items-center gap-2 mb-3">
            <img src={item.seller.logo} alt={item.seller.name} className="w-5 h-5 rounded-full" />
            <span className="text-xs text-gray-500">{item.seller.name}</span>
        </div>

        {/* Price */}
        <div className="text-[#E11D48] font-bold text-lg mb-2">
            br. {item.price}
        </div>

        {/* Rating and Location */}
        <div className="flex flex-col gap-1">
            <div className="flex items-center text-yellow-400">
                {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'fill-current' : 'text-gray-300 fill-current'}`} viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
                <span className="text-xs text-gray-400 ml-1">({item.ratingCount})</span>
            </div>

            <div className="flex items-center text-gray-400 text-xs mt-1">
                 <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                 </svg>
                 {item.location}
            </div>
        </div>
      </div>
    </div>
  );
};
