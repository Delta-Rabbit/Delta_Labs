import React from 'react';
import type { SupplementResource } from '../../types';

interface VideoViewerProps {
  resource: SupplementResource;
}

export const VideoViewer: React.FC<VideoViewerProps> = ({ resource }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
        {/* Main Video Area */}
        <div className="lg:col-span-2 space-y-6">
            <div className="aspect-video w-full bg-black rounded-xl overflow-hidden shadow-lg relative group cursor-pointer">
                {/* Video Placeholder Image */}
                <img src={resource.coverUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'} className="w-full h-full object-cover opacity-80" alt="Video cover" />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <div className="w-16 h-16 bg-[#174A5F] rounded-full flex items-center justify-center pl-1 shadow-lg">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        </div>
                    </div>
                </div>

                {/* Video Controls (Mock) */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent flex items-end px-6 py-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-full flex items-center gap-4 text-white">
                         <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                             <div className="w-1/3 h-full bg-[#40C4FF]"></div>
                         </div>
                         <div className="text-xs font-medium">04:20 / 12:45</div>
                    </div>
                </div>
            </div>

            <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{resource.title}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                     <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        1.2k views
                     </span>
                     <span>•</span>
                     <span>{resource.chapter}</span>
                     <span>•</span>
                     <span className="text-[#174A5F] font-medium">Video Supplement</span>
                </div>
                <p className="text-gray-700 leading-relaxed">
                    This video covers the fundamental concepts of {resource.chapter}. We explore real-world examples and derive the core equations needed for your upcoming experiments. Make sure to take notes on the derivation segment specifically.
                </p>
            </div>
        </div>

        {/* Up Next / Related */}
        <div className="space-y-4">
            <h3 className="font-bold text-gray-900 text-lg">Up Next</h3>
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-3 group cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="w-32 aspect-video bg-gray-200 rounded-md overflow-hidden relative">
                         <img src={`https://source.unsplash.com/random/300x200?physics&sig=${i}`} className="w-full h-full object-cover" alt="" />
                         <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1 rounded">10:0{i}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 line-clamp-2 text-sm group-hover:text-[#174A5F]">Related Topic {i}: Advanced Concepts</h4>
                        <p className="text-xs text-gray-500 mt-1">Prof. Wilson</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};
