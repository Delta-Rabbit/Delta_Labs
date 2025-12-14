import React, { useState } from 'react';
import { SupplementForm } from './components/SupplementForm';
import { SupplementTabs } from './components/SupplementTabs';
import { SupplementCard } from './components/SupplementCard';
import type { SupplementType, SupplementResource } from './types';
import { DeltaButton } from '../../../../../../components/theme';
import SearchBar from '../../../../../../components/SearchBar/SearchBar';
import { SupplementSidebar, type SupplementSidebarView } from './components/SupplementSidebar';
import { SupplementViewer } from './components/viewers/SupplementViewer';

const SupplementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SupplementType>('books');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSidebarView, setActiveSidebarView] = useState<SupplementSidebarView>('browse');
  const [isAdding, setIsAdding] = useState(false);
  const [viewingResource, setViewingResource] = useState<SupplementResource | null>(null);

  // Mock Data matching the design
  const mockResources: SupplementResource[] = [
    // Books
    {
      id: 'b1',
      type: 'books',
      title: 'Cambridge Physics',
      author: { name: 'Leul Solomon', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
      coverUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4,
      chapter: 'Chapter 1'
    },
    {
      id: 'b2',
      type: 'books',
      title: 'Essential Physics',
      author: { name: 'Sarah Jones', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
      coverUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 5,
      chapter: 'Chapter 1'
    },
    {
      id: 'b3',
      type: 'books',
      title: 'Advanced Mechanics',
      author: { name: 'David Smith', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
      coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.5,
      chapter: 'Chapter 2'
    },
    {
      id: 'b4',
      type: 'books',
      title: 'Quantum Physics Intro',
      author: { name: 'Emily Chen', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
      coverUrl: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4,
      chapter: 'Chapter 2'
    },

    // Documentations
    {
      id: 'd1',
      type: 'documentations',
      title: 'Physics Formulas Cheat Sheet',
      author: { name: 'Leul Solomon', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
      coverUrl: '',
      rating: 4.5,
      chapter: 'Chapter 1'
    },
    {
      id: 'd2',
      type: 'documentations',
      title: 'Lab Safety Guidelines',
      author: { name: 'Lab Admin', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
      coverUrl: '',
      rating: 4,
      chapter: 'Chapter 1'
    },
    {
      id: 'd3',
      type: 'documentations',
      title: 'Course Syllabus 2024',
      author: { name: 'Prof. Wilson', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
      coverUrl: '',
      rating: 5,
      chapter: 'Introduction'
    },
    {
      id: 'd4',
      type: 'documentations',
      title: 'Experiment Report Template',
      author: { name: 'Leul Solomon', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
      coverUrl: '',
      rating: 3.5,
      chapter: 'Chapter 2'
    },

    // Slides
    {
      id: 's1',
      type: 'slides',
      title: 'Chapter 1 Lecture Slides',
      author: { name: 'Leul Solomon', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
      coverUrl: '',
      rating: 4,
      chapter: 'Chapter 1'
    },
    {
      id: 's2',
      type: 'slides',
      title: 'Newton\'s Laws Presentation',
      author: { name: 'Leul Solomon', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
      coverUrl: '',
      rating: 4.5,
      chapter: 'Chapter 2'
    },
    {
      id: 's3',
      type: 'slides',
      title: 'Energy and Work',
      author: { name: 'Prof. Wilson', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
      coverUrl: '',
      rating: 4,
      chapter: 'Chapter 3'
    },
    {
      id: 's4',
      type: 'slides',
      title: 'Thermodynamics Overview',
      author: { name: 'David Smith', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
      coverUrl: '',
      rating: 5,
      chapter: 'Chapter 4'
    },

    // YouTube
    {
      id: 'y1',
      type: 'youtube',
      title: 'Understanding Projectile Motion',
      author: { name: 'Physics Girl', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
      coverUrl: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 5,
      chapter: 'Chapter 1'
    },
    {
      id: 'y2',
      type: 'youtube',
      title: 'Newton\'s 3 Laws Explained',
      author: { name: 'Veritasium', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
      coverUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      chapter: 'Chapter 2'
    },
    {
      id: 'y3',
      type: 'youtube',
      title: 'Conservation of Energy',
      author: { name: 'CrashCourse', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
      coverUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.9,
      chapter: 'Chapter 3'
    },
    {
      id: 'y4',
      type: 'youtube',
      title: 'Simple Harmonic Motion',
      author: { name: 'Khan Academy', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
      coverUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.7,
      chapter: 'Chapter 4'
    },

    // Generated
    {
        id: 'g1',
        type: 'generated',
        title: 'Chapter 1 Summary Notes',
        author: { name: 'AI Tutor', avatar: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
        coverUrl: '',
        rating: 4.2,
        chapter: 'Chapter 1'
    },
    {
        id: 'g2',
        type: 'generated',
        title: 'Practice Problems: Forces',
        author: { name: 'AI Tutor', avatar: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
        coverUrl: '',
        rating: 4.0,
        chapter: 'Chapter 2'
    },
    {
        id: 'g3',
        type: 'generated',
        title: 'Key Concepts Quiz',
        author: { name: 'AI Tutor', avatar: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
        coverUrl: '',
        rating: 4.5,
        chapter: 'Chapter 2'
    }
  ];

  // Filter resources based on active tab
  const filteredResources = mockResources.filter(resource => {
      // Generated tab might show 'generated' type resources (which I added to mock)
      // or we might want to show everything if 'generated' means something else?
      // Assuming 1:1 mapping for now based on types
      return resource.type === activeTab;
  });

  // Group by chapter
  const groupedResources = filteredResources.reduce((acc, resource) => {
    if (!acc[resource.chapter]) {
      acc[resource.chapter] = [];
    }
    acc[resource.chapter].push(resource);
    return acc;
  }, {} as Record<string, SupplementResource[]>);

  return (
    <div className="w-full font-primary py-6 relative">
      {/* Left Sidebar Navigation */}
      <SupplementSidebar
        activeView={activeSidebarView}
        onViewChange={(view) => {
            setActiveSidebarView(view);
            setIsAdding(false); // Reset add mode when changing views
            setViewingResource(null);
        }}
      />

      <div className="w-full">
          {viewingResource ? (
               <SupplementViewer 
                  resource={viewingResource} 
                  onBack={() => setViewingResource(null)} 
               />
          ) : isAdding ? (
              <SupplementForm onBack={() => setIsAdding(false)} />
          ) : (
              <>
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    {activeSidebarView === 'browse' ? 'Supplements' : 
                     activeSidebarView === 'profile' ? 'Personal' : 
                     'History'}
                </h1>

                <div className="flex items-end justify-between mb-8 border-b border-gray-100">
                    <div className="-mb-px">
                      <SupplementTabs activeTab={activeTab} onTabChange={setActiveTab} />
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4 pb-2">
                        <DeltaButton 
                            variant="primary" 
                            className="bg-[#174A5F] hover:bg-[#123644] text-white px-8 h-12 rounded-lg font-medium"
                            onClick={() => setIsAdding(true)}
                        >
                            Generate
                        </DeltaButton>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="mb-12">
                    <div className="w-[480px]">
                    <SearchBar 
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder="Search"
                        maxWidth="full"
                    />
                    </div>
                </div>

                {/* Content Grid Logic */}
                {activeSidebarView === 'browse' && (
                    <div className="space-y-12">
                        {Object.entries(groupedResources).length > 0 ? (
                            Object.entries(groupedResources).map(([chapter, resources]) => (
                            <div key={chapter}>
                                    <h2 className="text-xl font-bold text-[#174A5F] mb-6">{chapter}</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {resources.map(resource => (
                                            <SupplementCard 
                                                key={resource.id} 
                                                resource={resource} 
                                                onClick={() => setViewingResource(resource)}
                                            />
                                        ))}
                                    </div>
                            </div> 
                            ))
                        ) : (
                            <div className="text-center py-20 text-gray-500">
                                No materials found for this section.
                            </div>
                        )}
                    </div>
                )}

                {activeSidebarView === 'profile' && (
                   <div className="space-y-12">
                        {Object.entries(groupedResources).length > 0 ? (
                            Object.entries(groupedResources).map(([chapter, resources]) => (
                            <div key={chapter}>
                                    <h2 className="text-xl font-bold text-[#174A5F] mb-6">{chapter}</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {/* Just reusing the same resources for demo, but enabling the menu actions */}
                                        {resources.slice(0, 3).map(resource => (
                                            <SupplementCard 
                                                key={resource.id} 
                                                resource={resource} 
                                                enableActions={true} 
                                                onClick={() => setViewingResource(resource)}
                                            />
                                        ))}
                                    </div>
                            </div> 
                            ))
                        ) : (
                            <div className="text-center py-20 text-gray-500">
                                Your library is empty.
                            </div>
                        )}
                    </div>
                )}
                
                {activeSidebarView === 'history' && (
                   <div className="space-y-12">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Show a flat list of "history" items - reusing some mock data */}
                            {filteredResources.slice(0, 5).map(resource => (
                                <SupplementCard 
                                    key={resource.id} 
                                    resource={{...resource, isRead: true}} 
                                    onClick={() => setViewingResource(resource)}
                                />
                            ))}
                        </div>
                        
                        {filteredResources.length === 0 && (
                             <div className="text-center py-20 text-gray-500">
                                No history available.
                            </div>
                        )}
                    </div>
                )}
              </>
          )}
      </div>
    </div>
  );
};

export default SupplementPage;
