'use client';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import Menu from '../nav';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { isMobile } from '@/components/util';
import Magnetic from '@/components/animations/magnetic';
import Image from 'next/image';

export default function Header() {
  const header = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [nameHovered, setNameHovered] = useState(false);
  const pathname = usePathname();
  const button = useRef(null);

  useEffect(() => {
    if (isActive) setIsActive(false);
  }, [pathname]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(button.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,
        onLeave: () => {
          gsap.to(button.current, {
            scale: 1,
            duration: 0.25,
            ease: 'power1.out'
          });
        },
        onEnterBack: () => {
          gsap.to(button.current, {
            scale: 0,
            duration: 0.25,
            ease: 'power1.out'
          });
        }
      }
    });
  }, []);

  return (
    <>
      <div
        ref={header}
        className="absolute top-0 z-20 box-border flex w-full items-center p-4 font-light text-white mix-blend-difference lg:p-8"
      >
        <div className="flex shrink-0 lg:pr-12">
          <Link
            href={'/'}
            prefetch={false}
            className="group z-10 flex items-center space-x-2"
            onMouseEnter={() => setNameHovered(true)}
            onMouseLeave={() => setNameHovered(false)}
          >
            <Magnetic>
              <Image
                height={32}
                width={32}
                src="/images/logo.jpg"
                alt="Akhil Konduru logo"
                priority
              />
            </Magnetic>
            {!isMobile() && (
              <div className="relative flex items-baseline">
                <span>Akhil</span>
                <AnimatePresence>
                  {nameHovered && (
                    <motion.span
                      key="konduru"
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 20, opacity: 0 }}
                      transition={{
                        type: 'spring',
                        stiffness: 180,
                        damping: 16,
                        mass: 1.2
                      }}
                      className="absolute left-full whitespace-nowrap"
                    >
                      &nbsp;Konduru
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            )}
          </Link>
        </div>
        {!isMobile() && (
          <nav
            className="relative z-10 flex min-w-0 flex-1 flex-row flex-nowrap items-center justify-end gap-x-6 p-3 font-semibold md:gap-x-8 lg:gap-x-10"
            aria-label="Main"
          >
            <Magnetic>
              <Link
                href={'/about'}
                prefetch={false}
                className="cursor-pointer whitespace-nowrap"
              >
                About
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                href={'/now'}
                prefetch={false}
                className="cursor-pointer whitespace-nowrap"
              >
                Now
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                href={'/projects'}
                prefetch={false}
                className="cursor-pointer whitespace-nowrap"
              >
                Projects
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                href={'/blog'}
                prefetch={false}
                className="cursor-pointer whitespace-nowrap"
              >
                Blog
              </Link>
            </Magnetic>
            <Magnetic>
              <div className="flex cursor-pointer items-center gap-0.5 whitespace-nowrap">
                <Link href={'/contact'} prefetch={false}>
                  Contact
                </Link>
                <ArrowUpRight size={18} />
              </div>
            </Magnetic>
          </nav>
        )}
      </div>
      {!isMobile() && (
        <div ref={button} className="fixed right-0 z-20 scale-0 transform">
          <Menu />
        </div>
      )}
      {isMobile() && (
        <div className="fixed right-2 z-20 transform">
          <Menu />
        </div>
      )}
    </>
  );
}
