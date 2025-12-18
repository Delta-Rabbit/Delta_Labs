/**
 * Delta Labs Adjust Roadmap Page
 * Edit and customize course roadmap sections and content
 */

import React, { useState } from 'react';
import { DeltaButton } from '../../../../../../../components/theme';

interface ContentItem {
  id: string;
  type: 'document' | 'video' | 'audio';
  title: string;
  description: string;
  tags: string[];
}

interface RoadmapSection {
  id: string;
  title: string;
  description: string;
  tags: string[];
  items: ContentItem[];
  status: 'completed' | 'current' | 'upcoming';
}

interface AdjustRoadmapPageProps {
  onBack?: () => void;
}

const AdjustRoadmapPage: React.FC<AdjustRoadmapPageProps> = ({ onBack }) => {
  const [sections, setSections] = useState<RoadmapSection[]>([
    {
      id: 'section-1',
      title: 'Section 1: Kinematics',
      description: 'The foundation of mechanics describing motion without force',
      tags: ['biology', 'chemistry'],
      items: [
        {
          id: 'item-1',
          type: 'document',
          title: 'Motion',
          description: 'Introduction to position, velocity, and acceleration',
          tags: ['biology', 'chemistry'],
        },
        {
          id: 'item-2',
          type: 'document',
          title: '2D Motion',
          description: 'Projectile motion and circular motion concepts',
          tags: ['biology', 'chemistry'],
        },
        {
          id: 'item-3',
          type: 'document',
          title: 'Physics exam',
          description: 'Comprehensive review of kinematic equations',
          tags: ['biology', 'chemistry'],
        },
      ],
      status: 'completed',
    },
    {
      id: 'section-2',
      title: 'Section 2: Dynamics',
      description: 'Understanding forces and why things move',
      tags: ['physics', 'mechanics'],
      items: [
        {
          id: 'item-2-1',
          type: 'video',
          title: 'Newton\'s Laws',
          description: 'Video lecture covering the three laws of motion',
          tags: ['force', 'inertia'],
        },
        {
          id: 'item-2-2',
          type: 'document',
          title: 'Free Body Diagrams',
          description: 'Guide to drawing and analyzing forces',
          tags: ['diagrams', 'practice'],
        },
        {
          id: 'item-2-3',
          type: 'video',
          title: 'Friction & Drag',
          description: 'Understanding resistive forces in real systems',
          tags: ['friction', 'mechanics'],
        },
         {
          id: 'item-2-4',
          type: 'document',
          title: 'Tension Problems',
          description: 'Solving pulley and rope problems',
          tags: ['tension', 'statics'],
        },
      ],
      status: 'current',
    },
    {
      id: 'section-3',
      title: 'Section 3: Energy',
      description: 'Conservation of energy and work-energy theorem',
      tags: ['energy', 'work'],
      items: [
         {
          id: 'item-3-1',
          type: 'audio',
          title: 'Energy Podcast',
          description: 'Audio discussion on potential and kinetic energy',
          tags: ['podcast', 'intro'],
        },
        {
          id: 'item-3-2',
          type: 'document',
          title: 'Worksheet 3.1',
          description: 'Problem set for Work and Energy',
          tags: ['homework'],
        },
        {
          id: 'item-3-3',
          type: 'video',
          title: 'Conservation Lab',
          description: 'Video demonstration of the lab experiment',
          tags: ['lab', 'practical'],
        },
      ],
      status: 'upcoming',
    }
  ]);

  // Drag and drop state
  const [draggedSectionIndex, setDraggedSectionIndex] = useState<number | null>(null);
  const [draggedContentId, setDraggedContentId] = useState<string | null>(null);
  const [draggedContentSectionId, setDraggedContentSectionId] = useState<string | null>(null);
  const [hoveredContentId, setHoveredContentId] = useState<string| null>(null);
  
  // Drag and drop handlers for sections
  const handleSectionDragStart = (e: React.DragEvent, index: number) => {
    setDraggedSectionIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleSectionDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault(); // Always prevent default to allow drop
    e.stopPropagation(); // Stop propagation to prevent parent handlers
    
    // Check if dragging from sidebar
    const isSidePanel = e.dataTransfer.types.includes('application/x-side-panel');
    
    // Set drop effect
    if (isSidePanel || draggedSectionIndex !== null) {
      e.dataTransfer.dropEffect = 'copy'; // Use copy for sidebar, move for sections
    }
  };

  const handleSectionDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    
    // Check if dragging from sidebar
    const isSidePanel = e.dataTransfer.types.includes('application/x-side-panel');
    
    if (isSidePanel) {
      // Adding new content from sidebar to this section
      try {
        const contentData = JSON.parse(e.dataTransfer.getData('application/json'));
        const newContent: ContentItem = {
          id: `${contentData.id}-${Date.now()}`, // Make unique
          type: contentData.type,
          title: contentData.title,
          description: contentData.description,
          tags: contentData.tags || []
        };

        setSections((prev: RoadmapSection[]) => prev.map((section: RoadmapSection, idx: number) => {
          if (idx === targetIndex) {
            return {
              ...section,
              items: [...section.items, newContent]
            };
          }
          return section;
        }));
      } catch (error) {
        console.error('Failed to parse dragged content:', error);
      }
      return;
    }
    
    // Existing section reordering logic
    if (draggedSectionIndex === null || draggedSectionIndex === targetIndex) {
      return;
    }

    setSections((prev: RoadmapSection[]) => {
      const newSections = [...prev];
      const [draggedSection] = newSections.splice(draggedSectionIndex, 1);
      newSections.splice(targetIndex, 0, draggedSection);
      return newSections;
    });

    setDraggedSectionIndex(null);
  };

  const handleSectionDragEnd = () => {
    setDraggedSectionIndex(null);
  };

  // Drag and drop handlers for content items
  const handleContentDragStart = (e: React.DragEvent, contentId: string, sectionId: string) => {
    setDraggedContentId(contentId);
    setDraggedContentSectionId(sectionId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('application/x-roadmap-content', 'true');
  };

  const handleContentDragOver = (e: React.DragEvent, contentId: string) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
    setHoveredContentId(contentId);
  };

  const handleContentDrop = (e: React.DragEvent, targetSectionId: string, targetContentId?: string) => {
    e.preventDefault();
    e.stopPropagation();

    // Check if dragging from sidebar
    const isSidePanel = e.dataTransfer.types.includes('application/x-side-panel');
    
    if (isSidePanel) {
      // Adding new content from sidebar
      try {
        const contentData = JSON.parse(e.dataTransfer.getData('application/json'));
        const newContent: ContentItem = {
          id: `${contentData.id}-${Date.now()}`, // Make unique
          type: contentData.type,
          title: contentData.title,
          description: contentData.description,
          tags: contentData.tags || []
        };

        setSections((prev: RoadmapSection[]) => prev.map((section: RoadmapSection) => {
          if (section.id === targetSectionId) {
            return {
              ...section,
              items: [...section.items, newContent]
            };
          }
          return section;
        }));
      } catch (error) {
        console.error('Failed to parse dragged content:', error);
      }
      return;
    }

    // Existing logic for roadmap content reordering
    if (!draggedContentId || !draggedContentSectionId) {
      return;
    }

    // Reordering within the same section
    if (targetSectionId === draggedContentSectionId) {
      setSections((prev: RoadmapSection[]) => prev.map((section: RoadmapSection) => {
        if (section.id === targetSectionId) {
          const contents = [...section.items];
          const draggedIndex = contents.findIndex((c: ContentItem) => c.id === draggedContentId);
          const targetIndex = targetContentId 
            ? contents.findIndex((c: ContentItem) => c.id === targetContentId)
            : contents.length;

          if (draggedIndex !== -1 && targetIndex !== -1 && draggedIndex !== targetIndex) {
            const [draggedItem] = contents.splice(draggedIndex, 1);
            contents.splice(targetIndex, 0, draggedItem);
          }

          return { ...section, items: contents };
        }
        return section;
      }));
    } 
    // Moving to a different section
    else {
      setSections((prev: RoadmapSection[]) => {
        let contentToMove: ContentItem | null = null;
        
        // Remove from source section
        const updatedSections = prev.map((section: RoadmapSection) => {
          if (section.id === draggedContentSectionId) {
            contentToMove = section.items.find((c: ContentItem) => c.id === draggedContentId) || null;
            return {
              ...section,
              items: section.items.filter((c: ContentItem) => c.id !== draggedContentId)
            };
          }
          return section;
        });

        // Add to target section
        if (contentToMove) {
          return updatedSections.map((section: RoadmapSection) => {
            if (section.id === targetSectionId) {
              return {
                ...section,
                items: [...section.items, contentToMove!]
              };
            }
            return section;
          });
        }

        return updatedSections;
      });
    }

    setDraggedContentId(null);
    setDraggedContentSectionId(null);
    setHoveredContentId(null);
  };

  const handleContentDragEnd = () => {
    setDraggedContentId(null);
    setDraggedContentSectionId(null);
    setHoveredContentId(null);
  };

  // Remove content item handler
  const handleRemoveContent = (sectionId: string, contentId: string) => {
    setSections((prev: RoadmapSection[]) => prev.map((section: RoadmapSection) => {
      if (section.id === sectionId) {
        return {
          ...section,
          items: section.items.filter((item: ContentItem) => item.id !== contentId)
        };
      }
      return section;
    }));
  };

  // Sidebar state
  const [activeTab, setActiveTab] = useState<'resources' | 'pushed'>('pushed');
  const [expandedSections, setExpandedSections] = useState<{
    testExercise: boolean;
    qa: boolean;
    resourceRequired: boolean;
    supplement: boolean;
    fastSummary: boolean;
  }>({
    testExercise: true,
    qa: false,
    resourceRequired: false,
    supplement: false,
    fastSummary: false,
  });

  // Timeline section collapse state
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleTimelineSection = (sectionId: string) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'document':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'video':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        );
    }
  };

  return (
    <div className="w-full font-primary">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 mr-80">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="text-text-secondary hover:text-text-primary"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-primary-700">Adjust Roadmap</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-text-primary border border-border-primary rounded-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Get Master
          </button>
          <DeltaButton variant="primary" size="md">
            Save Option
          </DeltaButton>
        </div>
      </div>

      {/* Timeline Container */}
      <div className="relative max-w-4xl mx-auto mr-80">
        {/* Vertical Timeline Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-success-500 -translate-x-1/2" />

        {/* Sections */}
        <div className="space-y-12">
          {sections.map((section, sectionIdx) => {
            const isRight = sectionIdx % 2 === 0;
            
            return (
            <div key={section.id} className="relative">
              {/* Section Header - Larger Card */}
              <div className="mb-8">
                <div className="flex items-start gap-4">
                  {isRight ? (
                    <>
                      {/* Timeline Node */}
                      <div className="relative flex-shrink-0 w-1/2 flex justify-end pr-8">
                        <button 
                          onClick={() => toggleTimelineSection(section.id)}
                          className="absolute right-0 top-6 w-8 h-8 rounded-full bg-primary-900 border-4 border-white flex items-center justify-center text-white hover:scale-110 transition-transform shadow-md transform translate-x-1/2 z-10"
                        >
                          {collapsedSections[section.id] ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                            </svg>
                          )}
                        </button>
                      </div>
                      
                      {/* Section Content - Larger */}
                      <div className="flex-1 pl-8">
                    <div 
                      className="bg-white border border-border-primary rounded-xl p-6 shadow-sm hover:shadow-md cursor-move"
                      style={{
                        opacity: draggedSectionIndex === sectionIdx ? 0.5 : 1,
                        transform: draggedSectionIndex === sectionIdx ? 'scale(0.95)' : 'scale(1)',
                        transition: 'all 200ms ease-in-out'
                      }}
                      draggable={true}
                      onDragStart={(e) => handleSectionDragStart(e, sectionIdx)}
                      onDragOver={(e) => handleSectionDragOver(e, sectionIdx)}
                      onDrop={(e) => handleSectionDrop(e, sectionIdx)}
                      onDragEnd={handleSectionDragEnd}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-primary-700">{section.title}</h3>
                        <div className="flex items-center gap-2">

                          <button className="text-text-tertiary hover:text-text-primary">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-text-secondary mb-4 leading-relaxed">{section.description}</p>
                      <div className="flex items-center gap-2">
                        {section.tags.map((tag, idx) => (
                          <span key={idx} className="px-3 py-1 text-xs bg-surface-secondary text-text-secondary rounded-md">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                    </>
                  ) : (
                    <>
                      {/* Section Content - Larger (Left side) */}
                      <div className="flex-1 pr-8">
                        <div 
                          className="bg-white border border-border-primary rounded-xl p-6 shadow-sm hover:shadow-md cursor-move"
                          style={{
                            opacity: draggedSectionIndex === sectionIdx ? 0.5 : 1,
                            transform: draggedSectionIndex === sectionIdx ? 'scale(0.95)' : 'scale(1)',
                            transition: 'all 200ms ease-in-out'
                          }}
                          draggable={true}
                          onDragStart={(e) => handleSectionDragStart(e, sectionIdx)}
                          onDragOver={(e) => handleSectionDragOver(e, sectionIdx)}
                          onDrop={(e) => handleSectionDrop(e, sectionIdx)}
                          onDragEnd={handleSectionDragEnd}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-xl font-bold text-primary-700">{section.title}</h3>
                            <div className="flex items-center gap-2">

                              <button className="text-text-tertiary hover:text-text-primary">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                </svg>
                              </button>
                            </div>
                          </div>
                          <p className="text-sm text-text-secondary mb-4 leading-relaxed">{section.description}</p>
                          <div className="flex items-center gap-2">
                            {section.tags.map((tag, idx) => (
                              <span key={idx} className="px-3 py-1 text-xs bg-surface-secondary text-text-secondary rounded-md">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Timeline Node (Right side for left-aligned sections) */}
                      <div className="relative flex-shrink-0 w-1/2 flex justify-start pl-8">
                        <button 
                          onClick={() => toggleTimelineSection(section.id)}
                          className="absolute left-0 top-6 w-8 h-8 rounded-full bg-primary-900 border-4 border-white flex items-center justify-center text-white hover:scale-110 transition-transform shadow-md transform -translate-x-1/2 z-10"
                        >
                          {collapsedSections[section.id] ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Collapse/Expand Toggle on Timeline */}

              {/* Content Items - Only show if section is not collapsed */}
              {!collapsedSections[section.id] && (
                <div className="space-y-6">
                {section.items.map((item, itemIdx) => {
                  const isLeft = itemIdx % 2 === 0;
                  
                  return (
                    <div key={item.id} className="relative">
                      <div className="flex items-start gap-4">
                        {isLeft ? (
                          <>
                            {/* Left Side Content - Smaller */}
                            <div className="flex-1 pr-8 flex justify-end">
                              <div 
                                className="group w-full max-w-xs bg-white border border-primary-200 rounded-lg p-3 shadow-sm hover:shadow cursor-move relative"
                                style={{
                                  opacity: draggedContentId === item.id ? 0.5 : 1,
                                  transform: draggedContentId === item.id ? 'scale(0.95)' : 
                                             hoveredContentId === item.id ? 'scale(1.05)' : 
                                             'scale(1)',
                                  transition: 'all 200ms ease-in-out'
                                }}
                                draggable={true}
                                onDragStart={(e) => {
                                  handleContentDragStart(e, item.id, section.id);
                                  e.dataTransfer.setData('application/x-roadmap-content', 'true');
                                }}
                                onDragOver={(e) => {
                                  if (draggedContentId && draggedContentId !== item.id) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setHoveredContentId(item.id);
                                  }
                                }}
                                onDragLeave={(e) => {
                                  const relatedTarget = e.relatedTarget as HTMLElement;
                                  if (!relatedTarget || !e.currentTarget.contains(relatedTarget)) {
                                    setHoveredContentId(null);
                                  }
                                }}
                                onDrop={(e) => handleContentDrop(e, section.id, item.id)}
                                onDragEnd={handleContentDragEnd}
                              >
                                {/* Remove Button */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveContent(section.id, item.id);
                                  }}
                                  onMouseDown={(e) => e.stopPropagation()}
                                  className="absolute -top-2 -right-2 w-6 h-6 bg-error-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-error-700 z-50 shadow-md"
                                  title="Remove item"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                                  </svg>
                                </button>
                                <div className="flex items-start gap-2">
                                  <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded flex items-center justify-center text-primary-700">
                                    {getIconForType(item.type)}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-start justify-between mb-1">
                                      <h4 className="text-sm font-semibold text-primary-700">{item.title}</h4>
                                      <button className="text-text-tertiary hover:text-text-primary">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                        </svg>
                                      </button>
                                    </div>
                                    <p className="text-xs text-text-secondary mb-2">{item.description}</p>
                                    <div className="flex items-center gap-1 flex-wrap">
                                      {item.tags.map((tag, idx) => (
                                        <span key={idx} className="px-2 py-0.5 text-xs bg-surface-secondary text-text-secondary rounded">
                                          #{tag}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* Timeline Node - Smaller with minus icon */}
                            <div className="relative flex-shrink-0">
                              <div className="w-4 h-4 rounded-full bg-white border-4 border-success-500 shadow-sm" />
                              {/* Connector Line to Left */}
                              <div className="absolute top-3 right-6 w-8 h-0.5 bg-success-500" />
                            </div>
                            {/* Right Side Empty */}
                            <div className="flex-1 pl-8" />
                          </>
                        ) : (
                          <>
                            {/* Left Side Empty */}
                            <div className="flex-1 pr-8" />
                            {/* Timeline Node - Smaller with minus icon */}
                            <div className="relative flex-shrink-0">
                              <div className="w-4 h-4 rounded-full bg-white border-4 border-success-500 shadow-sm" />
                              {/* Connector Line to Right */}
                              <div className="absolute top-3 left-6 w-8 h-0.5 bg-success-500" />
                            </div>
                            {/* Right Side Content - Smaller */}
                            <div className="flex-1 pl-8 flex justify-start">
                              <div 
                                className="group w-full max-w-xs bg-white border border-primary-200 rounded-lg p-3 shadow-sm hover:shadow cursor-move relative"
                                style={{
                                  opacity: draggedContentId === item.id ? 0.5 : 1,
                                  transform: draggedContentId === item.id ? 'scale(0.95)' : 
                                             hoveredContentId === item.id ? 'scale(1.05)' : 
                                             'scale(1)',
                                  transition: 'all 200ms ease-in-out'
                                }}
                                draggable={true}
                                onDragStart={(e) => {
                                  handleContentDragStart(e, item.id, section.id);
                                  e.dataTransfer.setData('application/x-roadmap-content', 'true');
                                }}
                                onDragOver={(e) => {
                                  if (draggedContentId && draggedContentId !== item.id) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setHoveredContentId(item.id);
                                  }
                                }}
                                onDragLeave={(e) => {
                                  const relatedTarget = e.relatedTarget as HTMLElement;
                                  if (!relatedTarget || !e.currentTarget.contains(relatedTarget)) {
                                    setHoveredContentId(null);
                                  }
                                }}
                                onDrop={(e) => handleContentDrop(e, section.id, item.id)}
                                onDragEnd={handleContentDragEnd}
                              >
                                {/* Remove Button */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveContent(section.id, item.id);
                                  }}
                                  onMouseDown={(e) => e.stopPropagation()}
                                  className="absolute -top-2 -right-2 w-6 h-6 bg-error-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-error-700 z-50 shadow-md"
                                  title="Remove item"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                                  </svg>
                                </button>
                                <div className="flex items-start gap-2">
                                  <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded flex items-center justify-center text-primary-700">
                                    {getIconForType(item.type)}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-start justify-between mb-1">
                                      <h4 className="text-sm font-semibold text-primary-700">{item.title}</h4>
                                      <button className="text-text-tertiary hover:text-text-primary">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                        </svg>
                                      </button>
                                    </div>
                                    <p className="text-xs text-text-secondary mb-2">{item.description}</p>
                                    <div className="flex items-center gap-1 flex-wrap">
                                      {item.tags.map((tag, idx) => (
                                        <span key={idx} className="px-2 py-0.5 text-xs bg-surface-secondary text-text-secondary rounded">
                                          #{tag}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
              )}
            </div>
          );
          })}
        </div>
      </div>

      {/* Right Sidebar - Fixed Position */}
      <div className="fixed right-0 top-[60px] h-[calc(100vh-60px)] w-80 border-l border-border-primary flex flex-col shadow-lg z-40 bg-white">
        {/* Content Container */}
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Resources Section with Tabs */}
          <div className="border-b border-border-primary">
            <div className="flex border-b border-border-primary">
              <button 
                onClick={() => setActiveTab('resources')}
                className={`flex-1 px-4 py-3 text-sm transition-colors ${
                  activeTab === 'resources' 
                    ? 'font-semibold text-text-primary border-b-2 border-primary-500' 
                    : 'text-text-tertiary hover:text-text-primary'
                }`}
              >
                Resources
              </button>
              <button 
                onClick={() => setActiveTab('pushed')}
                className={`flex-1 px-4 py-3 text-sm transition-colors ${
                  activeTab === 'pushed' 
                    ? 'font-semibold text-text-primary border-b-2 border-primary-500' 
                    : 'text-text-tertiary hover:text-text-primary'
                }`}
              >
                Pushed
              </button>
            </div>
          </div>

          {/* Test & Exercise Section */}
          <div className="border-b border-border-primary">
            <button 
              onClick={() => toggleSection('testExercise')}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-surface-secondary transition-colors"
            >
              <span className="font-semibold text-text-primary">Test & Exercise</span>
              <svg 
                className={`w-5 h-5 text-text-tertiary transition-transform ${
                  expandedSections.testExercise ? 'rotate-180' : ''
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {expandedSections.testExercise && (
              <div className="px-4 pb-4 space-y-3">
                <div className="flex justify-end">
                  <button className="text-xs text-primary-600 hover:text-primary-700">View more</button>
                </div>
                <div 
                  className="border border-primary-200 rounded-lg p-3 bg-primary-50/30 cursor-move hover:shadow-md transition-shadow"
                  draggable={true}
                  onDragStart={(e) => {
                    const contentData = {
                      id: 'physics-question-1',
                      type: 'document',
                      title: 'Physics Question',
                      description: 'Technical task description',
                      tags: ['physics', 'exercise']
                    };
                    e.dataTransfer.setData('application/json', JSON.stringify(contentData));
                    e.dataTransfer.setData('application/x-side-panel', 'true');
                    e.dataTransfer.effectAllowed = 'copy';
                  }}
                  onDragEnd={() => {
                    // Clear any drag state if needed
                  }}
                >
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-text-primary mb-1">Physics Question</h4>
                      <p className="text-xs text-text-secondary">Technical task description</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Question & Answer Section */}
          <div className="border-b border-border-primary">
            <button 
              onClick={() => toggleSection('qa')}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-surface-secondary transition-colors"
            >
              <span className="font-semibold text-text-primary">Question & Answer</span>
              <svg 
                className={`w-5 h-5 text-text-tertiary transition-transform ${
                  expandedSections.qa ? 'rotate-180' : ''
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Resource Required Section */}
          <div className="border-b border-border-primary">
            <button 
              onClick={() => toggleSection('resourceRequired')}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-surface-secondary transition-colors"
            >
              <span className="font-semibold text-text-primary">Resource Required</span>
              <svg 
                className={`w-5 h-5 text-text-tertiary transition-transform ${
                  expandedSections.resourceRequired ? 'rotate-180' : ''
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {expandedSections.resourceRequired && (
              <div className="px-4 pb-4 space-y-3">
                <div 
                  className="border border-primary-200 rounded-lg p-3 bg-primary-50/30 cursor-move hover:shadow-md transition-shadow"
                  draggable={true}
                  onDragStart={(e) => {
                    const contentData = {
                      id: 'study-guide-doc',
                      type: 'document',
                      title: 'Study Guide',
                      description: 'Comprehensive study material',
                      tags: ['study', 'guide']
                    };
                    e.dataTransfer.setData('application/json', JSON.stringify(contentData));
                    e.dataTransfer.setData('application/x-side-panel', 'true');
                    e.dataTransfer.effectAllowed = 'copy';
                  }}
                >
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-text-primary mb-1">Study Guide</h4>
                      <p className="text-xs text-text-secondary">Comprehensive study material</p>
                    </div>
                  </div>
                </div>
                <div 
                  className="border border-primary-200 rounded-lg p-3 bg-primary-50/30 cursor-move hover:shadow-md transition-shadow"
                  draggable={true}
                  onDragStart={(e) => {
                    const contentData = {
                      id: 'tutorial-video',
                      type: 'video',
                      title: 'Video Tutorial',
                      description: 'Step by step video guide',
                      tags: ['video', 'tutorial']
                    };
                    e.dataTransfer.setData('application/json', JSON.stringify(contentData));
                    e.dataTransfer.setData('application/x-side-panel', 'true');
                    e.dataTransfer.effectAllowed = 'copy';
                  }}
                >
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-text-primary mb-1">Video Tutorial</h4>
                      <p className="text-xs text-text-secondary">Step by step video guide</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Supplement Section */}
          <div className="border-b border-border-primary">
            <button 
              onClick={() => toggleSection('supplement')}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-surface-secondary transition-colors"
            >
              <span className="font-semibold text-text-primary">Supplement</span>
              <svg 
                className={`w-5 h-5 text-text-tertiary transition-transform ${
                  expandedSections.supplement ? 'rotate-180' : ''
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {expandedSections.supplement && (
              <div className="px-4 pb-4 space-y-3">
                <div 
                  className="border border-primary-200 rounded-lg p-3 bg-primary-50/30 cursor-move hover:shadow-md transition-shadow"
                  draggable={true}
                  onDragStart={(e) => {
                    const contentData = {
                      id: 'audio-lecture',
                      type: 'audio',
                      title: 'Audio Lecture',
                      description: 'Detailed audio explanation',
                      tags: ['audio', 'lecture']
                    };
                    e.dataTransfer.setData('application/json', JSON.stringify(contentData));
                    e.dataTransfer.setData('application/x-side-panel', 'true');
                    e.dataTransfer.effectAllowed = 'copy';
                  }}
                >
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-text-primary mb-1">Audio Lecture</h4>
                      <p className="text-xs text-text-secondary">Detailed audio explanation</p>
                    </div>
                  </div>
                </div>
                <div 
                  className="border border-primary-200 rounded-lg p-3 bg-primary-50/30 cursor-move hover:shadow-md transition-shadow"
                  draggable={true}
                  onDragStart={(e) => {
                    const contentData = {
                      id: 'practice-doc',
                      type: 'document',
                      title: 'Practice Exercise',
                      description: 'Additional practice problems',
                      tags: ['practice', 'exercise']
                    };
                    e.dataTransfer.setData('application/json', JSON.stringify(contentData));
                    e.dataTransfer.setData('application/x-side-panel', 'true');
                    e.dataTransfer.effectAllowed = 'copy';
                  }}
                >
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-text-primary mb-1">Practice Exercise</h4>
                      <p className="text-xs text-text-secondary">Additional practice problems</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Fast Summary Section */}
          <div className="border-b border-border-primary">
            <button 
              onClick={() => toggleSection('fastSummary')}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-surface-secondary transition-colors"
            >
              <span className="font-semibold text-text-primary">Fast Summary</span>
              <svg 
                className={`w-5 h-5 text-text-tertiary transition-transform ${
                  expandedSections.fastSummary ? 'rotate-180' : ''
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdjustRoadmapPage;
