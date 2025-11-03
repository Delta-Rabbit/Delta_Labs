/**
 * Delta Labs Course Context
 * Enterprise-grade course state management
 */

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import type { 
  CourseState, 
  CourseContextValue,
  Enrollment,
  WishlistItem,
  CourseActivity,
  CourseTabType,
  CourseCategory,
  CourseLevel,
  Course
} from '../types';

// ============================================================================
// COURSE ACTIONS
// ============================================================================

type CourseAction =
  | { type: 'SET_LOADING_COURSES'; payload: boolean }
  | { type: 'SET_LOADING_WISHLIST'; payload: boolean }
  | { type: 'SET_LOADING_ACTIVITY'; payload: boolean }
  | { type: 'SET_ENROLLED_COURSES'; payload: Enrollment[] }
  | { type: 'SET_WISHLIST'; payload: WishlistItem[] }
  | { type: 'SET_RECENT_ACTIVITY'; payload: CourseActivity[] }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_CATEGORY_FILTER'; payload: CourseCategory | null }
  | { type: 'SET_LEVEL_FILTER'; payload: CourseLevel | null }
  | { type: 'SET_ACTIVE_TAB'; payload: CourseTabType }
  | { type: 'SET_SELECTED_COURSE'; payload: Course | null }
  | { type: 'ADD_ENROLLMENT'; payload: Enrollment }
  | { type: 'UPDATE_ENROLLMENT'; payload: { id: string; enrollment: Partial<Enrollment> } }
  | { type: 'ADD_WISHLIST_ITEM'; payload: WishlistItem }
  | { type: 'REMOVE_WISHLIST_ITEM'; payload: string }
  | { type: 'CLEAR_ERROR' };

// ============================================================================
// COURSE REDUCER
// ============================================================================

const courseReducer = (state: CourseState, action: CourseAction): CourseState => {
  switch (action.type) {
    case 'SET_LOADING_COURSES':
      return { ...state, isLoadingCourses: action.payload };
    
    case 'SET_LOADING_WISHLIST':
      return { ...state, isLoadingWishlist: action.payload };
    
    case 'SET_LOADING_ACTIVITY':
      return { ...state, isLoadingActivity: action.payload };
    
    case 'SET_ENROLLED_COURSES':
      return { ...state, enrolledCourses: action.payload };
    
    case 'SET_WISHLIST':
      return { ...state, wishlistItems: action.payload };
    
    case 'SET_RECENT_ACTIVITY':
      return { ...state, recentActivity: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    
    case 'SET_CATEGORY_FILTER':
      return { ...state, categoryFilter: action.payload };
    
    case 'SET_LEVEL_FILTER':
      return { ...state, levelFilter: action.payload };
    
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };
    
    case 'SET_SELECTED_COURSE':
      return { ...state, selectedCourse: action.payload };
    
    case 'ADD_ENROLLMENT':
      return { ...state, enrolledCourses: [...state.enrolledCourses, action.payload] };
    
    case 'UPDATE_ENROLLMENT':
      return {
        ...state,
        enrolledCourses: state.enrolledCourses.map(e =>
          e.id === action.payload.id
            ? { ...e, ...action.payload.enrollment }
            : e
        ),
      };
    
    case 'ADD_WISHLIST_ITEM':
      return { ...state, wishlistItems: [...state.wishlistItems, action.payload] };
    
    case 'REMOVE_WISHLIST_ITEM':
      return {
        ...state,
        wishlistItems: state.wishlistItems.filter(item => item.id !== action.payload),
      };
    
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    
    default:
      return state;
  }
};

// ============================================================================
// INITIAL STATE
// ============================================================================

const initialState: CourseState = {
  enrolledCourses: [],
  wishlistItems: [],
  recentActivity: [],
  isLoadingCourses: false,
  isLoadingWishlist: false,
  isLoadingActivity: false,
  error: null,
  searchQuery: '',
  categoryFilter: null,
  levelFilter: null,
  activeTab: 'enrolled',
  selectedCourse: null,
};

// ============================================================================
// COURSE CONTEXT
// ============================================================================

const CourseContext = createContext<CourseContextValue | undefined>(undefined);

// ============================================================================
// COURSE PROVIDER PROPS
// ============================================================================

interface CourseProviderProps {
  children: ReactNode;
}

// ============================================================================
// COURSE PROVIDER COMPONENT
// ============================================================================

export function CourseProvider({ children }: CourseProviderProps) {
  const [state, dispatch] = useReducer(courseReducer, initialState);

  // ============================================================================
  // API UTILITIES
  // ============================================================================

  const handleApiError = (error: any): string => {
    if (error?.response?.data?.message) {
      return error.response.data.message;
    }
    if (error?.message) {
      return error.message;
    }
    return 'An unexpected error occurred. Please try again.';
  };

  // ============================================================================
  // FETCH METHODS
  // ============================================================================

  const fetchEnrolledCourses = async (): Promise<void> => {
    dispatch({ type: 'SET_LOADING_COURSES', payload: true });
    
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data for now
      const mockEnrollments: Enrollment[] = [];
      
      dispatch({ type: 'SET_ENROLLED_COURSES', payload: mockEnrollments });
    } catch (error) {
      const errorMessage = handleApiError(error);
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    } finally {
      dispatch({ type: 'SET_LOADING_COURSES', payload: false });
    }
  };

  const fetchWishlist = async (): Promise<void> => {
    dispatch({ type: 'SET_LOADING_WISHLIST', payload: true });
    
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data for now
      const mockWishlist: WishlistItem[] = [];
      
      dispatch({ type: 'SET_WISHLIST', payload: mockWishlist });
    } catch (error) {
      const errorMessage = handleApiError(error);
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    } finally {
      dispatch({ type: 'SET_LOADING_WISHLIST', payload: false });
    }
  };

  const fetchRecentActivity = async (): Promise<void> => {
    dispatch({ type: 'SET_LOADING_ACTIVITY', payload: true });
    
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data for now
      const mockActivity: CourseActivity[] = [];
      
      dispatch({ type: 'SET_RECENT_ACTIVITY', payload: mockActivity });
    } catch (error) {
      const errorMessage = handleApiError(error);
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    } finally {
      dispatch({ type: 'SET_LOADING_ACTIVITY', payload: false });
    }
  };

  // ============================================================================
  // COURSE MANAGEMENT METHODS
  // ============================================================================

  const enrollInCourse = async (courseId: string): Promise<void> => {
    try {
      // TODO: Implement actual enrollment API call
      const mockEnrollment: Enrollment = {
        id: `enrollment-${Date.now()}`,
        userId: 'user-1',
        courseId,
        course: {} as Course,
        enrolledAt: new Date().toISOString(),
        progress: 0,
        status: 'Active',
      };
      
      dispatch({ type: 'ADD_ENROLLMENT', payload: mockEnrollment });
    } catch (error) {
      const errorMessage = handleApiError(error);
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw new Error(errorMessage);
    }
  };

  const addToWishlist = async (courseId: string): Promise<void> => {
    try {
      // TODO: Implement actual wishlist API call
      const mockWishlistItem: WishlistItem = {
        id: `wishlist-${Date.now()}`,
        userId: 'user-1',
        courseId,
        course: {} as Course,
        addedAt: new Date().toISOString(),
      };
      
      dispatch({ type: 'ADD_WISHLIST_ITEM', payload: mockWishlistItem });
    } catch (error) {
      const errorMessage = handleApiError(error);
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw new Error(errorMessage);
    }
  };

  const removeFromWishlist = async (wishlistItemId: string): Promise<void> => {
    try {
      // TODO: Implement actual removal API call
      dispatch({ type: 'REMOVE_WISHLIST_ITEM', payload: wishlistItemId });
    } catch (error) {
      const errorMessage = handleApiError(error);
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw new Error(errorMessage);
    }
  };

  const updateProgress = async (enrollmentId: string, progress: number): Promise<void> => {
    try {
      // TODO: Implement actual progress update API call
      dispatch({
        type: 'UPDATE_ENROLLMENT',
        payload: { id: enrollmentId, enrollment: { progress } },
      });
    } catch (error) {
      const errorMessage = handleApiError(error);
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw new Error(errorMessage);
    }
  };

  // ============================================================================
  // STATE MANAGEMENT METHODS
  // ============================================================================

  const setSearchQuery = (query: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  };

  const setCategoryFilter = (category: CourseCategory | null) => {
    dispatch({ type: 'SET_CATEGORY_FILTER', payload: category });
  };

  const setLevelFilter = (level: CourseLevel | null) => {
    dispatch({ type: 'SET_LEVEL_FILTER', payload: level });
  };

  const setActiveTab = (tab: CourseTabType) => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: tab });
  };

  const selectCourse = (course: Course | null) => {
    dispatch({ type: 'SET_SELECTED_COURSE', payload: course });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // ============================================================================
  // INITIALIZATION
  // ============================================================================

  useEffect(() => {
    // Initial data fetch
    fetchEnrolledCourses();
    fetchWishlist();
    fetchRecentActivity();
  }, []);

  // ============================================================================
  // CONTEXT VALUE
  // ============================================================================

  const contextValue: CourseContextValue = {
    ...state,
    fetchEnrolledCourses,
    fetchWishlist,
    fetchRecentActivity,
    enrollInCourse,
    addToWishlist,
    removeFromWishlist,
    updateProgress,
    setSearchQuery,
    setCategoryFilter,
    setLevelFilter,
    setActiveTab,
    selectCourse,
    clearError,
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <CourseContext.Provider value={contextValue}>
      {children}
    </CourseContext.Provider>
  );
}

// ============================================================================
// COURSE HOOK
// ============================================================================

export function useCourse(): CourseContextValue {
  const context = useContext(CourseContext);
  
  if (context === undefined) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  
  return context;
}

// ============================================================================
// EXPORTS
// ============================================================================

export default CourseContext;

