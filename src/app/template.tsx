'use client';
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform
} from 'framer-motion';
import ContactInfo from '@/components/home/ContactInfo';
import { isMobile } from '@/components/util';
import { clsx } from 'clsx';
import { usePathname } from 'next/navigation';
import PreLoader from '@/components/animations/preLoader';

export default function RootTemplate({ children }: PropsWithChildren) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start']
  });

  const input = isMobile() ? 0.9 : 1.2;
  const height = useTransform(scrollYProgress, [0, input], [50, 0]);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname().split('/').pop();

  const bgColour = 'bg-background';

  useEffect(() => {
    const id = window.setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = 'default';
      // Do not call scrollTo here: users who scroll before the preloader finishes
      // would be snapped back to the top when this timeout fires (~800ms).
    }, 800);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden">
      <AnimatePresence mode="wait">
        {isLoading && <PreLoader />}
      </AnimatePresence>
      <div ref={container} className={clsx('relative z-10', bgColour)}>
        {children}
        {pathname !== 'contact' && (
          <motion.div style={{ height }} className="relative">
            <div
              className={clsx(
                'absolute left-[-10%] z-10 h-[1050%] w-[120%] rounded-b-[100%] shadow-[0_60px_50px_0px_rgba(0,0,0,0.748)]',
                bgColour
              )}
            ></div>
          </motion.div>
        )}
      </div>
      {pathname !== 'contact' && <ContactInfo />}
    </main>
  );
}
