/**
 * useQuestionFilters Hook
 * Manages filtering and searching of questions
 */

import { useState, useMemo, useCallback } from 'react';
import type { Question } from '../types';

interface UseQuestionFiltersProps {
  questions: Question[];
}

export const useQuestionFilters = ({ questions }: UseQuestionFiltersProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredQuestions = useMemo(() => {
    if (!searchQuery.trim()) return questions;
    
    const query = searchQuery.toLowerCase();
    return questions.filter(q => 
      q.title.toLowerCase().includes(query) ||
      q.description.toLowerCase().includes(query) ||
      q.tags.some(tag => tag.toLowerCase().includes(query)) ||
      q.author.name.toLowerCase().includes(query)
    );
  }, [questions, searchQuery]);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  return {
    searchQuery,
    filteredQuestions,
    handleSearchChange,
    clearSearch,
  };
};



