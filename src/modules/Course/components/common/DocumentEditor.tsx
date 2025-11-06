/**
 * Delta Labs Document Editor
 * Block-based document editor similar to Notion/ClickUp
 * Step 2: Enhanced with slash commands, rich formatting, images, videos
 */

import React, { useState, useRef, useEffect } from 'react';

// ============================================================================
// TYPES
// ============================================================================

export type BlockType = 
  | 'paragraph'
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'bulleted-list'
  | 'numbered-list'
  | 'todo'
  | 'code'
  | 'quote'
  | 'divider'
  | 'image'
  | 'video';

export interface DocumentBlock {
  id: string;
  type: BlockType;
  content: string;
  checked?: boolean; // For todo blocks
  url?: string; // For image/video blocks
  children?: DocumentBlock[]; // For nested blocks
}

interface DocumentEditorProps {
  content?: DocumentBlock[];
  onSave?: (blocks: DocumentBlock[]) => void;
  readOnly?: boolean;
}

interface SlashCommand {
  id: string;
  label: string;
  type: BlockType;
  icon: string;
}

// ============================================================================
// SLASH COMMANDS
// ============================================================================

const SLASH_COMMANDS: SlashCommand[] = [
  { id: '1', label: 'Heading 1', type: 'heading1', icon: '📝' },
  { id: '2', label: 'Heading 2', type: 'heading2', icon: '📝' },
  { id: '3', label: 'Heading 3', type: 'heading3', icon: '📝' },
  { id: '4', label: 'Bulleted List', type: 'bulleted-list', icon: '•' },
  { id: '5', label: 'Numbered List', type: 'numbered-list', icon: '1.' },
  { id: '6', label: 'To-do', type: 'todo', icon: '☐' },
  { id: '7', label: 'Code Block', type: 'code', icon: '{}' },
  { id: '8', label: 'Quote', type: 'quote', icon: '"' },
  { id: '9', label: 'Divider', type: 'divider', icon: '---' },
  { id: '10', label: 'Image', type: 'image', icon: '🖼️' },
  { id: '11', label: 'Video', type: 'video', icon: '🎥' },
];

// ============================================================================
// DOCUMENT EDITOR COMPONENT
// ============================================================================

export const DocumentEditor: React.FC<DocumentEditorProps> = ({
  content = [],
  onSave,
  readOnly = false,
}) => {
  const [blocks, setBlocks] = useState<DocumentBlock[]>(() => {
    if (content.length > 0) return content;
    return [{ id: '1', type: 'paragraph', content: '' }];
  });

  const [focusedBlockId, setFocusedBlockId] = useState<string | null>(null);
  const [draggedBlockId, setDraggedBlockId] = useState<string | null>(null);
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashMenuPosition, setSlashMenuPosition] = useState({ top: 0, left: 0 });
  const [slashFilter, setSlashFilter] = useState('');
  const [showFormatToolbar, setShowFormatToolbar] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });
  
  const blockRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const slashMenuRef = useRef<HTMLDivElement | null>(null);

  // Add new block
  const addBlock = (index: number, type: BlockType = 'paragraph', content: string = '') => {
    const newBlock: DocumentBlock = {
      id: Date.now().toString(),
      type,
      content,
      ...(type === 'todo' && { checked: false }),
    };
    const newBlocks = [...blocks];
    newBlocks.splice(index + 1, 0, newBlock);
    setBlocks(newBlocks);
    setFocusedBlockId(newBlock.id);
    
    // Focus the new block after render
    setTimeout(() => {
      const element = blockRefs.current[newBlock.id]?.querySelector('[contenteditable]') as HTMLElement;
      if (element) {
        element.focus();
        if (element instanceof HTMLInputElement || element.tagName === 'INPUT') {
          // For input elements
        } else {
          // For contentEditable, place cursor at end
          const range = document.createRange();
          const sel = window.getSelection();
          range.selectNodeContents(element);
          range.collapse(false);
          sel?.removeAllRanges();
          sel?.addRange(range);
        }
      }
    }, 10);
  };

  // Update block content
  const updateBlock = (id: string, content: string) => {
    setBlocks(prev => prev.map(block => 
      block.id === id ? { ...block, content } : block
    ));
  };

  // Update block type
  const changeBlockType = (id: string, type: BlockType) => {
    setBlocks(prev => prev.map(block => 
      block.id === id ? { ...block, type } : block
    ));
  };

  // Delete block
  const deleteBlock = (id: string) => {
    if (blocks.length === 1) return;
    setBlocks(prev => prev.filter(block => block.id !== id));
    const index = blocks.findIndex(b => b.id === id);
    if (index > 0) {
      setFocusedBlockId(blocks[index - 1].id);
    }
  };

  // Handle slash command
  const handleSlashCommand = (e: React.KeyboardEvent, blockId: string, index: number) => {
    const element = e.currentTarget as HTMLElement;
    const text = element.textContent || '';
    
    if (text === '/' || (text.endsWith('/') && text.length > 1 && !showSlashMenu)) {
      // Show slash menu
      const rect = element.getBoundingClientRect();
      setSlashMenuPosition({ top: rect.bottom + 5, left: rect.left });
      setShowSlashMenu(true);
      setSlashFilter('');
    } else if (showSlashMenu && text.includes('/')) {
      // Filter commands
      const filter = text.substring(text.lastIndexOf('/') + 1).toLowerCase();
      setSlashFilter(filter);
    }
  };

  // Handle slash menu selection
  const selectSlashCommand = (command: SlashCommand, blockId: string, index: number) => {
    const block = blocks.find(b => b.id === blockId);
    if (!block) return;

    const currentText = block.content;
    const slashIndex = currentText.lastIndexOf('/');
    const textBeforeSlash = currentText.substring(0, slashIndex);
    
    // Update block type
    changeBlockType(blockId, command.type);
    
    // Clear content if it's a divider
    if (command.type === 'divider') {
      updateBlock(blockId, '');
    } else {
      updateBlock(blockId, textBeforeSlash);
    }
    
    // Handle special blocks
    if (command.type === 'image' || command.type === 'video') {
      updateBlock(blockId, '');
      // Show URL input or file picker
      const url = prompt(`Enter ${command.type} URL:`);
      if (url) {
        setBlocks(prev => prev.map(b => 
          b.id === blockId ? { ...b, url } : b
        ));
      }
    }
    
    setShowSlashMenu(false);
    setSlashFilter('');
  };

  // Filtered slash commands
  const filteredCommands = SLASH_COMMANDS.filter(cmd => 
    cmd.label.toLowerCase().includes(slashFilter.toLowerCase())
  );

  // Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent, blockId: string, index: number) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      if (showSlashMenu) {
        e.preventDefault();
        if (filteredCommands.length > 0) {
          selectSlashCommand(filteredCommands[0], blockId, index);
        }
        return;
      }
      e.preventDefault();
      addBlock(index);
    } else if (e.key === 'Backspace') {
      const block = blocks.find(b => b.id === blockId);
      if (block && block.content === '' && blocks.length > 1 && !showSlashMenu) {
        e.preventDefault();
        deleteBlock(blockId);
      }
    } else if (e.key === 'ArrowUp' && index === 0) {
      // Focus previous block
      e.preventDefault();
      if (index > 0) {
        setFocusedBlockId(blocks[index - 1].id);
      }
    } else if (e.key === 'ArrowDown' && index === blocks.length - 1) {
      // Focus next block or create new
      e.preventDefault();
      if (index < blocks.length - 1) {
        setFocusedBlockId(blocks[index + 1].id);
      } else {
        addBlock(index);
      }
    } else if (e.key === '/' && !showSlashMenu) {
      // Handle slash key
      handleSlashCommand(e, blockId, index);
    } else if (e.key === 'Escape') {
      setShowSlashMenu(false);
    }
  };

  // Handle input for slash commands
  const handleInput = (e: React.FormEvent, blockId: string, index: number) => {
    const element = e.currentTarget as HTMLElement;
    const text = element.textContent || '';
    
    updateBlock(blockId, text);
    
    // Check for slash command
    if (text.includes('/')) {
      handleSlashCommand(e as any, blockId, index);
    } else {
      setShowSlashMenu(false);
    }
  };

  // Close slash menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (slashMenuRef.current && !slashMenuRef.current.contains(event.target as Node)) {
        setShowSlashMenu(false);
      }
    };

    if (showSlashMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showSlashMenu]);

  // Render block content
  const renderBlock = (block: DocumentBlock, index: number) => {
    const isFocused = focusedBlockId === block.id;
    const baseClasses = "min-h-[1.5rem] outline-none focus:outline-none w-full";
    const placeholderClass = block.content === '' && !isFocused ? "text-gray-400" : "";
    
    switch (block.type) {
      case 'heading1':
        return (
          <h1
            contentEditable={!readOnly}
            suppressContentEditableWarning
            className={`text-3xl font-bold text-gray-900 ${baseClasses} ${placeholderClass}`}
            onInput={(e) => handleInput(e, block.id, index)}
            onKeyDown={(e) => handleKeyDown(e, block.id, index)}
            onFocus={() => setFocusedBlockId(block.id)}
            onBlur={() => setFocusedBlockId(null)}
            data-placeholder="Heading 1"
          >
            {block.content}
          </h1>
        );
      case 'heading2':
        return (
          <h2
            contentEditable={!readOnly}
            suppressContentEditableWarning
            className={`text-2xl font-bold text-gray-900 ${baseClasses} ${placeholderClass}`}
            onInput={(e) => handleInput(e, block.id, index)}
            onKeyDown={(e) => handleKeyDown(e, block.id, index)}
            onFocus={() => setFocusedBlockId(block.id)}
            onBlur={() => setFocusedBlockId(null)}
            data-placeholder="Heading 2"
          >
            {block.content}
          </h2>
        );
      case 'heading3':
        return (
          <h3
            contentEditable={!readOnly}
            suppressContentEditableWarning
            className={`text-xl font-semibold text-gray-900 ${baseClasses} ${placeholderClass}`}
            onInput={(e) => handleInput(e, block.id, index)}
            onKeyDown={(e) => handleKeyDown(e, block.id, index)}
            onFocus={() => setFocusedBlockId(block.id)}
            onBlur={() => setFocusedBlockId(null)}
            data-placeholder="Heading 3"
          >
            {block.content}
          </h3>
        );
      case 'bulleted-list':
        return (
          <div className="flex items-start gap-3 group">
            <span className="mt-1 text-gray-400 text-xl">•</span>
            <div
              contentEditable={!readOnly}
              suppressContentEditableWarning
              className={`flex-1 ${baseClasses} ${placeholderClass}`}
              onInput={(e) => handleInput(e, block.id, index)}
              onKeyDown={(e) => handleKeyDown(e, block.id, index)}
              onFocus={() => setFocusedBlockId(block.id)}
              onBlur={() => setFocusedBlockId(null)}
              data-placeholder="List item"
            >
              {block.content}
            </div>
          </div>
        );
      case 'numbered-list':
        return (
          <div className="flex items-start gap-3">
            <span className="mt-1 text-gray-500 font-medium min-w-[1.5rem]">{index + 1}.</span>
            <div
              contentEditable={!readOnly}
              suppressContentEditableWarning
              className={`flex-1 ${baseClasses} ${placeholderClass}`}
              onInput={(e) => handleInput(e, block.id, index)}
              onKeyDown={(e) => handleKeyDown(e, block.id, index)}
              onFocus={() => setFocusedBlockId(block.id)}
              onBlur={() => setFocusedBlockId(null)}
              data-placeholder="List item"
            >
              {block.content}
            </div>
          </div>
        );
      case 'todo':
        return (
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id={`todo-${block.id}`}
              aria-label="Todo checkbox"
              checked={block.checked || false}
              onChange={(e) => {
                setBlocks(prev => prev.map(b => 
                  b.id === block.id ? { ...b, checked: e.target.checked } : b
                ));
              }}
              className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <div
              contentEditable={!readOnly}
              suppressContentEditableWarning
              className={`flex-1 ${baseClasses} ${block.checked ? 'line-through text-gray-500' : ''} ${placeholderClass}`}
              onInput={(e) => handleInput(e, block.id, index)}
              onKeyDown={(e) => handleKeyDown(e, block.id, index)}
              onFocus={() => setFocusedBlockId(block.id)}
              onBlur={() => setFocusedBlockId(null)}
              data-placeholder="To-do"
            >
              {block.content}
            </div>
          </div>
        );
      case 'code':
        return (
          <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
            <div className="bg-gray-800 px-4 py-2 text-xs text-gray-400 font-mono">
              CODE
            </div>
            <pre className="p-4 overflow-x-auto">
              <code
                contentEditable={!readOnly}
                suppressContentEditableWarning
                className={`block ${baseClasses} font-mono text-sm text-green-400 ${placeholderClass}`}
                onInput={(e) => handleInput(e, block.id, index)}
                onKeyDown={(e) => handleKeyDown(e, block.id, index)}
                onFocus={() => setFocusedBlockId(block.id)}
                onBlur={() => setFocusedBlockId(null)}
                data-placeholder="Code"
              >
                {block.content}
              </code>
            </pre>
          </div>
        );
      case 'quote':
        return (
          <blockquote
            contentEditable={!readOnly}
            suppressContentEditableWarning
            className={`border-l-4 border-blue-500 pl-4 italic text-gray-700 bg-gray-50 py-2 rounded-r ${baseClasses} ${placeholderClass}`}
            onInput={(e) => handleInput(e, block.id, index)}
            onKeyDown={(e) => handleKeyDown(e, block.id, index)}
            onFocus={() => setFocusedBlockId(block.id)}
            onBlur={() => setFocusedBlockId(null)}
            data-placeholder="Quote"
          >
            {block.content}
          </blockquote>
        );
      case 'divider':
        return (
          <div className="my-4 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <div className="px-2 text-gray-400 text-sm">Divider</div>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
        );
      case 'image':
        return (
          <div className="my-4">
            {block.url ? (
              <div className="relative group">
                <img 
                  src={block.url} 
                  alt={block.content || 'Image'} 
                  className="w-full rounded-lg border border-gray-200"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Image+Not+Found';
                  }}
                />
                {!readOnly && (
                  <button
                    onClick={() => {
                      const url = prompt('Enter image URL:', block.url);
                      if (url) {
                        setBlocks(prev => prev.map(b => 
                          b.id === block.id ? { ...b, url } : b
                        ));
                      }
                    }}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-white px-3 py-1 rounded shadow text-sm"
                  >
                    Change URL
                  </button>
                )}
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <p className="text-gray-500 mb-2">No image URL set</p>
                <button
                  onClick={() => {
                    const url = prompt('Enter image URL:');
                    if (url) {
                      setBlocks(prev => prev.map(b => 
                        b.id === block.id ? { ...b, url } : b
                      ));
                    }
                  }}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  Add Image URL
                </button>
              </div>
            )}
            {block.content && (
              <p className="text-sm text-gray-500 mt-2 italic">{block.content}</p>
            )}
          </div>
        );
      case 'video':
        // Convert YouTube/Vimeo URLs to embed format
        const getEmbedUrl = (url: string) => {
          if (!url) return '';
          if (url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
            const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
            return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
          }
          if (url.includes('vimeo.com/')) {
            const videoId = url.match(/vimeo\.com\/(\d+)/)?.[1];
            return videoId ? `https://player.vimeo.com/video/${videoId}` : url;
          }
          return url;
        };

        return (
          <div className="my-4">
            {block.url ? (
              <div className="relative group">
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    src={getEmbedUrl(block.url)}
                    className="absolute top-0 left-0 w-full h-full rounded-lg border border-gray-200"
                    allowFullScreen
                    title={block.content || 'Video'}
                    frameBorder="0"
                  />
                </div>
                {!readOnly && (
                  <button
                    onClick={() => {
                      const url = prompt('Enter video URL (YouTube, Vimeo, or direct embed):', block.url);
                      if (url) {
                        setBlocks(prev => prev.map(b => 
                          b.id === block.id ? { ...b, url } : b
                        ));
                      }
                    }}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-white px-3 py-1.5 rounded shadow text-sm hover:bg-gray-50 transition-opacity"
                  >
                    Change URL
                  </button>
                )}
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
                <p className="text-gray-500 mb-2">No video URL set</p>
                <button
                  onClick={() => {
                    const url = prompt('Enter video URL (YouTube, Vimeo, or direct embed):');
                    if (url) {
                      setBlocks(prev => prev.map(b => 
                        b.id === block.id ? { ...b, url } : b
                      ));
                    }
                  }}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Add Video URL
                </button>
              </div>
            )}
            {block.content && (
              <p className="text-sm text-gray-500 mt-2 italic">{block.content}</p>
            )}
          </div>
        );
      default: // paragraph
        return (
          <p
            contentEditable={!readOnly}
            suppressContentEditableWarning
            className={`text-gray-700 ${baseClasses} ${placeholderClass}`}
            onInput={(e) => handleInput(e, block.id, index)}
            onKeyDown={(e) => handleKeyDown(e, block.id, index)}
            onFocus={() => setFocusedBlockId(block.id)}
            onBlur={() => setFocusedBlockId(null)}
            data-placeholder="Type / for commands"
          >
            {block.content}
          </p>
        );
    }
  };

  // Add placeholder styling
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      [data-placeholder]:empty:before {
        content: attr(data-placeholder);
        color: #9ca3af;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="w-full p-6 bg-white min-h-[400px] relative">
      {/* Slash Command Menu */}
      {showSlashMenu && !readOnly && (
        <div
          ref={slashMenuRef}
          className="absolute z-50 bg-white border border-gray-200 rounded-lg shadow-xl max-h-64 overflow-y-auto"
          style={{
            top: `${slashMenuPosition.top}px`,
            left: `${slashMenuPosition.left}px`,
            minWidth: '280px',
          }}
        >
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd) => (
              <button
                key={cmd.id}
                onClick={() => {
                  const block = blocks.find(b => b.id === focusedBlockId);
                  if (block) {
                    const index = blocks.findIndex(b => b.id === focusedBlockId);
                    selectSlashCommand(cmd, block.id, index);
                  }
                }}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors"
              >
                <span className="text-xl">{cmd.icon}</span>
                <div>
                  <div className="font-medium text-gray-900">{cmd.label}</div>
                </div>
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-gray-500 text-sm">No commands found</div>
          )}
        </div>
      )}

      {/* Blocks */}
      <div className="space-y-1">
        {blocks.map((block, index) => (
          <div
            key={block.id}
            ref={(el) => { blockRefs.current[block.id] = el; }}
            className={`group relative py-1 ${focusedBlockId === block.id ? 'bg-blue-50 rounded px-2 -mx-2' : ''}`}
            draggable={!readOnly}
            onDragStart={() => setDraggedBlockId(block.id)}
            onDragOver={(e) => {
              e.preventDefault();
              if (draggedBlockId && draggedBlockId !== block.id) {
                e.currentTarget.classList.add('opacity-50');
              }
            }}
            onDragLeave={(e) => {
              e.currentTarget.classList.remove('opacity-50');
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.currentTarget.classList.remove('opacity-50');
              if (draggedBlockId && draggedBlockId !== block.id) {
                const draggedIndex = blocks.findIndex(b => b.id === draggedBlockId);
                const targetIndex = blocks.findIndex(b => b.id === block.id);
                const newBlocks = [...blocks];
                const [removed] = newBlocks.splice(draggedIndex, 1);
                newBlocks.splice(targetIndex, 0, removed);
                setBlocks(newBlocks);
              }
              setDraggedBlockId(null);
            }}
          >
            {/* Drag handle */}
            {!readOnly && (
              <button
                aria-label="Drag to reorder"
                className="absolute -left-6 top-2 opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 transition-opacity"
                onMouseDown={(e) => {
                  e.preventDefault();
                  setDraggedBlockId(block.id);
                }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 5h2v2H9V5zm0 6h2v2H9v-2zm0 6h2v2H9v-2zm4-12h2v2h-2V5zm0 6h2v2h-2v-2zm0 6h2v2h-2v-2z"/>
                </svg>
              </button>
            )}

            {/* Block content */}
            <div className="pl-1">
              {renderBlock(block, index)}
            </div>
          </div>
        ))}
      </div>

      {/* Save button */}
      {!readOnly && onSave && (
        <div className="mt-8 flex justify-end border-t pt-4">
          <button
            onClick={() => onSave(blocks)}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors shadow-sm"
          >
            Save Document
          </button>
        </div>
      )}
    </div>
  );
};
