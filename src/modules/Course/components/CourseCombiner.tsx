/**
 * Delta Labs Course Combiner Component
 * Screen where users combine courses to create Super Courses
 * Features: Left panel with course roadmap, Right panel with editing canvas
 */

import React, { useState, useRef } from 'react';
import { DeltaButton } from '../../../components/theme';

// ============================================================================
// TYPES
// ============================================================================

interface CourseContentItem {
  id: string;
  type: 'document' | 'video' | 'audio';
  title: string;
  description: string;
  tags: string[];
}

interface CourseSection {
  id: string;
  title: string;
  description: string;
  tags: string[];
  contents: CourseContentItem[];
}

interface CourseData {
  id: string;
  title: string;
  sections: CourseSection[];
}

interface RoadmapNode {
  id: string;
  type: 'section'; // Content items can NEVER be standalone roadmap nodes - they only exist within sections
  data: CourseSection; // Only sections can be roadmap nodes
  position: { x: number; y: number };
  connections: string[]; // IDs of connected nodes
  parentId?: string; // ID of parent node in roadmap structure
  level: number; // Level in the roadmap hierarchy (0 = root)
}

// ============================================================================
// COURSE COMBINER COMPONENT
// ============================================================================

interface CourseCombinerProps {
  courseId: string;
  courseTitle: string;
  onBack?: () => void;
}

const CourseCombiner: React.FC<CourseCombinerProps> = ({ 
  courseId, 
  courseTitle,
  onBack 
}) => {
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

  const getContentIcon = (type: 'document' | 'video' | 'audio') => {
    switch (type) {
      case 'document':
        // Document icon
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        );
      case 'video':
        // Video/Play button icon
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" fill="currentColor"/>
            <path d="M6 10.5a.75.75 0 01.75-.75h16.5a.75.75 0 01.75.75v8.25a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75v-8.25z" fill="currentColor"/>
          </svg>
        );
      case 'audio':
        // Audio waves icon
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.75L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" fill="currentColor"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const [selectedCourses, setSelectedCourses] = useState<Array<{ id: string; title: string; data: CourseData }>>([
    { id: courseId, title: courseTitle, data: courseData },
  ]);

  // Track collapsed sections - sectionId -> boolean (true = collapsed, false/undefined = expanded)
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (sectionId: string) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId] // Toggle: if undefined/false (expanded), set to true (collapsed); if true (collapsed), set to false (expanded)
    }));
  };

  const isSectionExpanded = (sectionId: string) => {
    // Default to expanded if not explicitly set to collapsed
    return collapsedSections[sectionId] !== true;
  };

  const [combinedCourseData, setCombinedCourseData] = useState<CourseData | null>(null);
  const [roadmapNodes, setRoadmapNodes] = useState<RoadmapNode[]>([]);
  const [draggedItem, setDraggedItem] = useState<{ type: 'section' | 'content'; data: CourseSection | CourseContentItem } | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null); // Track node being dragged for reordering
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null); // Track hovered node for swap preview
  const [usedItems, setUsedItems] = useState<Set<string>>(new Set()); // Track items that have been added to roadmap
  const [collapsedRoadmapSections, setCollapsedRoadmapSections] = useState<Record<string, boolean>>({}); // Track collapsed sections in roadmap
  const [draggedContentId, setDraggedContentId] = useState<string | null>(null); // Track which content item is being dragged within roadmap
  const [draggedContentSectionId, setDraggedContentSectionId] = useState<string | null>(null); // Track which section the dragged content belongs to
  const [hoveredContentId, setHoveredContentId] = useState<string | null>(null); // Track hovered content for reordering
  const canvasRef = useRef<HTMLDivElement>(null);

  // Drag handlers
  const handleDragStart = (e: React.DragEvent, type: 'section' | 'content', data: CourseSection | CourseContentItem) => {
    setDraggedItem({ type, data });
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('application/json', JSON.stringify({ type, data }));
    // Mark items from side panels (not from roadmap)
    e.dataTransfer.setData('application/x-side-panel', 'true');
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDraggedNodeId(null);
    setHoveredNodeId(null);
  };

  // Remove a node from the roadmap
  const handleRemoveNode = (nodeId: string) => {
    setRoadmapNodes((prev: RoadmapNode[]) => {
      const nodeToRemove = prev.find((n: RoadmapNode) => n.id === nodeId);
      if (!nodeToRemove) return prev;

      // Remove the node
      const updatedNodes = prev.filter((n: RoadmapNode) => n.id !== nodeId);

      // Update connections - remove references to this node
      const cleanedNodes = updatedNodes.map((node: RoadmapNode) => ({
        ...node,
        connections: node.connections.filter((connId: string) => connId !== nodeId),
        parentId: node.parentId === nodeId ? undefined : node.parentId,
      }));

      // Mark the section and all its contents as unused again (can be dragged from side panels)
      setUsedItems((prev: Set<string>) => {
        const newSet = new Set(prev);
        // Remove the section itself
        newSet.delete(nodeToRemove.data.id);
        
        // If this is a section node, also remove all its contents
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

      // Recalculate positions to maintain structure
      return recalculateNodePositions(cleanedNodes);
    });
  };

  // Recalculate positions after node removal to maintain spacing
  const recalculateNodePositions = (nodes: RoadmapNode[]): RoadmapNode[] => {
    if (nodes.length === 0) return nodes;

    const nodeSpacing = 220;
    const centerX = canvasRef.current?.offsetWidth ? canvasRef.current.offsetWidth / 2 : 0;

    // Sort nodes by current Y position
    const sortedNodes = [...nodes].sort((a: RoadmapNode, b: RoadmapNode) => a.position.y - b.position.y);

    // Recalculate positions maintaining structure
    return sortedNodes.map((node: RoadmapNode, index: number) => {
      const baseY = index === 0 ? 160 : sortedNodes[index - 1].position.y + nodeSpacing;
      
      // If node has a parent, align with parent's X position
      let newX = node.position.x;
      if (node.parentId) {
        const parent = sortedNodes.find((n: RoadmapNode) => n.id === node.parentId);
        if (parent) {
          newX = parent.position.x;
        }
      } else if (index === 0) {
        newX = centerX;
      }

      return {
        ...node,
        position: { x: newX, y: baseY },
      };
    });
  };

  // Handle drag start for existing roadmap nodes (reordering)
  const handleNodeDragStart = (e: React.DragEvent, nodeId: string) => {
    e.stopPropagation();
    setDraggedNodeId(nodeId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', nodeId);
  };

  // Handle drag over for existing roadmap nodes (reordering)
  const handleNodeDragOver = (e: React.DragEvent, targetNodeId: string) => {
    if (!draggedNodeId || draggedNodeId === targetNodeId) return;
    
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
    setHoveredNodeId(targetNodeId);
  };

  // Handle drop for existing roadmap nodes (swap positions, add content to section, or reorder content)
  const handleNodeDrop = (e: React.DragEvent, targetNodeId: string, targetContentIdParam?: string) => {
    e.preventDefault();
    e.stopPropagation();

    // FIRST: Check if we're reordering content within a section
    // Content items from roadmap sections should NEVER create standalone nodes
    if (draggedContentId && draggedContentSectionId) {
      // Get target content ID from parameter (passed from onDrop handler), dataTransfer, or hoveredContentId
      // Priority: parameter > hoveredContentId > dataTransfer
      // Note: hoveredContentId is more reliable than dataTransfer for drag operations
      let targetContentId = targetContentIdParam;
      
      // If not in parameter, try hoveredContentId first (set during drag over, more reliable)
      if (!targetContentId && hoveredContentId) {
        targetContentId = hoveredContentId;
      }
      
      // If still not found, try dataTransfer
      if (!targetContentId) {
        targetContentId = e.dataTransfer.getData('application/x-target-content-id');
      }
      
      const targetSectionNode = roadmapNodes.find((n: RoadmapNode) => n.id === targetNodeId);
      
      // Reordering within same section
      if (targetSectionNode && targetSectionNode.type === 'section' && targetSectionNode.id === draggedContentSectionId) {
        const sectionData = targetSectionNode.data as CourseSection;
        const draggedIndex = sectionData.contents.findIndex((c: CourseContentItem) => c.id === draggedContentId);
        
        // If we have a target content ID, use it to find the target index
        // Make sure targetContentId is not the same as draggedContentId
        let targetIndex = -1;
        if (targetContentId && targetContentId !== draggedContentId) {
          targetIndex = sectionData.contents.findIndex((c: CourseContentItem) => c.id === targetContentId);
        }
        
        // If we couldn't find target index but have hoveredContentId, try that
        // Also ensure hoveredContentId is not the same as draggedContentId
        if (targetIndex === -1 && hoveredContentId && hoveredContentId !== draggedContentId) {
          targetIndex = sectionData.contents.findIndex((c: CourseContentItem) => c.id === hoveredContentId);
        }
        
        // If we still don't have a valid target index, check if we're dropping on the section card itself
        // If so, append to the end
        if (targetIndex === -1) {
          // Dropping on section card (not a specific content item) - append to end
          targetIndex = sectionData.contents.length;
        }
        
        // Debug: Check if we have valid indices
        if (draggedIndex === -1 || targetIndex === -1) {
          console.warn('Invalid indices for content reorder:', { 
            draggedIndex, 
            targetIndex, 
            targetContentId, 
            hoveredContentId,
            draggedContentId,
            sectionContents: sectionData.contents.map(c => ({ id: c.id, title: c.title }))
          });
        }
        
        // Only reorder if we have valid indices and they're different
        if (draggedIndex !== -1 && targetIndex !== -1 && draggedIndex !== targetIndex) {
          // Reorder content within section
          const newContents = [...sectionData.contents];
          const [removed] = newContents.splice(draggedIndex, 1);
          
          // Calculate the correct insertion index after removal
          // Standard behavior: when dragging onto an item, insert it at that position (replacing/swapping)
          // When dragging down (draggedIndex < targetIndex): 
          //   Example: [A(0), B(1), C(2)] -> drag A onto B (draggedIndex=0, targetIndex=1)
          //   - Remove A: [B(0), C(1)] (B shifted from 1 to 0, C from 2 to 1)
          //   - Original targetIndex was 1 (B), now B is at 0
          //   - To insert A at B's position: insert at 1 -> [B, A, C] (A after B) ✓
          //   - But if we want A before B: insert at 0 -> [A, B, C] (original, no change)
          // When dragging up (draggedIndex > targetIndex):
          //   Example: [A(0), B(1), C(2)] -> drag C onto A (draggedIndex=2, targetIndex=0)
          //   - Remove C: [A(0), B(1)] (A is still at 0, B at 1)
          //   - Insert at 0 (before A): [C, A, B] ✓
          let adjustedTargetIndex: number;
          if (draggedIndex < targetIndex) {
            // Dragging down (top to bottom): 
            // After removal, the target item that was at targetIndex is now at (targetIndex - 1)
            // We want to insert the dragged item at the target's NEW position
            // Since splice inserts BEFORE the index, we use targetIndex to insert AFTER the target
            // But wait - if target was at 1, now at 0, and we insert at 1, we insert before C
            // So we get [B, A, C] which is correct (A after B)
            adjustedTargetIndex = targetIndex;
          } else {
            // Dragging up (bottom to top): targetIndex unchanged, insert before target
            adjustedTargetIndex = targetIndex;
          }
          
          // Insert the removed item at the calculated position
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
          
          // Reset drag state after successful reorder
          setDraggedContentId(null);
          setDraggedContentSectionId(null);
          setHoveredContentId(null);
          return;
        } else if (draggedIndex === targetIndex) {
          // Same position - no change needed, just reset state
          setDraggedContentId(null);
          setDraggedContentSectionId(null);
          setHoveredContentId(null);
          return;
        } else {
          // Invalid indices - reset state and log warning
          console.warn('Content reorder failed - invalid indices:', { 
            draggedIndex, 
            targetIndex, 
            targetContentId, 
            hoveredContentId,
            draggedContentId,
            sectionContents: sectionData.contents.map(c => ({ id: c.id, title: c.title }))
          });
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
            // Remove from source section
            const updatedSourceSection = {
              ...sourceSectionData,
              contents: sourceSectionData.contents.filter((c: CourseContentItem) => c.id !== draggedContentId)
            };
            
            // Add to target section
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
      
      // If dropped on invalid target (not a section), reset state and content stays in original section
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
        // Add content to section
        const sectionData = targetNode.data as CourseSection;
        const contentData = itemData.data as CourseContentItem;
        
        // Check if content already exists in section
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

        // Mark the content item as used
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

      // Swap Y positions for reordering in vertical flow
      // This will change the order when sorted
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

  // Drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    // Don't allow dropping content items from roadmap sections on empty canvas
    // Content items can ONLY be dropped on sections or other content items
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
    // Don't allow entering canvas with roadmap content items
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
    // Only set to false if we're leaving the canvas itself, not child elements
    if (!canvasRef.current?.contains(e.relatedTarget as Node)) {
      setIsDraggingOver(false);
    }
  };

  // Calculate structured position for new node
  const calculateStructuredPosition = (dropX: number, dropY: number, canvasWidth: number, nodeType?: 'section' | 'content'): { x: number; y: number; parentId?: string; level: number } => {
    const centerX = canvasWidth / 2;
    const nodeSpacing = 220; // Vertical spacing between nodes (increased to prevent overlap)
    
    // For sections, position from left edge (timeline starts at left-6 = 1.5rem = 24px)
    // Section structure: timeline at left-6, section card starts at ml-14 (3.5rem = 56px)
    // So section's left edge is at 24px (for timeline) + 56px (ml-14) = 80px from container edge
    const sectionLeftOffset = 24; // left-6 = 1.5rem = 24px

    // If no nodes exist, position at starting point
    if (roadmapNodes.length === 0) {
      if (nodeType === 'section') {
        return {
          x: sectionLeftOffset, // Position from left edge for sections
          y: 160, // Below starting node
          level: 0,
        };
      }
      return {
        x: centerX,
        y: 160, // Below starting node
        level: 0,
      };
    }

    // For sections, find bottommost node and position below it from left edge
    if (nodeType === 'section') {
      if (roadmapNodes.length === 0) {
        return {
          x: sectionLeftOffset,
          y: 160,
          level: 0,
        };
      }
      
      // Find the bottommost node (highest Y position)
      const sortedByY = [...roadmapNodes].sort((a: RoadmapNode, b: RoadmapNode) => b.position.y - a.position.y);
      const bottommostNode = sortedByY[0];
      
      // Calculate the actual bottom edge of the bottommost section
      // Sections have a minimum height, plus additional height for content items
      const sectionData = bottommostNode.data as CourseSection;
      const sectionCardHeight = 100; // Base height of section card (p-3 + content)
      const contentItemHeight = 120; // Height per content item (including spacing)
      const sectionBottomPadding = 20; // Padding at bottom of section
      const connectionNodeHeight = 24; // Height for connection node at bottom
      
      // Calculate total height of the section including content
      let sectionTotalHeight = sectionCardHeight + sectionBottomPadding;
      
      // Check if section is collapsed to determine if we should include content height
      const isCollapsed = collapsedRoadmapSections[bottommostNode.id];
      
      if (sectionData.contents && sectionData.contents.length > 0 && !isCollapsed) {
        // Add height for content items (only if section is expanded)
        sectionTotalHeight += sectionData.contents.length * contentItemHeight;
      }
      
      // Add connection node height at bottom
      sectionTotalHeight += connectionNodeHeight;
      
      // Position new section below the bottom edge of the previous section
      const sectionGap = 60; // Gap between sections
      const newY = bottommostNode.position.y + sectionTotalHeight + sectionGap;
      
      return {
        x: sectionLeftOffset, // Always position sections from left edge
        y: newY,
        parentId: bottommostNode.id,
        level: bottommostNode.level,
      };
    }

    // For content items, use existing logic (centered positioning)
    // Find the closest existing node horizontally (for branching)
    let closestNode: RoadmapNode | null = null;
    let minDistance = Infinity;
    const snapThreshold = 100; // Pixels

    roadmapNodes.forEach((node: RoadmapNode) => {
      const distance = Math.abs(dropX - node.position.x);
      if (distance < minDistance && distance < snapThreshold) {
        minDistance = distance;
        closestNode = node;
      }
    });

    // If dropped near an existing node, check if we should branch from it
    if (closestNode) {
      // Find all children of this node (sorted by Y position)
      const existingChildren = roadmapNodes
        .filter((n: RoadmapNode) => n.parentId === closestNode!.id)
        .sort((a: RoadmapNode, b: RoadmapNode) => a.position.y - b.position.y);

      // If node has children, position below the last child
      if (existingChildren.length > 0) {
        const lastChild = existingChildren[existingChildren.length - 1];
        return {
          x: closestNode.position.x,
          y: lastChild.position.y + nodeSpacing,
          parentId: closestNode.id,
          level: closestNode.level + 1,
        };
      }

      // Otherwise, position directly below the parent
      return {
        x: closestNode.position.x,
        y: closestNode.position.y + nodeSpacing,
        parentId: closestNode.id,
        level: closestNode.level + 1,
      };
    }

    // Find the bottommost node (highest Y position) - this is where we'll add the next node
    const sortedByY = [...roadmapNodes].sort((a: RoadmapNode, b: RoadmapNode) => b.position.y - a.position.y);
    const bottommostNode = sortedByY[0];

    // Calculate the new Y position, ensuring it's always below the bottommost node
    const newY = bottommostNode.position.y + nodeSpacing;

    // If the bottommost node has a parent, continue that branch
    if (bottommostNode.parentId) {
      return {
        x: bottommostNode.position.x,
        y: newY,
        parentId: bottommostNode.parentId,
        level: bottommostNode.level,
      };
    }

    // Otherwise, continue the main sequence
    return {
      x: bottommostNode.position.x,
      y: newY,
      level: bottommostNode.level,
    };
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);

    // CRITICAL: Check if we're dropping a content item from a roadmap section
    // Content items should NEVER be dropped on empty canvas - they must stay within sections
    const isRoadmapContent = e.dataTransfer.types.includes('application/x-roadmap-content') || 
                             (draggedContentId && draggedContentSectionId);
    
    if (isRoadmapContent) {
      // Content item from roadmap section - reset state and prevent drop
      // Content stays in its original section
      setDraggedContentId(null);
      setDraggedContentSectionId(null);
      setHoveredContentId(null);
      return;
    }

    // Check if we're dropping an existing roadmap node (reordering sections/content nodes)
    const droppedNodeId = e.dataTransfer.getData('text/plain');
    if (droppedNodeId && roadmapNodes.some((n: RoadmapNode) => n.id === droppedNodeId)) {
      // This is handled by handleNodeDrop - but only for sections/content nodes, not content items within sections
      // Content items within sections should never be dropped on empty canvas
      return;
    }

    // Additional safety check: Verify the dropped ID is not a content item ID
    // Content items are not roadmap nodes - they exist within sections
    if (droppedNodeId && !e.dataTransfer.types.includes('application/json')) {
      // Check if this ID belongs to any content item in any section
      const isContentItemId = roadmapNodes.some((node: RoadmapNode) => {
        if (node.type === 'section') {
          const sectionData = node.data as CourseSection;
          return sectionData.contents && sectionData.contents.some((c: CourseContentItem) => c.id === droppedNodeId);
        }
        return false;
      });
      
      if (isContentItemId) {
        // This is a content item ID - should not be dropped on empty canvas
        return;
      }
    }

    // Try to get data from drag event or use state (new item from side panels)
    let itemData = draggedItem;
    if (!itemData) {
      try {
        const data = JSON.parse(e.dataTransfer.getData('application/json'));
        itemData = { type: data.type, data: data.data };
      } catch {
        return; // No valid data
      }
    }

    if (!itemData) return;
    
    // CRITICAL: Content items can NEVER be standalone roadmap nodes
    // They can ONLY exist within sections
    // Only sections can be dropped on empty canvas to create new roadmap nodes
    if (itemData.type === 'content') {
      // Content items should only be added to sections, never as standalone nodes
      // If dropped on empty canvas, ignore it
      setDraggedItem(null);
      return;
    }
    
    // Only sections are allowed to be dropped on empty canvas
    // Content items must be dropped on sections

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Calculate drop position
    const dropX = e.clientX - rect.left;
    const dropY = e.clientY - rect.top;

    // Calculate structured position - pass node type for proper positioning
    const structuredPos = calculateStructuredPosition(dropX, dropY, rect.width, itemData.type);

    // Determine the node to connect from (for sequential roadmap)
    let connectFromId: string | undefined = structuredPos.parentId;
    
    // If no explicit parent, connect to the previous node in sequence
    if (!connectFromId && roadmapNodes.length > 0) {
      // Find the bottommost node (the one we're continuing from)
      const sortedByY = [...roadmapNodes].sort((a: RoadmapNode, b: RoadmapNode) => b.position.y - a.position.y);
      const previousNode = sortedByY[0];
      connectFromId = previousNode.id;
    }

    // Create new roadmap node - ONLY SECTIONS can be created as roadmap nodes
    // Sections are dragged without contents - user can add contents later by dropping them onto sections
    const sectionData = itemData.data as CourseSection;
    const nodeData = {
      ...sectionData,
      contents: [] // Sections start empty - contents can be added by dropping them
    } as CourseSection;
    
    const newNode: RoadmapNode = {
      id: `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'section', // Only sections can be roadmap nodes
      data: nodeData,
      position: { x: structuredPos.x, y: structuredPos.y },
      connections: connectFromId ? [connectFromId] : [],
      parentId: structuredPos.parentId,
      level: structuredPos.level,
    };

    // Update previous node's connections if it exists
    if (connectFromId) {
      if (connectFromId === 'starting-node') {
        // First node connects to starting roadmap node (visual connection only)
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
    
    // Mark the item as used (cannot be dragged again from side panels)
    setUsedItems(prev => {
      const newSet = new Set(prev);
      newSet.add(itemData.data.id);
      return newSet;
    });

    // If it's a section, set it to expanded by default (show minus icon, contents visible)
    // Sections start expanded so users can see they can add contents
    if (itemData.type === 'section') {
      setCollapsedRoadmapSections(prev => ({
        ...prev,
        [newNode.id]: false // Start expanded (contents visible)
      }));
    }
    
    setDraggedItem(null);

    // Hide helper text after first drop
    if (!combinedCourseData) {
      setCombinedCourseData({
        id: 'combined-course',
        title: 'Super Course',
        sections: [],
      });
    }
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Top Action Buttons */}
      <div className="flex items-center justify-between">
        <DeltaButton
          variant="outline"
          size="md"
          onClick={() => {
            // TODO: Handle Auto Generate
            console.log('Auto Generate clicked');
          }}
        >
          Auto Generate
        </DeltaButton>
        <DeltaButton
          variant="primary"
          size="md"
          onClick={() => {
            // TODO: Handle Add Course - opens course selection modal
            console.log('Add Course clicked');
          }}
        >
          Add Course
        </DeltaButton>
      </div>

      {/* Main Content Area - Three Columns */}
      <div className="flex gap-6 flex-1 min-h-0" style={{ minHeight: 'calc(100vh - 300px)' }}>
        {/* Left Column - First Course Roadmap */}
        <div className="w-1/3 border-2 border-dashed border-gray-300 rounded-lg p-6 bg-white overflow-y-auto">
          {/* Course Title - Centered */}
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            {selectedCourses[0]?.title || 'Course 1'}
          </h2>

          {/* Sections */}
          <div className="space-y-6">
            {(selectedCourses[0]?.data?.sections || courseData.sections).map((section, sectionIndex) => (
              <div key={section.id} className="relative min-h-[200px]">
                {/* Timeline Structure - Positioned on left */}
                {/* Grey segment at very top */}
                <div className="absolute left-6 top-0 h-1.5 w-1 bg-gray-500"></div>
                {/* Green timeline continues down - only show if section is expanded */}
                {isSectionExpanded(section.id) && (
                  <div className="absolute left-6 top-1.5 bottom-0 w-1 bg-green-500"></div>
                )}

                    {/* Section Header Card - Light Gray, Wider, Positioned Right */}
                    <div
                      className={`ml-14 mb-3 mr-4 bg-gray-100 rounded-lg p-3 border border-gray-200 relative ${
                        usedItems.has(section.id) 
                          ? 'cursor-not-allowed opacity-50' 
                          : 'cursor-move'
                      }`}
                      draggable={!usedItems.has(section.id)}
                      onDragStart={(e) => {
                        if (!usedItems.has(section.id)) {
                          handleDragStart(e, 'section', section);
                        } else {
                          e.preventDefault();
                        }
                      }}
                      onDragEnd={handleDragEnd}
                    >
                  {/* Collapse/Expand Button - Circular, Centered on Section Card, Connected to Timeline */}
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center z-10 hover:bg-primary-600 transition-colors cursor-pointer shadow-md"
                    style={{ left: '-2rem' }}
                    aria-label={isSectionExpanded(section.id) ? 'Collapse section' : 'Expand section'}
                  >
                    {isSectionExpanded(section.id) ? (
                      // Minus icon (expanded)
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
                      </svg>
                    ) : (
                      // Plus icon (collapsed)
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                      </svg>
                    )}
                  </button>
                  <h3 className="text-lg font-bold text-primary-700 mb-1.5">{section.title}</h3>
                  <p className="text-sm text-gray-700 mb-2 leading-relaxed line-clamp-2">{section.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {section.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content Items - Branching from Timeline - Only show if expanded */}
                {isSectionExpanded(section.id) && (
                  <div className="ml-14 space-y-3">
                    {section.contents.map((content, contentIndex) => {
                    // Pattern: Documents and Video on RIGHT, Audio on LEFT
                    const isLeft = content.type === 'audio';
                    // Timeline is at left-6 (1.5rem), content starts at ml-14 (3.5rem)
                    // So timeline center is at -2rem (3.5rem - 1.5rem - 0.125rem for center) from content start
                    const timelineCenterOffset = '-2rem'; // -2rem = 3.5rem (ml-14) - 1.5rem (left-6) - 0.125rem (half of w-1)
                    
                    return (
                      <div
                        key={content.id}
                        className="relative"
                      >
                        {/* Green Circle Node - Positioned exactly on timeline */}
                        <div 
                          className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm z-10"
                          style={{ left: timelineCenterOffset }}
                        ></div>

                        {/* Horizontal Connection Line - Always visible, connects content to main timeline */}
                        {isLeft ? (
                          // For LEFT items (Audio): line extends LEFT from timeline to stop at card right edge
                          <div 
                            className="absolute top-1/2 transform -translate-y-1/2 h-0.5 bg-green-500 z-0"
                            style={{ 
                              left: timelineCenterOffset,
                              right: '100%',
                              transform: 'translateY(-50%)'
                            }}
                          ></div>
                        ) : (
                          // For RIGHT items (Video/Documents): line extends RIGHT from timeline to stop at card left edge
                          <div 
                            className="absolute top-1/2 transform -translate-y-1/2 h-0.5 bg-green-500 z-0"
                            style={{ 
                              left: timelineCenterOffset,
                              width: '2rem',
                              transform: 'translateY(-50%)'
                            }}
                          ></div>
                        )}

                        {/* Content Card - Light Green, Properly Sized */}
                        <div
                          className={`relative w-56 p-3 bg-green-50 rounded-lg hover:shadow-md transition-all border border-green-200 ${isLeft ? 'mr-auto' : ''} ${
                            usedItems.has(content.id)
                              ? 'cursor-not-allowed opacity-50'
                              : 'cursor-move'
                          }`}
                          draggable={!usedItems.has(content.id)}
                          onDragStart={(e) => {
                            if (!usedItems.has(content.id)) {
                              handleDragStart(e, 'content', content);
                            } else {
                              e.preventDefault();
                            }
                          }}
                          onDragEnd={handleDragEnd}
                        >
                          {/* Icon and Title - Inline */}
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex-shrink-0 w-6 h-6 text-primary-700 flex items-center justify-center">
                              {getContentIcon(content.type)}
                            </div>
                            <h4 className="text-base font-bold text-primary-700 leading-tight">
                              {content.title}
                            </h4>
                          </div>

                          {/* Description */}
                          <p className="text-sm text-gray-700 mb-3 line-clamp-2 leading-relaxed">
                            {content.description}
                          </p>

                          {/* Tags and Preview - Bottom Row */}
                          <div className="flex flex-wrap gap-2 items-center">
                            {content.tags.map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="text-xs bg-green-100 text-gray-700 px-2 py-1 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                            <button className="text-gray-700 hover:text-gray-900 text-sm font-medium flex items-center gap-1.5 ml-auto">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              Preview
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Middle Column - Drag and Drop Canvas for Combined Course */}
        <div className="w-1/3 border-2 border-dashed border-green-400 rounded-lg bg-green-50/30 flex flex-col">
          {/* Toolbar */}
          <div className="flex items-center justify-between p-4 border-b border-green-200 bg-green-50/50 rounded-t-lg">
            <div className="flex items-center gap-4">
              {/* Folder Icon */}
              <button className="p-2 hover:bg-green-100 rounded-lg transition-colors" title="Folder">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              </button>

              {/* Download Icon */}
              <button className="p-2 hover:bg-green-100 rounded-lg transition-colors" title="Download">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>

              {/* Upload Icon */}
              <button className="p-2 hover:bg-green-100 rounded-lg transition-colors" title="Upload">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </button>

              {/* Split Icon */}
              <button className="p-2 hover:bg-green-100 rounded-lg transition-colors" title="Split">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </button>

              {/* Merge Icon */}
              <button className="p-2 hover:bg-green-100 rounded-lg transition-colors" title="Merge">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4 4m4 4H8m0 0l4-4m-4 4l4 4" />
                </svg>
              </button>
            </div>

            {/* Done Button */}
            <DeltaButton
              variant="primary"
              size="sm"
              onClick={() => {
                // TODO: Handle Done - Save combined course
                console.log('Done clicked');
              }}
            >
              Done
            </DeltaButton>
          </div>

          {/* Canvas Area - Drop Zone for Combined Course */}
          <div
            ref={canvasRef}
            className={`flex-1 bg-green-50/20 overflow-y-auto p-6 relative ${isDraggingOver ? 'bg-green-100/40' : ''}`}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {/* Starting Roadmap Node Line - Only visible when no nodes exist */}
            {roadmapNodes.length === 0 && (
              <div className="absolute top-28 left-1/2 transform -translate-x-1/2 pointer-events-none">
                <div className="relative">
                  {/* Horizontal Line - Extends Left */}
                  <div className="absolute right-full top-1/2 w-16 h-0.5 bg-green-500 transform -translate-y-1/2"></div>
                  
                  {/* Central Green Node */}
                  <div className="relative w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-md z-10"></div>
                  
                  {/* Vertical Line - Extends Down */}
                  <div className="absolute left-1/2 top-full w-0.5 bg-green-500 transform -translate-x-1/2" style={{ height: '120px' }}></div>
                </div>
              </div>
            )}

            {/* Helper Text - Only show if no nodes */}
            {roadmapNodes.length === 0 && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center z-10 pointer-events-none">
                <p className="text-gray-500 text-sm font-medium">Drag course roadmaps here</p>
                <p className="text-gray-400 text-xs mt-2">Drop sections, documents, or videos to combine</p>
              </div>
            )}

            {/* Rendered Roadmap Nodes - Vertical Flow Layout (like side panels) */}
            <div className="relative">
              {/* Main Continuous Timeline - Runs through all sections */}
              {roadmapNodes.length > 0 && (
                <div className="absolute left-6 top-0 bottom-0 w-1 bg-green-500 z-0"></div>
              )}
              
              <div className="space-y-6 relative z-10">
                {roadmapNodes
                  .sort((a: RoadmapNode, b: RoadmapNode) => a.position.y - b.position.y)
                  .map((node: RoadmapNode, index: number) => {
                    // All roadmap nodes are sections - content items only exist within sections
                    const sectionData = node.data as CourseSection;
                    const isDragging = draggedNodeId === node.id;
                    const isHovered = hoveredNodeId === node.id;
                    const isFirst = index === 0;
                    const isLast = index === roadmapNodes.length - 1;

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
                        onDragOver={(e) => handleNodeDragOver(e, node.id)}
                        onDrop={(e) => handleNodeDrop(e, node.id)}
                        onDragLeave={() => setHoveredNodeId(null)}
                      >
                        {sectionData ? (
                          /* Section Node - Matching Side Panel Design Exactly */
                          <div className="relative min-h-[200px]" key={`section-wrapper-${node.id}`}>
                            {/* Grey segment at very top of first section */}
                            {isFirst && (
                              <div className="absolute left-6 top-0 h-1.5 w-1 bg-gray-500 z-10"></div>
                            )}
                            
                            {/* Section Timeline - Only for content items within this section */}
                            {!collapsedRoadmapSections[node.id] && sectionData.contents && sectionData.contents.length > 0 && (
                              <div className="absolute left-6 top-1.5 bottom-0 w-1 bg-green-500 z-0"></div>
                            )}
                            
                            {/* Section Header Card - Light Gray, Wider, Positioned Right - Matching side panel exactly */}
                            <div
                              className={`ml-14 mb-3 mr-4 bg-gray-100 rounded-lg p-3 border border-gray-200 relative group hover:shadow-lg transition-shadow duration-200 ${
                          usedItems.has(sectionData.id) 
                            ? 'cursor-not-allowed opacity-50' 
                            : 'cursor-move'
                        }`}
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
                          // Allow dropping content items onto sections (from side panel or from other sections)
                          const isContent = draggedItem && draggedItem.type === 'content';
                          const hasContentTypes = e.dataTransfer.types.includes('application/json');
                          const isDraggingContent = draggedContentId !== null && draggedContentSectionId !== null;
                          if (isContent || hasContentTypes || isDraggingContent) {
                            e.preventDefault();
                            e.stopPropagation();
                            e.dataTransfer.dropEffect = 'move';
                          }
                        }}
                        onDrop={(e) => {
                          // Handle dropping content onto section (from side panel or from other sections)
                          e.preventDefault();
                          e.stopPropagation();
                          handleNodeDrop(e, node.id);
                        }}
                      >
                        {/* Remove Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveNode(node.id);
                          }}
                          className="absolute top-2 right-2 w-6 h-6 text-gray-400 hover:text-gray-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20"
                          title="Remove node"
                          aria-label="Remove node"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
                          </svg>
                        </button>
                        
                        {/* Collapse/Expand Button - Circular, Centered on Section Card, Connected to Timeline */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const currentValue = collapsedRoadmapSections[node.id];
                            setCollapsedRoadmapSections(prev => ({
                              ...prev,
                              [node.id]: !currentValue
                            }));
                          }}
                          className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center z-10 hover:bg-primary-600 transition-colors cursor-pointer shadow-md"
                          style={{ left: '-2rem' }}
                          aria-label={collapsedRoadmapSections[node.id] ? 'Collapse section' : 'Expand section'}
                        >
                          {collapsedRoadmapSections[node.id] ? (
                            // Plus icon (collapsed)
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                            </svg>
                          ) : (
                            // Minus icon (expanded)
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
                            </svg>
                          )}
                        </button>
                        <h3 className="text-lg font-bold text-primary-700 mb-1.5">{sectionData.title}</h3>
                        <p className="text-sm text-gray-700 mb-2 leading-relaxed line-clamp-2">{sectionData.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {sectionData.tags.map((tag: string, tagIndex: number) => (
                            <span
                              key={tagIndex}
                              className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                            </div>
                            
                            {/* Content Items - Branching from Timeline - Only show if expanded and has contents */}
                            {sectionData.contents && 
                             Array.isArray(sectionData.contents) && 
                             sectionData.contents.length > 0 && 
                             !collapsedRoadmapSections[node.id] && (
                              <div className="ml-14 space-y-3">
                            {sectionData.contents.map((content: CourseContentItem, contentIndex: number) => {
                              // Pattern: Documents and Video on RIGHT, Audio on LEFT (matching side panels)
                              const isLeft = content.type === 'audio';
                              const timelineCenterOffset = '-2rem'; // -2rem = 3.5rem (ml-14) - 1.5rem (left-6) - 0.125rem
                              
                              return (
                              <div key={content.id} className="relative">
                                {/* Green Circle Node - Positioned exactly on timeline */}
                                <div 
                                  className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm z-10"
                                  style={{ left: timelineCenterOffset }}
                                ></div>

                                {/* Horizontal Connection Line - Connects content to main timeline */}
                                {isLeft ? (
                                  // For LEFT items (Audio): line extends LEFT from timeline
                                  <div 
                                    className="absolute top-1/2 transform -translate-y-1/2 h-0.5 bg-green-500 z-0"
                                    style={{ 
                                      left: timelineCenterOffset,
                                      right: '100%',
                                    }}
                                  ></div>
                                ) : (
                                  // For RIGHT items (Video/Documents): line extends RIGHT from timeline
                                  <div 
                                    className="absolute top-1/2 transform -translate-y-1/2 h-0.5 bg-green-500 z-0"
                                    style={{ 
                                      left: timelineCenterOffset,
                                      width: '2rem',
                                    }}
                                  ></div>
                                )}
                                
                                {/* Content Node */}
                                <div
                                  className={`relative w-56 p-3 bg-green-50 rounded-lg hover:shadow-md transition-all border border-green-200 ${isLeft ? 'mr-auto' : ''} ${draggedContentId === content.id ? 'opacity-50 scale-95' : hoveredContentId === content.id ? 'scale-105' : 'opacity-100'} group cursor-move`}
                                  draggable={true}
                                  onDragStart={(e) => {
                                    e.stopPropagation();
                                    setDraggedContentId(content.id);
                                    setDraggedContentSectionId(node.id);
                                    // Mark this as a content item from roadmap (not from side panel)
                                    // Use a different key for dragged content ID to avoid conflicts
                                    e.dataTransfer.setData('application/x-dragged-content-id', content.id);
                                    e.dataTransfer.setData('application/x-roadmap-content', 'true');
                                    e.dataTransfer.effectAllowed = 'move';
                                  }}
                                  onDragOver={(e) => {
                                    // Only allow drag over if dragging from the same section
                                    if (draggedContentId && draggedContentId !== content.id && draggedContentSectionId === node.id) {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      e.dataTransfer.dropEffect = 'move';
                                      setHoveredContentId(content.id);
                                    }
                                  }}
                                  onDragLeave={(e) => {
                                    // Only clear hover if we're actually leaving this content item
                                    // Check if relatedTarget is not a child of this content item
                                    const relatedTarget = e.relatedTarget as HTMLElement;
                                    if (!relatedTarget || !e.currentTarget.contains(relatedTarget)) {
                                      setHoveredContentId(null);
                                    }
                                  }}
                                  onDrop={(e) => {
                                    if (draggedContentId && draggedContentId !== content.id && draggedContentSectionId && draggedContentSectionId === node.id) {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      // Set target content ID for reordering using a specific key
                                      e.dataTransfer.setData('application/x-target-content-id', content.id);
                                      // Also update hoveredContentId to ensure it's available
                                      setHoveredContentId(content.id);
                                      // Pass the target content ID directly to handleNodeDrop
                                      handleNodeDrop(e, node.id, content.id);
                                    } else {
                                      // Invalid drop - prevent default
                                      e.preventDefault();
                                      e.stopPropagation();
                                    }
                                  }}
                                  onDragEnd={(e) => {
                                    // Always reset state - if dropped on invalid target, content stays in original section
                                    // The drag event might have been cancelled or dropped on invalid target
                                    const dropEffect = e.dataTransfer.dropEffect;
                                    if (dropEffect === 'none' || dropEffect === '') {
                                      // Invalid drop - content stays in original section, just reset state
                                      // Cancel the drag operation
                                      e.preventDefault();
                                    }
                                    setDraggedContentId(null);
                                    setDraggedContentSectionId(null);
                                    setHoveredContentId(null);
                                  }}
                                >
                                  {/* Remove Button for Content */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // Remove this content from the section
                                      const updatedSection = {
                                        ...sectionData,
                                        contents: sectionData.contents.filter((c: CourseContentItem) => c.id !== content.id)
                                      };
                                      setRoadmapNodes((prev: RoadmapNode[]) => prev.map((n: RoadmapNode) => 
                                        n.id === node.id ? { ...n, data: updatedSection } : n
                                      ));
                                      
                                      // Mark content as available again (can be dragged from side panel)
                                      setUsedItems(prev => {
                                        const newSet = new Set(prev);
                                        newSet.delete(content.id);
                                        return newSet;
                                      });
                                    }}
                                    className="absolute top-2 right-2 w-6 h-6 text-gray-400 hover:text-gray-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20"
                                    title="Remove content"
                                    aria-label="Remove content"
                                  >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
                                    </svg>
                                  </button>
                                  
                                  {/* Icon and Title - Inline */}
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className="flex-shrink-0 w-6 h-6 text-primary-700 flex items-center justify-center">
                                      {getContentIcon(content.type)}
                                    </div>
                                    <h4 className="text-base font-bold text-primary-700 leading-tight">
                                      {content.title}
                                    </h4>
                                  </div>
                                  <p className="text-sm text-gray-700 mb-2 line-clamp-2">{content.description}</p>
                                  <div className="flex flex-wrap gap-1.5 mb-1">
                                    {content.tags.slice(0, 2).map((tag: string, tagIndex: number) => (
                                      <span key={tagIndex} className="text-xs bg-green-100 text-gray-700 px-2 py-1 rounded">
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              );
                            })}
                              </div>
                            )}
                          </div>
                    ) : null}
                  </div>
                );
              })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Second/Selected Course Roadmap */}
        <div className="w-1/3 border-2 border-dashed border-gray-300 rounded-lg p-6 bg-white overflow-y-auto">
          {selectedCourses.length > 1 ? (
            <>
              {/* Course Title */}
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {selectedCourses[1]?.title || 'Course 2'}
              </h2>

              {/* Sections */}
              <div className="space-y-6">
                {(selectedCourses[1]?.data?.sections || []).map((section, sectionIndex) => (
                  <div key={section.id} className="relative min-h-[200px]">
                    {/* Timeline Structure - Positioned on left */}
                    {/* Grey segment at very top */}
                    <div className="absolute left-6 top-0 h-1.5 w-1 bg-gray-500"></div>
                    {/* Green timeline continues down - only show if section is expanded */}
                    {isSectionExpanded(section.id) && (
                      <div className="absolute left-6 top-1.5 bottom-0 w-1 bg-green-500"></div>
                    )}

                    {/* Section Header Card - Light Gray, Wider, Positioned Right */}
                    <div
                      className={`ml-14 mb-3 mr-4 bg-gray-100 rounded-lg p-3 border border-gray-200 relative ${
                        usedItems.has(section.id) 
                          ? 'cursor-not-allowed opacity-50' 
                          : 'cursor-move'
                      }`}
                      draggable={!usedItems.has(section.id)}
                      onDragStart={(e) => {
                        if (!usedItems.has(section.id)) {
                          handleDragStart(e, 'section', section);
                        } else {
                          e.preventDefault();
                        }
                      }}
                      onDragEnd={handleDragEnd}
                    >
                      {/* Collapse/Expand Button - Circular, Centered on Section Card, Connected to Timeline */}
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center z-10 hover:bg-primary-600 transition-colors cursor-pointer shadow-md"
                        style={{ left: '-2rem' }}
                        aria-label={isSectionExpanded(section.id) ? 'Collapse section' : 'Expand section'}
                      >
                        {isSectionExpanded(section.id) ? (
                          // Minus icon (expanded)
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
                          </svg>
                        ) : (
                          // Plus icon (collapsed)
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                          </svg>
                        )}
                      </button>
                      <h3 className="text-lg font-bold text-primary-700 mb-1.5">{section.title}</h3>
                      <p className="text-sm text-gray-700 mb-2 leading-relaxed line-clamp-2">{section.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {section.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Content Items - Branching from Timeline - Only show if expanded */}
                    {isSectionExpanded(section.id) && (
                      <div className="ml-14 space-y-3">
                        {section.contents.map((content, contentIndex) => {
                        // Pattern: Documents and Video on RIGHT, Audio on LEFT
                        const isLeft = content.type === 'audio';
                        // Timeline is at left-6 (1.5rem), content starts at ml-14 (3.5rem)
                        // So timeline center is at -2rem (3.5rem - 1.5rem - 0.125rem for center) from content start
                        const timelineCenterOffset = '-2rem'; // -2rem = 3.5rem (ml-14) - 1.5rem (left-6) - 0.125rem (half of w-1)
                        
                        return (
                          <div
                            key={content.id}
                            className="relative"
                          >
                            {/* Green Circle Node - Positioned exactly on timeline */}
                            <div 
                              className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm z-10"
                              style={{ left: timelineCenterOffset }}
                            ></div>

                            {/* Horizontal Connection Line - Always visible, connects content to main timeline */}
                            {isLeft ? (
                              // For LEFT items (Audio): line extends LEFT from timeline to stop at card right edge
                              <div 
                                className="absolute top-1/2 transform -translate-y-1/2 h-0.5 bg-green-500 z-0"
                                style={{ 
                                  left: timelineCenterOffset,
                                  right: '100%',
                                  transform: 'translateY(-50%)'
                                }}
                              ></div>
                            ) : (
                              // For RIGHT items (Video/Documents): line extends RIGHT from timeline to stop at card left edge
                              <div 
                                className="absolute top-1/2 transform -translate-y-1/2 h-0.5 bg-green-500 z-0"
                                style={{ 
                                  left: timelineCenterOffset,
                                  width: '2rem',
                                  transform: 'translateY(-50%)'
                                }}
                              ></div>
                            )}

                            {/* Content Card - Light Green, Properly Sized */}
                            <div
                              className={`relative w-56 p-3 bg-green-50 rounded-lg hover:shadow-md transition-all border border-green-200 ${isLeft ? 'mr-auto' : ''} ${
                                usedItems.has(content.id)
                                  ? 'cursor-not-allowed opacity-50'
                                  : 'cursor-move'
                              }`}
                              draggable={!usedItems.has(content.id)}
                              onDragStart={(e) => {
                                if (!usedItems.has(content.id)) {
                                  handleDragStart(e, 'content', content);
                                } else {
                                  e.preventDefault();
                                }
                              }}
                              onDragEnd={handleDragEnd}
                            >
                              {/* Icon and Title - Inline */}
                              <div className="flex items-center gap-2 mb-2">
                                <div className="flex-shrink-0 w-6 h-6 text-primary-700 flex items-center justify-center">
                                  {getContentIcon(content.type)}
                                </div>
                                <h4 className="text-base font-bold text-primary-700 leading-tight">
                                  {content.title}
                                </h4>
                              </div>

                              {/* Description */}
                              <p className="text-sm text-gray-700 mb-3 line-clamp-2 leading-relaxed">
                                {content.description}
                              </p>

                              {/* Tags and Preview - Bottom Row */}
                              <div className="flex flex-wrap gap-2 items-center">
                                {content.tags.map((tag, tagIndex) => (
                                  <span
                                    key={tagIndex}
                                    className="text-xs bg-green-100 text-gray-700 px-2 py-1 rounded"
                                  >
                                    {tag}
                                  </span>
                                ))}
                                <button className="text-gray-700 hover:text-gray-900 text-sm font-medium flex items-center gap-1.5 ml-auto">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                  Preview
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Empty State - Prompt to add course */
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg
                className="w-24 h-24 text-gray-300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <p className="text-gray-500 text-sm font-medium mb-2">No course selected</p>
              <p className="text-gray-400 text-xs">Click "Add Course" to add another course</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCombiner;

