'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { clsx } from 'clsx';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface TextRevealProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  stagger?: number;
  scrub?: boolean;
  highlightWords?: string[];
}

/**
 * Animated text reveal with per-word entrance. Initial hidden state is
 * applied via inline styles on each word so first paint never shows the
 * visible state — this prevents the previous flicker where the heading
 * appeared, then snapped invisible, then animated in.
 */
export default function TextReveal({
  text,
  className = '',
  as: Tag = 'p',
  stagger = 0.04,
  scrub = true,
  highlightWords = []
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  useGSAP(
    () => {
      const container = containerRef.current;
      const words = wordsRef.current.filter(Boolean);
      if (!words.length || !container) return;

      if (scrub) {
        gsap.fromTo(
          words,
          {
            opacity: 0.1,
            y: 24,
            rotateX: -40,
            filter: 'blur(4px)'
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter: 'blur(0px)',
            ease: 'none',
            stagger,
            scrollTrigger: {
              trigger: container,
              start: 'top 80%',
              end: 'top 30%',
              scrub: 0.8
            }
          }
        );
      } else {
        gsap.fromTo(
          words,
          {
            opacity: 0,
            y: 32,
            rotateX: -20
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            ease: 'power4.out',
            stagger,
            scrollTrigger: {
              trigger: container,
              start: 'top 88%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    },
    { scope: containerRef, dependencies: [stagger, scrub] }
  );

  const words = text.split(' ');

  const initialWordStyle: React.CSSProperties = scrub
    ? {
        opacity: 0.1,
        transform: 'translateY(24px) rotateX(-40deg)',
        filter: 'blur(4px)',
        transformStyle: 'preserve-3d',
        willChange: 'transform, opacity, filter'
      }
    : {
        opacity: 0,
        transform: 'translateY(32px) rotateX(-20deg)',
        transformStyle: 'preserve-3d',
        willChange: 'transform, opacity'
      };

  return (
    <div ref={containerRef} style={{ perspective: '1000px' }}>
      <Tag className={clsx('flex flex-wrap', className)}>
        {words.map((word, i) => (
          <span
            key={i}
            ref={(el) => {
              if (el) wordsRef.current[i] = el;
            }}
            className={clsx(
              'mr-[0.25em] inline-block',
              highlightWords.includes(word.toLowerCase().replace(/[.,!?]$/, ''))
                ? 'font-bold text-primary'
                : ''
            )}
            style={initialWordStyle}
          >
            {word}
          </span>
        ))}
      </Tag>
    </div>
  );
}
