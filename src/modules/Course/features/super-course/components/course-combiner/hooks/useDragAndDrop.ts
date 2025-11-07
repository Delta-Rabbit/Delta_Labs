/**
 * Delta Labs Course Combiner Drag and Drop Hook
 * Handles all drag and drop logic for roadmap building
 */

import { useCallback } from 'react';
import type { CourseSection, CourseContentItem, RoadmapNode } from './useCourseCombinerState';

export interface UseDragAndDropProps {
  roadmapNodes: RoadmapNode[];
  setRoadmapNodes: React.Dispatch<React.SetStateAction<RoadmapNode[]>>;
  usedItems: Set<string>;
  setUsedItems: React.Dispatch<React.SetStateAction<Set<string>>>;
  collapsedRoadmapSections: Record<string, boolean>;
  setCollapsedRoadmapSections: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  draggedItem: { type: 'section' | 'content'; data: CourseSection | CourseContentItem } | null;
  setDraggedItem: React.Dispatch<React.SetStateAction<{ type: 'section' | 'content'; data: CourseSection | CourseContentItem } | null>>;
  draggedNodeId: string | null;
  setDraggedNodeId: React.Dispatch<React.SetStateAction<string | null>>;
  hoveredNodeId: string | null;
  setHoveredNodeId: React.Dispatch<React.SetStateAction<string | null>>;
  draggedContentId: string | null;
  setDraggedContentId: React.Dispatch<React.SetStateAction<string | null>>;
  draggedContentSectionId: string | null;
  setDraggedContentSectionId: React.Dispatch<React.SetStateAction<string | null>>;
  hoveredContentId: string | null;
  setHoveredContentId: React.Dispatch<React.SetStateAction<string | null>>;
  canvasRef: React.RefObject<HTMLDivElement>;
}

export const useDragAndDrop = ({
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
}: UseDragAndDropProps) => {
  const handleDragStart = useCallback((e: React.DragEvent, type: 'section' | 'content', data: CourseSection | CourseContentItem) => {
    setDraggedItem({ type, data });
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('application/json', JSON.stringify({ type, data }));
    e.dataTransfer.setData('application/x-side-panel', 'true');
  }, [setDraggedItem]);

  const handleDragEnd = useCallback(() => {
    setDraggedItem(null);
    setDraggedNodeId(null);
    setHoveredNodeId(null);
    setDraggedContentId(null);
    setDraggedContentSectionId(null);
    setHoveredContentId(null);
  }, [setDraggedItem, setDraggedNodeId, setHoveredNodeId, setDraggedContentId, setDraggedContentSectionId, setHoveredContentId]);

  const handleNodeDragStart = useCallback((e: React.DragEvent, nodeId: string) => {
    e.stopPropagation();
    setDraggedNodeId(nodeId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', nodeId);
  }, [setDraggedNodeId]);

  const handleNodeDragOver = useCallback((e: React.DragEvent, targetNodeId: string) => {
    if (!draggedNodeId || draggedNodeId === targetNodeId) return;
    
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
    setHoveredNodeId(targetNodeId);
  }, [draggedNodeId, setHoveredNodeId]);

  // Complex drop handler - simplified version, full logic preserved in original
  const handleNodeDrop = useCallback((e: React.DragEvent, targetNodeId: string, targetContentIdParam?: string) => {
    e.preventDefault();
    e.stopPropagation();

    // This is a simplified version - the full complex logic is in the original
    // For now, we'll preserve the structure and add the full logic later
    // The original has ~500 lines of drop handling logic
    
    setDraggedNodeId(null);
    setHoveredNodeId(null);
  }, [setDraggedNodeId, setHoveredNodeId]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedItem || !canvasRef.current) return;

    // Calculate position
    const rect = canvasRef.current.getBoundingClientRect();
    const dropX = e.clientX - rect.left;
    const dropY = e.clientY - rect.top;
    const canvasWidth = canvasRef.current.offsetWidth;

    // Create new node (simplified - full logic in original)
    const newNode: RoadmapNode = {
      id: draggedItem.data.id,
      type: 'section',
      data: draggedItem.data as CourseSection,
      position: { x: canvasWidth / 2, y: roadmapNodes.length * 220 + 160 },
      connections: [],
      parentId: undefined,
      level: 0,
    };

    setRoadmapNodes(prev => [...prev, newNode]);
    setUsedItems(prev => new Set(prev).add(draggedItem.data.id));
    setCollapsedRoadmapSections(prev => ({
      ...prev,
      [newNode.id]: false,
    }));
    setDraggedItem(null);
  }, [draggedItem, canvasRef, roadmapNodes.length, setRoadmapNodes, setUsedItems, setCollapsedRoadmapSections, setDraggedItem]);

  return {
    handleDragStart,
    handleDragEnd,
    handleNodeDragStart,
    handleNodeDragOver,
    handleNodeDrop,
    handleDrop,
  };
};

