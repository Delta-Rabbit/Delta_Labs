/**
 * Delta Labs Enrolled Courses List View
 * Table-based list view for enrolled courses
 */

import React from 'react';

interface EnrolledCoursesListViewProps {
  courses?: any[];
}

const EnrolledCoursesListView: React.FC<EnrolledCoursesListViewProps> = ({ courses = [] }) => {
  // Sample data
  const sampleCourses = [
    { id: 1, name: 'Graphic design', school: 'Haromaya University', progress: '40 of 64 Lessons', rating: 4.8, status: 'enrolled' },
    { id: 2, name: 'Graphic design', school: 'Haromaya University', progress: '40 of 64 Lessons', rating: 4.8, status: 'enrolled' },
    { id: 3, name: 'Graphic design', school: 'Haromaya University', progress: '40 of 64 Lessons', rating: 4.8, status: 'Unroll' },
    { id: 4, name: 'Graphic design', school: 'Haromaya University', progress: '40 of 64 Lessons', rating: 4.8, status: 'enrolled' },
    { id: 5, name: 'Graphic design', school: 'Haromaya University', progress: '40 of 64 Lessons', rating: 4.8, status: 'Unroll' },
    { id: 6, name: 'Graphic design', school: 'Haromaya University', progress: '40 of 64 Lessons', rating: 4.8, status: 'enrolled' },
    { id: 7, name: 'Algorithm Design', school: 'Haromaya University', progress: '40 of 64 Lessons', rating: 4.8, status: 'enrolled' },
    { id: 8, name: 'Algorithm Design', school: 'Haromaya University', progress: '40 of 64 Lessons', rating: 4.8, status: 'Unroll' },
    { id: 9, name: 'Algorithm Design', school: 'Haromaya University', progress: '40 of 64 Lessons', rating: 4.8, status: 'enrolled' },
  ];

  return (
    <div className="space-y-6">
      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          {/* Table Header */}
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left">
                <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                <div className="flex items-center space-x-1">
                  <span>Course Name</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                <div className="flex items-center space-x-1">
                  <span>School Name</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                <div className="flex items-center space-x-1">
                  <span>Lesson Progress</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                <div className="flex items-center space-x-1">
                  <span>Course Rating</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                <div className="flex items-center space-x-1">
                  <span>Enrollment Status</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </th>
              <th className="px-6 py-3 text-right"></th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-200">
            {sampleCourses.map((course) => (
              <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" checked={course.status === 'enrolled'} />
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gray-900">{course.name}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">{course.school}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">{course.progress}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm text-gray-600">({course.rating} Reviews)</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center text-sm ${course.status === 'enrolled' ? 'text-green-600' : 'text-gray-600'}`}>
                    <span className="w-2 h-2 rounded-full bg-current mr-2"></span>
                    {course.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end space-x-2">
                    <button className="px-4 py-1.5 bg-primary-600 text-white text-sm font-medium rounded hover:bg-primary-700 transition-colors">
                      Go to course
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnrolledCoursesListView;

