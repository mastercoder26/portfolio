'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpenIndex(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = (index: number) => {
    // If clicking the currently open dropdown, close it. Otherwise, open the new one.
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div ref={containerRef} className="flex flex-wrap gap-3">
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
