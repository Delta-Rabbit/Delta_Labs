# Course Module - Professional Refactoring Plan

## 🎯 **Current Problems**

### **1. Navigation System**
- ❌ String-based view switching (`currentView === 'enrolled'`)
- ❌ Massive if/else chains in one file
- ❌ No route definitions or route configuration
- ❌ No nested routing for enrolled course features
- ❌ No route parameters (can't pass courseId)
- ❌ No route guards or protection
- ❌ Hard to add new routes (requires touching multiple files)

### **2. Component Organization**
- ❌ All 28+ components in one flat folder
- ❌ No feature-based grouping
- ❌ Hard to find related components
- ❌ No clear separation of concerns

### **3. Scalability Issues**
- ❌ Adding 30+ enrolled course screens will create chaos
- ❌ No way to handle nested navigation (9 features × multiple screens)
- ❌ State management scattered across multiple contexts
- ❌ No clear module boundaries

---

## ✅ **Proposed Solution: Feature-Based Architecture**

### **New Structure**

```
src/modules/Course/
├── features/                          # Feature-based organization
│   ├── dashboard/                     # Main dashboard
│   │   ├── components/
│   │   │   ├── FeatureCard.tsx
│   │   │   ├── FeatureCardGrid.tsx
│   │   │   └── DashboardHeader.tsx
│   │   ├── DashboardPage.tsx
│   │   └── index.ts
│   │
│   ├── enrolled-courses/               # Enrolled courses list
│   │   ├── components/
│   │   │   ├── EnrolledCourseCard.tsx
│   │   │   ├── EnrolledCoursesGrid.tsx
│   │   │   └── EnrolledCoursesList.tsx
│   │   ├── EnrolledCoursesPage.tsx
│   │   └── index.ts
│   │
│   ├── enrolled-course-detail/         # ⭐ ENROLLED COURSE SYSTEM (30+ screens)
│   │   ├── navigation/                 # Bottom navigation system
│   │   │   ├── EnrolledCourseNav.tsx
│   │   │   └── navConfig.ts
│   │   │
│   │   ├── course-intro/               # Feature 1: Course Intro
│   │   │   ├── components/
│   │   │   │   ├── CourseOverview.tsx
│   │   │   │   ├── LearningObjectives.tsx
│   │   │   │   ├── CourseStructure.tsx
│   │   │   │   └── Prerequisites.tsx
│   │   │   ├── CourseIntroPage.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── qa/                         # Feature 2: Q&A
│   │   │   ├── components/
│   │   │   │   ├── QuestionCard.tsx
│   │   │   │   ├── AnswerCard.tsx
│   │   │   │   ├── QuestionForm.tsx
│   │   │   │   ├── QASearch.tsx
│   │   │   │   └── QAFilter.tsx
│   │   │   ├── pages/
│   │   │   │   ├── QAListPage.tsx
│   │   │   │   ├── QuestionDetailPage.tsx
│   │   │   │   └── AskQuestionPage.tsx
│   │   │   ├── QAPage.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── exercises-tests/            # Feature 3: Exercise & Test
│   │   │   ├── components/
│   │   │   │   ├── ExerciseCard.tsx
│   │   │   │   ├── TestCard.tsx
│   │   │   │   ├── SubmissionForm.tsx
│   │   │   │   └── ResultsView.tsx
│   │   │   ├── pages/
│   │   │   │   ├── ExercisesListPage.tsx
│   │   │   │   ├── ExerciseDetailPage.tsx
│   │   │   │   ├── TestListPage.tsx
│   │   │   │   ├── TestDetailPage.tsx
│   │   │   │   └── TestResultsPage.tsx
│   │   │   ├── ExercisesTestsPage.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── fast-summary/               # Feature 4: Fast Summary
│   │   ├── score/                      # Feature 5: Score
│   │   ├── supplement/                 # Feature 6: Supplement
│   │   ├── resources/                  # Feature 7: Resources
│   │   ├── roadmap/                    # Feature 8: Roadmap
│   │   └── community/                  # Feature 9: Community
│   │
│   ├── super-course/                   # Super Course System
│   │   ├── components/
│   │   │   ├── SuperCourseCard.tsx
│   │   │   ├── CourseCombiner.tsx
│   │   │   ├── DocumentEditor.tsx
│   │   │   └── SuperCourseTabs.tsx
│   │   ├── pages/
│   │   │   ├── CreateSuperCoursePage.tsx
│   │   │   ├── PersonalSuperCoursesPage.tsx
│   │   │   ├── CommunitySuperCoursesPage.tsx
│   │   │   └── TemporarySuperCoursesPage.tsx
│   │   ├── SuperCoursePage.tsx
│   │   └── index.ts
│   │
│   ├── wishlist/                       # Wishlist
│   ├── cart/                           # Shopping Cart
│   ├── sponsor/                        # Sponsorship
│   ├── financial-aid/                  # Financial Aid
│   ├── offline-courses/                # Offline Courses
│   ├── unrolled-courses/                # Available Courses
│   └── recent-activity/                 # Recent Activity
│
├── routing/                            # ⭐ NEW: Routing System
│   ├── CourseRouter.tsx                # Main router component
│   ├── routes/                         # Route definitions
│   │   ├── courseRoutes.ts             # All course routes
│   │   ├── enrolledCourseRoutes.ts     # Enrolled course routes
│   │   └── routeTypes.ts               # Route type definitions
│   ├── hooks/
│   │   ├── useCourseNavigation.ts      # Navigation hook
│   │   └── useCourseRoute.ts           # Route access hook
│   ├── guards/
│   │   └── RouteGuard.tsx              # Route protection
│   └── index.ts
│
├── context/                            # State management
│   ├── CourseContext.tsx               # Main course context
│   ├── CourseViewContext.tsx           # ⚠️ DEPRECATED - Use routing
│   ├── EnrolledCourseContext.tsx       # ⭐ NEW: Enrolled course state
│   └── SuperCourseContext.tsx          # ⭐ NEW: Super course state
│
├── components/                         # Shared components
│   ├── layout/
│   │   ├── CourseLayout.tsx
│   │   ├── CourseNavigation.tsx
│   │   └── EnrolledCourseLayout.tsx    # ⭐ NEW: Layout for enrolled course
│   ├── common/
│   │   ├── CourseCard.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorBoundary.tsx
│   └── index.ts
│
├── types/                              # Type definitions
│   ├── course.ts
│   ├── enrollment.ts
│   ├── superCourse.ts
│   ├── routes.ts                       # ⭐ NEW: Route types
│   └── index.ts
│
├── utils/                              # Utilities
│   ├── navigation.ts                  # ⭐ NEW: Navigation helpers
│   ├── routeHelpers.ts                # ⭐ NEW: Route helpers
│   └── helpers.ts
│
└── index.ts                            # Module exports
```

---

## 🗺️ **Routing System Architecture**

### **1. Route Definition System**

```typescript
// routing/routes/courseRoutes.ts

export interface CourseRoute {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
  guards?: RouteGuard[];
  children?: CourseRoute[];
}

export const courseRoutes: CourseRoute[] = [
  {
    path: '/course',
    component: CourseLayout,
    children: [
      {
        path: '/dashboard',
        component: DashboardPage,
        exact: true,
      },
      {
        path: '/enrolled',
        component: EnrolledCoursesPage,
      },
      {
        path: '/enrolled/:courseId',           // ⭐ Nested routing
        component: EnrolledCourseDetailLayout,
        guards: [requireEnrollment],
        children: [
          {
            path: '/intro',
            component: CourseIntroPage,
          },
          {
            path: '/qa',
            component: QAPage,
            children: [
              { path: '/list', component: QAListPage },
              { path: '/:questionId', component: QuestionDetailPage },
              { path: '/ask', component: AskQuestionPage },
            ],
          },
          {
            path: '/exercises-tests',
            component: ExercisesTestsPage,
            children: [
              { path: '/exercises', component: ExercisesListPage },
              { path: '/exercises/:id', component: ExerciseDetailPage },
              { path: '/tests', component: TestListPage },
              { path: '/tests/:id', component: TestDetailPage },
            ],
          },
          // ... 6 more features
        ],
      },
      {
        path: '/super-course',
        component: SuperCoursePage,
        children: [
          { path: '/create', component: CreateSuperCoursePage },
          { path: '/personal', component: PersonalSuperCoursesPage },
          { path: '/community', component: CommunitySuperCoursesPage },
          { path: '/temporary', component: TemporarySuperCoursesPage },
        ],
      },
      // ... other routes
    ],
  },
];
```

### **2. Router Component**

```typescript
// routing/CourseRouter.tsx

export const CourseRouter: React.FC = () => {
  const { currentRoute, navigate } = useCourseNavigation();
  
  return (
    <Routes>
      {courseRoutes.map(route => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <RouteGuard guards={route.guards}>
              <route.component />
            </RouteGuard>
          }
        >
          {route.children?.map(childRoute => (
            <Route
              key={childRoute.path}
              path={childRoute.path}
              element={<childRoute.component />}
            />
          ))}
        </Route>
      ))}
    </Routes>
  );
};
```

### **3. Navigation Hook**

```typescript
// routing/hooks/useCourseNavigation.ts

export const useCourseNavigation = () => {
  const navigate = useCallback((route: string, params?: Record<string, string>) => {
    // Navigate to route with params
    // Example: navigate('/enrolled/course-123/intro')
    // Example: navigate('/enrolled/:courseId/intro', { courseId: 'course-123' })
  }, []);

  const goBack = useCallback(() => {
    // Navigate back
  }, []);

  return { navigate, goBack, currentRoute };
};
```

### **4. Route Guards**

```typescript
// routing/guards/RouteGuard.tsx

interface RouteGuardProps {
  guards?: RouteGuardFunction[];
  children: React.ReactNode;
}

export const RouteGuard: React.FC<RouteGuardProps> = ({ guards, children }) => {
  // Check if user has access
  // Redirect if not authorized
  // Show loading state while checking
};
```

---

## 📁 **Component Organization Benefits**

### **Before (Current)**
```
components/
  - EnrolledCoursesPage.tsx
  - SuperCoursePage.tsx
  - CourseCombiner.tsx
  - ... 25 more files in one folder
```

### **After (Refactored)**
```
features/
  ├── enrolled-course-detail/
  │   ├── qa/
  │   │   ├── components/      # Only QA-related components
  │   │   ├── pages/          # Only QA pages
  │   │   └── QAPage.tsx
  │   └── exercises-tests/
  │       ├── components/      # Only exercise components
  │       ├── pages/          # Only exercise pages
  │       └── ExercisesTestsPage.tsx
```

**Benefits:**
- ✅ Easy to find related components
- ✅ Clear feature boundaries
- ✅ Easy to add new features
- ✅ Better code organization
- ✅ Easier to test
- ✅ Better for team collaboration

---

## 🔄 **Migration Strategy**

### **Phase 1: Setup Routing System** (Week 1)
1. Create routing folder structure
2. Implement route definitions
3. Create CourseRouter component
4. Implement navigation hooks
5. Add route guards

### **Phase 2: Reorganize Components** (Week 2)
1. Create feature-based folders
2. Move components to features
3. Update imports
4. Group related components

### **Phase 3: Migrate Pages** (Week 3)
1. Migrate existing pages to routing system
2. Update navigation calls
3. Remove old view context system
4. Test all navigation

### **Phase 4: Enrolled Course System** (Week 4+)
1. Create enrolled-course-detail feature
2. Implement navigation system
3. Build 9 feature modules
4. Implement 30+ screens

---

## 🎯 **Key Improvements**

### **1. Scalable Navigation**
- ✅ Route-based instead of string-based
- ✅ Nested routes for enrolled courses
- ✅ Route parameters (courseId, questionId, etc.)
- ✅ Easy to add new routes

### **2. Better Organization**
- ✅ Feature-based folder structure
- ✅ Clear separation of concerns
- ✅ Easy to find components
- ✅ Better for large teams

### **3. Professional Architecture**
- ✅ Route guards for protection
- ✅ Route definitions in one place
- ✅ Type-safe routing
- ✅ Navigation hooks

### **4. Future-Proof**
- ✅ Can handle 30+ screens easily
- ✅ Can add new features without breaking existing code
- ✅ Can implement nested navigation
- ✅ Can add route protection

---

## 📊 **Comparison**

| Aspect | Current | Refactored |
|--------|---------|------------|
| **Navigation** | String-based | Route-based |
| **Organization** | Flat folder | Feature-based |
| **Scalability** | ❌ Poor | ✅ Excellent |
| **Route Params** | ❌ No | ✅ Yes |
| **Nested Routes** | ❌ No | ✅ Yes |
| **Route Guards** | ❌ No | ✅ Yes |
| **Type Safety** | ⚠️ Partial | ✅ Full |
| **Maintainability** | ⚠️ Difficult | ✅ Easy |

---

## 🚀 **Next Steps**

1. **Review this plan** - Does this structure make sense?
2. **Start Phase 1** - Implement routing system
3. **Migrate gradually** - Move components one feature at a time
4. **Build enrolled course** - Use new structure for 30+ screens

**Should I start implementing this refactoring?** 🎯

