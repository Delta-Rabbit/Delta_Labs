/**
 * Delta Labs Course Module Button
 * Opens and activates the Course module when clicked
 */

import React from 'react';
import { useTab } from '../contexts/TabContext';

interface CourseModuleButtonProps {
  onClick: () => void;
}

export function CourseModuleButton({ onClick }: CourseModuleButtonProps) {
  const { openTab, switchTab, hasTab, getAllTabs } = useTab();

  const handleClick = () => {
    const courseTabId = 'course';
    
    // If Course tab already exists, just switch to it
    if (hasTab(courseTabId)) {
      switchTab(courseTabId);
    } else {
      // If Course tab doesn't exist, open it
      // The CourseModuleContent will also open it via useEffect, but that's fine
      openTab({
        id: courseTabId,
        label: 'Course',
        module: 'course',
      });
    }
    
    // Call the parent onClick handler to switch views
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className="px-6 py-3 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors"
    >
      Course Module
    </button>
  );
}

export default CourseModuleButton;

