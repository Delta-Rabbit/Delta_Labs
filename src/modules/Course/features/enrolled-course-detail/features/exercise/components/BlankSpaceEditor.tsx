/**
 * Blank Space Editor Component
 * Custom editor that highlights blank markers like [blank1], [blank2]
 */

import React, { useRef, useEffect, useState } from 'react';

type ReactNode = React.ReactNode;

interface BlankSpaceEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
  onInsertBlank?: () => void;
}

export const BlankSpaceEditor: React.FC<BlankSpaceEditorProps> = ({
  value,
  onChange,
  placeholder = '',
  rows = 6,
  className = '',
  onInsertBlank,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Sync scroll and ensure identical styling between textarea and highlight div
  useEffect(() => {
    const textarea = textareaRef.current;
    const highlight = highlightRef.current;
    if (textarea && highlight) {
      // Sync scroll
      const handleScroll = () => {
        highlight.scrollTop = textarea.scrollTop;
        highlight.scrollLeft = textarea.scrollLeft;
      };
      textarea.addEventListener('scroll', handleScroll);
      
      // Ensure identical computed styles
      const syncStyles = () => {
        const textareaStyle = window.getComputedStyle(textarea);
        highlight.style.fontFamily = textareaStyle.fontFamily;
        highlight.style.fontSize = textareaStyle.fontSize;
        highlight.style.lineHeight = textareaStyle.lineHeight;
        highlight.style.letterSpacing = textareaStyle.letterSpacing;
        highlight.style.padding = textareaStyle.padding;
        highlight.style.border = textareaStyle.border;
        highlight.style.boxSizing = textareaStyle.boxSizing;
      };
      
      syncStyles();
      const resizeObserver = new ResizeObserver(syncStyles);
      resizeObserver.observe(textarea);
      
      return () => {
        textarea.removeEventListener('scroll', handleScroll);
        resizeObserver.disconnect();
      };
    }
  }, []);

  // Simple: highlight ONLY [blank1], [blank2], etc.
  const renderHighlightedText = (text: string) => {
    if (!text) return null;
    
    // Split by pattern, keeping matches
    const regex = /(\[blank\d+\])/g;
    const parts = text.split(regex);
    
    return (
      <>
        {parts.map((part, index) => {
          // Only highlight if it's exactly [blank + digits + ]
          if (/^\[blank\d+\]$/.test(part)) {
            return (
              <span
                key={index}
                style={{
                  backgroundColor: '#E6F4F7',
                  color: '#174A5F',
                  fontFamily: 'monospace',
                  fontWeight: '500',
                }}
              >
                {part}
              </span>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </>
    );
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
        
        {/* Insert Blank Button */}
        {onInsertBlank && (
          <>
            <button 
              onClick={onInsertBlank}
              className="p-1.5 hover:bg-surface-tertiary rounded transition-colors text-text-secondary hover:text-text-primary font-mono text-sm" 
              aria-label="Insert blank"
              title="Insert blank"
            >
              [□-]
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
      
      {/* Dual-layer editor: highlight div behind, textarea on top */}
      <div className="relative border border-border-primary border-t-0 rounded-b-lg overflow-hidden">
        {/* Highlight layer (behind textarea, shows colored markers) */}
        <div
          ref={highlightRef}
          className="absolute inset-0 pointer-events-none overflow-auto"
          style={{
            minHeight: `${rows * 1.5}rem`,
            padding: '0.75rem',
            fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            fontSize: '0.875rem',
            lineHeight: '1.25rem',
            letterSpacing: '0',
            wordWrap: 'break-word',
            whiteSpace: 'pre-wrap',
            tabSize: 4,
          }}
        >
          {value ? renderHighlightedText(value) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </div>
        
        {/* Textarea layer (on top, transparent text when focused to show highlights) */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={!value ? placeholder : ''}
          className="relative w-full bg-transparent resize-none focus:outline-none border-0 z-10"
          style={{
            minHeight: `${rows * 1.5}rem`,
            padding: '0.75rem',
            color: isFocused && value ? 'transparent' : 'inherit',
            caretColor: '#174A5F',
            fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            fontSize: '0.875rem',
            lineHeight: '1.25rem',
            letterSpacing: '0',
            wordWrap: 'break-word',
            whiteSpace: 'pre-wrap',
            tabSize: 4,
            margin: '0',
            border: '0',
            outline: 'none',
          }}
          rows={rows}
        />
      </div>
    </div>
  );
};

