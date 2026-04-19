'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
  year: string;
  title: string;
  company: string;
  companyUrl?: string;
  description: string;
  highlight?: boolean;
}

const journeyData: TimelineItem[] = [
  {
    year: 'Now',
    title: 'Business Ethics Competitor',
    company: 'Rouse High School FBLA',
    description:
      'Compete on a Business Ethics team for Rouse FBLA. Placed 2nd at the Texas State Leadership Conference out of roughly 30 teams, qualified for the National Leadership Conference, and was selected as a top-10 applicant for a $1,000 Wells Fargo Business Scholarship.',
    highlight: true
  },
  {
    year: 'Now',
    title: 'Competitive Programmer',
    company: 'USA Computing Olympiad',
    description:
      'Reached Silver division in the 2026 USACO season, solving timed algorithmic problems and steadily deepening my fluency with data structures, recursion, and graph algorithms.',
    highlight: true
  },
  {
    year: 'Now',
    title: 'Business Competitor',
    company: 'Rouse High School DECA',
    description:
      'Compete in DECA business events including BLTDM. Earned state finalist and ICDC qualifier honors as a freshman, and returned to districts as a sophomore with additional case-challenge events.',
    highlight: true
  },
  {
    year: 'Now',
    title: 'Sophomore Class Vice President',
    company: 'Rouse High School Student Council',
    description:
      'Serve as VP of the sophomore class with a dedicated StuCo class period. Help plan and run school-wide events including trunk-or-treat, homecoming, and pep rallies, and coordinate with officers and sponsors on the year’s calendar.',
    highlight: true
  },
  {
    year: 'Now',
    title: 'Varsity Speech & Debate',
    company: 'Rouse High School Speech & Debate',
    description:
      'Ranked #1 in internal team standings and was promoted to varsity in the second semester. Compete across multiple speech and debate event formats, focusing on argument construction, delivery, and quick-turn rebuttal.',
    highlight: true
  },
  {
    year: 'Now',
    title: 'Volunteer Counselor',
    company: 'Camp CAMP (SPED Camp)',
    description:
      'Served as a counselor at Camp CAMP, a summer camp for children and young adults with special needs. Supported one camper full-time across activities and routines, logging 149 documented volunteer hours over the summer.',
    highlight: true
  },
  {
    year: 'Now',
    title: 'Member',
    company: 'National Technical Honor Society',
    description:
      'Inducted for sustained academic performance in technical and career-focused coursework, with particular emphasis on computer science and business.',
    highlight: true
  },
  {
    year: 'Now',
    title: 'Model UN Delegate',
    company: 'Rouse High School Model UN',
    description:
      'Compete at AUSMUN, CTMUN, SICMUN, and the CTMUN Spring Crisis conference. Sharpening research, public speaking, and crisis-style negotiation across both general assembly and crisis committees.',
    highlight: true
  },
  {
    year: 'Now',
    title: 'Soccer Referee',
    company: 'U.S. Soccer Federation',
    description:
      'USSF-certified official for 30+ competitive youth soccer matches. Manage game flow, enforce the laws of the game, and handle on-field conflict between players, coaches, and spectators.',
    highlight: true
  },
  {
    year: '24-25',
    title: 'Marketing & Coding Fellow',
    company: 'JammyChat · VentureEd Fellowship',
    description:
      'Selected for the VentureEd summer fellowship and embedded with JammyChat across marketing and engineering. Worked on growth experiments and product surfaces in the same week, which sharpened how I move between user-facing strategy and implementation.'
  },
  {
    year: '23-24',
    title: 'Team Captain',
    company: 'Lonestar SC Alpha U15',
    description:
      'Captained the Alpha U15 squad under Coach Clint through the 2023–2024 season. Led warm-ups, set the tone in practices, and served as the on-field communicator in competitive league play.'
  }
];

export default function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const items = itemsRef.current;
    if (!container || !items.length) return;

    const ctx = gsap.context(() => {
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            },
            delay: i * 0.05
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div className="space-y-1">
        {journeyData.map((item, i) => {
          const isLastItem = i === journeyData.length - 1;

          return (
            <div
              key={i}
              ref={(el) => {
                if (el) itemsRef.current[i] = el;
              }}
              className="group relative"
            >
              {/* Timeline item - clean horizontal layout */}
              <div
                className={`grid py-4 sm:grid-cols-[60px_1fr] sm:gap-4 sm:py-6 ${
                  isLastItem ? '' : 'border-b border-foreground/10'
                }`}
              >
                {/* Year */}
                <div className="items-start px-2">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
                      item.highlight
                        ? 'bg-primary/10 text-primary'
                        : 'bg-foreground/5 text-foreground/60'
                    }`}
                  >
                    {item.year}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-lg font-semibold text-foreground sm:text-xl">
                      {item.title}
                    </h3>
                    {item.companyUrl ? (
                      <Link
                        href={item.companyUrl}
                        className="text-sm font-medium text-primary transition-colors hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        @{item.company} ↗
                      </Link>
                    ) : (
                      <span className="text-sm font-medium text-foreground/50">
                        @{item.company}
                      </span>
                    )}
                  </div>
                  <p className="max-w-2xl text-foreground/60">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
