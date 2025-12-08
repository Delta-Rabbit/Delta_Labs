/**
 * RichTextEditor Component
 * Reusable rich text editor toolbar and textarea
 */

import React from 'react';
import { DeltaTextarea } from '../../../../../../../components/theme';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
  onInsertBlank?: () => void;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = '',
  rows = 10,
  className = '',
  onInsertBlank,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Only handle [blank] as a unit if onInsertBlank is provided (blank-space questions)
    if (!onInsertBlank) return;

    const textarea = e.currentTarget;
    const cursorPos = textarea.selectionStart;
    const isBackspace = e.key === 'Backspace';
    const isDelete = e.key === 'Delete';

    if (isBackspace || isDelete) {
      const text = value;
      const blankMarker = '[blank]';
      
      // Find all occurrences of [blank]
      const blankPattern = /\[blank\]/g;
      let match;
      
      while ((match = blankPattern.exec(text)) !== null) {
        const start = match.index;
        const end = start + blankMarker.length;
        
        // Check if cursor is inside or right after [blank]
        if (isBackspace && cursorPos > start && cursorPos <= end) {
          // Cursor is inside or at the end of [blank], delete the whole thing
          e.preventDefault();
          const newText = text.substring(0, start) + text.substring(end);
          onChange(newText);
          
          // Set cursor position after deletion
          setTimeout(() => {
            textarea.setSelectionRange(start, start);
          }, 0);
          return;
        }
        
        if (isDelete && cursorPos >= start && cursorPos < end) {
          // Cursor is inside [blank], delete the whole thing
          e.preventDefault();
          const newText = text.substring(0, start) + text.substring(end);
          onChange(newText);
          
          // Set cursor position after deletion
          setTimeout(() => {
            textarea.setSelectionRange(start, start);
          }, 0);
          return;
        }
      }
    }
  };

  return (
    <div className={className}>
      {/* Rich Text Editor Toolbar */}
      <div className="border border-border-primary rounded-t-lg bg-surface-secondary p-2 flex items-center gap-2 flex-wrap">
        {/* Undo/Redo */}
        <button className="p-1.5 hover:bg-surface-tertiary rounded transition-colors" aria-label="Undo">
          <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
          </svg>
        </button>
        <button className="p-1.5 hover:bg-surface-tertiary rounded transition-colors" aria-label="Redo">
          <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
          </svg>
        </button>
        <div className="w-px h-6 bg-border-primary"></div>
        
        {/* Text Format */}
        <select className="text-sm border border-border-primary rounded px-2 py-1 bg-white text-text-secondary" aria-label="Text style">
          <option>Normal text</option>
        </select>
        <select className="text-sm border border-border-primary rounded px-2 py-1 bg-white text-text-secondary" aria-label="Font size">
          <option>12px</option>
        </select>
        <div className="w-px h-6 bg-border-primary"></div>
        
        {/* Insert Blank Button (only for blank-space questions) */}
        {onInsertBlank && (
          <>
            <button 
              onClick={onInsertBlank}
              className="p-1.5 hover:bg-surface-tertiary rounded transition-colors text-text-secondary hover:text-text-primary" 
              aria-label="Insert blank"
              title="Insert blank"
            >
              <span className="text-sm font-mono">[□-]</span>
            </button>
            <div className="w-px h-6 bg-border-primary"></div>
          </>
        )}
        
        {/* Text Style */}
        <button className="p-1.5 hover:bg-surface-tertiary rounded transition-colors" aria-label="Bold">
          <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 4h8a4 4 0 014 4v8a4 4 0 01-4 4H6z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h8" />
          </svg>
        </button>
        <button className="p-1.5 hover:bg-surface-tertiary rounded transition-colors" aria-label="Italic">
          <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 4h4M10 4l-2 16M10 4H8m2 0h2m-2 16h4" />
          </svg>
        </button>
        <button className="p-1.5 hover:bg-surface-tertiary rounded transition-colors" aria-label="Underline">
          <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 19h14M5 19V5h14v14" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 7h14" />
          </svg>
        </button>
        <button className="p-1.5 hover:bg-surface-tertiary rounded transition-colors" aria-label="Strikethrough">
          <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
        </button>
        <div className="w-px h-6 bg-border-primary"></div>
        
        {/* Lists */}
        <button className="p-1.5 hover:bg-surface-tertiary rounded transition-colors" aria-label="Bullet list">
          <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <button className="p-1.5 hover:bg-surface-tertiary rounded transition-colors" aria-label="Numbered list">
          <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
          </svg>
        </button>
        <div className="w-px h-6 bg-border-primary"></div>
        
        {/* Alignment */}
        <button className="p-1.5 hover:bg-surface-tertiary rounded transition-colors" aria-label="Align left">
          <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
        <button className="p-1.5 hover:bg-surface-tertiary rounded transition-colors" aria-label="Align center">
          <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M6 12h12M9 18h6" />
          </svg>
        </button>
        <button className="p-1.5 hover:bg-surface-tertiary rounded transition-colors" aria-label="Align right">
          <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
        <button className="p-1.5 hover:bg-surface-tertiary rounded transition-colors" aria-label="Justify">
          <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h12M3 18h18" />
          </svg>
        </button>
        <div className="w-px h-6 bg-border-primary"></div>
        
        {/* Insert */}
        <button className="p-1.5 hover:bg-surface-tertiary rounded transition-colors" aria-label="Insert link">
          <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656l4-4z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-4 4z" />
          </svg>
        </button>
        <button className="p-1.5 hover:bg-surface-tertiary rounded transition-colors" aria-label="Insert image">
          <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
        <button className="p-1.5 hover:bg-surface-tertiary rounded transition-colors" aria-label="Code block">
          <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </button>
      </div>
      
      {/* Textarea */}
      <DeltaTextarea
        value={value}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={rows}
        className="w-full rounded-t-none border-t-0"
      />
    </div>
  );
};

