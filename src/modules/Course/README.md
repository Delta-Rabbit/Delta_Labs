# Delta Labs Course Module

## 🎓 **Enterprise-Grade Course Management System**

The Course module provides a comprehensive course management interface for Delta Labs, following enterprise-grade architecture and design patterns.

---

## 📋 **Overview**

The Course module is the first fully implemented module in the Delta Labs platform, showcasing the following capabilities:

- **Course Management**: Track enrollments, wishlist, and course progress
- **User Interface**: Professional 2x2 feature card grid layout
- **State Management**: Complete Context API integration with useReducer
- **Type Safety**: Full TypeScript definitions for all entities
- **Responsive Design**: Built with Tailwind CSS and theme integration

---

## 🗂️ **Architecture**

```
src/modules/Course/
├── components/
│   ├── CoursePage.tsx           # Main page container
│   ├── CourseTopBar.tsx         # Top navigation bar
│   ├── CourseSecondaryNav.tsx   # Secondary navigation tabs
│   ├── FeatureCardGrid.tsx      # 2x2 grid layout
│   └── FeatureCard.tsx           # Reusable card component
├── context/
│   └── CourseContext.tsx         # State management
├── types/
│   └── index.ts                  # TypeScript definitions
├── index.ts                      # Module exports
└── README.md                     # This file
```

---

## 🧩 **Components**

### **CoursePage**
Main page component that wraps all Course module UI.

**Features:**
- CourseProvider integration
- Complete page layout
- Top bar + secondary nav + content area

### **CourseTopBar**
Top-level navigation bar.

**Features:**
- Hamburger menu
- Logo display
- Active tab indicator with close button
- Language selector
- AI Bot access
- User profile display

### **CourseSecondaryNav**
Secondary navigation within Course module.

**Features:**
- Super Course
- Recent Activity
- Offline Courses
- Message
- Unrolled Courses
- Edit action

### **FeatureCardGrid**
2x2 grid of feature cards.

**Features:**
- Enrolled Courses
- Wishlist
- Planner Page
- Continue with plan

### **FeatureCard**
Reusable feature card component.

**Features:**
- Icon display
- Title & description
- Count badge
- Loading states
- Hover effects
- Click handlers

---

## 🔧 **State Management**

### **CourseContext**
Manages all Course module state.

**State:**
- `enrolledCourses`: Array of user enrollments
- `wishlistItems`: Array of wishlisted courses
- `recentActivity`: Recent course activities
- `isLoadingCourses`: Loading state for courses
- `isLoadingWishlist`: Loading state for wishlist
- `isLoadingActivity`: Loading state for activity
- `error`: Error messages
- `searchQuery`: Search input
- `categoryFilter`: Category filter
- `levelFilter`: Level filter
- `activeTab`: Current tab
- `selectedCourse`: Currently selected course

**Methods:**
- `fetchEnrolledCourses()`: Fetch user enrollments
- `fetchWishlist()`: Fetch wishlist
- `fetchRecentActivity()`: Fetch recent activity
- `enrollInCourse()`: Enroll in a course
- `addToWishlist()`: Add course to wishlist
- `removeFromWishlist()`: Remove from wishlist
- `updateProgress()`: Update enrollment progress
- `setSearchQuery()`: Update search query
- `setCategoryFilter()`: Set category filter
- `setLevelFilter()`: Set level filter
- `setActiveTab()`: Switch tabs
- `selectCourse()`: Select course
- `clearError()`: Clear errors

---

## 🎯 **Usage**

### **Basic Setup**

```tsx
import { CourseProvider, CoursePage, useCourse } from './modules/Course';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CourseProvider>
          <CoursePage />
        </CourseProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
```

### **Using the Hook**

```tsx
import { useCourse } from './modules/Course';

function MyComponent() {
  const { enrolledCourses, isLoadingCourses, fetchEnrolledCourses } = useCourse();
  
  useEffect(() => {
    fetchEnrolledCourses();
  }, [fetchEnrolledCourses]);
  
  if (isLoadingCourses) return <div>Loading...</div>;
  
  return (
    <div>
      {enrolledCourses.map(course => (
        <div key={course.id}>{course.title}</div>
      ))}
    </div>
  );
}
```

---

## 📊 **Features**

### **Implemented**
✅ Complete type system
✅ Context-based state management
✅ CoursePage UI layout
✅ Feature card grid (2x2)
✅ Top navigation bar
✅ Secondary navigation
✅ Professional design
✅ Accessibility (aria-labels)
✅ Loading states
✅ Error handling

### **Pending Backend Integration**
⏳ API endpoints
⏳ Real data fetching
⏳ Authentication integration
⏳ Progress tracking
⏳ Enrollment flows

---

## 🎨 **Design System Integration**

The Course module fully integrates with Delta Labs' design system:

- **Colors**: Primary, Secondary, Text, Surface
- **Typography**: Poppins, Nunito Sans
- **Spacing**: Consistent spacing scale
- **Border Radius**: Rounded cards and buttons
- **Shadows**: Elevation system
- **Hover States**: Smooth transitions
- **Loading States**: Spinner animations

---

## 🔄 **Current Integration**

The Course module is now integrated into `App.tsx` with a toggle between:
- **Course Module**: Full Course page
- **Demo View**: Auth testing interface

Toggle button is available in bottom-right corner.

---

## 🚀 **Next Steps**

1. **Backend API Integration**: Connect to real API endpoints
2. **Course Details Page**: Implement detailed course view
3. **Enrollment Flow**: Complete enrollment process
4. **Wishlist Management**: Full CRUD operations
5. **Progress Tracking**: Track course completion
6. **Search & Filter**: Implement search functionality
7. **Instructor Pages**: Add instructor profiles
8. **Reviews System**: Course reviews and ratings

---

## 💡 **Best Practices**

### **State Management**
- Use `useCourse()` hook for state access
- Dispatch actions via context methods
- Handle loading states properly
- Clear errors when appropriate

### **Component Design**
- Follow established card patterns
- Use theme design tokens
- Implement proper accessibility
- Add loading and error states

### **Type Safety**
- Always use TypeScript types
- Validate data structures
- Handle nullable values
- Type API responses

---

## 📞 **Support**

For questions or issues with the Course module:
1. Check this README
2. Review component examples
3. Refer to type definitions
4. Contact Delta Labs team

---

**Built with ❤️ by the Delta Labs Team**

