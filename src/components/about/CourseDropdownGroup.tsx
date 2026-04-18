'use client';

import React, { useState } from 'react';
import CourseDropdown from './CourseDropdown';

interface CourseData {
  title: string;
  courses: string[];
}

interface CourseDropdownGroupProps {
  courseGroups: CourseData[];
}

export default function CourseDropdownGroup({
  courseGroups
}: CourseDropdownGroupProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    // If clicking the currently open dropdown, close it. Otherwise, open the new one.
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-wrap gap-3">
      {courseGroups.map((group, index) => (
        <CourseDropdown
          key={index}
          title={group.title}
          courses={group.courses}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
}
