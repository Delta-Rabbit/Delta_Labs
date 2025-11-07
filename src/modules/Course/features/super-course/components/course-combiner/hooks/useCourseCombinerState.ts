/**
 * Delta Labs Course Combiner State Hook
 * Centralized state management for CourseCombiner
 */

import { useState, useRef } from 'react';

export interface CourseContentItem {
  id: string;
  type: 'document' | 'video' | 'audio';
  title: string;
  description: string;
  tags: string[];
}

export interface CourseSection {
  id: string;
  title: string;
  description: string;
  tags: string[];
  contents: CourseContentItem[];
}

export interface CourseData {
  id: string;
  title: string;
  sections: CourseSection[];
}

export interface RoadmapNode {
  id: string;
  type: 'section';
  data: CourseSection;
  position: { x: number; y: number };
  connections: string[];
  parentId?: string;
  level: number;
}

export interface DraggedItem {
  type: 'section' | 'content';
  data: CourseSection | CourseContentItem;
}

export const useCourseCombinerState = (initialCourseId: string, initialCourseTitle: string, initialCourseData: CourseData) => {
  // Course data
  const [selectedCourses, setSelectedCourses] = useState<Array<{ id: string; title: string; data: CourseData }>>([
    { id: initialCourseId, title: initialCourseTitle, data: initialCourseData },
  ]);

  // UI state
  const [collapsedSections, setCollapsedSections] = useState<Record<string, Record<string, boolean>>>({});
  const [isCourseSelectionModalOpen, setIsCourseSelectionModalOpen] = useState(false);
  const [isCreateSectionModalOpen, setIsCreateSectionModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [courseToReplace, setCourseToReplace] = useState<number | undefined>(undefined);

  // Roadmap state
  const [roadmapNodes, setRoadmapNodes] = useState<RoadmapNode[]>([]);
  const [combinedCourseData, setCombinedCourseData] = useState<CourseData | null>(null);
  const [collapsedRoadmapSections, setCollapsedRoadmapSections] = useState<Record<string, boolean>>({});

  // Drag and drop state
  const [draggedItem, setDraggedItem] = useState<DraggedItem | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [usedItems, setUsedItems] = useState<Set<string>>(new Set());
  const [draggedContentId, setDraggedContentId] = useState<string | null>(null);
  const [draggedContentSectionId, setDraggedContentSectionId] = useState<string | null>(null);
  const [hoveredContentId, setHoveredContentId] = useState<string | null>(null);
  const [hoveredSectionContentArea, setHoveredSectionContentArea] = useState<string | null>(null);

  // Form state
  const [newSectionName, setNewSectionName] = useState('');
  const [newSectionDescription, setNewSectionDescription] = useState('');
  const [newSectionTags, setNewSectionTags] = useState('');
  const [previewContent, setPreviewContent] = useState<CourseContentItem | null>(null);

  // Refs
  const canvasRef = useRef<HTMLDivElement>(null);

  return {
    // Course data
    selectedCourses,
    setSelectedCourses,
    
    // UI state
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
    
    // Roadmap state
    roadmapNodes,
    setRoadmapNodes,
    combinedCourseData,
    setCombinedCourseData,
    collapsedRoadmapSections,
    setCollapsedRoadmapSections,
    
    // Drag and drop state
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
    
    // Form state
    newSectionName,
    setNewSectionName,
    newSectionDescription,
    setNewSectionDescription,
    newSectionTags,
    setNewSectionTags,
    previewContent,
    setPreviewContent,
    
    // Refs
    canvasRef,
  };
};

