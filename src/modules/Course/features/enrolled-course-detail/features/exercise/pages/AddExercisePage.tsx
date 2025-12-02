/**
 * Delta Labs Add Exercise Page
 * Complete redesign to match new design specification
 */

import React, { useState, useRef, useEffect } from 'react';
import { DeltaButton, DeltaDropdown, DeltaModal, DeltaCheckbox, DeltaRadio, DeltaTextarea, DeltaInput } from '../../../../../../../components/theme';
import type { DropdownOption } from '../../../../../../../components/theme';

interface AddExercisePageProps {
  onBack: () => void;
  onSaveDraft: () => void;
  onReviewPost: () => void;
  onAddNextQuestion: () => void;
}

type QuestionType = 'multiple-choice' | 'true-false' | 'matching' | 'blank-space' | 'others' | '';
type VisibilityOption = 'public' | 'private' | 'community';
type SidebarTab = 'exercise-features' | 'resources';

interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface MatchingPair {
  id: string;
  left: string;
  right: string;
}

interface Question {
  id: string;
  questionNumber: number;
  questionType: QuestionType;
  questionText: string;
  // Multiple Choice
  options?: QuestionOption[];
  // True/False, Yes/No
  correctAnswer?: boolean;
  // Matching
  pairs?: MatchingPair[];
  // Blank Space
  blanks?: string[];
  // Explanation
  explanation?: string;
}


export const AddExercisePage: React.FC<AddExercisePageProps> = ({
  onBack,
  onSaveDraft,
  onReviewPost,
}) => {
  const [questions, setQuestions] = useState<Question[]>([
    { 
      id: '1', 
      questionNumber: 1, 
      questionType: '', 
      questionText: '',
      options: [],
      correctAnswer: false,
      pairs: [],
      blanks: [],
      explanation: ''
    }
  ]);
  const [activeQuestionId, setActiveQuestionId] = useState<string>('1');
  const [testName, setTestName] = useState('New Exercise');
  const [visibility, setVisibility] = useState<VisibilityOption>('public');
  const [activeSidebarTab, setActiveSidebarTab] = useState<SidebarTab>('exercise-features');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [hoveredQuestionId, setHoveredQuestionId] = useState<string | null>(null);
  const [deleteWarningModal, setDeleteWarningModal] = useState<{ isOpen: boolean; questionId: string | null; previousActiveId: string | null }>({ isOpen: false, questionId: null, previousActiveId: null });
  const questionsListRef = useRef<HTMLDivElement>(null);
  const questionsListRefNormal = useRef<HTMLDivElement>(null);

  // Check if questions list is overflowing
  useEffect(() => {
    const checkOverflow = () => {
      const fullscreenEl = questionsListRef.current;
      const normalEl = questionsListRefNormal.current;
      const el = isFullScreen ? fullscreenEl : normalEl;
      
      if (el) {
        setIsOverflowing(el.scrollWidth > el.clientWidth);
      }
    };

    // Use setTimeout to ensure DOM has updated
    const timeoutId = setTimeout(checkOverflow, 0);
    window.addEventListener('resize', checkOverflow);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', checkOverflow);
    };
  }, [questions, isFullScreen]);

  // Question type options
  const questionTypeOptions: DropdownOption[] = [
    { value: 'multiple-choice', label: 'Multiple Choice Questions (MCQs)' },
    { value: 'true-false', label: 'True/False Questions' },
    { value: 'matching', label: 'Matching Questions' },
    { value: 'blank-space', label: 'Blank Space Questions' },
    { value: 'others', label: 'Others' },
  ];

  // Visibility options
  const visibilityOptions: DropdownOption[] = [
    { value: 'public', label: 'Public' },
    { value: 'private', label: 'Private' },
    { value: 'community', label: 'Community' },
  ];

  const handleAddQuestion = () => {
    const newQuestionNumber = questions.length + 1;
    const newQuestion: Question = {
      id: Date.now().toString(),
      questionNumber: newQuestionNumber,
      questionType: '',
      questionText: '',
      options: [],
      correctAnswer: false,
      pairs: [],
      blanks: [],
      explanation: ''
    };
    setQuestions([...questions, newQuestion]);
    setActiveQuestionId(newQuestion.id);
    
    // Auto-scroll to show the new question
    setTimeout(() => {
      if (questionsListRef.current) {
        questionsListRef.current.scrollLeft = questionsListRef.current.scrollWidth;
      }
      if (questionsListRefNormal.current) {
        questionsListRefNormal.current.scrollLeft = questionsListRefNormal.current.scrollWidth;
      }
    }, 100);
  };

  const activeQuestion = questions.find((q: Question) => q.id === activeQuestionId) || questions[0];

  const handleQuestionTypeChange = (questionId: string, questionType: QuestionType) => {
    setQuestions(questions.map((q: Question) => {
      if (q.id === questionId) {
        // Initialize fields based on question type
        const baseQuestion = { ...q, questionType };
        if (questionType === 'multiple-choice') {
          return { ...baseQuestion, options: q.options || [] };
        } else if (questionType === 'true-false') {
          return { ...baseQuestion, correctAnswer: q.correctAnswer !== undefined ? q.correctAnswer : false };
        } else if (questionType === 'matching') {
          return { ...baseQuestion, pairs: q.pairs || [] };
        } else if (questionType === 'blank-space') {
          // Initialize with empty blanks array - will be auto-populated when blanks are added
          return { ...baseQuestion, blanks: [] };
        }
        return baseQuestion;
      }
      return q;
    }));
  };

  const handleQuestionTextChange = (questionId: string, questionText: string) => {
    setQuestions(questions.map((q: Question) => {
      if (q.id === questionId) {
        // For blank-space questions, auto-sync blanks array with blanks in text
        if (q.questionType === 'blank-space') {
          const blankMatches = questionText.match(/\[blank\d+\]/g) || [];
          const blankCount = blankMatches.length;
          const currentBlanks = q.blanks || [];
          
          // Update blanks array to match number of blanks in text
          let newBlanks: string[];
          if (blankCount > currentBlanks.length) {
            // Add new empty blanks
            newBlanks = [...currentBlanks, ...Array(blankCount - currentBlanks.length).fill('')];
          } else if (blankCount < currentBlanks.length) {
            // Remove extra blanks
            newBlanks = currentBlanks.slice(0, blankCount);
          } else {
            newBlanks = currentBlanks;
          }
          
          return { ...q, questionText, blanks: newBlanks };
        }
        return { ...q, questionText };
      }
      return q;
    }));
  };

  // Update question explanation
  const handleExplanationChange = (questionId: string, explanation: string) => {
    setQuestions(questions.map((q: Question) => 
      q.id === questionId ? { ...q, explanation } : q
    ));
  };

  // Multiple Choice handlers
  const handleAddOption = (questionId: string) => {
    const question = questions.find((q: Question) => q.id === questionId);
    if (!question) return;
    const newOption: QuestionOption = {
      id: Date.now().toString(),
      text: '',
      isCorrect: false
    };
    setQuestions(questions.map((q: Question) => 
      q.id === questionId ? { ...q, options: [...(q.options || []), newOption] } : q
    ));
  };

  const handleUpdateOption = (questionId: string, optionId: string, text: string) => {
    setQuestions(questions.map((q: Question) => 
      q.id === questionId ? {
        ...q,
        options: q.options?.map((opt: QuestionOption) => 
          opt.id === optionId ? { ...opt, text } : opt
        )
      } : q
    ));
  };

  const handleToggleCorrectOption = (questionId: string, optionId: string) => {
    setQuestions(questions.map((q: Question) => 
      q.id === questionId ? {
        ...q,
        options: q.options?.map((opt: QuestionOption) => 
          opt.id === optionId ? { ...opt, isCorrect: !opt.isCorrect } : opt
        )
      } : q
    ));
  };

  const handleRemoveOption = (questionId: string, optionId: string) => {
    setQuestions(questions.map((q: Question) => 
      q.id === questionId ? {
        ...q,
        options: q.options?.filter((opt: QuestionOption) => opt.id !== optionId)
      } : q
    ));
  };

  // True/False, Yes/No handlers
  const handleCorrectAnswerChange = (questionId: string, correctAnswer: boolean) => {
    setQuestions(questions.map((q: Question) => 
      q.id === questionId ? { ...q, correctAnswer } : q
    ));
  };

  // Matching handlers
  const handleAddPair = (questionId: string) => {
    const newPair: MatchingPair = {
      id: Date.now().toString(),
      left: '',
      right: ''
    };
    setQuestions(questions.map((q: Question) => 
      q.id === questionId ? { ...q, pairs: [...(q.pairs || []), newPair] } : q
    ));
  };

  const handleUpdatePair = (questionId: string, pairId: string, side: 'left' | 'right', value: string) => {
    setQuestions(questions.map((q: Question) => 
      q.id === questionId ? {
        ...q,
        pairs: q.pairs?.map((pair: MatchingPair) => 
          pair.id === pairId ? { ...pair, [side]: value } : pair
        )
      } : q
    ));
  };

  const handleRemovePair = (questionId: string, pairId: string) => {
    setQuestions(questions.map((q: Question) => 
      q.id === questionId ? {
        ...q,
        pairs: q.pairs?.filter((pair: MatchingPair) => pair.id !== pairId)
      } : q
    ));
  };
  // Blank Space handlers
  const blankTextareaRefs = useRef<{ [key: string]: HTMLTextAreaElement | null }>({});

  const handleInsertBlank = (questionId: string) => {
    const textarea = blankTextareaRefs.current[questionId];
    if (!textarea) return;
    
    const question = questions.find((q: Question) => q.id === questionId);
    if (!question) return;
    
    const cursorPos = textarea.selectionStart;
    const currentText = question.questionText || '';
    
    // Count existing blanks to get next number
    const existingBlanks = currentText.match(/\[blank\d+\]/g) || [];
    const blankNumber = existingBlanks.length + 1;
    const blankMarker = `[blank${blankNumber}]`;
    
    // Insert at cursor position
    const newText = currentText.substring(0, cursorPos) + blankMarker + currentText.substring(cursorPos);
    
    // Update question text (this will auto-sync blanks array)
    handleQuestionTextChange(questionId, newText);
    
    // Set cursor after inserted marker
    setTimeout(() => {
      const newCursorPos = cursorPos + blankMarker.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
      textarea.focus();
    }, 0);
  };

  const handleBlankAnswerChange = (questionId: string, index: number, value: string) => {
    setQuestions(questions.map((q: Question) => 
      q.id === questionId ? {
        ...q,
        blanks: (q.blanks || []).map((blank: string, i: number) => i === index ? value : blank)
      } : q
    ));
  };

  // Check if question has content
  const hasQuestionContent = (question: Question): boolean => {
    if (question.questionType === '' && question.questionText.trim() === '') {
      return false;
    }
    
    // Check type-specific content
    if (question.questionType === 'multiple-choice') {
      return (question.options || []).length > 0 && (question.options || []).some((opt: QuestionOption) => opt.text.trim() !== '');
    }
    if (question.questionType === 'true-false') {
      return question.correctAnswer !== undefined;
    }
    if (question.questionType === 'matching') {
      return (question.pairs || []).length > 0 && (question.pairs || []).some((pair: MatchingPair) => pair.left.trim() !== '' || pair.right.trim() !== '');
    }
    if (question.questionType === 'blank-space') {
      const blankMatches = (question.questionText || '').match(/\[blank\d+\]/g) || [];
      const blankCount = blankMatches.length;
      return blankCount > 0 && (question.blanks || []).length === blankCount && 
             (question.blanks || []).every((blank: string) => blank.trim() !== '');
    }
    
    return true;
  };

  // Handle question deletion
  const handleDeleteQuestion = (questionId: string) => {
    const question = questions.find((q: Question) => q.id === questionId);
    
    if (!question) return;

    // If question has content, show warning modal
    if (hasQuestionContent(question)) {
      setDeleteWarningModal({ isOpen: true, questionId, previousActiveId: activeQuestionId });
      return;
    }

    // If empty, delete directly
    deleteQuestion(questionId);
  };

  // Actually delete the question
  const deleteQuestion = (questionId: string) => {
    const questionToDelete = questions.find((q: Question) => q.id === questionId);
    if (!questionToDelete) return;

    // Don't allow deleting if it's the only question
    if (questions.length === 1) {
      return;
    }

    // Remove the question
    const updatedQuestions = questions.filter((q: Question) => q.id !== questionId);
    
    // Renumber remaining questions
    const renumberedQuestions = updatedQuestions.map((q: Question, index: number) => ({
      ...q,
      questionNumber: index + 1
    }));

    setQuestions(renumberedQuestions);

    // If deleted question was active, switch to the previous question or first available
    if (activeQuestionId === questionId) {
      const deletedIndex = questions.findIndex((q: Question) => q.id === questionId);
      // Try to go to the previous question, or the next one if it was the first
      if (deletedIndex > 0) {
        // Go to previous question
        const previousQuestion = questions[deletedIndex - 1];
        const newActiveQuestion = renumberedQuestions.find((q: Question) => q.id === previousQuestion.id);
        if (newActiveQuestion) {
          setActiveQuestionId(newActiveQuestion.id);
        } else {
          // Fallback to first question
          const firstQuestion = renumberedQuestions[0];
          if (firstQuestion) {
            setActiveQuestionId(firstQuestion.id);
          }
        }
      } else {
        // Was the first question, go to the new first question
        const newActiveQuestion = renumberedQuestions[0];
        if (newActiveQuestion) {
          setActiveQuestionId(newActiveQuestion.id);
        }
      }
    }

    // Close modal if open
    setDeleteWarningModal({ isOpen: false, questionId: null, previousActiveId: null });
  };

  // Confirm delete from modal
  const handleConfirmDelete = () => {
    if (deleteWarningModal.questionId) {
      deleteQuestion(deleteWarningModal.questionId);
    }
  };

  // Handle cancel - restore previous active question
  const handleCancelDelete = () => {
    if (deleteWarningModal.previousActiveId) {
      setActiveQuestionId(deleteWarningModal.previousActiveId);
    }
    setDeleteWarningModal({ isOpen: false, questionId: null, previousActiveId: null });
  };

  return (
    <>
      {isFullScreen && (
        <div className="fixed inset-0 bg-white z-[999999] overflow-hidden" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
          <div className="w-full h-full font-primary bg-white relative">
            {/* Main Content Layout - Full Width Container */}
            <div className="relative h-full">
              {/* Main Content Area - Wider Width */}
              <div className="h-full pr-80">
                <div className="flex flex-col h-full overflow-hidden">
                  <div className="p-6 pb-4 flex-shrink-0">
                    {/* Top Section - Back Arrow, Title, and Action Icons */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        {/* Back Arrow */}
                        <button
                          onClick={onBack}
                          className="flex items-center justify-center w-8 h-8 text-text-secondary hover:text-text-primary transition-colors"
                          aria-label="Go back"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                          </svg>
                        </button>

                        {/* Question Mark Icon + Title */}
                        <div className="flex items-center gap-2">
                          <svg className="w-6 h-6 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div className="flex items-center gap-1">
                            <input
                              type="text"
                              value={testName}
                              onChange={(e) => setTestName(e.target.value)}
                              className="text-xl font-semibold text-text-primary bg-transparent border-none outline-none focus:outline-none focus:ring-0 p-0"
                              placeholder="New Exercise"
                            />
                            <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Action Icons */}
                      <div className="flex items-center gap-3">
                        {/* Maximize/Fullscreen Toggle */}
                        <button
                          onClick={() => setIsFullScreen(!isFullScreen)}
                          className="p-2 text-text-secondary hover:text-text-primary transition-colors"
                          aria-label={isFullScreen ? "Exit fullscreen" : "Enter fullscreen"}
                          title={isFullScreen ? "Exit fullscreen" : "Enter fullscreen"}
                        >
                          {isFullScreen ? (
                            // Minimize icon (exit fullscreen)
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                            </svg>
                          ) : (
                            // Maximize icon (enter fullscreen)
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8V4m0 0h4M3 4l5 5m8-1V4m0 0h-4m4 0l-5 5M3 16v4m0 0h4m-4 0l5-5m8 5l-5-5m5 5v-4m0 4h-4" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>

                  </div>
                  
                  {/* Scrollable Content Area */}
                  <div className="flex-1 overflow-y-auto px-6 pb-6">
                    {/* Questions List - Horizontal */}
                    <div className="mb-6">
                      <div className="relative border border-gray-300 rounded-lg bg-white p-2">
                        {/* Scrollable Questions List */}
                        <div 
                          ref={questionsListRef} 
                          className={`flex items-center gap-2 overflow-x-auto questions-scrollbar ${isOverflowing ? 'pr-12' : ''}`}
                        >
                          {questions.map((question: Question) => (
                            <div
                              key={question.id}
                              className="flex items-center gap-1 flex-shrink-0"
                              onMouseEnter={() => questions.length > 1 && setHoveredQuestionId(question.id)}
                              onMouseLeave={() => setHoveredQuestionId(null)}
                            >
                              <button
                                onClick={() => setActiveQuestionId(question.id)}
                                className={`px-4 py-2 rounded font-medium transition-colors ${
                                  activeQuestionId === question.id
                                    ? 'bg-blue-100 text-[#174A5F]'
                                    : 'bg-white text-[#174A5F] hover:bg-gray-50'
                                }`}
                              >
                                Q{question.questionNumber}.
                              </button>
                              {hoveredQuestionId === question.id && questions.length > 1 && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteQuestion(question.id);
                                  }}
                                  className="w-4 h-4 flex items-center justify-center text-gray-300 hover:text-gray-500 transition-colors"
                                  aria-label="Delete question"
                                >
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              )}
                            </div>
                          ))}
                          {!isOverflowing && (
                            <button
                              onClick={handleAddQuestion}
                              className="p-2 bg-white text-[#174A5F] rounded transition-colors hover:bg-gray-50 flex-shrink-0 border border-gray-200"
                              aria-label="Add question"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          )}
                        </div>
                        {/* Sticky Add Button - Right Side (only when overflowing) */}
                        {isOverflowing && (
                          <button
                            onClick={handleAddQuestion}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white text-[#174A5F] rounded transition-colors hover:bg-gray-50 flex-shrink-0 shadow-sm border border-gray-200"
                            aria-label="Add question"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Active Question Editor */}
                    <div className="space-y-4">
                      {/* Question Type Dropdown */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Question type
                        </label>
                        <DeltaDropdown
                          value={activeQuestion.questionType}
                          onChange={(value) => handleQuestionTypeChange(activeQuestion.id, value as QuestionType)}
                          options={questionTypeOptions}
                          placeholder="Select question type"
                          className="max-w-md"
                        />
                      </div>

                      {/* Question Selection Area */}
                      {!activeQuestion.questionType ? (
                        <div className="flex flex-col items-center justify-center py-16">
                          {/* Large Icon - Three Stacked Documents with Magnifying Glass */}
                          <div className="relative mb-6">
                            {/* Stacked Documents */}
                            <div className="relative">
                              <svg className="w-24 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              {/* Second document (offset) */}
                              <svg className="w-24 h-24 text-gray-300 absolute top-2 left-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              {/* Third document (more offset) */}
                              <svg className="w-24 h-24 text-gray-300 absolute top-4 left-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            {/* Magnifying Glass Overlay */}
                            <div className="absolute -top-2 -right-2">
                              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                              </svg>
                            </div>
                          </div>

                          {/* Text Messages */}
                          <h3 className="text-lg font-semibold text-[#174A5F] mb-2">
                            Select Question Type
                          </h3>
                          <p className="text-sm text-gray-500">
                            No question selected!
                          </p>
                        </div>
                      ) : (
                        <div className="py-6 pr-6 space-y-6">
                          {/* Question Type Specific Builders */}
                          {activeQuestion.questionType === 'multiple-choice' ? (
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-text-primary mb-2">
                                  Describe question briefly
                                </label>
                                <RichTextEditor
                                  value={activeQuestion.questionText}
                                  onChange={(value) => handleQuestionTextChange(activeQuestion.id, value)}
                                  placeholder="Enter your question here..."
                                  rows={4}
                                />
                              </div>
                              <div>
                                <div className="grid grid-cols-2 gap-3 mb-3">
                                  {(activeQuestion.options || []).map((option: QuestionOption, index: number) => {
                                    const labels = ['A.', 'B.', 'C.', 'D.', 'E.', 'F.'];
                                    return (
                                      <div key={option.id} className="flex items-center gap-3 p-3 bg-white rounded border border-gray-200">
                                        <DeltaRadio
                                          checked={option.isCorrect}
                                          onChange={() => handleToggleCorrectOption(activeQuestion.id, option.id)}
                                        />
                                        <span className="text-sm text-text-primary font-medium min-w-[24px]">
                                          {labels[index] || `${index + 1}.`}
                                        </span>
                                        <input
                                          type="text"
                                          value={option.text}
                                          onChange={(e) => handleUpdateOption(activeQuestion.id, option.id, e.target.value)}
                                          placeholder=".."
                                          className="flex-1 px-2 py-1 border-none outline-none focus:outline-none bg-transparent text-text-primary"
                                        />
                                        <button
                                          onClick={() => handleRemoveOption(activeQuestion.id, option.id)}
                                          className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                                          aria-label="Remove option"
                                        >
                                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                          </svg>
                                        </button>
                                      </div>
                                    );
                                  })}
                                </div>
                                <DeltaButton
                                  variant="secondary"
                                  size="sm"
                                  onClick={() => handleAddOption(activeQuestion.id)}
                                  className="mt-2"
                                >
                                  + Add Option
                                </DeltaButton>
                              </div>
                            </div>
                          ) : activeQuestion.questionType === 'blank-space' ? (
                            <div className="space-y-4">
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <label className="block text-sm font-medium text-text-primary">
                                    Question
                                  </label>
                                  <DeltaButton
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => handleInsertBlank(activeQuestion.id)}
                                    type="button"
                                  >
                                    Insert [blank]
                                  </DeltaButton>
                                </div>
                                <DeltaTextarea
                                  ref={(el) => {
                                    blankTextareaRefs.current[activeQuestion.id] = el;
                                  }}
                                  value={activeQuestion.questionText}
                                  onChange={(e) => handleQuestionTextChange(activeQuestion.id, e.target.value)}
                                  placeholder="Enter your question here. Click 'Insert [blank]' to add blanks like [blank1], [blank2], etc."
                                  rows={6}
                                  className="w-full"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                  Click "Insert [blank]" to add blank markers. They will be numbered automatically: [blank1], [blank2], etc.
                                </p>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-text-primary mb-3">
                                  Correct Answers for Blanks
                                </label>
                                <div className="space-y-2">
                                  {(activeQuestion.blanks || []).map((blank: string, index: number) => (
                                    <div key={index} className="flex items-center gap-2">
                                      <span className="text-sm text-gray-600 w-8">#{index + 1}</span>
                                      <DeltaInput
                                        value={blank}
                                        onChange={(e) => handleBlankAnswerChange(activeQuestion.id, index, e.target.value)}
                                        placeholder={`Answer for [blank${index + 1}]`}
                                        className="flex-1"
                                      />
                                    </div>
                                  ))}
                                </div>
                                {(!activeQuestion.blanks || activeQuestion.blanks.length === 0) && (
                                  <p className="text-xs text-gray-500 mt-2">
                                    Add [blank1], [blank2], etc. in your question text above, and answer fields will appear here automatically.
                                  </p>
                                )}
                              </div>
                            </div>
                          ) : (
                            <>
                              {/* Question Text Editor for other types */}
                              <div>
                                <label className="block text-sm font-medium text-text-primary mb-2">
                                  Question
                                </label>
                                <RichTextEditor
                                  value={activeQuestion.questionText}
                                  onChange={(value) => handleQuestionTextChange(activeQuestion.id, value)}
                                  placeholder="Enter your question here..."
                                  rows={6}
                                />
                              </div>

                              {activeQuestion.questionType === 'true-false' && (
                            <div>
                              <label className="block text-sm font-medium text-text-primary mb-3">
                                Correct Answer
                              </label>
                              <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <DeltaRadio
                                    checked={activeQuestion.correctAnswer === true}
                                    onChange={() => handleCorrectAnswerChange(activeQuestion.id, true)}
                                  />
                                  <span className="text-text-primary">
                                    True
                                  </span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <DeltaRadio
                                    checked={activeQuestion.correctAnswer === false}
                                    onChange={() => handleCorrectAnswerChange(activeQuestion.id, false)}
                                  />
                                  <span className="text-text-primary">
                                    False
                                  </span>
                                </label>
                              </div>
                            </div>
                          )}

                          {activeQuestion.questionType === 'matching' && (
                            <div>
                              <div className="flex items-center justify-between mb-3">
                                <label className="block text-sm font-medium text-text-primary">
                                  Matching Pairs
                                </label>
                                <DeltaButton
                                  variant="secondary"
                                  size="sm"
                                  onClick={() => handleAddPair(activeQuestion.id)}
                                >
                                  + Add Pair
                                </DeltaButton>
                              </div>
                              <div className="space-y-3">
                                {(activeQuestion.pairs || []).map((pair: MatchingPair) => (
                                  <div key={pair.id} className="flex items-center gap-3 p-3 bg-white rounded border border-gray-200">
                                    <input
                                      type="text"
                                      value={pair.left}
                                      onChange={(e) => handleUpdatePair(activeQuestion.id, pair.id, 'left', e.target.value)}
                                      placeholder="Left item"
                                      className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#174A5F]"
                                    />
                                    <span className="text-gray-400">→</span>
                                    <input
                                      type="text"
                                      value={pair.right}
                                      onChange={(e) => handleUpdatePair(activeQuestion.id, pair.id, 'right', e.target.value)}
                                      placeholder="Right item"
                                      className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#174A5F]"
                                    />
                                    <button
                                      onClick={() => handleRemovePair(activeQuestion.id, pair.id)}
                                      className="text-red-500 hover:text-red-700 p-1"
                                      aria-label="Remove pair"
                                    >
                                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                      </svg>
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                              {activeQuestion.questionType === 'others' && (
                                <div>
                                  <p className="text-sm text-text-secondary">
                                    Custom question type. Add your question content above.
                                  </p>
                                </div>
                              )}
                            </>
                          )}

                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar - Fixed at Right Edge of Viewport */}
            <div className="fixed right-0 top-0 h-screen w-80 bg-white border-l border-border-primary p-6 flex flex-col z-[10000] shadow-lg overflow-y-auto">
              {/* Save as Draft and Publish Buttons */}
              <div className="flex flex-row gap-3 mb-6">
                <DeltaButton
                  variant="secondary"
                  size="md"
                  onClick={onSaveDraft}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-text-primary"
                >
                  Save as Draft
                </DeltaButton>
                <DeltaButton
                  variant="primary"
                  size="md"
                  onClick={onReviewPost}
                  className="flex-1 bg-[#174A5F] hover:bg-[#174A5F]/90 text-white"
                >
                  Publish
                </DeltaButton>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-border-primary mb-6">
                <button
                  onClick={() => setActiveSidebarTab('exercise-features')}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    activeSidebarTab === 'exercise-features'
                      ? 'text-[#174A5F] border-b-2 border-[#174A5F]'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Exercise Features
                </button>
                <button
                  onClick={() => setActiveSidebarTab('resources')}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    activeSidebarTab === 'resources'
                      ? 'text-[#174A5F] border-b-2 border-[#174A5F]'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Resources
                </button>
              </div>

              {/* Tab Content */}
              {activeSidebarTab === 'exercise-features' && (
                <div className="flex-1">
                  {/* Visibility Section */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Visibility
                    </label>
                    <DeltaDropdown
                      value={visibility}
                      onChange={(value) => setVisibility(value as VisibilityOption)}
                      options={visibilityOptions}
                      placeholder="Select visibility"
                      className="w-full"
                    />
                  </div>

                  {/* Additional exercise features can be added here */}
                </div>
              )}

              {activeSidebarTab === 'resources' && (
                <div className="flex-1">
                  <p className="text-sm text-text-secondary">
                    Resources content will be displayed here.
                  </p>
                </div>
              )}

              {/* Move to Trash Link - Bottom */}
              <div className="mt-auto pt-6 border-t border-border-primary">
                <button
                  className="text-sm text-red-600 hover:text-red-700 transition-colors"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to move this test to trash?')) {
                      onBack();
                    }
                  }}
                >
                  Move to Trash
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {!isFullScreen && (
        <div className="w-full font-primary bg-white relative min-h-screen">
          {/* Main Content Layout - Full Width Container */}
          <div className="relative min-h-screen">
        {/* Main Content Area - Wider Width */}
        <div className={`${isFullScreen ? 'h-full' : 'py-6'} pr-48`}>
          <div className={`flex flex-col ${isFullScreen ? 'h-full overflow-hidden' : ''}`}>
          <div className={`${isFullScreen ? 'p-6 pb-4 flex-shrink-0' : 'px-6 pt-0 pb-4'}`}>
          {/* Top Section - Back Arrow, Title, and Action Icons */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              {/* Back Arrow */}
              <button
                onClick={onBack}
                className="flex items-center justify-center w-8 h-8 text-text-secondary hover:text-text-primary transition-colors"
                aria-label="Go back"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>

              {/* Question Mark Icon + Title */}
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={testName}
                    onChange={(e) => setTestName(e.target.value)}
                    className="text-xl font-semibold text-text-primary bg-transparent border-none outline-none focus:outline-none focus:ring-0 p-0"
                    placeholder="New Exercise"
                  />
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-3">
              {/* Maximize/Fullscreen Toggle */}
              <button
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="p-2 text-text-secondary hover:text-text-primary transition-colors"
                aria-label={isFullScreen ? "Exit fullscreen" : "Enter fullscreen"}
                title={isFullScreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullScreen ? (
                  // Minimize icon (exit fullscreen)
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                  </svg>
                ) : (
                  // Maximize icon (enter fullscreen)
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8V4m0 0h4M3 4l5 5m8-1V4m0 0h-4m4 0l-5 5M3 16v4m0 0h4m-4 0l5-5m8 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          </div>
          
          {/* Scrollable Content Area */}
          <div className={`${isFullScreen ? 'flex-1 overflow-y-auto px-6 pb-6' : 'px-6 pb-6'}`}>
            {/* Questions List - Horizontal */}
            <div className="mb-6">
              <div className="relative border border-gray-300 rounded-lg bg-white p-2">
                {/* Scrollable Questions List */}
                <div 
                  ref={questionsListRefNormal} 
                  className={`flex items-center gap-2 overflow-x-auto questions-scrollbar ${isOverflowing ? 'pr-12' : ''}`}
                >
                  {questions.map((question: Question) => (
                    <div
                      key={question.id}
                      className="flex items-center gap-1 flex-shrink-0"
                      onMouseEnter={() => questions.length > 1 && setHoveredQuestionId(question.id)}
                      onMouseLeave={() => setHoveredQuestionId(null)}
                    >
                      <button
                        onClick={() => setActiveQuestionId(question.id)}
                        className={`px-4 py-2 rounded font-medium transition-colors ${
                          activeQuestionId === question.id
                            ? 'bg-blue-100 text-[#174A5F]'
                            : 'bg-white text-[#174A5F] hover:bg-gray-50'
                        }`}
                      >
                        Q{question.questionNumber}.
                      </button>
                      {hoveredQuestionId === question.id && questions.length > 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteQuestion(question.id);
                          }}
                          className="w-4 h-4 flex items-center justify-center text-gray-300 hover:text-gray-500 transition-colors"
                          aria-label="Delete question"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                  {!isOverflowing && (
                    <button
                      onClick={handleAddQuestion}
                      className="p-2 bg-white text-[#174A5F] rounded transition-colors hover:bg-gray-50 flex-shrink-0 border border-gray-200"
                      aria-label="Add question"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  )}
                </div>
                {/* Sticky Add Button - Right Side (only when overflowing) */}
                {isOverflowing && (
                  <button
                    onClick={handleAddQuestion}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white text-[#174A5F] rounded transition-colors hover:bg-gray-50 flex-shrink-0 shadow-sm border border-gray-200"
                    aria-label="Add question"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Active Question Editor */}
            <div className="space-y-4">
              {/* Question Type Dropdown */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Question type
                </label>
                <DeltaDropdown
                  value={activeQuestion.questionType}
                  onChange={(value) => handleQuestionTypeChange(activeQuestion.id, value as QuestionType)}
                  options={questionTypeOptions}
                  placeholder="Select question type"
                  className="max-w-md"
                />
              </div>

              {/* Question Selection Area */}
              {!activeQuestion.questionType ? (
                <div className="flex flex-col items-center justify-center py-16">
                  {/* Large Icon - Three Stacked Documents with Magnifying Glass */}
                  <div className="relative mb-6">
                    {/* Stacked Documents */}
                    <div className="relative">
                      <svg className="w-24 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {/* Second document (offset) */}
                      <svg className="w-24 h-24 text-gray-300 absolute top-2 left-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {/* Third document (more offset) */}
                      <svg className="w-24 h-24 text-gray-300 absolute top-4 left-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    {/* Magnifying Glass Overlay */}
                    <div className="absolute -top-2 -right-2">
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>

                  {/* Text Messages */}
                  <h3 className="text-lg font-semibold text-[#174A5F] mb-2">
                    Select Question Type
                  </h3>
                  <p className="text-sm text-gray-500">
                    No question selected!
                  </p>
                </div>
              ) : (
                <div className="py-6 pr-6 space-y-6">
                  {/* Question Type Specific Builders */}
                  {activeQuestion.questionType === 'multiple-choice' ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Describe question briefly
                        </label>
                        <RichTextEditor
                          value={activeQuestion.questionText}
                          onChange={(value) => handleQuestionTextChange(activeQuestion.id, value)}
                          placeholder="Enter your question here..."
                          rows={4}
                        />
                      </div>
                      <div>
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          {(activeQuestion.options || []).map((option: QuestionOption, index: number) => {
                            const labels = ['A.', 'B.', 'C.', 'D.', 'E.', 'F.'];
                            return (
                              <div key={option.id} className="flex items-center gap-3 p-3 bg-white rounded border border-gray-200">
                                <DeltaRadio
                                  checked={option.isCorrect}
                                  onChange={() => handleToggleCorrectOption(activeQuestion.id, option.id)}
                                />
                                <span className="text-sm text-text-primary font-medium min-w-[24px]">
                                  {labels[index] || `${index + 1}.`}
                                </span>
                                <input
                                  type="text"
                                  value={option.text}
                                  onChange={(e) => handleUpdateOption(activeQuestion.id, option.id, e.target.value)}
                                  placeholder=".."
                                  className="flex-1 px-2 py-1 border-none outline-none focus:outline-none bg-transparent text-text-primary"
                                />
                                <button
                                  onClick={() => handleRemoveOption(activeQuestion.id, option.id)}
                                  className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                                  aria-label="Remove option"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                            );
                          })}
                        </div>
                        <DeltaButton
                          variant="secondary"
                          size="sm"
                          onClick={() => handleAddOption(activeQuestion.id)}
                          className="mt-2"
                        >
                          + Add Option
                        </DeltaButton>
                      </div>
                    </div>
                  ) : activeQuestion.questionType === 'blank-space' ? (
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-sm font-medium text-text-primary">
                            Question
                          </label>
                          <DeltaButton
                            variant="secondary"
                            size="sm"
                            onClick={() => handleInsertBlank(activeQuestion.id)}
                            type="button"
                          >
                            Insert [blank]
                          </DeltaButton>
                        </div>
                        <DeltaTextarea
                          ref={(el) => {
                            blankTextareaRefs.current[activeQuestion.id] = el;
                          }}
                          value={activeQuestion.questionText}
                          onChange={(e) => handleQuestionTextChange(activeQuestion.id, e.target.value)}
                          placeholder="Enter your question here. Click 'Insert [blank]' to add blanks like [blank1], [blank2], etc."
                          rows={6}
                          className="w-full"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Click "Insert [blank]" to add blank markers. They will be numbered automatically: [blank1], [blank2], etc.
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-3">
                          Correct Answers for Blanks
                        </label>
                        <div className="space-y-2">
                          {(activeQuestion.blanks || []).map((blank: string, index: number) => (
                            <div key={index} className="flex items-center gap-2">
                              <span className="text-sm text-gray-600 w-8">#{index + 1}</span>
                              <DeltaInput
                                value={blank}
                                onChange={(e) => handleBlankAnswerChange(activeQuestion.id, index, e.target.value)}
                                placeholder={`Answer for [blank${index + 1}]`}
                                className="flex-1"
                              />
                            </div>
                          ))}
                        </div>
                        {(!activeQuestion.blanks || activeQuestion.blanks.length === 0) && (
                          <p className="text-xs text-gray-500 mt-2">
                            Add [blank1], [blank2], etc. in your question text above, and answer fields will appear here automatically.
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Question Text Editor for other types */}
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Question
                        </label>
                        <RichTextEditor
                          value={activeQuestion.questionText}
                          onChange={(value) => handleQuestionTextChange(activeQuestion.id, value)}
                          placeholder="Enter your question here..."
                          rows={6}
                        />
                      </div>

                      {activeQuestion.questionType === 'true-false' && (
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-3">
                        Correct Answer
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <DeltaRadio
                            checked={activeQuestion.correctAnswer === true}
                            onChange={() => handleCorrectAnswerChange(activeQuestion.id, true)}
                          />
                          <span className="text-text-primary">
                            True
                          </span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <DeltaRadio
                            checked={activeQuestion.correctAnswer === false}
                            onChange={() => handleCorrectAnswerChange(activeQuestion.id, false)}
                          />
                          <span className="text-text-primary">
                            False
                          </span>
                        </label>
                      </div>
                    </div>
                  )}

                  {activeQuestion.questionType === 'matching' && (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="block text-sm font-medium text-text-primary">
                          Matching Pairs
                        </label>
                        <DeltaButton
                          variant="secondary"
                          size="sm"
                          onClick={() => handleAddPair(activeQuestion.id)}
                        >
                          + Add Pair
                        </DeltaButton>
                      </div>
                      <div className="space-y-3">
                        {(activeQuestion.pairs || []).map((pair: MatchingPair) => (
                          <div key={pair.id} className="flex items-center gap-3 p-3 bg-white rounded border border-gray-200">
                            <input
                              type="text"
                              value={pair.left}
                              onChange={(e) => handleUpdatePair(activeQuestion.id, pair.id, 'left', e.target.value)}
                              placeholder="Left item"
                              className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#174A5F]"
                            />
                            <span className="text-gray-400">→</span>
                            <input
                              type="text"
                              value={pair.right}
                              onChange={(e) => handleUpdatePair(activeQuestion.id, pair.id, 'right', e.target.value)}
                              placeholder="Right item"
                              className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#174A5F]"
                            />
                            <button
                              onClick={() => handleRemovePair(activeQuestion.id, pair.id)}
                              className="text-red-500 hover:text-red-700 p-1"
                              aria-label="Remove pair"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                      {activeQuestion.questionType === 'others' && (
                        <div>
                          <p className="text-sm text-text-secondary">
                            Custom question type. Add your question content above.
                          </p>
                        </div>
                      )}
                    </>
                  )}

                </div>
              )}
            </div>
          </div>
        </div>
        </div>

            {/* Right Sidebar - Fixed at Right Edge of Viewport */}
            <div className={`fixed right-0 ${isFullScreen ? 'top-0 h-screen z-[10000]' : 'top-[60px] h-[calc(100vh-60px)] z-40'} w-80 bg-white border-l border-border-primary p-6 flex flex-col shadow-lg overflow-y-auto`}>
              {/* Save as Draft and Publish Buttons */}
              <div className="flex flex-row gap-3 mb-6">
                <DeltaButton
                  variant="secondary"
                  size="md"
                  onClick={onSaveDraft}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-text-primary"
                >
                  Save as Draft
                </DeltaButton>
                <DeltaButton
                  variant="primary"
                  size="md"
                  onClick={onReviewPost}
                  className="flex-1 bg-[#174A5F] hover:bg-[#174A5F]/90 text-white"
                >
                  Publish
                </DeltaButton>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-border-primary mb-6">
                <button
                  onClick={() => setActiveSidebarTab('exercise-features')}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    activeSidebarTab === 'exercise-features'
                      ? 'text-[#174A5F] border-b-2 border-[#174A5F]'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Exercise Features
                </button>
                <button
                  onClick={() => setActiveSidebarTab('resources')}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    activeSidebarTab === 'resources'
                      ? 'text-[#174A5F] border-b-2 border-[#174A5F]'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Resources
                </button>
              </div>

              {/* Tab Content */}
              {activeSidebarTab === 'exercise-features' && (
                <div className="flex-1">
                  {/* Visibility Section */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Visibility
                    </label>
                    <DeltaDropdown
                      value={visibility}
                      onChange={(value) => setVisibility(value as VisibilityOption)}
                      options={visibilityOptions}
                      placeholder="Select visibility"
                      className="w-full"
                    />
                  </div>

                  {/* Additional exercise features can be added here */}
                </div>
              )}

              {activeSidebarTab === 'resources' && (
                <div className="flex-1">
                  <p className="text-sm text-text-secondary">
                    Resources content will be displayed here.
                  </p>
                </div>
              )}

              {/* Move to Trash Link - Bottom */}
              <div className="mt-auto pt-6 border-t border-border-primary">
                <button
                  className="text-sm text-red-600 hover:text-red-700 transition-colors"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to move this test to trash?')) {
                      onBack();
                    }
                  }}
                >
                  Move to Trash
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Warning Modal */}
      <DeltaModal
        isOpen={deleteWarningModal.isOpen}
        onClose={handleCancelDelete}
        title="Delete Question?"
        size="sm"
      >
        <div className="p-3">
          <p className="text-sm text-text-primary mb-3">
            This question contains content. Are you sure you want to delete it? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-2">
            <DeltaButton
              variant="secondary"
              size="sm"
              onClick={handleCancelDelete}
            >
              Cancel
            </DeltaButton>
            <DeltaButton
              variant="primary"
              size="sm"
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </DeltaButton>
          </div>
        </div>
      </DeltaModal>
    </>
  );
};
