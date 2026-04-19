'use client';

import { CSSProperties, ReactNode, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type AnimationName =
  | 'fade-up'
  | 'fade-left'
  | 'fade-right'
  | 'scale'
  | 'parallax'
  | 'clip-reveal'
  | 'blur-in';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: AnimationName;
  delay?: number;
  duration?: number;
  stagger?: number;
}

/**
 * Initial styles applied inline so SSR/first paint never shows the visible
 * state. GSAP then animates from these values to the visible target. This
 * eliminates the flicker where content briefly painted visible before the
 * useEffect-driven `gsap.set(opacity: 0)` ran.
 */
const initialStyles: Record<AnimationName, CSSProperties> = {
  'fade-up': { opacity: 0, transform: 'translate3d(0, 60px, 0)' },
  'fade-left': { opacity: 0, transform: 'translate3d(-60px, 0, 0)' },
  'fade-right': { opacity: 0, transform: 'translate3d(60px, 0, 0)' },
  scale: { opacity: 0, transform: 'scale(0.92)' },
  parallax: { opacity: 0, transform: 'translate3d(0, 80px, 0)' },
  'clip-reveal': {
    opacity: 0,
    transform: 'translate3d(0, 20px, 0)',
    clipPath: 'inset(100% 0 0 0)'
  },
  'blur-in': {
    opacity: 0,
    transform: 'translate3d(0, 30px, 0)',
    filter: 'blur(10px)'
  }
};

const fromVars: Record<AnimationName, gsap.TweenVars> = {
  'fade-up': { y: 60, opacity: 0 },
  'fade-left': { x: -60, opacity: 0 },
  'fade-right': { x: 60, opacity: 0 },
  scale: { scale: 0.92, opacity: 0 },
  parallax: { y: 80, opacity: 0 },
  'clip-reveal': {
    clipPath: 'inset(100% 0 0 0)',
    opacity: 0,
    y: 20
  },
  'blur-in': {
    filter: 'blur(10px)',
    opacity: 0,
    y: 30
  }
};

const toVars: Record<AnimationName, gsap.TweenVars> = {
  'fade-up': { y: 0, opacity: 1 },
  'fade-left': { x: 0, opacity: 1 },
  'fade-right': { x: 0, opacity: 1 },
  scale: { scale: 1, opacity: 1 },
  parallax: { y: 0, opacity: 1 },
  'clip-reveal': {
    clipPath: 'inset(0% 0 0 0)',
    opacity: 1,
    y: 0
  },
  'blur-in': {
    filter: 'blur(0px)',
    opacity: 1,
    y: 0
  }
};

export default function AnimatedSection({
  children,
  className = '',
  animation = 'fade-up',
  delay = 0,
  duration = 1.2,
  stagger = 0
}: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = sectionRef.current;
      if (!el) return;

      gsap.fromTo(el, fromVars[animation], {
        ...toVars[animation],
        duration,
        delay,
        ease: 'power4.out',
        stagger: stagger > 0 ? { each: stagger } : undefined,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          end: 'top 20%',
          toggleActions: 'play none none reverse'
        }
      });
    },
    { scope: sectionRef, dependencies: [animation, delay, duration, stagger] }
  );

  return (
    <div
      ref={sectionRef}
      className={className}
      style={{ willChange: 'transform, opacity', ...initialStyles[animation] }}
    >
      {children}
    </div>
  );
}
