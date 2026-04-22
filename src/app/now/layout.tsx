import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Now',
  description: 'What Akhil is doing now: competitions, projects, and school.'
};

export default function NowLayout({ children }: { children: ReactNode }) {
  return children;
}
