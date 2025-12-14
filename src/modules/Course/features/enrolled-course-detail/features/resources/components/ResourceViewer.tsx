
import React, { useState } from 'react';
import { DeltaButton } from '../../../../../../../components/theme';
import type { ResourceItem } from '../types';

interface ResourceViewerProps {
    resource: ResourceItem;
    onBack: () => void;
}

export const ResourceViewer: React.FC<ResourceViewerProps> = ({ resource, onBack }) => {
    const [activeImage, setActiveImage] = useState(resource.imageUrl);
    const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');

    // Mock additional images for gallery
    const galleryImages = [
        resource.imageUrl,
        'https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ];

    return (
        <div className="w-full font-primary animate-fadeIn pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left Column: Header + Gallery (7 cols) */}
                <div className="lg:col-span-7 pt-6">
                    {/* Header / Breadcrumbs */}
                    <div className="flex items-center justify-between mb-6">
                        <button 
                            onClick={onBack}
                            className="flex items-center gap-2 text-gray-500 hover:text-[#174A5F] transition-colors font-medium group"
                        >
                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#174A5F]/10 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                            </div>
                            <div className="flex flex-col items-start leading-none">
                                <span className="text-xs text-gray-400 mb-0.5">Back to Resources</span>
                                <span className="text-sm font-semibold text-gray-900 truncate max-w-[300px]">{resource.title}</span>
                            </div>
                        </button>
                    </div>

                    {/* Main Image */}
                    <div className="bg-gray-50 rounded-2xl overflow-hidden mb-4 border border-gray-100 aspect-[4/3] flex items-center justify-center relative group cursor-zoom-in">
                        <img 
                            src={activeImage} 
                            alt={resource.title} 
                            className="w-full h-full object-contain"
                        />
                        {/* Badges Overlay */}
                        <div className="absolute top-4 left-4 flex gap-2">
                             {resource.badges.map((badge, idx) => (
                                <span 
                                    key={idx} 
                                    className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide
                                    ${badge.color === 'green' ? 'bg-green-100 text-green-700' : ''}
                                    ${badge.color === 'blue' ? 'bg-blue-100 text-blue-700' : ''}
                                    ${badge.color === 'orange' ? 'bg-orange-100 text-orange-700' : ''}
                                    ${badge.color === 'gray' ? 'bg-gray-100 text-gray-700' : ''}
                                    `}
                                >
                                    {badge.label}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Thumbnails */}
                    <div className="grid grid-cols-5 gap-3">
                        {galleryImages.map((img, idx) => (
                            <button 
                                key={idx}
                                onClick={() => setActiveImage(img)}
                                className={`rounded-lg overflow-hidden border-2 aspect-square flex items-center justify-center bg-gray-50 transition-all ${
                                    activeImage === img ? 'border-[#174A5F]' : 'border-transparent hover:border-gray-200'
                                }`}
                            >
                                <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                    
                    {/* Tabs Section (Description, Specs, etc) */}
                    <div className="mt-12">
                        <div className="flex items-center gap-8 border-b border-gray-200 mb-8">
                             {['description', 'specs', 'reviews'].map((tab) => (
                                 <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab as any)}
                                    className={`pb-4 text-sm font-semibold capitalize relative transition-colors ${
                                        activeTab === tab ? 'text-[#174A5F]' : 'text-gray-500 hover:text-gray-900'
                                    }`}
                                 >
                                     {tab}
                                     {activeTab === tab && (
                                         <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#174A5F]" />
                                     )}
                                 </button>
                             ))}
                        </div>
                        
                        <div className="prose prose-sm max-w-none text-gray-600">
                             {activeTab === 'description' && (
                                 <div>
                                     <p className="mb-4">
                                         This is a premium quality resource designed specifically for students in this course. 
                                         It covers all the essential topics and provides hands-on practice materials.
                                         Highly recommended by top instructors and previous students.
                                     </p>
                                     <p>
                                         Perfect condition, barely used. Comes with original packaging and all accessories.
                                     </p>
                                 </div>
                             )}
                             {activeTab === 'specs' && (
                                 <div className="grid grid-cols-2 gap-4">
                                     <div className="p-4 bg-gray-50 rounded-lg">
                                         <span className="block text-xs text-gray-500 mb-1">Condition</span>
                                         <span className="font-medium text-gray-900">Like New</span>
                                     </div>
                                     <div className="p-4 bg-gray-50 rounded-lg">
                                         <span className="block text-xs text-gray-500 mb-1">Brand</span>
                                         <span className="font-medium text-gray-900">Generic</span>
                                     </div>
                                     <div className="p-4 bg-gray-50 rounded-lg">
                                         <span className="block text-xs text-gray-500 mb-1">Posted</span>
                                         <span className="font-medium text-gray-900">2 days ago</span>
                                     </div>
                                 </div>
                             )}
                             {activeTab === 'reviews' && (
                                 <div className="space-y-6">
                                     <div className="flex items-start gap-4">
                                         <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0" />
                                         <div>
                                             <div className="flex items-center gap-2 mb-1">
                                                 <span className="font-bold text-gray-900">Alex M.</span>
                                                 <span className="text-xs text-gray-500">Verified Buyer</span>
                                             </div>
                                             <div className="flex text-yellow-400 text-xs mb-2">⭐⭐⭐⭐⭐</div>
                                             <p className="text-sm text-gray-600">Exactly what I needed for the lab section. Great price too!</p>
                                         </div>
                                     </div>
                                 </div>
                             )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Info & Actions (5 cols) */}
                <div className="lg:col-span-5">
                    <div className="sticky top-0 pt-6 space-y-6">
                        {/* Title & Price */}
                        <div>
                            <div className="flex items-center gap-2 text-sm text-[#174A5F] font-semibold mb-3">
                                {resource.type === 'resource' ? 'Physical Item' : 'Digital Asset'}
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">{resource.title}</h1>
                            <div className="flex items-center justify-between">
                                <div className="text-4xl font-bold text-gray-900">
                                    <span className="text-lg text-gray-400 font-normal mr-1">br.</span>
                                    {resource.price?.toLocaleString()}
                                </div>
                                <div className="flex items-center gap-1">
                                     <div className="flex text-yellow-400 text-sm">
                                         {'★'.repeat(Math.round(resource.rating || 0))}
                                         <span className="text-gray-300">{'★'.repeat(5 - Math.round(resource.rating || 0))}</span>
                                     </div>
                                     <span className="text-sm text-gray-500 font-medium">({resource.ratingCount} reviews)</span>
                                </div>
                            </div>
                        </div>

                        {/* Seller */}
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <img src={resource.seller.logo} alt={resource.seller.name} className="w-12 h-12 rounded-full border border-gray-200" />
                            <div className="flex-1">
                                <div className="text-xs text-gray-500 font-medium mb-0.5">Sold by</div>
                                <div className="font-bold text-gray-900">{resource.seller.name}</div>
                            </div>
                            <button className="text-sm font-semibold text-[#174A5F] hover:underline">
                                View Profile
                            </button>
                        </div>

                        {/* Actions */}
                        <div className="space-y-3 pt-4 border-t border-gray-100">
                            <DeltaButton 
                                variant="primary" 
                                className="w-full bg-[#174A5F] hover:bg-[#123644] text-white h-14 text-lg rounded-xl shadow-lg shadow-[#174A5F]/20"
                            >
                                Add to Cart
                            </DeltaButton>
                            <div className="grid grid-cols-2 gap-3">
                                <button className="h-12 border-2 border-[#174A5F] text-[#174A5F] font-bold rounded-xl hover:bg-blue-50 transition-colors">
                                    Buy Now
                                </button>
                                <button className="h-12 border-2 border-gray-200 text-gray-600 font-bold rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-colors">
                                    Make Offer
                                </button>
                            </div>
                        </div>
                        
                        {/* Trust Signals */}
                         <div className="grid grid-cols-3 gap-2 text-center text-xs text-gray-500 pt-4">
                             <div className="flex flex-col items-center gap-2">
                                 <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#174A5F]">
                                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                 </div>
                                 <span>Verified Seller</span>
                             </div>
                             <div className="flex flex-col items-center gap-2">
                                 <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#174A5F]">
                                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                 </div>
                                 <span>Secure Payment</span>
                             </div>
                             <div className="flex flex-col items-center gap-2">
                                 <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#174A5F]">
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                                 </div>
                                 <span>Easy Returns</span>
                             </div>
                         </div>

                    </div>
                </div>
            </div>
        </div>
    );
};
