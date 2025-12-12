import React, { useState } from 'react';
import type { SupplementResource } from '../../types';
import { DeltaButton } from "../../../../../../../../components/theme";

interface BookViewerProps {
  resource: SupplementResource;
}

export const BookViewer: React.FC<BookViewerProps> = ({ resource }) => {
  const [page, setPage] = useState(1);
  const totalPages = 42; // Mock total pages

  return (
    <div className="flex h-[calc(100vh-200px)] border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
      {/* Table of Contents - Left Sidebar */}
      <div className="w-64 border-r border-gray-200 bg-gray-50 p-6 overflow-y-auto">
        <h3 className="font-bold text-gray-900 mb-4">Table of Contents</h3>
        <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((chap) => (
                <div key={chap} className="text-sm text-gray-700 hover:text-[#174A5F] cursor-pointer py-1">
                    <span className="font-medium mr-2">{chap}.</span>
                    <span>Chapter Title {chap}</span>
                </div>
            ))}
        </div>
      </div>

      {/* Main Content - Reading Area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="h-14 border-b border-gray-100 flex items-center justify-between px-6 bg-white">
            <div className="text-sm text-gray-500">
                Page {page} of {totalPages}
            </div>
            <div className="flex items-center gap-2">
                <button 
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50"
                >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <div className="px-3 py-1 bg-gray-100 rounded text-sm font-medium text-gray-700">{page}</div>
                <button 
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50"
                >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
            </div>
            <div className="flex items-center gap-3">
                 <button className="p-2 hover:bg-gray-100 rounded-lg" title="Zoom In">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                 </button>
                 <button className="p-2 hover:bg-gray-100 rounded-lg" title="Full Screen">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                 </button>
            </div>
        </div>

        {/* Page Content Placeholder */}
        <div className="flex-1 bg-gray-100 overflow-y-auto p-8 flex items-start justify-center">
            <div className="w-full max-w-3xl bg-white shadow-lg min-h-[800px] p-12 relative animate-fadeIn">
                <h1 className="text-3xl font-bold mb-6 text-gray-900">{resource.title}</h1>
                <h2 className="text-xl text-gray-500 mb-8">{resource.chapter}</h2>
                <div className="space-y-6 text-gray-800 leading-relaxed font-serif text-lg">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                    <div className="p-6 bg-blue-50 border-l-4 border-blue-500 my-8">
                        <p className="font-bold text-blue-900 mb-2">Key Concept</p>
                        <p className="text-blue-800 text-base">Physics is the natural science that studies matter, its fundamental constituents, its motion and behavior through space and time, and the related entities of energy and force.</p>
                    </div>
                    <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
                </div>
                <div className="absolute bottom-8 right-8 text-gray-400 text-sm">
                    Page {page}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
