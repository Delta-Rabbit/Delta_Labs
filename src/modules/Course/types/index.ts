/**
 * Delta Labs Course Module - TypeScript Definitions
 * Enterprise-grade course management types and interfaces
 */

// ============================================================================
// CORE COURSE TYPES
// ============================================================================

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  instructor: Instructor;
  category: CourseCategory;
  level: CourseLevel;
  duration: number; // in hours
  lessons: number;
  studentsEnrolled: number;
  price: number;
  currency: string;
  isFree: boolean;
  rating: number;
  reviewsCount: number;
  tags: string[];
  status: CourseStatus;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Instructor {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  avatar?: string;
  bio?: string;
  rating: number;
  studentsCount: number;
  coursesCount: number;
}

export type CourseCategory = 
  | 'Physics' 
  | 'Chemistry' 
  | 'Mathematics' 
  | 'Biology' 
  | 'Computer Science'
  | 'Engineering'
  | 'Business'
  | 'Design'
  | 'Language'
  | 'Other';

export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type CourseStatus = 
  | 'Published' 
  | 'Draft' 
  | 'Archived' 
  | 'Pending Review';

// ============================================================================
// ENROLLMENT TYPES
// ============================================================================

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  course: Course;
  enrolledAt: string;
  progress: number; // percentage
  status: EnrollmentStatus;
  lastAccessedAt?: string;
  completedAt?: string;
}

export type EnrollmentStatus = 
  | 'Active' 
  | 'Completed' 
  | 'Dropped' 
  | 'Expired';

// ============================================================================
// WISHLIST TYPES
// ============================================================================

export interface WishlistItem {
  id: string;
  userId: string;
  courseId: string;
  course: Course;
  addedAt: string;
}

// ============================================================================
// COURSE MODULE STATE
// ============================================================================

export interface CourseState {
  // Active courses
  enrolledCourses: Enrollment[];
  wishlistItems: WishlistItem[];
  recentActivity: CourseActivity[];
  
  // Loading states
  isLoadingCourses: boolean;
  isLoadingWishlist: boolean;
  isLoadingActivity: boolean;
  
  // Errors
  error: string | null;
  
  // Filters
  searchQuery: string;
  categoryFilter: CourseCategory | null;
  levelFilter: CourseLevel | null;
  
  // View states
  activeTab: CourseTabType;
  selectedCourse: Course | null;
}

export type CourseTabType = 
  | 'enrolled' 
  | 'wishlist' 
  | 'planner' 
  | 'continue';

export interface CourseActivity {
  id: string;
  type: 'enrollment' | 'completion' | 'review' | 'progress';
  courseId: string;
  course: Course;
  timestamp: string;
  description: string;
}

// ============================================================================
// COURSE CONTEXT VALUE
// ============================================================================

export interface CourseContextValue extends CourseState {
  // Methods
  fetchEnrolledCourses: () => Promise<void>;
  fetchWishlist: () => Promise<void>;
  fetchRecentActivity: () => Promise<void>;
  enrollInCourse: (courseId: string) => Promise<void>;
  addToWishlist: (courseId: string) => Promise<void>;
  removeFromWishlist: (courseId: string) => Promise<void>;
  updateProgress: (enrollmentId: string, progress: number) => Promise<void>;
  setSearchQuery: (query: string) => void;
  setCategoryFilter: (category: CourseCategory | null) => void;
  setLevelFilter: (level: CourseLevel | null) => void;
  setActiveTab: (tab: CourseTabType) => void;
  selectCourse: (course: Course | null) => void;
  clearError: () => void;
}

// ============================================================================
// FEATURE CARD PROPS
// ============================================================================

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  count?: number;
  onClick?: () => void;
  isLoading?: boolean;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface CourseListResponse {
  courses: Course[];
  total: number;
  page: number;
  limit: number;
}

export interface EnrollmentResponse {
  enrollment: Enrollment;
  course: Course;
}

// ============================================================================
// EXPORTS
// ============================================================================

export type {
  Course as CourseType,
  Instructor as InstructorType,
  Enrollment as EnrollmentType,
  WishlistItem as WishlistItemType,
};

