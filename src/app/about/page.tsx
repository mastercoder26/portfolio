'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useSpotify } from '@/hooks/useSpotify';
import { useGitHub } from '@/hooks/useGithub';
import Layout from '@/components/layout';
import AnimatedSection from '@/components/about/AnimatedSection';
import TextReveal from '@/components/about/TextReveal';
import ContrastCursor from '@/components/animations/cursor/contrastCursor';
import CourseDropdownGroup from '@/components/about/CourseDropdownGroup';

const SpotifyTopTracks = dynamic(
  () => import('@/components/about/SpotifyTopTracks')
);
const OpenSourceShowcase = dynamic(
  () => import('@/components/about/OpenSourceShowcase')
);
const CompactGitHubWidget = dynamic(
  () => import('@/components/about/Widgets/CompactGitHubWidget')
);
const IMessageWidget = dynamic(
  () => import('@/components/about/Widgets/IMessageWidget')
);

export default function About() {
  const {
    topTracks,
    isLoading: spotifyLoading,
    error: spotifyError
  } = useSpotify();

  const {
    githubData,
    isLoading: githubLoading,
    error: githubError
  } = useGitHub();


  return (
    <div className="relative overflow-hidden">
      <Layout title="About Me">
        <div>
          <section className="grid gap-8 py-12 md:gap-12 lg:grid-cols-5 lg:gap-16">
            <AnimatedSection
              animation="fade-right"
              className="lg:sticky lg:top-32 lg:col-span-2 lg:self-start"
            >
              <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl">
                <Image
                  src="/images/profile2.png"
                  alt="Akhil"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                />
              </div>
            </AnimatedSection>

            <div className="space-y-8 lg:col-span-3">
              <AnimatedSection animation="fade-up">
                <TextReveal
                  text="Design engineer turned software engineer. I approach engineering through a design lens, interested in both the technical architecture and the human experience."
                  className="text-xl font-medium leading-relaxed text-foreground/90 sm:text-2xl"
                  as="p"
                  highlightWords={['design', 'human']}
                  scrub={false}
                />
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={0.1}>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    My Superpower
                  </h3>
                  <p className="leading-relaxed text-foreground/70">
                    Bringing a drive to learn and improve, while also being able
                    come up with and design abstract ideas.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={0.2}>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    Personal Background
                  </h3>
                  <p className="leading-relaxed text-foreground/70">
                    Born in Seattle in 2010. Moved to Austin in 2022. A current
                    <Link href="/blog" className="text-primary">
                      {' '}
                      sophomore @ Rouse High School
                    </Link>
                    , I focus on computer science and business. I run hands‑on
                    workshops, build projects with friends, and help lead a
                    small developer‑relations‑style community for student
                    builders. I thrive at the intersection of technical depth,
                    creative problem‑solving, and community building, and I’m
                    always looking for new ways to learn, ship, and share.{' '}
                    <Link href="/now" className="text-primary hover:underline">
                      Here&apos;s a running list
                    </Link>{' '}
                    of competitions, builds, and other things I&apos;m in the
                    middle of.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </section>
          {/* Education + widgets */}
          <section className="py-16">
            <AnimatedSection animation="fade-up">
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="min-w-0 lg:col-span-1">
                  <section className="py-0">
                    <AnimatedSection animation="fade-up">
                      <div className="rounded-2xl border border-foreground/5 bg-card p-6 shadow-sm sm:p-8">
                        <h2 className="mb-4 text-xl font-bold text-foreground sm:text-2xl">
                          Education & Recognition
                        </h2>
                        <div className="mb-4 flex items-center gap-4">
                          <div className="min-w-0 flex-1">
                            <p className="mb-0 text-foreground/70">
                              At{' '}
                              <span className="font-semibold text-foreground">
                                Rouse High School
                              </span>
                              , I study a wide range of subjects, but focus on
                              courses that relate to business and computer
                              science.
                            </p>
                            <p className="mt-2 text-sm text-foreground/60">
                              Ranked 11/628 in my class
                            </p>
                          </div>
                          <a
                            href="https://rhs.leanderisd.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block"
                            title="Rouse High School website"
                          >
                            <div className="relative h-12 w-12 flex-shrink-0 transform transition-transform duration-200 hover:scale-105">
                              <Image
                                src="/images/about/RouseLogo.jpg"
                                alt="Rouse High School logo"
                                fill
                                className="object-contain"
                              />
                            </div>
                          </a>
                        </div>
                        <CourseDropdownGroup
                          courseGroups={[
                            {
                              title: 'Courses (Freshman)',
                              courses: [
                                'Principles of Business & Finance (Business)',
                                'Computer Science Advanced (CS)',
                                'Precalculus AP',
                                'Human Geography AP'
                              ]
                            },
                            {
                              title: 'Courses (Sophomore)',
                              courses: [
                                'Business Management (Business)',
                                'Computer Science AP (CS)',
                                'Calculus AB AP',
                                'Physics 1 AP',
                                'Seminar AP',
                                'World History AP'
                              ]
                            },
                            {
                              title: 'Courses (Junior)',
                              courses: [
                                'Practicum Business Management (Double Blocked) (Business)',
                                'Computer Science III (CS)',
                                'English III AP Lang & Comp',
                                'Statistics AP',
                                'Environmental Science AP',
                                'U.S. History AP'
                              ]
                            }
                          ]}
                        />
                      </div>
                    </AnimatedSection>
                  </section>
                </div>

                {/* Widgets sidebar - takes 1/3 width */}
                <div className="min-w-0 lg:col-span-1">
                  <div className="space-y-4 lg:sticky lg:top-32">
                    <AnimatedSection animation="fade-up">
                      <CompactGitHubWidget
                        githubData={githubData}
                        isLoading={githubLoading}
                        error={githubError}
                      />
                    </AnimatedSection>
                    <AnimatedSection animation="fade-up">
                      <OpenSourceShowcase
                        githubData={githubData}
                        isLoading={githubLoading}
                        error={githubError}
                      />
                    </AnimatedSection>
                    <AnimatedSection animation="fade-up">
                      <IMessageWidget />
                    </AnimatedSection>
                    {!spotifyLoading &&
                      !spotifyError &&
                      topTracks.length > 0 && (
                        <AnimatedSection animation="fade-up">
                          <SpotifyTopTracks tracks={topTracks} />
                        </AnimatedSection>
                      )}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </section>
        </div>
      </Layout>

      <ContrastCursor isActive={false} text="" />
    </div>
  );
}
