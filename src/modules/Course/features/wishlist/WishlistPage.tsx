/**
 * Delta Labs Wishlist Page
 * Display and manage wishlist courses
 */

import React, { useState } from 'react';
import { useCourseNavigation } from '../../routing/hooks/useCourseNavigation';
import SearchBar from '../../../../components/SearchBar';
import WishlistCourseCard from './components/WishlistCourseCard';

const WishlistPage: React.FC = () => {
  const { navigate } = useCourseNavigation();
  const [selectedCourses, setSelectedCourses] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

  // Sample wishlist courses data
  const wishlistCourses = [
    {
      id: 'wishlist-1',
      title: 'Chemistry',
      provider: 'Haramaya University',
      rating: 4.0,
      description: 'Course Introduction',
      price: 0,
      aidStatus: null,
    },
    {
      id: 'wishlist-2',
      title: 'Chemistry',
      provider: 'Haramaya University',
      rating: 4.0,
      description: 'Course Introduction',
      price: 1000,
      aidStatus: null,
    },
    {
      id: 'wishlist-3',
      title: 'Chemistry',
      provider: 'Haramaya University',
      rating: 4.0,
      description: 'Course Introduction',
      price: 100,
      aidStatus: 'approved',
    },
    {
      id: 'wishlist-4',
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
      setSelectedCourses(new Set(wishlistCourses.map(course => course.id)));
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
    setSelectAll(newSelected.size === wishlistCourses.length);
  };

  const totalItems = wishlistCourses.length;
  const totalTime = 20; // days
  const totalBudget = wishlistCourses.reduce((sum, course) => sum + course.price, 0);

  return (
    <div className="space-y-8 -mt-8 pt-16">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
        <button
          onClick={() => navigate('/dashboard')}
          className="hover:text-gray-900 transition-colors font-medium"
        >
          Course
        </button>
        <span>/</span>
        <span className="text-gray-900 font-medium">Wishlist</span>
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
                id="select-all"
                checked={selectAll}
                onChange={handleSelectAll}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                aria-label="Select all courses"
              />
              <label htmlFor="select-all" className="text-sm font-medium text-gray-700 cursor-pointer">
                Select all
              </label>
            </div>

            {/* Course Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {wishlistCourses.map((course) => (
                <WishlistCourseCard
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
                    console.log('Remove course:', courseId);
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
                  onNavigateToSponsor={() => navigate('/sponsor')}
                  onAddToCart={(courseId) => {
                    console.log('Add to cart:', courseId);
                  }}
                  onEnroll={(courseId) => {
                    console.log('Enroll:', courseId);
                  }}
                  onAskForAid={(courseId) => {
                    navigate('/financial-aid');
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
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>View planner</span>
                </button>
              <button 
                onClick={() => navigate('/cart')}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-gray-300 hover:border-primary-500 hover:bg-primary-50 text-gray-700 font-semibold rounded-lg transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Your cart</span>
              </button>
              </div>
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

export default WishlistPage;
