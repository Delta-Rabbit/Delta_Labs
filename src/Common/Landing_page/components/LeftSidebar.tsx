'use client';

import React from 'react';

const features = [
  'Course',
  'Planner',
  'Certification',
  'Chatroom',
  'Tutorials',
  'Post',
  'R & D',
  'Online Competition',
  'Specialization',
  'Digital Library',
  'Course Support',
  'Rent a Lab',
  'Help and Support',
  'Course',
  'Planner',
  'Certification',
  'Chatroom',
  'Tutorials',
  'Post',
  'R & D',
  'Online Competition',
  'Specialization',
  'Digital Library',
  'Course Support',
  'Rent a Lab',
  'Help and Support',
];

export default function LeftSidebar() {
  return (
    <aside
      className="
        w-80
        bg-[#F9F9F9] 
        p-4 
        h-screen 
        overflow-y-auto 
        scrollbar-thin 
        scrollbar-thumb-[#174A5F] 
        scrollbar-track-[#E5E5E5]
      "
    >
      <h2
        className="mb-4"
        style={{
          color: '#174A5F',
          fontFamily: 'Poppins',
          fontWeight: 500,
          fontSize: '16px',
        }}
      >
        Platform Features
      </h2>
      <div className="flex flex-wrap gap-2">
        {features.map((feature, index) => (
          <button
            key={`${feature}-${index}`} 
            className="
              border 
              border-[#174A5F] 
              text-[#174A5F] 
              bg-white 
              rounded-[30px] 
              px-5 
              py-2 
              text-sm
              transition 
              hover:bg-[#174A5F] 
              hover:text-white
            "
            style={{ fontFamily: 'Poppins', fontWeight: 500 }}
          >
            {feature}
          </button>
        ))}
      </div>
    </aside>
  );
}
