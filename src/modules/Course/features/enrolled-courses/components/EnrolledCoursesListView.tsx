/**
 * Delta Labs Enrolled Courses List View
 * Table-based list view for enrolled courses using theme tokens
 */

import React from 'react';
import EnrolledCoursesTable from './EnrolledCoursesTable';

interface EnrolledCoursesListViewProps {
  courses?: any[];
  onGoToCourse?: (courseId: string, courseTitle?: string) => void;
}

const EnrolledCoursesListView: React.FC<EnrolledCoursesListViewProps> = ({ courses = [], onGoToCourse }) => {
  const [selectedCourses, setSelectedCourses] = React.useState<number[]>([]);

  // Sample data
  const sampleCourses = [
    { id: 1, name: 'Physics', school: 'Haromaya University', progress: '40 of 64 Lessons', rating: 4.8, status: 'enrolled' as const },
    { id: 2, name: 'Graphic design', school: 'Haromaya University', progress: '40 of 64 Lessons', rating: 4.8, status: 'enrolled' as const },
    { id: 3, name: 'Graphic design', school: 'Haromaya University', progress: '40 of 64 Lessons', rating: 4.8, status: 'Unroll' as const },
    { id: 4, name: 'Graphic design', school: 'Haromaya University', progress: '40 of 64 Lessons', rating: 4.8, status: 'enrolled' as const },
    { id: 5, name: 'Graphic design', school: 'Haromaya University', progress: '40 of 64 Lessons', rating: 4.8, status: 'Unroll' as const },
    { id: 6, name: 'Graphic design', school: 'Haromaya University', progress: '40 of 64 Lessons', rating: 4.8, status: 'enrolled' as const },
    { id: 7, name: 'Algorithm Design', school: 'Haromaya University', progress: '40 of 64 Lessons', rating: 4.8, status: 'enrolled' as const },
    { id: 8, name: 'Algorithm Design', school: 'Haromaya University', progress: '40 of 64 Lessons', rating: 4.8, status: 'Unroll' as const },
    { id: 9, name: 'Algorithm Design', school: 'Haromaya University', progress: '40 of 64 Lessons', rating: 4.8, status: 'enrolled' as const },
  ];

  const handleGoToCourse = (courseId: number, courseName: string) => {
    if (onGoToCourse) {
      onGoToCourse(`course-${courseId}`, courseName);
    }
  };

  const handleMoreOptions = (courseId: number) => {
    // TODO: Show more options menu
    console.log('More options for course:', courseId);
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedCourses(sampleCourses.map(c => c.id));
    } else {
      setSelectedCourses([]);
    }
  };

  const handleSelectCourse = (courseId: number, selected: boolean) => {
    if (selected) {
      setSelectedCourses(prev => [...prev, courseId]);
    } else {
      setSelectedCourses(prev => prev.filter(id => id !== courseId));
    }
  };

  return (
    <div className="space-y-6 font-primary">
      <EnrolledCoursesTable
        courses={sampleCourses}
        onGoToCourse={handleGoToCourse}
        onMoreOptions={handleMoreOptions}
        onSelectAll={handleSelectAll}
        onSelectCourse={handleSelectCourse}
        selectedCourses={selectedCourses}
      />
    </div>
  );
};

export default EnrolledCoursesListView;
