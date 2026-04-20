import React from 'react';

/**
 * Keep route-level loading lightweight.
 *
 * Page transitions are already handled by `app/template.tsx`.
 * A second full-screen preloader here caused a black flash and, due to a
 * timer/scroll reset, could yank users back to the top while they were
 * already scrolling on the destination page.
 */
export default function Loading() {
  return null;
}
