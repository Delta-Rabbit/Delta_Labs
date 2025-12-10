/**
 * Delta Labs Course Combiner Component (Comprehensive Refactored)
 * Screen where users combine courses to create Super Courses
 * 
 * This is a comprehensive refactored version that:
 * - Uses atomic, reusable components for UI rendering
 * - Uses custom hooks for state management
 * - Preserves all complex drag-and-drop logic
 * - Uses Delta Labs theme tokens throughout
 */

import React from 'react';
import type { DragEvent } from 'react';
import { DeltaButton } from '../../../../../components/theme';
import CourseSelectionModal, { type Course } from './CourseSelectionModal';
import {
  CourseCombinerToolbar,
  CourseRoadmapSidebar,
  CreateSectionModal,
  PreviewModal,
  CanvasContentItem,
  RoadmapSectionCard,
  type CourseData,
  type CourseSection,
  type CourseContentItem,
} from './course-combiner';
import {
  useCourseCombinerState,
  useDragAndDrop,
  type RoadmapNode,
} from './course-combiner/hooks';

// ============================================================================
// TYPES
// ============================================================================

interface CourseCombinerProps {
  courseId: string;
  courseTitle: string;
  onBack?: () => void;
}

// Sample courses for selection modal
const sampleCourses: Course[] = [
  {
    id: 'course-2',
    title: 'Physics',
    university: 'Addis Ababa University',
    rating: 4,
    duration: '4 Weeks',
    chapters: 15,
    enrolled: '2,345',
  },
  {
    id: 'course-3',
    title: 'Mathematics',
    university: 'Addis Ababa University',
    rating: 5,
    duration: '6 Weeks',
    chapters: 20,
    enrolled: '3,567',
  },
  {
    id: 'course-4',
    title: 'Biology',
    university: 'Addis Ababa University',
    rating: 4,
    duration: '5 Weeks',
    chapters: 18,
    enrolled: '1,890',
  },
];

// ============================================================================
// COURSE COMBINER COMPONENT
// ============================================================================

const CourseCombiner: React.FC<CourseCombinerProps> = ({ 
  courseId, 
  courseTitle,
  onBack 
}: CourseCombinerProps) => {
  // Sample course data - will be replaced with actual data from API
  const initialCourseData: CourseData = {
    id: courseId,
    title: courseTitle,
    sections: [
      {
        id: 'section-1',
        title: 'Section 1',
        description: 'The technical task is attached as a file .doc Please read it carefully and follow the instru...',
        tags: ['#biology', '#biology'],
        contents: [
          {
            id: 'doc-1',
            type: 'document',
            title: 'Documents 1',
            description: 'The technical task is attached as a file .doc Please read it carefully and follow the instru...',
            tags: ['#Physics', '#Chapter 1'],
          },
          {
            id: 'video-1',
            type: 'video',
            title: 'Video',
            description: 'The technical task is attached as a file .doc Please read it carefully and follow the instru...',
            tags: ['#Physics', '#Chapter 1'],
          },
          {
            id: 'audio-1',
            type: 'audio',
            title: 'Audio',
            description: 'The technical task is attached as a file .doc Please read it carefully and follow the instru...',
            tags: ['#Physics', '#Chapter 1'],
          },
        ],
      },
      {
        id: 'section-2',
        title: 'Section 2',
        description: 'The technical task is attached as a file .doc Please read it carefully and follow the instru...',
        tags: ['#biology'],
        contents: [],
      },
    ],
  };

  // Use centralized state hook
  const state = useCourseCombinerState(courseId, courseTitle, initialCourseData);
  const {
    selectedCourses,
    setSelectedCourses,
    collapsedSections,
    setCollapsedSections,
    isCourseSelectionModalOpen,
    setIsCourseSelectionModalOpen,
    isCreateSectionModalOpen,
    setIsCreateSectionModalOpen,
    isPreviewModalOpen,
    setIsPreviewModalOpen,
    courseToReplace,
    setCourseToReplace,
    roadmapNodes,
    setRoadmapNodes,
    combinedCourseData,
    setCombinedCourseData,
    collapsedRoadmapSections,
    setCollapsedRoadmapSections,
    draggedItem,
    setDraggedItem,
    isDraggingOver,
    setIsDraggingOver,
    draggedNodeId,
    setDraggedNodeId,
    hoveredNodeId,
    setHoveredNodeId,
    usedItems,
    setUsedItems,
    draggedContentId,
    setDraggedContentId,
    draggedContentSectionId,
    setDraggedContentSectionId,
    hoveredContentId,
    setHoveredContentId,
    hoveredSectionContentArea,
    setHoveredSectionContentArea,
    newSectionName,
    setNewSectionName,
    newSectionDescription,
    setNewSectionDescription,
    newSectionTags,
    setNewSectionTags,
    previewContent,
    setPreviewContent,
    canvasRef,
  } = state;

  // Use drag and drop hook (basic handlers)
  const dragAndDrop = useDragAndDrop({
    roadmapNodes,
    setRoadmapNodes,
    usedItems,
    setUsedItems,
    collapsedRoadmapSections,
    setCollapsedRoadmapSections,
    draggedItem,
    setDraggedItem,
    draggedNodeId,
    setDraggedNodeId,
    hoveredNodeId,
    setHoveredNodeId,
    draggedContentId,
    setDraggedContentId,
    draggedContentSectionId,
    setDraggedContentSectionId,
    hoveredContentId,
    setHoveredContentId,
    canvasRef,
  });

  // ============================================================================
  // HELPER FUNCTIONS
  // ============================================================================

  const toggleSection = (sectionId: string, courseId?: string) => {
    const key = courseId || selectedCourses[0]?.id || '';
    setCollapsedSections((prev: Record<string, Record<string, boolean>>) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [sectionId]: !prev[key]?.[sectionId],
      }
    }));
  };

  const isSectionExpanded = (sectionId: string, courseId?: string) => {
    const key = courseId || selectedCourses[0]?.id || '';
    return collapsedSections[key]?.[sectionId] !== true;
  };

  // ============================================================================
  // COURSE SELECTION HANDLERS
  // ============================================================================

  const handleCourseSelection = (course: Course, replaceIndex?: number) => {
    const newCourseData: CourseData = {
      id: course.id,
      title: course.title,
      sections: [
        {
          id: `${course.id}-section-1`,
          title: `${course.title} - Section 1`,
          description: 'The technical task is attached as a file .doc Please read it carefully and follow the instru...',
          tags: ['#biology', '#chemistry'],
          contents: [
            {
              id: `${course.id}-doc-1`,
              type: 'document',
              title: 'Documents 1',
              description: 'The technical task is attached as a file .doc Please read it carefully and follow the instru...',
              tags: ['#Physics', '#Chapter 1'],
            },
            {
              id: `${course.id}-video-1`,
              type: 'video',
              title: 'Video',
              description: 'The technical task is attached as a file .doc Please read it carefully and follow the instru...',
              tags: ['#Physics', '#Chapter 1'],
            },
          ],
        },
        {
          id: `${course.id}-section-2`,
          title: `${course.title} - Section 2`,
          description: 'The technical task is attached as a file .doc Please read it carefully and follow the instru...',
          tags: ['#biology'],
          contents: [],
        },
      ],
    };

    const targetIndex = replaceIndex !== undefined ? replaceIndex : courseToReplace;

    if (targetIndex !== undefined) {
      setSelectedCourses((prev: Array<{ id: string; title: string; data: CourseData }>) => {
        const newCourses = [...prev];
        const existingIndex = newCourses.findIndex((c: { id: string; title: string; data: CourseData }) => c.id === course.id);
        if (existingIndex !== -1 && existingIndex !== targetIndex) {
          newCourses.splice(existingIndex, 1);
          const adjustedIndex = existingIndex < targetIndex ? targetIndex - 1 : targetIndex;
          newCourses[adjustedIndex] = { id: course.id, title: course.title, data: newCourseData };
          return newCourses;
        }
        newCourses[targetIndex] = { id: course.id, title: course.title, data: newCourseData };
        return newCourses;
      });
    } else {
      if (!selectedCourses.find((c: { id: string; title: string; data: CourseData }) => c.id === course.id)) {
        setSelectedCourses((prev: Array<{ id: string; title: string; data: CourseData }>) => [...prev, { id: course.id, title: course.title, data: newCourseData }]);
      }
    }
    setCourseToReplace(undefined);
    setIsCourseSelectionModalOpen(false);
  };

  const handleRemoveCourse = (courseIndex: number) => {
    setSelectedCourses((prev: Array<{ id: string; title: string; data: CourseData }>) => prev.filter((_: { id: string; title: string; data: CourseData }, index: number) => index !== courseIndex));
  };

  const handleChangeCourse = (courseIndex: number) => {
    setCourseToReplace(courseIndex);
    setIsCourseSelectionModalOpen(true);
  };

  // ============================================================================
  // SECTION CREATION HANDLERS
  // ============================================================================

  const calculateStructuredPosition = (nodes: RoadmapNode[]): { x: number; y: number; parentId?: string; level: number } => {
    const nodeSpacing = 220;
    const sectionLeftOffset = 24; // left-6 = 1.5rem = 24px

    if (nodes.length === 0) {
      return {
        x: sectionLeftOffset,
        y: 160,
        level: 0,
      };
    }

    const sortedByY = [...nodes].sort((a, b) => b.position.y - a.position.y);
    const bottommostNode = sortedByY[0];
    const sectionData = bottommostNode.data as CourseSection;
    const sectionCardHeight = 100;
    const contentItemHeight = 120;
    const sectionBottomPadding = 20;
    const connectionNodeHeight = 24;

    let sectionTotalHeight = sectionCardHeight + sectionBottomPadding;
    const isCollapsed = collapsedRoadmapSections[bottommostNode.id];
    
    if (sectionData.contents && sectionData.contents.length > 0 && !isCollapsed) {
      sectionTotalHeight += sectionData.contents.length * contentItemHeight;
    }
    
    sectionTotalHeight += connectionNodeHeight;
    const sectionGap = 60;
    const newY = bottommostNode.position.y + sectionTotalHeight + sectionGap;

    return {
      x: sectionLeftOffset,
      y: newY,
      parentId: bottommostNode.id,
      level: bottommostNode.level,
    };
  };

  const handleCreateSection = () => {
    if (!newSectionName.trim()) {
      alert('Please enter a section name');
      return;
    }

    const tags = newSectionTags
      .split(',')
      .map((tag: string) => tag.trim())
      .filter((tag: string) => tag.length > 0)
      .map((tag: string) => tag.startsWith('#') ? tag : `#${tag}`);

    const newSection: CourseSection = {
      id: `custom-section-${Date.now()}`,
      title: newSectionName.trim(),
      description: newSectionDescription.trim(),
      tags: tags,
      contents: [],
    };

    const position = calculateStructuredPosition(roadmapNodes);

    const newNode: RoadmapNode = {
      id: newSection.id,
      type: 'section',
      data: newSection,
      position,
      connections: [],
      parentId: undefined,
      level: 0,
    };

    setRoadmapNodes((prev: RoadmapNode[]) => [...prev, newNode]);
    setCollapsedRoadmapSections((prev: Record<string, boolean>) => ({
      ...prev,
      [newSection.id]: false,
    }));

    setNewSectionName('');
    setNewSectionDescription('');
    setNewSectionTags('');
    setIsCreateSectionModalOpen(false);
  };

  // ============================================================================
  // DRAG AND DROP HANDLERS (Complex Logic Preserved from Original)
  // ============================================================================

  // Enhanced drag handlers that extend the hook's basic handlers
  const handleDragStart = (e: DragEvent, type: 'section' | 'content', data: CourseSection | CourseContentItem) => {
    dragAndDrop.handleDragStart(e, type, data);
  };

  const handleDragEnd = () => {
    dragAndDrop.handleDragEnd();
  };

  const handleNodeDragStart = (e: DragEvent, nodeId: string) => {
    dragAndDrop.handleNodeDragStart(e, nodeId);
  };

  const handleNodeDragOver = (e: DragEvent, targetNodeId: string) => {
    dragAndDrop.handleNodeDragOver(e, targetNodeId);
  };

  // Complex drop handler - preserves all logic from original
  const handleNodeDrop = (e: DragEvent, targetNodeId: string, targetContentIdParam?: string) => {
    e.preventDefault();
    e.stopPropagation();

    // FIRST: Check if we're reordering content within a section
    if (draggedContentId && draggedContentSectionId) {
      let targetContentId = targetContentIdParam;
      
      if (!targetContentId && hoveredContentId) {
        targetContentId = hoveredContentId;
      }
      
      if (!targetContentId) {
        targetContentId = e.dataTransfer.getData('application/x-target-content-id');
      }
      
      const targetSectionNode = roadmapNodes.find((n: RoadmapNode) => n.id === targetNodeId);
      
      // Reordering within same section
      if (targetSectionNode && targetSectionNode.type === 'section' && targetSectionNode.id === draggedContentSectionId) {
        const sectionData = targetSectionNode.data as CourseSection;
        const draggedIndex = sectionData.contents.findIndex((c: CourseContentItem) => c.id === draggedContentId);
        
        let targetIndex = -1;
        if (targetContentId && targetContentId !== draggedContentId) {
          targetIndex = sectionData.contents.findIndex((c: CourseContentItem) => c.id === targetContentId);
        }
        
        if (targetIndex === -1 && hoveredContentId && hoveredContentId !== draggedContentId) {
          targetIndex = sectionData.contents.findIndex((c: CourseContentItem) => c.id === hoveredContentId);
        }
        
        if (targetIndex === -1) {
          targetIndex = sectionData.contents.length;
        }
        
        if (draggedIndex !== -1 && targetIndex !== -1 && draggedIndex !== targetIndex) {
          const newContents = [...sectionData.contents];
          const [removed] = newContents.splice(draggedIndex, 1);
          
          let adjustedTargetIndex: number;
          if (draggedIndex < targetIndex) {
            adjustedTargetIndex = targetIndex;
          } else {
            adjustedTargetIndex = targetIndex;
          }
          
          newContents.splice(adjustedTargetIndex, 0, removed);
          
          setRoadmapNodes((prev: RoadmapNode[]) => prev.map((node: RoadmapNode) => {
            if (node.id === targetSectionNode.id) {
              return {
                ...node,
                data: {
                  ...sectionData,
                  contents: newContents
                } as CourseSection
              };
            }
            return node;
          }));
          
          setDraggedContentId(null);
          setDraggedContentSectionId(null);
          setHoveredContentId(null);
          return;
        } else if (draggedIndex === targetIndex) {
          setDraggedContentId(null);
          setDraggedContentSectionId(null);
          setHoveredContentId(null);
          return;
        }
        
        setDraggedContentId(null);
        setDraggedContentSectionId(null);
        setHoveredContentId(null);
        return;
      }
      
      // Moving content to a different section
      if (targetSectionNode && targetSectionNode.type === 'section' && targetSectionNode.id !== draggedContentSectionId) {
        const sourceSectionNode = roadmapNodes.find((n: RoadmapNode) => n.id === draggedContentSectionId);
        if (sourceSectionNode && sourceSectionNode.type === 'section') {
          const sourceSectionData = sourceSectionNode.data as CourseSection;
          const targetSectionData = targetSectionNode.data as CourseSection;
          const contentToMove = sourceSectionData.contents.find((c: CourseContentItem) => c.id === draggedContentId);
          
          if (contentToMove) {
            const updatedSourceSection = {
              ...sourceSectionData,
              contents: sourceSectionData.contents.filter((c: CourseContentItem) => c.id !== draggedContentId)
            };
            
            const updatedTargetSection = {
              ...targetSectionData,
              contents: [...(targetSectionData.contents || []), contentToMove]
            };
            
            setRoadmapNodes((prev: RoadmapNode[]) => prev.map((node: RoadmapNode) => {
              if (node.id === draggedContentSectionId) {
                return { ...node, data: updatedSourceSection };
              }
              if (node.id === targetSectionNode.id) {
                return { ...node, data: updatedTargetSection };
              }
              return node;
            }));
          }
        }
        
        setDraggedContentId(null);
        setDraggedContentSectionId(null);
        setHoveredContentId(null);
        return;
      }
      
      setDraggedContentId(null);
      setDraggedContentSectionId(null);
      setHoveredContentId(null);
      return;
    }

    // Check if we're dropping a content item from side panel onto a section
    let itemData = draggedItem;
    if (!itemData) {
      try {
        const data = JSON.parse(e.dataTransfer.getData('application/json'));
        itemData = { type: data.type, data: data.data };
      } catch {
        // Not a JSON drop, continue with node reordering
      }
    }
    if (itemData && itemData.type === 'content') {
      const targetNode = roadmapNodes.find((n: RoadmapNode) => n.id === targetNodeId);
      if (targetNode && targetNode.type === 'section') {
        const sectionData = targetNode.data as CourseSection;
        const contentData = itemData.data as CourseContentItem;
        
        if (sectionData.contents && sectionData.contents.some((c: CourseContentItem) => c.id === contentData.id)) {
          setDraggedItem(null);
          setHoveredNodeId(null);
          return;
        }

        setRoadmapNodes((prev: RoadmapNode[]) => prev.map((node: RoadmapNode) => {
          if (node.id === targetNodeId && node.type === 'section') {
            const updatedSection = node.data as CourseSection;
            return {
              ...node,
              data: {
                ...updatedSection,
                contents: [...(updatedSection.contents || []), contentData]
              } as CourseSection
            };
          }
          return node;
        }));

        setUsedItems((prev: Set<string>) => {
          const newSet = new Set(prev);
          newSet.add(contentData.id);
          return newSet;
        });

        setDraggedItem(null);
        setHoveredNodeId(null);
        return;
      }
    }

    // If dropping an existing node for reordering sections
    if (!draggedNodeId || draggedNodeId === targetNodeId) {
      setDraggedNodeId(null);
      setHoveredNodeId(null);
      return;
    }

    setRoadmapNodes((prev: RoadmapNode[]) => {
      const draggedNode = prev.find((n: RoadmapNode) => n.id === draggedNodeId);
      const targetNode = prev.find((n: RoadmapNode) => n.id === targetNodeId);

      if (!draggedNode || !targetNode) return prev;

      const draggedY = draggedNode.position.y;
      const targetY = targetNode.position.y;
      
      return prev.map((node: RoadmapNode) => {
        if (node.id === draggedNodeId) {
          return {
            ...node,
            position: { ...node.position, y: targetY },
          };
        }
        if (node.id === targetNodeId) {
          return {
            ...node,
            position: { ...node.position, y: draggedY },
          };
        }
        return node;
      });
    });

    setDraggedNodeId(null);
    setHoveredNodeId(null);
  };

  // Remove a node from the roadmap
  const handleRemoveNode = (nodeId: string) => {
    setRoadmapNodes((prev: RoadmapNode[]) => {
      const nodeToRemove = prev.find((n: RoadmapNode) => n.id === nodeId);
      if (!nodeToRemove) return prev;

      const updatedNodes = prev.filter((n: RoadmapNode) => n.id !== nodeId);

      const cleanedNodes = updatedNodes.map((node: RoadmapNode) => ({
        ...node,
        connections: node.connections.filter((connId: string) => connId !== nodeId),
        parentId: node.parentId === nodeId ? undefined : node.parentId,
      }));

      setUsedItems((prev: Set<string>) => {
        const newSet = new Set(prev);
        newSet.delete(nodeToRemove.data.id);
        
        if (nodeToRemove.type === 'section') {
          const sectionData = nodeToRemove.data as CourseSection;
          if (sectionData.contents && sectionData.contents.length > 0) {
            sectionData.contents.forEach((content: CourseContentItem) => {
              newSet.delete(content.id);
            });
          }
        }
        
        return newSet;
      });

      return cleanedNodes;
    });
  };

  // Calculate structured position for new node
  const calculateStructuredPositionForDrop = (dropX: number, dropY: number, canvasWidth: number, nodeType?: 'section' | 'content'): { x: number; y: number; parentId?: string; level: number } => {
    const centerX = canvasWidth / 2;
    const nodeSpacing = 220;
    const sectionLeftOffset = 24;

    if (roadmapNodes.length === 0) {
      if (nodeType === 'section') {
        return {
          x: sectionLeftOffset,
          y: 160,
          level: 0,
        };
      }
      return {
        x: centerX,
          y: 160,
          level: 0,
        };
      }
      
    if (nodeType === 'section') {
      const sortedByY = [...roadmapNodes].sort((a, b) => b.position.y - a.position.y);
      const bottommostNode = sortedByY[0];
      
      const sectionData = bottommostNode.data as CourseSection;
      const sectionCardHeight = 100;
      const contentItemHeight = 120;
      const sectionBottomPadding = 20;
      const connectionNodeHeight = 24;
      
      let sectionTotalHeight = sectionCardHeight + sectionBottomPadding;
      const isCollapsed = collapsedRoadmapSections[bottommostNode.id];
      
      if (sectionData.contents && sectionData.contents.length > 0 && !isCollapsed) {
        sectionTotalHeight += sectionData.contents.length * contentItemHeight;
      }
      
      sectionTotalHeight += connectionNodeHeight;
      const sectionGap = 60;
      const newY = bottommostNode.position.y + sectionTotalHeight + sectionGap;
      
      return {
        x: sectionLeftOffset,
        y: newY,
        parentId: bottommostNode.id,
        level: bottommostNode.level,
      };
    }

    const sortedByY = [...roadmapNodes].sort((a, b) => b.position.y - a.position.y);
    const bottommostNode = sortedByY[0];
    const newY = bottommostNode.position.y + nodeSpacing;

    if (bottommostNode.parentId) {
      return {
        x: bottommostNode.position.x,
        y: newY,
        parentId: bottommostNode.parentId,
        level: bottommostNode.level,
      };
    }

    return {
      x: bottommostNode.position.x,
      y: newY,
      level: bottommostNode.level,
    };
  };

  // Drop handlers for canvas
  const handleDragOver = (e: DragEvent) => {
    const isRoadmapContent = e.dataTransfer.types.includes('application/x-roadmap-content') || 
                             draggedContentId;
    
    if (isRoadmapContent) {
      e.dataTransfer.dropEffect = 'none';
      setIsDraggingOver(false);
      return;
    }
    
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDraggingOver(true);
  };

  const handleDragEnter = (e: DragEvent) => {
    const isRoadmapContent = e.dataTransfer.types.includes('application/x-roadmap-content');
    if (isRoadmapContent) {
      e.dataTransfer.dropEffect = 'none';
    setIsDraggingOver(false);
      return;
    }
    
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    if (!canvasRef.current?.contains(e.relatedTarget as Node)) {
      setIsDraggingOver(false);
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);

    const isRoadmapContent = e.dataTransfer.types.includes('application/x-roadmap-content') || 
                             (draggedContentId && draggedContentSectionId);
    
    if (isRoadmapContent) {
      setDraggedContentId(null);
      setDraggedContentSectionId(null);
      setHoveredContentId(null);
      return;
    }

    const droppedNodeId = e.dataTransfer.getData('text/plain');
    if (droppedNodeId && roadmapNodes.some(n => n.id === droppedNodeId)) {
      return;
    }

    if (droppedNodeId && !e.dataTransfer.types.includes('application/json')) {
      const isContentItemId = roadmapNodes.some((node: RoadmapNode) => {
        if (node.type === 'section') {
          const sectionData = node.data as CourseSection;
          return sectionData.contents && sectionData.contents.some((c: CourseContentItem) => c.id === droppedNodeId);
        }
        return false;
      });
      
      if (isContentItemId) {
        return;
      }
    }

    let itemData = draggedItem;
    if (!itemData) {
      try {
        const data = JSON.parse(e.dataTransfer.getData('application/json'));
        itemData = { type: data.type, data: data.data };
      } catch {
        return;
      }
    }

    if (!itemData) return;
    
    if (itemData.type === 'content') {
      setDraggedItem(null);
      return;
    }

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const dropX = e.clientX - rect.left;
    const dropY = e.clientY - rect.top;

    const structuredPos = calculateStructuredPositionForDrop(dropX, dropY, rect.width, itemData.type);

    let connectFromId: string | undefined = structuredPos.parentId;
    
    if (!connectFromId && roadmapNodes.length > 0) {
      const sortedByY = [...roadmapNodes].sort((a, b) => b.position.y - a.position.y);
      const previousNode = sortedByY[0];
      connectFromId = previousNode.id;
    }

    const sectionData = itemData.data as CourseSection;
    const nodeData = {
      ...sectionData,
      contents: []
    } as CourseSection;
    
    const newNode: RoadmapNode = {
      id: `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'section',
      data: nodeData,
      position: { x: structuredPos.x, y: structuredPos.y },
      connections: connectFromId ? [connectFromId] : [],
      parentId: structuredPos.parentId,
      level: structuredPos.level,
    };

    if (connectFromId) {
      if (connectFromId === 'starting-node') {
        newNode.connections = ['starting-node'];
      } else {
        setRoadmapNodes((prev: RoadmapNode[]) => prev.map((node: RoadmapNode) => 
          node.id === connectFromId
            ? { ...node, connections: [...node.connections, newNode.id] }
            : node
        ));
      }
    }

    setRoadmapNodes((prev: RoadmapNode[]) => [...prev, newNode]);
    
    setUsedItems((prev: Set<string>) => {
      const newSet = new Set(prev);
      newSet.add(itemData.data.id);
      return newSet;
    });

    if (itemData.type === 'section') {
      setCollapsedRoadmapSections((prev: Record<string, boolean>) => ({
        ...prev,
        [newNode.id]: false
      }));
    }
    
    setDraggedItem(null);

    if (!combinedCourseData) {
      setCombinedCourseData({
        id: 'combined-course',
        title: 'Super Course',
        sections: [],
      });
    }
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="flex flex-col h-full space-y-6" style={{ position: 'relative', zIndex: 1 }}>
      {/* Top Action Buttons */}
      <div className="flex items-center justify-between">
        <DeltaButton
          variant="outline"
          size="md"
          onClick={() => {
            console.log('Auto Generate clicked');
          }}
        >
          Auto Generate
        </DeltaButton>
        <DeltaButton
          variant="primary"
          size="md"
          onClick={() => {
            setIsCourseSelectionModalOpen(true);
          }}
          disabled={selectedCourses.length >= 2}
        >
          Add Course
        </DeltaButton>
      </div>

      {/* Main Content Area - Three Columns */}
      <div className="flex gap-6 flex-1 min-h-0" style={{ minHeight: 'calc(100vh - 300px)' }}>
        {/* Left Column - First Course Roadmap */}
        <div className="w-1/3 border-2 border-dashed border-border-primary rounded-lg p-6 bg-surface-primary overflow-y-auto">
          <CourseRoadmapSidebar
            course={selectedCourses[0]?.data || initialCourseData}
            courseTitle={selectedCourses[0]?.title || courseTitle}
            collapsedSections={collapsedSections[selectedCourses[0]?.id || ''] || {}}
            usedItems={usedItems}
            onToggleSection={(sectionId: string) => toggleSection(sectionId, selectedCourses[0]?.id)}
            onSectionDragStart={(e, section) => handleDragStart(e, 'section', section)}
            onContentDragStart={(e, content) => handleDragStart(e, 'content', content)}
                      onDragEnd={handleDragEnd}
            onPreviewContent={(content: CourseContentItem) => {
                                setPreviewContent(content);
                                setIsPreviewModalOpen(true);
                              }}
            onChangeCourse={() => handleChangeCourse(0)}
          />
        </div>

        {/* Middle Column - Drag and Drop Canvas for Combined Course */}
        <div className="w-1/3 border-2 border-dashed border-success-400 rounded-lg bg-success-50/30 flex flex-col">
          {/* Toolbar */}
          <CourseCombinerToolbar
            onAddSection={() => setIsCreateSectionModalOpen(true)}
            onDone={() => {
                console.log('Done clicked');
              }}
          />

          {/* Canvas Area - Drop Zone for Combined Course */}
          <div
            ref={canvasRef}
            className={`flex-1 bg-success-50/20 overflow-y-auto p-6 relative ${isDraggingOver ? 'bg-success-100/40' : ''}`}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {/* Starting Roadmap Node Line - Only visible when no nodes exist */}
            {roadmapNodes.length === 0 && (
              <div className="absolute top-28 left-1/2 transform -translate-x-1/2 pointer-events-none">
                <div className="relative">
                  <div className="absolute right-full top-1/2 w-16 h-0.5 bg-success-500 transform -translate-y-1/2"></div>
                  <div className="relative w-6 h-6 bg-success-500 rounded-full border-2 border-white shadow-md z-10"></div>
                  <div className="absolute left-1/2 top-full w-0.5 bg-success-500 transform -translate-x-1/2" style={{ height: '120px' }}></div>
                </div>
              </div>
            )}

            {/* Helper Text - Only show if no nodes */}
            {roadmapNodes.length === 0 && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center z-10 pointer-events-none">
                <p className="text-text-secondary text-sm font-medium font-primary">Drag course roadmaps here</p>
                <p className="text-text-tertiary text-xs mt-2 font-primary">Drop sections, documents, or videos to combine</p>
              </div>
            )}

            {/* Rendered Roadmap Nodes */}
            <div className="relative">
              {roadmapNodes.length > 0 && (
                <div className="absolute left-6 top-0 bottom-0 w-1 bg-success-500 z-0"></div>
              )}
              
              <div className="space-y-6 relative z-10">
                {roadmapNodes
                  .sort((a: RoadmapNode, b: RoadmapNode) => a.position.y - b.position.y)
                  .map((node: RoadmapNode, index: number) => {
                    const sectionData = node.data as CourseSection;
                    const isDragging = draggedNodeId === node.id;
                    const isHovered = hoveredNodeId === node.id;
                    const isFirst = index === 0;

                    return (
                      <div
                        key={node.id}
                        className={`relative min-h-[200px] transition-all duration-300 ease-ease ${
                          isDragging ? 'opacity-50' : isHovered ? 'opacity-90' : 'opacity-100'
                        }`}
                        style={{
                          transform: isHovered && draggedNodeId ? 'scale(1.02)' : 'scale(1)',
                        }}
                        draggable={true}
                        onDragStart={(e) => handleNodeDragStart(e, node.id)}
                        onDragOver={(e: DragEvent) => {
                          // Allow dropping content from side panel OR sections from side panel
                          const isSidePanel = e.dataTransfer.types.includes('application/x-side-panel');
                          const isRoadmapContent = e.dataTransfer.types.includes('application/x-roadmap-content');
                          const isDraggingContent = draggedContentId !== null && draggedContentSectionId !== null;
                          const hasContentTypes = e.dataTransfer.types.includes('application/json');
                          
                          // Allow if dragging from side panel (content or section)
                          const isDraggingFromSidePanel = !isRoadmapContent && !isDraggingContent && hasContentTypes && isSidePanel;
                          
                          // OR if dragging roadmap content from a different section
                          const isDraggingFromDifferentSection = isRoadmapContent && isDraggingContent && draggedContentSectionId !== node.id;
                          
                          if (isDraggingFromSidePanel || isDraggingFromDifferentSection) {
                            e.preventDefault();
                            e.stopPropagation();
                            e.dataTransfer.dropEffect = 'move';
                            setHoveredNodeId(node.id);
                          } else if (!isSidePanel && !isRoadmapContent) {
                            // Handle section reordering (not from side panel)
                            handleNodeDragOver(e, node.id);
                          }
                        }}
                        onDrop={(e: DragEvent) => {
                          // Allow dropping content from side panel OR sections from side panel
                          const isSidePanel = e.dataTransfer.types.includes('application/x-side-panel');
                          const isRoadmapContent = e.dataTransfer.types.includes('application/x-roadmap-content');
                          const isDraggingContent = draggedContentId !== null && draggedContentSectionId !== null;
                          const hasContentTypes = e.dataTransfer.types.includes('application/json');
                          
                          // Allow if dragging from side panel (content or section)
                          const isDraggingFromSidePanel = !isRoadmapContent && !isDraggingContent && hasContentTypes && isSidePanel;
                          
                          // OR if dragging roadmap content from a different section
                          const isDraggingFromDifferentSection = isRoadmapContent && isDraggingContent && draggedContentSectionId !== node.id;
                          
                          if (isDraggingFromSidePanel || isDraggingFromDifferentSection) {
                            e.preventDefault();
                            e.stopPropagation();
                            handleNodeDrop(e, node.id);
                          } else if (!isSidePanel && !isRoadmapContent) {
                            // Handle section reordering (not from side panel)
                            handleNodeDrop(e, node.id);
                          }
                        }}
                        onDragLeave={() => setHoveredNodeId(null)}
                      >
                        {sectionData && (
                          <div className="relative min-h-[200px]" data-section-id={node.id}>
                            {isFirst && (
                              <div className="absolute left-6 top-0 h-1.5 w-1 bg-neutral-500 z-10"></div>
                            )}
                            
                            {!collapsedRoadmapSections[node.id] && sectionData.contents && sectionData.contents.length > 0 && (
                              <div className="absolute left-6 top-1.5 bottom-0 w-1 bg-success-500 z-0"></div>
                            )}
                            
                            <RoadmapSectionCard
                              section={sectionData}
                              isExpanded={!collapsedRoadmapSections[node.id]}
                              isUsed={usedItems.has(sectionData.id)}
                              isFirst={isFirst}
                              isCollapsed={collapsedRoadmapSections[node.id]}
                              onToggle={() => {
                                setCollapsedRoadmapSections(prev => ({
                                  ...prev,
                                  [node.id]: !prev[node.id]
                                }));
                              }}
                        onDragStart={(e) => {
                          if (!usedItems.has(sectionData.id)) {
                            handleDragStart(e, 'section', sectionData);
                          } else {
                            e.preventDefault();
                          }
                        }}
                        onDragEnd={handleDragEnd}
                              onRemove={() => handleRemoveNode(node.id)}
                            />

                            {!collapsedRoadmapSections[node.id] && (
                              <div 
                                data-section-id={node.id}
                                className={`content-area-drop-zone ml-14 space-y-3 min-h-[80px] py-2 transition-all duration-200 relative z-20 ${
                                  hoveredSectionContentArea === node.id ? 'bg-success-100/50 rounded-lg border-2 border-success-300 border-dashed' : ''
                                }`}
                                onDragEnter={(e: DragEvent) => {
                                  const hasContentTypes = e.dataTransfer.types.includes('application/json');
                                  const isRoadmapContent = e.dataTransfer.types.includes('application/x-roadmap-content');
                                  const isSidePanel = e.dataTransfer.types.includes('application/x-side-panel');
                                  const isDraggingContent = draggedContentId !== null && draggedContentSectionId !== null;
                                  
                                  const isDraggingFromSidePanel = !isRoadmapContent && !isDraggingContent && hasContentTypes && isSidePanel;
                                  const isDraggingFromDifferentSection = isRoadmapContent && isDraggingContent && draggedContentSectionId !== node.id;
                                  
                                  if (isDraggingFromSidePanel || isDraggingFromDifferentSection) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setHoveredSectionContentArea(node.id);
                                  }
                                }}
                                onDragOver={(e) => {
                                  const hasContentTypes = e.dataTransfer.types.includes('application/json');
                                  const isRoadmapContent = e.dataTransfer.types.includes('application/x-roadmap-content');
                                  const isSidePanel = e.dataTransfer.types.includes('application/x-side-panel');
                                  const isDraggingContent = draggedContentId !== null && draggedContentSectionId !== null;
                                  
                                  const isDraggingFromSidePanel = !isRoadmapContent && !isDraggingContent && hasContentTypes && isSidePanel;
                                  const isDraggingFromDifferentSection = isRoadmapContent && isDraggingContent && draggedContentSectionId !== node.id;
                                  
                                  if (isDraggingFromSidePanel || isDraggingFromDifferentSection) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    e.dataTransfer.dropEffect = 'move';
                                    setHoveredSectionContentArea(node.id);
                                  }
                                }}
                                onDragLeave={(e) => {
                                  const relatedTarget = e.relatedTarget as HTMLElement;
                                  if (!relatedTarget) {
                                    return;
                                  }
                                  
                                  const targetSection = relatedTarget.closest('[data-section-id]');
                                  if (targetSection && targetSection.getAttribute('data-section-id') !== node.id) {
                                    setHoveredSectionContentArea(null);
                                  }
                                }}
                                onDrop={(e) => {
                                  // Check if dropping on a content item (let content item handle it)
                                  const target = e.target as HTMLElement;
                                  const isContentItem = target.closest('[draggable="true"]') && target !== e.currentTarget;
                                  
                                  // If dropping directly on content area (not on a content item), handle it
                                  if (!isContentItem) {
                                  const isRoadmapContent = e.dataTransfer.types.includes('application/x-roadmap-content');
                                  const isDraggingContent = draggedContentId !== null && draggedContentSectionId !== null;
                                  const hasContentTypes = e.dataTransfer.types.includes('application/json');
                                  const isSidePanel = e.dataTransfer.types.includes('application/x-side-panel');
                                  
                                  const isDraggingFromSidePanel = !isRoadmapContent && !isDraggingContent && hasContentTypes && isSidePanel;
                                  const isDraggingFromDifferentSection = isRoadmapContent && isDraggingContent && draggedContentSectionId !== node.id;
                                  
                                    // Only handle if dragging from side panel or different section
                                    // If reordering within same section, let content items handle it
                                  if (isDraggingFromSidePanel || isDraggingFromDifferentSection) {
                                    e.preventDefault();
                                      e.stopPropagation();
                                    setHoveredSectionContentArea(null);
                                    handleNodeDrop(e, node.id);
                                    }
                                  }
                                }}
                                style={{ pointerEvents: 'auto' }}
                              >
                            {sectionData.contents && 
                             Array.isArray(sectionData.contents) && 
                             sectionData.contents.length > 0 && 
                                 sectionData.contents.map((content: CourseContentItem) => {
                              const isLeft = content.type === 'audio';
                                  const timelineCenterOffset = '-2rem';
                              
                              return (
                                    <CanvasContentItem
                                      key={content.id}
                                      content={content}
                                      isLeft={isLeft}
                                      isDragging={draggedContentId === content.id}
                                      isHovered={hoveredContentId === content.id}
                                      timelineCenterOffset={timelineCenterOffset}
                                      onDragStart={(e: DragEvent) => {
                                    e.stopPropagation();
                                    setDraggedContentId(content.id);
                                    setDraggedContentSectionId(node.id);
                                    e.dataTransfer.setData('application/x-dragged-content-id', content.id);
                                    e.dataTransfer.setData('application/x-roadmap-content', 'true');
                                    e.dataTransfer.effectAllowed = 'move';
                                  }}
                                      onDragOver={(e: DragEvent) => {
                                        // Check if we're reordering content within the same section
                                    const isRoadmapContent = e.dataTransfer.types.includes('application/x-roadmap-content');
                                    const isDraggingContent = draggedContentId !== null && draggedContentSectionId !== null;
                                    
                                        // Only handle if dragging content from the same section (for reordering)
                                        if (isDraggingContent && draggedContentSectionId === node.id && draggedContentId !== content.id) {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          e.dataTransfer.dropEffect = 'move';
                                          setHoveredContentId(content.id);
                                          return;
                                        }
                                        
                                        // Don't handle if dragging from side panel or different section - let parent handle it
                                        const isSidePanel = e.dataTransfer.types.includes('application/x-side-panel');
                                        const isDraggingFromSidePanel = !isRoadmapContent && !isDraggingContent && isSidePanel;
                                    const isDraggingFromDifferentSection = isRoadmapContent && isDraggingContent && draggedContentSectionId !== node.id;
                                    
                                    if (isDraggingFromSidePanel || isDraggingFromDifferentSection) {
                                      return;
                                    }
                                      }}
                                      onDragLeave={(e: DragEvent) => {
                                    const relatedTarget = e.relatedTarget as HTMLElement;
                                    if (!relatedTarget || !e.currentTarget.contains(relatedTarget)) {
                                      setHoveredContentId(null);
                                    }
                                  }}
                                      onDrop={(e: DragEvent) => {
                                        // Check if we're reordering content within the same section
                                    const isDraggingContent = draggedContentId !== null && draggedContentSectionId !== null;
                                    
                                        // Handle reordering within same section
                                        if (isDraggingContent && draggedContentSectionId === node.id && draggedContentId !== content.id) {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          e.dataTransfer.setData('application/x-target-content-id', content.id);
                                          setHoveredContentId(content.id);
                                          handleNodeDrop(e, node.id, content.id);
                                          return;
                                        }
                                        
                                        // Don't handle if dragging from side panel or different section - let parent handle it
                                        const isSidePanel = e.dataTransfer.types.includes('application/x-side-panel');
                                        const isRoadmapContent = e.dataTransfer.types.includes('application/x-roadmap-content');
                                        const isDraggingFromSidePanel = !isRoadmapContent && !isDraggingContent && isSidePanel;
                                    const isDraggingFromDifferentSection = isRoadmapContent && isDraggingContent && draggedContentSectionId !== node.id;
                                    
                                    if (isDraggingFromSidePanel || isDraggingFromDifferentSection) {
                                      return;
                                    }
                                    
                                        // Prevent default for other cases
                                      e.preventDefault();
                                      e.stopPropagation();
                                      }}
                                      onDragEnd={(e: DragEvent) => {
                                    const dropEffect = e.dataTransfer.dropEffect;
                                    if (dropEffect === 'none' || dropEffect === '') {
                                      e.preventDefault();
                                    }
                                    setDraggedContentId(null);
                                    setDraggedContentSectionId(null);
                                    setHoveredContentId(null);
                                  }}
                                      onRemove={() => {
                                      const updatedSection = {
                                        ...sectionData,
                                        contents: sectionData.contents.filter((c: CourseContentItem) => c.id !== content.id)
                                      };
                                      setRoadmapNodes((prev: RoadmapNode[]) => prev.map((n: RoadmapNode) => 
                                        n.id === node.id ? { ...n, data: updatedSection } : n
                                      ));
                                      
                                        setUsedItems((prev: Set<string>) => {
                                        const newSet = new Set(prev);
                                        newSet.delete(content.id);
                                        return newSet;
                                      });
                                    }}
                                      onPreview={() => {
                                        setPreviewContent(content);
                                        setIsPreviewModalOpen(true);
                                      }}
                                    />
                              );
                            })}
                              </div>
                            )}
                          </div>
                        )}
                  </div>
                );
              })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Second/Selected Course Roadmap */}
        <div className="w-1/3 border-2 border-dashed border-border-primary rounded-lg p-6 bg-surface-primary overflow-y-auto">
          {selectedCourses.length > 1 ? (
            <CourseRoadmapSidebar
              course={selectedCourses[1]?.data || null}
              courseTitle={selectedCourses[1]?.title || 'Course 2'}
              collapsedSections={collapsedSections[selectedCourses[1]?.id] || {}}
              usedItems={usedItems}
              onToggleSection={(sectionId: string) => toggleSection(sectionId, selectedCourses[1]?.id)}
              onSectionDragStart={(e, section) => handleDragStart(e, 'section', section)}
              onContentDragStart={(e, content) => handleDragStart(e, 'content', content)}
                      onDragEnd={handleDragEnd}
              onPreviewContent={(content: CourseContentItem) => {
                                    setPreviewContent(content);
                                    setIsPreviewModalOpen(true);
                                  }}
              onChangeCourse={() => handleChangeCourse(1)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg
                className="w-24 h-24 text-neutral-300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <p className="text-text-secondary text-sm font-medium mb-2 font-primary">No course selected</p>
              <p className="text-text-tertiary text-xs font-primary">Click "Add Course" to add another course</p>
            </div>
          )}
        </div>
      </div>

      {/* Course Selection Modal */}
      <CourseSelectionModal
        isOpen={isCourseSelectionModalOpen}
        onClose={() => {
          setCourseToReplace(undefined);
          setIsCourseSelectionModalOpen(false);
        }}
        courses={sampleCourses}
        onSelectCourse={(course: Course) => handleCourseSelection(course, courseToReplace)}
      />

      {/* Content Preview Modal */}
      <PreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => {
          setIsPreviewModalOpen(false);
          setPreviewContent(null);
        }}
        content={previewContent}
      />

      {/* Create Section Modal */}
      <CreateSectionModal
        isOpen={isCreateSectionModalOpen}
        onClose={() => {
          setIsCreateSectionModalOpen(false);
          setNewSectionName('');
          setNewSectionDescription('');
          setNewSectionTags('');
        }}
        sectionName={newSectionName}
        sectionDescription={newSectionDescription}
        sectionTags={newSectionTags}
        onSectionNameChange={setNewSectionName}
        onSectionDescriptionChange={setNewSectionDescription}
        onSectionTagsChange={setNewSectionTags}
        onCreate={handleCreateSection}
      />
    </div>
  );
};

export default CourseCombiner;
