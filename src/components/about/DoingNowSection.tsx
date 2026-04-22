'use client';

import React, { useId, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Magnetic from '@/components/animations/magnetic';

export type DoingNowItem = {
  id: string;
  year: string;
  highlight?: boolean;
  title: string;
  organization: string;
  organizationUrl?: string;
  short: string;
  awards: string[];
  detail: string[];
};

const doingNowItems: DoingNowItem[] = [
  {
    id: 'fbla',
    year: 'Now',
    highlight: true,
    title: 'Business Ethics',
    organization: 'Rouse High School FBLA',
    short:
      'A partner event where we analyze an ethics case, submit a written brief, and defend it to judges at state.',
    awards: [
      '2nd of ~30 teams, Texas SLC',
      'National Leadership Conference qualifier',
      'Wells Fargo (FBLA only): top 10 of 300+ applicants, $1,000'
    ],
    detail: [
      'My partner and I study a detailed ethics case, agree on a position, and produce a written analysis. At state we also present and respond to judges. Our brief placed 2nd out of roughly thirty teams and earned a bid to the National Leadership Conference.',
      'I also applied for the FBLA Wells Fargo scholarship and finished in the top ten of more than three hundred applicants, receiving $1,000. The result confirmed that our writing and delivery aligned with how the rubric is scored.',
      'The event is closer to a written case combined with a mock board meeting than a standard classroom essay.'
    ]
  },
  {
    id: 'deca',
    year: 'Now',
    highlight: true,
    title: 'Business Law and Ethics, team decision',
    organization: 'DECA Inc.',
    short:
      'A team event with a timed case, a written exam, and role-plays centered on business law and ethics. Partner: Ethan Alex.',
    awards: [
      'ICDC qualifier, Business Law and Ethics TDM',
      'Freshman: state finalist, ICDC track',
      'Strong role play scores on the competitive sheets'
    ],
    detail: [
      'We receive a scenario on the day of competition, settle on a defensible position under time pressure, and present it to a judge. There is no external preparation window.',
      'As a freshman I advanced to state finals and qualified for ICDC. Sophomore district was tighter, but the framework for handling ambiguous prompts carried over.',
      'The event is useful practice for reasoning and speaking clearly when the facts are unclear and the timeline is fixed.'
    ]
  },
  {
    id: 'ventured',
    year: 'Now',
    highlight: true,
    title: 'VentureEd, marketing and product',
    organization: 'JammyChat',
    organizationUrl: 'https://www.linkedin.com/company/ventured-education/',
    short:
      'Summer 2025 VenturEd cohort, placed at JammyChat, an AI and music product with a mental health focus.',
    awards: [
      'VenturEd Summer 2025',
      'Jammy / Eric Davich team (ex-Google, Songza background)'
    ],
    detail: [
      'VenturEd is a selective high school technology internship. I was assigned to JammyChat, so my work contributed to real growth and product decisions rather than a staged project.',
      'My contributions included user research on onboarding, exploration of mood-based playlists, and a structured ambassador outreach plan to replace ad-hoc acquisition.',
      'The cohort reflected what the early stages of a startup actually require, which was the outcome I wanted from the summer.'
    ]
  },
  {
    id: 'usaco',
    year: 'Now',
    highlight: true,
    title: 'Competitive programming',
    organization: 'USA Computing Olympiad (USACO)',
    short:
      'Competitive programming through USACO. Submissions are graded automatically on correctness and performance.',
    awards: ['USACO Silver, 2026 season'],
    detail: [
      'I use USACO to stay honest about my grasp of data structures and algorithms. A solution either passes the grader or it does not.',
      'Reaching Silver in the 2026 season required stronger work on graphs, recursion, and fewer careless bugs under time pressure.',
      'The discipline transfers to production work: recognizing when an approach is too slow and debugging under constraint.'
    ]
  },
  {
    id: 'gradeview',
    year: 'Now',
    highlight: true,
    title: 'Gradeview',
    organization: 'Independent project',
    organizationUrl: 'https://gradeview.live',
    short:
      'A tool that scrapes Home Access Center and presents assignments and grades in a cleaner interface.',
    awards: [
      'Live at gradeview.live',
      'Alteon reused the extraction idea with permission (vercel app dashboard)'
    ],
    detail: [
      'Built in Python with Requests and BeautifulSoup. It authenticates, parses the HTML that HAC returns, and shows assignments and grades in a single view.',
      'Another student asked to reuse the extraction approach for their own application, Alteon, and I agreed. That kind of reuse matters to me more than visibility on GitHub.',
      'Maintenance is the harder part. HAC changes regularly, and sessions have to be handled securely rather than only convincingly.'
    ]
  },
  {
    id: 'ouracsv',
    year: 'Now',
    highlight: true,
    title: 'OuraCSV',
    organization: 'Independent project',
    organizationUrl: 'https://oura-rose.vercel.app/',
    short:
      'A web app that visualizes Oura’s free CSV export and uses a Groq-backed assistant to answer questions about the data.',
    awards: ['Vercel deploy', 'Groq for plain language Q and A on your rows'],
    detail: [
      'Oura’s paid analytics are solid, but many users still work from the CSV export. The app renders the same data as charts without requiring a subscription.',
      'A Groq model answers questions about the rows in plain language, which is more efficient than scanning a spreadsheet manually.',
      'The model is deliberately constrained to trends and questions about the visible data. It does not provide medical advice or diagnoses.'
    ]
  },
  {
    id: 'hourly',
    year: 'Now',
    highlight: true,
    title: 'Hourly',
    organization: 'Volunteer marketplace (in build)',
    short:
      'A volunteer marketplace in active development, aimed at reducing the spreadsheet overhead of student volunteering.',
    awards: ['Best Innovation, Genesis business competition'],
    detail: [
      'The problem is familiar from running clubs: matching who is available, which organizations need people, and tracking verified hours for programs like NHS.',
      'The current build supports tagging, availability, and a path for verifying hours. The goal is a working beta, not a marketing page.',
      'Winning Best Innovation at the Genesis competition confirmed the problem is real. The next step is a pilot with one school or nonprofit.'
    ]
  },
  {
    id: 'cac',
    year: 'Now',
    title: 'Congressional App Challenge, Rediscover',
    organization: 'STEM and civic tech',
    short:
      'Rediscover, my Congressional App Challenge submission, designed to reduce passive scrolling and surface concrete next actions.',
    awards: ['CAC entry, focus on screen time and habits'],
    detail: [
      'The app suggests intentional alternatives to time spent scrolling, based on the user’s current context.',
      'The front end is built for a teen audience; the back end uses lightweight AI assistance for idea generation, with clear privacy language displayed upfront.',
      'Both judges and users respond to transparency about what the product actually does, which shaped how I scoped the feature set.'
    ]
  },
  {
    id: 'speech',
    year: 'Now',
    highlight: true,
    title: 'Extemp, speech and debate',
    organization: 'NSDA / Rouse High School',
    short:
      'An extemporaneous speaking event: draw a current-events prompt, prepare in thirty minutes, then deliver a researched speech.',
    awards: [
      '1st, LC Anderson / Hendrickson swing, Sept 2025',
      '#1 on our internal ranking, moved up to varsity mid year'
    ],
    detail: [
      'From draw to speech is thirty minutes. In that time I locate sources, choose a defensible angle, and deliver a structured argument with cited evidence.',
      'I took first at the Anderson / Hendrickson swing early in the 2025 season, which confirmed I can compress research without losing clarity.',
      'I compete in other speech and debate events as well. The core requirements are consistent: structure, evidence, and adjusting delivery to the room.'
    ]
  },
  {
    id: 'metricvoice',
    year: 'Now',
    title: 'Research',
    organization: 'MetricVoice',
    organizationUrl: 'https://www.linkedin.com/company/metricvoice/',
    short:
      'Research work identifying companies that fit MetricVoice’s phone-based voice AI and preparing warm leads for the sales team.',
    awards: ['Research team, GTM and outbound'],
    detail: [
      'MetricVoice deploys AI voice on business phone lines. I evaluate fit based on operational signals rather than surface appearance.',
      'The work involves list qualification, CRM hygiene, and notes that make each sales call more productive.',
      'It is a useful counterweight to engineering work, since it shows how products actually reach buyers in practice.'
    ]
  },
  {
    id: 'nasa',
    year: '25',
    title: 'NASA Space Apps Challenge',
    organization: 'NASA',
    organizationUrl: 'https://www.spaceappschallenge.org/',
    short:
      'Austin regional round of the NASA Space Apps Challenge. Our submission framed low-Earth orbit commercialization as a business problem rather than a concept poster.',
    awards: ['Top 10 in Austin, about 200 teams'],
    detail: [
      'Our team built a case for how private actors could operate sustainably in LEO without skipping over the economics.',
      'I led much of the research, narrative, and presentation, which drew on the same skills as extemp applied to a different subject.',
      'Placing in the top ten from roughly two hundred teams in Austin indicated that the pitch landed with a technical audience.'
    ]
  },
  {
    id: 'stuco',
    year: 'Now',
    title: 'Sophomore class vice president',
    organization: 'Rouse High School Student Council',
    short:
      'Sophomore class vice president. A working role with real event logistics, not a résumé line.',
    awards: ['VP, sophomore class'],
    detail: [
      'I support the class president, attend officer meetings, and follow through on planning so events finish on schedule.',
      'Responsibilities include trunk-or-treat, homecoming, and pep rallies, all of which require coordination with administrators, sponsors, and students.',
      'The role is practical experience in managing calendars, adapting to late changes, and staying reliable when setup starts at 6am.'
    ]
  },
  {
    id: 'camp',
    year: '25',
    title: 'Camp counselor, Camp CAMP',
    organization: 'SPED summer camp',
    short:
      'A summer as a one-to-one counselor at Camp CAMP, paired with the same camper through the full session.',
    awards: ['149 volunteer hours, documented'],
    detail: [
      'Camp CAMP serves children and young adults with disabilities. I was assigned to one camper for the entire session.',
      'The role involves medication, sensory needs, and frequent schedule changes. The standard is to stay calm and consistent regardless of how the day is going.',
      'I logged the hours deliberately so the record reflects a full summer of that work, not only projects.'
    ]
  },
  {
    id: 'academic',
    year: 'Now',
    highlight: true,
    title: 'Tests and school stuff',
    organization: 'Rouse, SAT, UT',
    short:
      'Standard academic indicators: SAT score, class rank, and admission to UT McCombs DYNAMC for summer 2026.',
    awards: [
      'SAT 1580, Sept 2025 (800 math, 780 reading and writing)',
      'Class rank 11 of 628, 6.0 weighted',
      'UT McCombs DYNAMC, summer 2026, ~4% admit (50 of ~1,500)'
    ],
    detail: [
      'A 1580 is high enough that I can direct my time toward projects and competitions rather than repeated retakes.',
      'Rank 11 of 628 on a 6.0 weighted scale is the record of managing AP coursework and business electives concurrently.',
      'DYNAMC is UT McCombs’ summer business discovery program, admitting roughly 50 students from about 1,500 applicants. I plan to use it to build a stronger foundation in finance and accounting.'
    ]
  }
];

function WiggleDetailButton({
  expanded,
  onClick,
  panelId
}: {
  expanded: boolean;
  onClick: () => void;
  panelId: string;
}) {
  return (
    <Magnetic>
      <motion.button
        type="button"
        id={`${panelId}-trigger`}
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={onClick}
        whileHover={{
          rotate: [0, -2.5, 2.5, -2, 2, 0],
          transition: { duration: 0.45, ease: 'easeInOut' }
        }}
        whileTap={{ scale: 0.97 }}
        className={cn(
          'relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full border border-secondary bg-transparent px-5 py-2.5 text-sm font-medium text-foreground shadow-sm',
          'transition-colors duration-300 hover:border-primary/40 hover:text-primary'
        )}
      >
        <span className="relative z-10">{expanded ? 'Less detail' : 'More detail'}</span>
      </motion.button>
    </Magnetic>
  );
}

export default function DoingNowSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const baseId = useId();

  return (
    <div className="space-y-4 sm:space-y-5">
      {doingNowItems.map((item, index) => {
        const expanded = openId === item.id;
        const panelId = `${baseId}-${item.id}-panel`;

        return (
          <motion.article
            key={item.id}
            layout
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-12% 0px' }}
            transition={{
              delay: index * 0.05,
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1]
            }}
            className={cn(
              'overflow-hidden rounded-2xl border border-foreground/5 bg-card shadow-sm transition-shadow duration-300',
              'hover:border-foreground/10 hover:shadow-md',
              expanded && 'border-primary/20 shadow-md ring-1 ring-primary/10'
            )}
          >
            <div className="grid gap-4 p-5 sm:grid-cols-[minmax(0,72px)_1fr] sm:gap-5 sm:p-7">
              <div className="sm:pt-0.5">
                <span
                  className={cn(
                    'inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide',
                    item.highlight
                      ? 'bg-primary/12 text-primary'
                      : 'bg-foreground/5 text-foreground/60'
                  )}
                >
                  {item.year}
                </span>
              </div>

              <div className="min-w-0 space-y-3">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                    {item.title}
                  </h3>
                  {item.organizationUrl ? (
                    <Link
                      href={item.organizationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      @{item.organization} ↗
                    </Link>
                  ) : (
                    <span className="text-sm font-medium text-foreground/45">
                      @{item.organization}
                    </span>
                  )}
                </div>

                <p className="max-w-2xl text-sm leading-relaxed text-foreground/70 sm:text-base">
                  {item.short}
                </p>

                {item.awards.length > 0 && (
                  <ul className="flex flex-wrap gap-2" aria-label="Awards and highlights">
                    {item.awards.map((award) => (
                      <li
                        key={award}
                        className="rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary"
                      >
                        {award}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <WiggleDetailButton
                    expanded={expanded}
                    panelId={panelId}
                    onClick={() => setOpenId(expanded ? null : item.id)}
                  />
                </div>

                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={`${panelId}-trigger`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        initial={{ y: -8 }}
                        animate={{ y: 0 }}
                        exit={{ y: -6 }}
                        transition={{ duration: 0.28 }}
                        className="space-y-3 border-t border-foreground/10 pt-4 text-sm leading-relaxed text-foreground/75 sm:text-[0.95rem]"
                      >
                        {item.detail.map((paragraph, i) => (
                          <p key={i}>{paragraph}</p>
                        ))}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
