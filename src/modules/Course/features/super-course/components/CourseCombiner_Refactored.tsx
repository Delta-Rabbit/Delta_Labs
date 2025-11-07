/**
 * Delta Labs Course Combiner Component (REFACTORED)
 * Screen where users combine courses to create Super Courses
 * Features: Left panel with course roadmap, Right panel with editing canvas
 * 
 * REFACTORED: Uses atomic components, theme tokens, and organized structure
 */

import React, { useState, useRef } from 'react';
import { DeltaButton, DeltaCard, DeltaBadge } from '../../../../../components/theme';
import { DocumentEditor } from '../../../components/common/DocumentEditor';
import CourseSelectionModal, { type Course } from './CourseSelectionModal';
import {
  CourseCombinerToolbar,
  CourseRoadmapSidebar,
  CreateSectionModal,
  PreviewModal,
  ContentIcon,
  CollapseExpandButton,
  Timeline,
  RoadmapSectionCard,
  RoadmapContentItem,
  type CourseData,
  type CourseSection,
  type CourseContentItem,
} from './course-combiner';
import CanvasContentItem from './course-combiner/CanvasContentItem';

// ============================================================================
// TYPES
// ============================================================================

interface RoadmapNode {
  id: string;
  type: 'section';
  data: CourseSection;
  position: { x: number; y: number };
  connections: string[];
  parentId?: string;
  level: number;
}

interface CourseCombinerProps {
  courseId: string;
  courseTitle: string;
  onBack?: () => void;
}

// ============================================================================
// SAMPLE DATA
// ============================================================================

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
}) => {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  
  // Sample course data - will be replaced with actual data from API
  const [courseData] = useState<CourseData>({
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
  });

  const [selectedCourses, setSelectedCourses] = useState<Array<{ id: string; title: string; data: CourseData }>>([
    { id: courseId, title: courseTitle, data: courseData },
  ]);

  // Track collapsed sections per course - courseId -> sectionId -> boolean
  const [collapsedSections, setCollapsedSections] = useState<Record<string, Record<string, boolean>>>({});
  
  // Course selection modal state
  const [isCourseSelectionModalOpen, setIsCourseSelectionModalOpen] = useState(false);
  const [courseToReplace, setCourseToReplace] = useState<number | undefined>(undefined);

  // Roadmap state
  const [combinedCourseData, setCombinedCourseData] = useState<CourseData | null>(null);
  const [roadmapNodes, setRoadmapNodes] = useState<RoadmapNode[]>([]);
  const [collapsedRoadmapSections, setCollapsedRoadmapSections] = useState<Record<string, boolean>>({});

  // Drag and drop state
  const [draggedItem, setDraggedItem] = useState<{ type: 'section' | 'content'; data: CourseSection | CourseContentItem } | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [usedItems, setUsedItems] = useState<Set<string>>(new Set());
  const [draggedContentId, setDraggedContentId] = useState<string | null>(null);
  const [draggedContentSectionId, setDraggedContentSectionId] = useState<string | null>(null);
  const [hoveredContentId, setHoveredContentId] = useState<string | null>(null);
  const [hoveredSectionContentArea, setHoveredSectionContentArea] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Preview modal state
  const [previewContent, setPreviewContent] = useState<CourseContentItem | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  // Create Section modal state
  const [isCreateSectionModalOpen, setIsCreateSectionModalOpen] = useState(false);
  const [newSectionName, setNewSectionName] = useState('');
  const [newSectionDescription, setNewSectionDescription] = useState('');
  const [newSectionTags, setNewSectionTags] = useState('');

  // ============================================================================
  // HELPER FUNCTIONS
  // ============================================================================

  const toggleSection = (sectionId: string, courseId?: string) => {
    const key = courseId || selectedCourses[0]?.id || '';
    setCollapsedSections(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [sectionId]: !prev[key]?.[sectionId]
      }
    }));
  };

  const isSectionExpanded = (sectionId: string, courseId?: string) => {
    const key = courseId || selectedCourses[0]?.id || '';
    return collapsedSections[key]?.[sectionId] !== true;
  };

  // ============================================================================
  // COURSE MANAGEMENT HANDLERS
  // ============================================================================

  const handleCourseSelection = (course: Course, replaceIndex?: number) => {
    // Generate sample course data for the selected course
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
      setSelectedCourses(prev => {
        const newCourses = [...prev];
        const existingIndex = newCourses.findIndex(c => c.id === course.id);
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
      if (!selectedCourses.find(c => c.id === course.id)) {
        setSelectedCourses(prev => [...prev, { id: course.id, title: course.title, data: newCourseData }]);
      }
    }
    setCourseToReplace(undefined);
    setIsCourseSelectionModalOpen(false);
  };

  const handleRemoveCourse = (courseIndex: number) => {
    setSelectedCourses(prev => prev.filter((_, index) => index !== courseIndex));
  };

  const handleChangeCourse = (courseIndex: number) => {
    setCourseToReplace(courseIndex);
    setIsCourseSelectionModalOpen(true);
  };

  // ============================================================================
  // SECTION MANAGEMENT HANDLERS
  // ============================================================================

  const handleCreateSection = () => {
    if (!newSectionName.trim()) {
      alert('Please enter a section name');
      return;
    }

    // Parse tags (comma-separated, with or without #)
    const tags = newSectionTags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)
      .map(tag => tag.startsWith('#') ? tag : `#${tag}`);

    // Create new section
    const newSection: CourseSection = {
      id: `custom-section-${Date.now()}`,
      title: newSectionName.trim(),
      description: newSectionDescription.trim(),
      tags: tags,
      contents: [],
    };

    // Calculate position for new section - FIX: Use proper parameters
    const canvasWidth = canvasRef.current?.offsetWidth || 800;
    const dropY = roadmapNodes.length > 0 
      ? Math.max(...roadmapNodes.map(n => n.position.y)) + 220 
      : 160;
    const position = calculateStructuredPosition(0, dropY, canvasWidth, 'section');

    // Create new roadmap node
    const newNode: RoadmapNode = {
      id: newSection.id,
      type: 'section',
      data: newSection,
      position: { x: position.x, y: position.y },
      connections: [],
      parentId: position.parentId,
      level: position.level,
    };

    // Add to roadmap
    setRoadmapNodes(prev => [...prev, newNode]);

    // Set as expanded by default
    setCollapsedRoadmapSections(prev => ({
      ...prev,
      [newSection.id]: false,
    }));

    // Reset form and close modal
    setNewSectionName('');
    setNewSectionDescription('');
    setNewSectionTags('');
    setIsCreateSectionModalOpen(false);
  };

  // ============================================================================
  // DRAG AND DROP HANDLERS
  // ============================================================================

  const handleDragStart = (e: React.DragEvent, type: 'section' | 'content', data: CourseSection | CourseContentItem) => {
    setDraggedItem({ type, data });
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('application/json', JSON.stringify({ type, data }));
    e.dataTransfer.setData('application/x-side-panel', 'true');
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDraggedNodeId(null);
    setHoveredNodeId(null);
    setDraggedContentId(null);
    setDraggedContentSectionId(null);
    setHoveredContentId(null);
  };

  const handleNodeDragStart = (e: React.DragEvent, nodeId: string) => {
    e.stopPropagation();
    setDraggedNodeId(nodeId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', nodeId);
  };

  const handleNodeDragOver = (e: React.DragEvent, targetNodeId: string) => {
    if (!draggedNodeId || draggedNodeId === targetNodeId) return;
    
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
    setHoveredNodeId(targetNodeId);
  };

  // Complex drop handler - preserves all original logic
  const handleNodeDrop = (e: React.DragEvent, targetNodeId: string, targetContentIdParam?: string) => {
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

        setUsedItems(prev => {
          const newSet = new Set(prev);
          newSet.add(contentData.id);
          return newSet;
        });

        setDraggedItem(null);
        setHoveredNodeId(null);
        return;
      }
    }

    // If dropping an existing node for reordering sections/content nodes
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

  const handleDragOver = (e: React.DragEvent) => {
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

  const handleDragEnter = (e: React.DragEvent) => {
    const isRoadmapContent = e.dataTransfer.types.includes('application/x-roadmap-content');
    if (isRoadmapContent) {
      e.dataTransfer.dropEffect = 'none';
      setIsDraggingOver(false);
      return;
    }
    
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    if (!canvasRef.current?.contains(e.relatedTarget as Node)) {
      setIsDraggingOver(false);
    }
  };

  // Calculate structured position for new node
  const calculateStructuredPosition = (dropX: number, dropY: number, canvasWidth: number, nodeType?: 'section' | 'content'): { x: number; y: number; parentId?: string; level: number } => {
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
      const sortedByY = [...roadmapNodes].sort((a: RoadmapNode, b: RoadmapNode) => b.position.y - a.position.y);
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

    let closestNode: RoadmapNode | null = null;
    let minDistance = Infinity;
    const snapThreshold = 100;

    roadmapNodes.forEach((node: RoadmapNode) => {
      const distance = Math.abs(dropX - node.position.x);
      if (distance < minDistance && distance < snapThreshold) {
        minDistance = distance;
        closestNode = node;
      }
    });

    if (closestNode) {
      const existingChildren = roadmapNodes
        .filter((n: RoadmapNode) => n.parentId === closestNode!.id)
        .sort((a: RoadmapNode, b: RoadmapNode) => a.position.y - b.position.y);

      if (existingChildren.length > 0) {
        const lastChild = existingChildren[existingChildren.length - 1];
        return {
          x: closestNode.position.x,
          y: lastChild.position.y + nodeSpacing,
          parentId: closestNode.id,
          level: closestNode.level + 1,
        };
      }

      return {
        x: closestNode.position.x,
        y: closestNode.position.y + nodeSpacing,
        parentId: closestNode.id,
        level: closestNode.level + 1,
      };
    }

    const sortedByY = [...roadmapNodes].sort((a: RoadmapNode, b: RoadmapNode) => b.position.y - a.position.y);
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

  const handleDrop = (e: React.DragEvent) => {
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
    if (droppedNodeId && roadmapNodes.some((n: RoadmapNode) => n.id === droppedNodeId)) {
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

    const structuredPos = calculateStructuredPosition(dropX, dropY, rect.width, itemData.type);

    let connectFromId: string | undefined = structuredPos.parentId;
    
    if (!connectFromId && roadmapNodes.length > 0) {
      const sortedByY = [...roadmapNodes].sort((a: RoadmapNode, b: RoadmapNode) => b.position.y - a.position.y);
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

    setRoadmapNodes(prev => [...prev, newNode]);
    
    setUsedItems(prev => {
      const newSet = new Set(prev);
      newSet.add(itemData.data.id);
      return newSet;
    });

    if (itemData.type === 'section') {
      setCollapsedRoadmapSections(prev => ({
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

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="flex flex-col h-full space-y-6 font-primary" style={{ position: 'relative', zIndex: 1 }}>
      {/* Top Toolbar */}
      <CourseCombinerToolbar
        onAutoGenerate={() => {
          console.log('Auto Generate clicked');
        }}
        onAddCourse={() => setIsCourseSelectionModalOpen(true)}
        canAddCourse={selectedCourses.length < 2}
      />

      {/* Main Content Area - Three Columns */}
      <div className="flex gap-6 flex-1 min-h-0" style={{ minHeight: 'calc(100vh - 300px)' }}>
        {/* Left Column - First Course Roadmap */}
        <CourseRoadmapSidebar
          course={selectedCourses[0]?.data || null}
          courseTitle={selectedCourses[0]?.title || 'Course 1'}
          collapsedSections={collapsedSections[selectedCourses[0]?.id || ''] || {}}
          usedItems={usedItems}
          onToggleSection={(sectionId) => toggleSection(sectionId, selectedCourses[0]?.id)}
          onSectionDragStart={(e, section) => handleDragStart(e, 'section', section)}
          onContentDragStart={(e, content) => handleDragStart(e, 'content', content)}
          onDragEnd={handleDragEnd}
          onChangeCourse={() => handleChangeCourse(0)}
          onPreviewContent={(content) => {
            setPreviewContent(content);
            setIsPreviewModalOpen(true);
          }}
        />

        {/* Middle Column - Drag and Drop Canvas for Combined Course */}
        <div className="w-1/3 border-2 border-dashed border-success-400 rounded-lg bg-success-50/30 flex flex-col font-primary">
          {/* Canvas Toolbar */}
          <div className="flex items-center justify-between p-4 border-b border-success-200 bg-success-50/50 rounded-t-lg">
            <div className="flex items-center gap-4">
              {/* Folder Icon */}
              <button className="p-2 hover:bg-success-100 rounded-lg transition-colors" title="Folder" aria-label="Folder">
                <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              </button>

              {/* Split Icon */}
              <button className="p-2 hover:bg-success-100 rounded-lg transition-colors" title="Split" aria-label="Split">
                <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </button>

              {/* Merge Icon */}
              <button className="p-2 hover:bg-success-100 rounded-lg transition-colors" title="Merge" aria-label="Merge">
                <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4 4m4 4H8m0 0l4-4m-4 4l4 4" />
                </svg>
              </button>

              {/* Add Section Icon */}
              <button 
                className="p-2 hover:bg-success-100 rounded-lg transition-colors" 
                title="Add Section"
                onClick={() => setIsCreateSectionModalOpen(true)}
                aria-label="Add Section"
              >
                <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <rect x="4" y="5" width="16" height="14" rx="1" strokeWidth={2} />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v6M9 12h6" />
                </svg>
              </button>
            </div>

            {/* Done Button */}
            <DeltaButton
              variant="primary"
              size="sm"
              onClick={() => {
                console.log('Done clicked');
              }}
            >
              Done
            </DeltaButton>
          </div>

          {/* Canvas Area - Drop Zone */}
          <div
            ref={canvasRef}
            className={`flex-1 bg-success-50/20 overflow-y-auto p-6 relative transition-colors font-primary ${
              isDraggingOver ? 'bg-success-100/40' : ''
            }`}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {/* Starting Roadmap Node Line - Only visible when no nodes exist */}
            {roadmapNodes.length === 0 && (
              <div className="absolute top-28 left-1/2 transform -translate-x-1/2 pointer-events-none">
                <div className="relative">
                  <div className="absolute right-full top-1/2 w-16 h-0.5 bg-success-600 transform -translate-y-1/2"></div>
                  <div className="relative w-6 h-6 bg-success-600 rounded-full border-2 border-white shadow-md z-10"></div>
                  <div className="absolute left-1/2 top-full w-0.5 bg-success-600 transform -translate-x-1/2" style={{ height: '120px' }}></div>
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
              {/* Main Continuous Timeline */}
              {roadmapNodes.length > 0 && (
                <div className="absolute left-6 top-0 bottom-0 w-1 bg-success-600 z-0"></div>
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
                        className={`relative min-h-[200px] transition-all duration-300 ease-in-out ${
                          isDragging ? 'opacity-50' : isHovered ? 'opacity-90' : 'opacity-100'
                        }`}
                        style={{
                          transform: isHovered && draggedNodeId ? 'scale(1.02)' : 'scale(1)',
                        }}
                        draggable={true}
                        onDragStart={(e) => handleNodeDragStart(e, node.id)}
                        onDragOver={(e) => {
                          const isSidePanel = e.dataTransfer.types.includes('application/x-side-panel');
                          const isRoadmapContent = e.dataTransfer.types.includes('application/x-roadmap-content');
                          const isDraggingContent = draggedContentId !== null && draggedContentSectionId !== null;
                          const isDraggingFromSidePanel = !isRoadmapContent && !isDraggingContent && isSidePanel;
                          
                          if (!isDraggingFromSidePanel) {
                            handleNodeDragOver(e, node.id);
                          }
                        }}
                        onDrop={(e) => {
                          const isSidePanel = e.dataTransfer.types.includes('application/x-side-panel');
                          const isRoadmapContent = e.dataTransfer.types.includes('application/x-roadmap-content');
                          const isDraggingContent = draggedContentId !== null && draggedContentSectionId !== null;
                          const isDraggingFromSidePanel = !isRoadmapContent && !isDraggingContent && isSidePanel;
                          
                          if (!isDraggingFromSidePanel) {
                            handleNodeDrop(e, node.id);
                          }
                        }}
                        onDragLeave={() => setHoveredNodeId(null)}
                      >
                        {/* Section Node */}
                        <div className="relative min-h-[200px]" data-section-id={node.id}>
                          {/* Timeline */}
                          {isFirst && (
                            <div className="absolute left-6 top-0 h-1.5 w-1 bg-text-tertiary z-10"></div>
                          )}
                          
                          {!collapsedRoadmapSections[node.id] && sectionData.contents && sectionData.contents.length > 0 && (
                            <div className="absolute left-6 top-1.5 bottom-0 w-1 bg-success-600 z-0"></div>
                          )}
                          
                          {/* Section Header Card */}
                          <DeltaCard
                            variant="default"
                            padding="md"
                            shadow="sm"
                            className={`ml-14 mb-3 mr-4 bg-surface-secondary border border-border-primary relative group hover:shadow-lg transition-shadow duration-200 ${
                              usedItems.has(sectionData.id) 
                                ? 'cursor-not-allowed opacity-50' 
                                : 'cursor-move'
                            } font-primary`}
                            draggable={!usedItems.has(sectionData.id)}
                            onDragStart={(e) => {
                              if (!usedItems.has(sectionData.id)) {
                                handleDragStart(e, 'section', sectionData);
                              } else {
                                e.preventDefault();
                              }
                            }}
                            onDragEnd={handleDragEnd}
                            onDragOver={(e) => {
                              const target = e.target as HTMLElement;
                              const isContentArea = target.closest('.content-area-drop-zone');
                              if (isContentArea) {
                                return;
                              }
                              
                              const isContent = draggedItem && draggedItem.type === 'content';
                              const hasContentTypes = e.dataTransfer.types.includes('application/json');
                              const isRoadmapContent = e.dataTransfer.types.includes('application/x-roadmap-content');
                              const isDraggingContent = draggedContentId !== null && draggedContentSectionId !== null;
                              
                              const isSidePanel = e.dataTransfer.types.includes('application/x-side-panel');
                              const isDraggingFromSidePanel = !isRoadmapContent && !isDraggingContent && hasContentTypes && isSidePanel;
                              const isDraggingFromDifferentSection = isRoadmapContent && isDraggingContent && draggedContentSectionId !== node.id;
                              
                              if (isContent || hasContentTypes || isDraggingFromSidePanel || isDraggingFromDifferentSection) {
                                e.preventDefault();
                                e.stopPropagation();
                                e.dataTransfer.dropEffect = 'move';
                              }
                            }}
                            onDrop={(e) => {
                              const target = e.target as HTMLElement;
                              const isContentArea = target.closest('.content-area-drop-zone');
                              if (!isContentArea) {
                                e.preventDefault();
                                e.stopPropagation();
                                handleNodeDrop(e, node.id);
                              }
                            }}
                          >
                            {/* Remove Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveNode(node.id);
                              }}
                              className="absolute top-2 right-2 w-6 h-6 text-text-tertiary hover:text-text-secondary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20"
                              title="Remove node"
                              aria-label="Remove node"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                              </svg>
                            </button>
                            
                            {/* Collapse/Expand Button */}
                            <CollapseExpandButton
                              isExpanded={!collapsedRoadmapSections[node.id]}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const currentValue = collapsedRoadmapSections[node.id];
                                setCollapsedRoadmapSections(prev => ({
                                  ...prev,
                                  [node.id]: !currentValue
                                }));
                              }}
                              style={{ left: '-2rem' }}
                            />

                            <h3 className="text-lg font-bold text-primary-700 mb-1.5 font-primary">{sectionData.title}</h3>
                            <p className="text-sm text-text-secondary mb-2 leading-relaxed line-clamp-2 font-primary">{sectionData.description}</p>
                            <div className="flex flex-wrap gap-1.5">
                              {sectionData.tags.map((tag: string, tagIndex: number) => (
                                <DeltaBadge key={tagIndex} variant="default" size="sm" className="font-primary">
                                  {tag}
                                </DeltaBadge>
                              ))}
                            </div>
                          </DeltaCard>
                          
                          {/* Content Items - Only show if expanded */}
                          {!collapsedRoadmapSections[node.id] && (
                            <div 
                              data-section-id={node.id}
                              className={`content-area-drop-zone ml-14 space-y-3 min-h-[80px] py-2 transition-all duration-200 relative z-20 ${
                                hoveredSectionContentArea === node.id ? 'bg-success-100/50 rounded-lg border-2 border-success-300 border-dashed' : ''
                              }`}
                              onDragEnter={(e) => {
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
                                const isRoadmapContent = e.dataTransfer.types.includes('application/x-roadmap-content');
                                const isDraggingContent = draggedContentId !== null && draggedContentSectionId !== null;
                                const hasContentTypes = e.dataTransfer.types.includes('application/json');
                                const isSidePanel = e.dataTransfer.types.includes('application/x-side-panel');
                                
                                const isDraggingFromSidePanel = !isRoadmapContent && !isDraggingContent && hasContentTypes && isSidePanel;
                                const isDraggingFromDifferentSection = isRoadmapContent && isDraggingContent && draggedContentSectionId !== node.id;
                                
                                if (isDraggingFromSidePanel || isDraggingFromDifferentSection) {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setHoveredSectionContentArea(null);
                                  handleNodeDrop(e, node.id);
                                }
                              }}
                              style={{ pointerEvents: 'auto' }}
                            >
                              {sectionData.contents && 
                               Array.isArray(sectionData.contents) && 
                               sectionData.contents.length > 0 && 
                               sectionData.contents.map((content: CourseContentItem, contentIndex: number) => {
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
                                    onDragStart={(e) => {
                                      e.stopPropagation();
                                      setDraggedContentId(content.id);
                                      setDraggedContentSectionId(node.id);
                                      e.dataTransfer.setData('application/x-dragged-content-id', content.id);
                                      e.dataTransfer.setData('application/x-roadmap-content', 'true');
                                      e.dataTransfer.effectAllowed = 'move';
                                    }}
                                    onDragOver={(e) => {
                                      const isSidePanel = e.dataTransfer.types.includes('application/x-side-panel');
                                      const isRoadmapContent = e.dataTransfer.types.includes('application/x-roadmap-content');
                                      const isDraggingContent = draggedContentId !== null && draggedContentSectionId !== null;
                                      
                                      const isDraggingFromSidePanel = !isRoadmapContent && !isDraggingContent && isSidePanel;
                                      const isDraggingFromDifferentSection = isRoadmapContent && isDraggingContent && draggedContentSectionId !== node.id;
                                      
                                      if (isDraggingFromSidePanel || isDraggingFromDifferentSection) {
                                        return;
                                      }
                                      
                                      if (draggedContentId && draggedContentId !== content.id && draggedContentSectionId === node.id) {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        e.dataTransfer.dropEffect = 'move';
                                        setHoveredContentId(content.id);
                                      }
                                    }}
                                    onDragLeave={(e) => {
                                      const relatedTarget = e.relatedTarget as HTMLElement;
                                      if (!relatedTarget || !e.currentTarget.contains(relatedTarget)) {
                                        setHoveredContentId(null);
                                      }
                                    }}
                                    onDrop={(e) => {
                                      const isSidePanel = e.dataTransfer.types.includes('application/x-side-panel');
                                      const isRoadmapContent = e.dataTransfer.types.includes('application/x-roadmap-content');
                                      const isDraggingContent = draggedContentId !== null && draggedContentSectionId !== null;
                                      
                                      const isDraggingFromSidePanel = !isRoadmapContent && !isDraggingContent && isSidePanel;
                                      const isDraggingFromDifferentSection = isRoadmapContent && isDraggingContent && draggedContentSectionId !== node.id;
                                      
                                      if (isDraggingFromSidePanel || isDraggingFromDifferentSection) {
                                        return;
                                      }
                                      
                                      if (draggedContentId && draggedContentId !== content.id && draggedContentSectionId && draggedContentSectionId === node.id) {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        e.dataTransfer.setData('application/x-target-content-id', content.id);
                                        setHoveredContentId(content.id);
                                        handleNodeDrop(e, node.id, content.id);
                                      } else {
                                        e.preventDefault();
                                        e.stopPropagation();
                                      }
                                    }}
                                    onDragEnd={(e) => {
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
                                      
                                      setUsedItems(prev => {
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
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Second/Selected Course Roadmap */}
        {selectedCourses.length > 1 ? (
          <CourseRoadmapSidebar
            course={selectedCourses[1]?.data || null}
            courseTitle={selectedCourses[1]?.title || 'Course 2'}
            collapsedSections={collapsedSections[selectedCourses[1]?.id || ''] || {}}
            usedItems={usedItems}
            onToggleSection={(sectionId) => toggleSection(sectionId, selectedCourses[1]?.id)}
            onSectionDragStart={(e, section) => handleDragStart(e, 'section', section)}
            onContentDragStart={(e, content) => handleDragStart(e, 'content', content)}
            onDragEnd={handleDragEnd}
            onChangeCourse={() => handleChangeCourse(1)}
            onPreviewContent={(content) => {
              setPreviewContent(content);
              setIsPreviewModalOpen(true);
            }}
          />
        ) : (
          <DeltaCard
            variant="default"
            padding="lg"
            className="w-1/3 border-2 border-dashed border-border-primary rounded-lg bg-surface-primary overflow-y-auto font-primary"
          >
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg
                className="w-24 h-24 text-text-tertiary mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <p className="text-text-secondary text-sm font-medium mb-2 font-primary">No course selected</p>
              <p className="text-text-tertiary text-xs font-primary">Click "Add Course" to add another course</p>
            </div>
          </DeltaCard>
        )}
      </div>

      {/* Modals */}
      <CourseSelectionModal
        isOpen={isCourseSelectionModalOpen}
        onClose={() => {
          setCourseToReplace(undefined);
          setIsCourseSelectionModalOpen(false);
        }}
        courses={sampleCourses}
        onSelectCourse={(course) => handleCourseSelection(course, courseToReplace)}
      />

      <PreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => {
          setIsPreviewModalOpen(false);
          setPreviewContent(null);
        }}
        content={previewContent}
      />

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
