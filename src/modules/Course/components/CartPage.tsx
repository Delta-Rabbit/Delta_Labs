/**
 * Delta Labs Cart Page
 * Display and manage cart courses
 */

import React, { useState } from 'react';
import { useCourseView } from '../context/CourseViewContext';
import SearchBar from '../../../components/SearchBar';
import CartCourseCard from './CartCourseCard';

const CartPage: React.FC = () => {
  const { setCurrentView } = useCourseView();
  const [selectedCourses, setSelectedCourses] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

  // Sample cart courses data
  const cartCourses = [
    {
      id: 'cart-1',
      title: 'Chemistry',
      provider: 'Haramaya University',
      rating: 4.0,
      description: 'Course Introduction',
      price: 0,
      aidStatus: null,
    },
    {
      id: 'cart-2',
      title: 'Chemistry',
      provider: 'Haramaya University',
      rating: 4.0,
      description: 'Course Introduction',
      price: 1000,
      aidStatus: null,
    },
    {
      id: 'cart-3',
      title: 'Chemistry',
      provider: 'Haramaya University',
      rating: 4.0,
      description: 'Course Introduction',
      price: 100,
      aidStatus: 'approved',
    },
    {
      id: 'cart-4',
      title: 'Chemistry',
      provider: 'Haramaya University',
      rating: 4.0,
      description: 'Course Introduction',
      price: 135,
      aidStatus: 'rejected',
    },
  ];

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedCourses(new Set());
    } else {
      setSelectedCourses(new Set(cartCourses.map(course => course.id)));
    }
    setSelectAll(!selectAll);
  };

  const handleCourseSelect = (courseId: string) => {
    const newSelected = new Set(selectedCourses);
    if (newSelected.has(courseId)) {
      newSelected.delete(courseId);
    } else {
      newSelected.add(courseId);
    }
    setSelectedCourses(newSelected);
    setSelectAll(newSelected.size === cartCourses.length);
  };

  const totalItems = cartCourses.length;
  const totalTime = 20; // days
  const totalBudget = cartCourses.reduce((sum, course) => sum + course.price, 0);

  return (
    <div className="space-y-8 -mt-8 pt-16">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
        <button
          onClick={() => setCurrentView('main')}
          className="hover:text-gray-900 transition-colors font-medium"
        >
          Course
        </button>
        <span>/</span>
        <button
          onClick={() => setCurrentView('wishlist')}
          className="hover:text-gray-900 transition-colors font-medium"
        >
          Wishlist
        </button>
        <span>/</span>
        <span className="text-gray-900 font-medium">Cart</span>
      </div>

      {/* Main Layout - Two Column with Better Spacing */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Main Content - Left Side */}
        <div className="flex-1 min-w-0">
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="w-full max-w-3xl mx-auto lg:mx-0">
              <SearchBar maxWidth="full" />
            </div>

            {/* Select All Checkbox */}
            <div className="flex items-center space-x-2 mb-2">
              <input
                type="checkbox"
                id="select-all-cart"
                checked={selectAll}
                onChange={handleSelectAll}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                aria-label="Select all courses"
              />
              <label htmlFor="select-all-cart" className="text-sm font-medium text-gray-700 cursor-pointer">
                Select all
              </label>
            </div>

            {/* Course Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cartCourses.map((course) => (
                <CartCourseCard
                  key={course.id}
                  course={{
                    id: course.id,
                    title: course.title,
                    description: course.description,
                    thumbnail: '',
                    price: course.price,
                    rating: course.rating,
                    level: 'intermediate',
                    category: 'science',
                    studentsEnrolled: 0,
                    lessons: 0,
                    duration: 0,
                    instructor: { firstName: course.provider, lastName: '', avatar: '', bio: '' },
                    tags: [],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                  }}
                  provider={course.provider}
                  aidStatus={course.aidStatus}
                  isSelected={selectedCourses.has(course.id)}
                  onSelect={() => handleCourseSelect(course.id)}
                  onRemove={(courseId) => {
                    console.log('Remove from cart:', courseId);
                  }}
                  onTryCourse={(courseId) => {
                    console.log('Try course:', courseId);
                  }}
                  onViewResources={(courseId) => {
                    console.log('View resources:', courseId);
                  }}
                  onSourceSponsor={(courseId) => {
                    console.log('Source sponsor:', courseId);
                  }}
                  onNavigateToSponsor={() => setCurrentView('sponsor')}
                  onEnroll={(courseId) => {
                    console.log('Enroll:', courseId);
                  }}
                  onAskForAid={(courseId) => {
                    setCurrentView('financialAid');
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Sticky and Responsive */}
        <div className="w-full lg:w-96 xl:w-[420px] flex-shrink-0">
          <div className="sticky top-24 space-y-6">
            {/* Summarized Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Summarized info</h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-600">Total items:</span>
                  <span className="text-base font-bold text-gray-900">{totalItems}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-600">Total time required:</span>
                  <span className="text-base font-bold text-gray-900">{totalTime} days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Total budget required:</span>
                  <span className="text-base font-bold text-gray-900">{totalBudget} Br</span>
                </div>
              </div>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span>Go to Payment</span>
              </button>
            </div>

            {/* Tracking Applied Aids */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Tracking applied aids</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium text-gray-700">English</span>
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-green-100 text-green-800">Approved</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium text-gray-700">Physics</span>
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-yellow-100 text-yellow-800">Waiting</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium text-gray-700">Biology</span>
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-red-100 text-red-800">Rejected</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium text-gray-700">English</span>
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-green-100 text-green-800">Approved</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

