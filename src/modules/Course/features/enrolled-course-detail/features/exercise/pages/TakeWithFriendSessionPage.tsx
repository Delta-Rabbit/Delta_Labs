import React, { useState, useRef, useEffect } from 'react';
import type { Exercise } from '../types';

interface TakeWithFriendSessionPageProps {
  exercise: Exercise;
  onLeave: () => void;
  onStartSolo?: () => void;
}

type SidebarView = 'people' | 'chat' | 'thinking-board' | 'plugin';

export const TakeWithFriendSessionPage: React.FC<TakeWithFriendSessionPageProps> = ({
  exercise,
  onLeave,
  onStartSolo,
}) => {
  const [activeView, setActiveView] = useState<SidebarView>('people');
  const [chatMessages, setChatMessages] = useState<Array<{ id: number; text: string; sender: string }>>([]);
  const [chatInput, setChatInput] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingTool, setDrawingTool] = useState<'pen' | 'eraser'>('pen');
  // Mock question display to mirror the solo take exercise screen
  const mockQuestion = {
    number: 1,
    total: 3,
    text: 'Graphically, the pair of equations 7x – y = 5; 21x – 3y = 10 represents two lines which are',
    options: [
      'Intersect at one point',
      'Parallel',
      'Intersect at two point',
      'Coincident',
    ],
    selected: 1,
    time: '07:28',
  };

  const people = [
    { 
      name: 'Hilina', 
      thumb: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
      isPresenting: true,
      quote: 'No one is deserving of friends more truly than he who has the power to resist the temptation to understand you.',
      micActive: true,
    },
    { 
      name: 'Fikir', 
      thumb: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=400&q=80',
      micActive: true,
    },
    { 
      name: 'Mahiet', 
      thumb: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
      micActive: true,
    },
    { 
      name: 'Dink', 
      thumb: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=400&q=80',
      micActive: true,
    },
    { 
      name: 'You', 
      thumb: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
      quote: 'No one is dreaming of clouds... nobody who do understand you',
      micActive: true,
    },
  ];

  const participantAvatars = [
    { name: 'Hilina', thumb: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80' },
    { name: 'Fikir', thumb: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=400&q=80' },
    { name: 'A', initial: true },
  ];

  // Canvas setup for thinking board
  useEffect(() => {
    if (activeView === 'thinking-board' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const resizeCanvas = () => {
        const container = canvas.parentElement;
        if (container) {
          canvas.width = container.clientWidth;
          canvas.height = container.clientHeight;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.lineWidth = drawingTool === 'pen' ? 2 : 20;
          ctx.strokeStyle = drawingTool === 'pen' ? '#000000' : '#ffffff';
        }
      };

      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      return () => window.removeEventListener('resize', resizeCanvas);
    }
  }, [activeView, drawingTool]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      setChatMessages([...chatMessages, { id: Date.now(), text: chatInput, sender: 'You' }]);
      setChatInput('');
    }
  };

  return (
    <div className="fixed inset-0 top-[60px] bottom-0 left-0 right-0 w-full h-[calc(100vh-60px)] flex font-primary bg-white overflow-hidden z-[100]">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto px-8 py-10 max-w-5xl mx-auto relative">
        <h1 className="text-2xl font-bold text-text-primary mb-8">{exercise.title}</h1>

        {/* Question Header */}
        <div className="text-sm text-text-secondary mb-6">
          Question.{mockQuestion.number}/{mockQuestion.total}
        </div>

        {/* Question Text */}
        <div className="mb-8">
          <p className="text-lg text-text-primary leading-relaxed">
            {mockQuestion.text}
          </p>
        </div>

        {/* Answer Options */}
        <div className="space-y-3 mb-8">
          {mockQuestion.options.map((opt, idx) => {
            const isSelected = idx === mockQuestion.selected;
            const label = String.fromCharCode(65 + idx);
            return (
              <button
                key={label}
                className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                  isSelected
                    ? 'border-primary-600 bg-primary-50 text-primary-700'
                    : 'border-border-primary bg-white text-text-primary hover:border-primary-300 hover:bg-primary-50/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-sm">{label}.</span>
                  <span className="text-sm">{opt}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6 mb-10 text-sm">
          <button className="text-primary-600 hover:text-primary-700 font-medium">
            Push to Roadmap
          </button>
          <button className="text-primary-600 hover:text-primary-700 font-medium">
            See Answer
          </button>
          <button className="text-text-secondary hover:text-text-primary font-medium flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
            </svg>
            Report
          </button>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-border-primary">
          <button className="px-6 py-2.5 rounded-lg font-medium bg-gray-200 text-text-primary hover:bg-gray-300 transition-colors">
            Previous
          </button>
          <button className="px-6 py-2.5 rounded-lg font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors">
            Next
          </button>
        </div>

        {/* Floating Meet-style Controls */}
        <div className="pointer-events-none fixed bottom-8 z-50 left-0 right-[280px]">
          <div className="max-w-5xl mx-auto px-8 flex justify-center">
            <div className="flex items-center gap-3">
              {[
                { id: 'mic', icon: MicIcon, bg: 'bg-primary-200', text: 'text-text-primary', label: 'Toggle microphone' },
                { id: 'cam', icon: CamIcon, bg: 'bg-white', text: 'text-text-primary', label: 'Toggle camera' },
                { id: 'screen', icon: ScreenIcon, bg: 'bg-white', text: 'text-text-primary', label: 'Share screen' },
                { id: 'record', icon: RecordIcon, bg: 'bg-white', text: 'text-text-primary', label: 'Record session' },
              ].map((ctrl) => (
                <button
                  key={ctrl.id}
                  className={`pointer-events-auto w-12 h-12 rounded-full shadow-lg border border-border-primary flex items-center justify-center ${ctrl.bg} ${ctrl.text} hover:bg-primary-50 transition-colors`}
                  aria-label={ctrl.label}
                >
                  <ctrl.icon />
                </button>
              ))}
              <button
                onClick={onLeave}
                className="pointer-events-auto w-12 h-12 rounded-full shadow-lg bg-error-600 hover:bg-error-700 text-white flex items-center justify-center transition-colors"
                aria-label="End call"
              >
                <CallIcon />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-[320px] bg-white border-l border-border-primary flex flex-col">
        {/* Timer Section */}
        <div className="p-4 border-b border-border-primary">
          {/* Timer Header */}
          <div className="mb-3">
            <h2 className="text-xl font-bold text-text-primary mb-3">Timer</h2>
            <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden mb-3">
              <div className="h-full bg-primary-600 w-3/5" />
            </div>
          </div>
          
          {/* Timer Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-base font-medium text-text-primary">{mockQuestion.time}</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1.5 text-text-primary hover:text-primary-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs font-medium">Pause</span>
              </button>
              <button 
                onClick={onLeave}
                className="flex items-center gap-1.5 text-error-600 hover:text-error-700"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span className="text-xs font-medium">Exit</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Area - Switchable Views */}
        <div className="flex-1 overflow-y-auto">
          {activeView === 'people' && (
            <div className="p-4">
              <h3 className="text-sm font-bold text-text-primary mb-3">People in exercise</h3>
              <div className="grid grid-cols-2 gap-3">
                {people.map((p) => (
                  <div key={p.name} className="relative rounded-lg overflow-hidden aspect-square bg-gradient-to-br from-gray-200 to-gray-300">
                    <img 
                      src={p.thumb} 
                      alt={p.name} 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    {p.isPresenting && (
                      <div className="absolute top-1.5 right-1.5 bg-red-500 text-white px-1.5 py-0.5 rounded-full text-[10px] font-semibold">
                        Presenting
                      </div>
                    )}
                    <div className="absolute bottom-1.5 left-1.5">
                      <div className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                        p.name === 'Fikir' ? 'bg-orange-200/90' :
                        p.name === 'Mahiet' ? 'bg-pink-200/90' :
                        p.name === 'Dink' ? 'bg-gray-700/90 text-white' :
                        'bg-gray-800/90 text-white'
                      }`}>
                        {p.name}
                      </div>
                    </div>
                    {p.micActive && (
                      <div className="absolute bottom-1.5 right-1.5 w-5 h-5 rounded-full bg-primary-600 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeView === 'chat' && (
            <div className="flex flex-col h-full p-4">
              <h3 className="text-sm font-bold text-text-primary mb-3">In call message</h3>
              <div className="flex-1 bg-white border border-border-primary rounded-lg mb-3 overflow-y-auto p-3 min-h-[200px]">
                {chatMessages.length === 0 ? (
                  <div className="text-center text-text-secondary text-sm mt-8">No messages yet</div>
                ) : (
                  <div className="space-y-2">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className="text-sm">
                        <span className="font-semibold text-text-primary">{msg.sender}:</span>
                        <span className="text-text-secondary ml-2">{msg.text}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type Something..."
                  className="flex-1 px-3 py-2 text-sm border border-border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 transition-colors"
                  aria-label="Send message"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {activeView === 'thinking-board' && (
            <div className="flex flex-col h-full p-4">
              <h3 className="text-sm font-bold text-text-primary mb-3">Thinking bord</h3>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {}}
                    className="p-1.5 rounded text-[#174A5F] hover:bg-gray-100"
                    title="Undo"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                  </button>
                  <button
                    onClick={() => {}}
                    className="p-1.5 rounded text-[#174A5F] hover:bg-gray-100"
                    title="Redo"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setDrawingTool('pen')}
                    className={`p-1.5 rounded transition-colors ${
                      drawingTool === 'pen'
                        ? 'text-[#174A5F] bg-gray-100'
                        : 'text-[#174A5F] hover:bg-gray-100'
                    }`}
                    title="Pen"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setDrawingTool('eraser')}
                    className={`p-1.5 rounded transition-colors ${
                      drawingTool === 'eraser'
                        ? 'text-[#174A5F] bg-gray-100'
                        : 'text-[#174A5F] hover:bg-gray-100'
                    }`}
                    title="Eraser"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center gap-1.5">
                  {participantAvatars.map((avatar, idx) => (
                    <div key={idx} className="w-6 h-6 rounded-full overflow-hidden border border-border-primary">
                      {avatar.initial ? (
                        <div className="w-full h-full bg-yellow-400 flex items-center justify-center text-xs font-semibold text-text-primary">
                          {avatar.name}
                        </div>
                      ) : (
                        <img src={avatar.thumb} alt={avatar.name} className="w-full h-full object-cover" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 bg-white border border-border-primary rounded-lg overflow-hidden relative min-h-[300px]">
                <canvas
                  ref={canvasRef}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  className="absolute inset-0 cursor-crosshair w-full h-full"
                />
              </div>
            </div>
          )}

          {activeView === 'plugin' && (
            <div className="p-4">
              <h3 className="text-sm font-bold text-text-primary mb-3">Plugin</h3>
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full px-3 py-2 pl-9 text-sm border border-border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <svg className="w-4 h-4 text-text-secondary absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-text-primary mb-2">Recently used</h4>
                <div className="grid grid-cols-4 gap-2">
                  <div className="aspect-square bg-gray-100 border border-border-primary rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="aspect-square bg-gray-100 border border-border-primary rounded-lg flex items-center justify-center">
                    <div className="text-xs font-semibold text-text-primary">I Co N</div>
                  </div>
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="aspect-square bg-gray-50 border border-border-primary rounded-lg" />
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-text-primary mb-2">All</h4>
                <div className="grid grid-cols-4 gap-2">
                  {[...Array(16)].map((_, i) => (
                    <div key={i} className="aspect-square bg-gray-50 border border-border-primary rounded-lg" />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="p-3 border-t border-border-primary bg-white">
          <div className="flex items-center justify-center gap-3">
            {[
              { label: 'People', icon: PeopleIcon, view: 'people' as SidebarView },
              { label: 'Chat', icon: ChatIcon, view: 'chat' as SidebarView },
              { label: 'Whiteboard', icon: WhiteboardIcon, view: 'thinking-board' as SidebarView },
              { label: 'More', icon: MoreIcon, view: 'plugin' as SidebarView },
            ].map((ctrl) => (
              <button
                key={ctrl.label}
                onClick={() => setActiveView(ctrl.view)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  activeView === ctrl.view
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-100 text-text-primary hover:bg-gray-200'
                }`}
                aria-label={ctrl.label}
              >
                <ctrl.icon active={activeView === ctrl.view} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const PeopleIcon = ({ active = false }: { active?: boolean }) => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const WhiteboardIcon = ({ active = false }: { active?: boolean }) => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const MoreIcon = ({ active = false }: { active?: boolean }) => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
  </svg>
);

const CamIcon = () => (
  <svg className="w-5 h-5 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 6h8a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z" />
  </svg>
);

const ScreenIcon = () => (
  <svg className="w-5 h-5 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8m-4-5v5" />
  </svg>
);

const RecordIcon = () => (
  <svg className="w-5 h-5 text-text-primary" fill="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="6" />
  </svg>
);

const ChatIcon = ({ active = false }: { active?: boolean }) => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4-.8L3 20l1.1-3.3A7.627 7.627 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const MicIcon = () => (
  <svg className="w-5 h-5 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 1a3 3 0 00-3 3v6a3 3 0 006 0V4a3 3 0 00-3-3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 10v2a7 7 0 01-14 0v-2m7 9v4m-4 0h8" />
  </svg>
);

const CallIcon = () => (
  <svg className="w-5 h-5 text-error-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.05 5A5 5 0 018 5m7.05 0a5 5 0 011 3m-8.1-3a5 5 0 00-1 3m9.1 7.5l-2-2a1 1 0 00-1.28-.09l-1.6 1.2a1 1 0 01-1.05.06 12.07 12.07 0 01-3.91-3.91 1 1 0 01.06-1.05l1.2-1.6a1 1 0 00-.09-1.28l-2-2a1 1 0 00-1.42 0l-.9.9c-.48.49-.73 1.17-.62 1.85.46 2.73 2.01 5.3 4.49 7.78 2.48 2.48 5.05 4.03 7.78 4.49.68.11 1.36-.14 1.85-.62l.9-.9a1 1 0 000-1.42z" />
  </svg>
);

export default TakeWithFriendSessionPage;


