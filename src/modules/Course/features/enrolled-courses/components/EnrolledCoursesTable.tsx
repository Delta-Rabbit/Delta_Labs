/**
 * Delta Labs Enrolled Courses Table Component
 * Table view for enrolled courses using theme tokens and components
 */

import React from 'react';
import { DeltaButton, DeltaBadge, DeltaCheckbox } from '../../../../../components/theme';

interface Course {
  id: number;
  name: string;
  school: string;
  progress: string;
  rating: number;
  status: 'enrolled' | 'Unroll';
}

interface EnrolledCoursesTableProps {
  courses: Course[];
  onGoToCourse?: (courseId: number) => void;
  onMoreOptions?: (courseId: number) => void;
  onSelectAll?: (selected: boolean) => void;
  onSelectCourse?: (courseId: number, selected: boolean) => void;
  selectedCourses?: number[];
}

const EnrolledCoursesTable: React.FC<EnrolledCoursesTableProps> = ({
  courses,
  onGoToCourse,
  onMoreOptions,
  onSelectAll,
  onSelectCourse,
  selectedCourses = [],
}) => {
  const allSelected = courses.length > 0 && selectedCourses.length === courses.length;
  const someSelected = selectedCourses.length > 0 && selectedCourses.length < courses.length;

  const handleSelectAll = (checked: boolean) => {
    onSelectAll?.(checked);
  };

  const handleSelectCourse = (courseId: number, checked: boolean) => {
    onSelectCourse?.(courseId, checked);
  };

  return (
    <div className="bg-surface-primary rounded-lg border border-border-primary overflow-hidden font-primary">
      <table className="w-full">
        {/* Table Header */}
        <thead className="bg-surface-secondary border-b border-border-primary">
          <tr>
            <th className="px-6 py-3 text-left">
              <DeltaCheckbox
                checked={allSelected}
                indeterminate={someSelected}
                onChange={(e) => handleSelectAll(e.target.checked)}
                aria-label="Select all courses"
                title="Select all courses"
                size="md"
              />
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider font-primary">
              <div className="flex items-center space-x-1">
                <span>Course Name</span>
                <svg className="w-4 h-4 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider font-primary">
              <div className="flex items-center space-x-1">
                <span>School Name</span>
                <svg className="w-4 h-4 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider font-primary">
              <div className="flex items-center space-x-1">
                <span>Lesson Progress</span>
                <svg className="w-4 h-4 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider font-primary">
              <div className="flex items-center space-x-1">
                <span>Course Rating</span>
                <svg className="w-4 h-4 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider font-primary">
              <div className="flex items-center space-x-1">
                <span>Enrollment Status</span>
                <svg className="w-4 h-4 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </th>
            <th className="px-6 py-3 text-right"></th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-border-primary">
          {courses.map((course) => {
            const isSelected = selectedCourses.includes(course.id);
            return (
              <tr
                key={course.id}
                className="hover:bg-surface-secondary transition-colors transition-normal ease-ease"
              >
                <td className="px-6 py-4">
                  <DeltaCheckbox
                    checked={isSelected}
                    onChange={(e) => handleSelectCourse(course.id, e.target.checked)}
                    aria-label={`Select ${course.name}`}
                    title={`Select ${course.name}`}
                    size="md"
                  />
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-text-primary font-primary">
                    {course.name}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-text-secondary font-primary">
                    {course.school}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-text-secondary font-primary">
                    {course.progress}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-1">
                    <span className="text-warning-400">★</span>
                    <span className="text-sm text-text-secondary font-primary">
                      ({course.rating} Reviews)
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <DeltaBadge
                    variant={course.status === 'enrolled' ? 'success' : 'default'}
                    size="sm"
                    className={course.status === 'enrolled' ? 'bg-success-50 text-success-700' : ''}
                  >
                    <span className="flex items-center space-x-1 font-primary">
                      <span className="w-2 h-2 rounded-full bg-current"></span>
                      <span>{course.status}</span>
                    </span>
                  </DeltaBadge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end space-x-2">
                    <DeltaButton
                      variant="primary"
                      size="sm"
                      onClick={() => onGoToCourse?.(course.id)}
                      className="font-primary"
                    >
                      Go to course
                    </DeltaButton>
                    <DeltaButton
                      variant="ghost"
                      size="sm"
                      onClick={() => onMoreOptions?.(course.id)}
                      className="p-1 min-w-0"
                      aria-label="More options"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                      </svg>
                    </DeltaButton>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EnrolledCoursesTable;
