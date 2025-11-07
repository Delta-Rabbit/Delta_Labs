/**
 * Delta Labs Cart Page
 * Display and manage cart courses using theme tokens
 */

import React, { useState } from 'react';
import { useCourseNavigation } from '../../routing/hooks/useCourseNavigation';
import SearchBar from '../../../../components/SearchBar';
import { DeltaCheckbox } from '../../../../components/theme';
import { Breadcrumbs } from '../../components/common';
import CartCourseCard from './components/CartCourseCard';
import CartSummaryCard from './components/CartSummaryCard';
import { TrackingAidsCard } from '../../components/common';

const CartPage: React.FC = () => {
  const { navigate } = useCourseNavigation();
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
      aidStatus: 'approved' as const,
    },
    {
      id: 'cart-4',
      title: 'Chemistry',
      provider: 'Haramaya University',
      rating: 4.0,
      description: 'Course Introduction',
      price: 135,
      aidStatus: 'rejected' as const,
    },
  ];

  // Sample tracking aids data
  const trackingAids = [
    { courseName: 'English', status: 'approved' as const },
    { courseName: 'Physics', status: 'waiting' as const },
    { courseName: 'Biology', status: 'rejected' as const },
    { courseName: 'English', status: 'approved' as const },
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

  const breadcrumbItems = [
    {
      label: 'Course',
      onClick: () => navigate('/dashboard'),
    },
    {
      label: 'Wishlist',
      onClick: () => navigate('/wishlist'),
    },
    {
      label: 'Cart',
      isActive: true,
    },
  ];

  return (
    <div className="space-y-8 -mt-8 pt-16 font-primary">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

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
            <div className="mb-2">
              <DeltaCheckbox
                id="select-all-cart"
                label="Select all"
                checked={selectAll}
                onChange={handleSelectAll}
                aria-label="Select all courses"
                size="md"
              />
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
                  onNavigateToSponsor={() => navigate('/sponsor')}
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
            {/* Cart Summary */}
            <CartSummaryCard
              totalItems={totalItems}
              totalTime={totalTime}
              totalBudget={totalBudget}
              onGoToPayment={() => {
                console.log('Go to payment');
              }}
            />

            {/* Tracking Applied Aids */}
            <TrackingAidsCard aids={trackingAids} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
