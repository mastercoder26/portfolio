'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import RoundedButton from '@/components/animations/roundedButton';

interface CourseDropdownProps {
  title: string;
  courses: string[];
  isOpen: boolean;
  onToggle: () => void;
}

export default function CourseDropdown({
  title,
  courses,
  isOpen,
  onToggle
}: CourseDropdownProps) {
  return (
    <div className="relative z-10 inline-block">
      <div onClick={onToggle} className="cursor-pointer">
        <RoundedButton>
          <div className="flex items-center gap-2">
            <span>{title}</span>
            <svg
              className={`h-4 w-4 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </RoundedButton>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto absolute left-0 top-full z-50 mt-3 w-72 overflow-hidden rounded-2xl border border-foreground/10 bg-background shadow-xl"
          >
            <ul
              className="max-h-48 overflow-y-auto py-2"
              data-lenis-prevent
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              {courses.map((course, idx) => (
                <li
                  key={idx}
                  className="px-4 py-2.5 text-sm text-foreground/80 transition-colors hover:bg-foreground/5"
                >
                  {course}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
