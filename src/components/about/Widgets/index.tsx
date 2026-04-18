'use client';

import React from 'react';

import MusicWidget from './MusicWidget';
import PhotosWidget from './PhotosWidget';

/**
 * Widgets section inspired by Marco.fyi about page
 * Displays Music and Photos widgets in a grid
 */
export default function Widgets() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
      <MusicWidget />
      <PhotosWidget />
    </div>
  );
}
