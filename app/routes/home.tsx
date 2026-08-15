import type { Route } from './+types/home';
import { useLoaderData } from 'react-router';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioQuery } from '~/utils';
import Hero from '~/components/Hero';
import Section from '~/components/Section';
import About from '~/components/About';
import SkillCard, { type SkillCardProps } from '~/components/SkillCard';
import Experience, { type StrapiExperience } from '~/components/Experience';
import ProjectCard, { type StrapiProject } from '~/components/ProjectCard';
import Certification from '~/components/Certification';
import Training from '~/components/Training';
import Link, { type LinkProps } from '~/components/Link';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Yordan Bian's Personal Portfolio" },
    {
      name: 'description',
      content: "Yordan's journey and things he built along the way.",
    },
  ];
}

export async function loader() {
  try {
    const res = await fetch(
      `${process.env.STRAPI_URL}/api/portfolio?${portfolioQuery}`,
    );
    const payload = await res.json();
    return {
      strapiUrl: process.env.STRAPI_URL,
      ...payload.data,
    };
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    return {};
  }
}

export default function Home() {
  const data = useLoaderData<typeof loader>() || {};
  const {
    hero = {
      eyebrow: 'PORTFOLIO / 2026',
      title: 'Yordan Bian',
      subtitle: 'A Full-Stack Developer',
    },
    about = 'A recent computer science graduate with a passion for buiding web, backend applications, and automation. Proficient in Python and JavaScript, with solid foundation in DSA, OOP, SDLC, and software testing.',
    skills = [],
    experiences = [],
    projects = [],
    certifications = [],
    trainings = [],
    contacts = [],
    socials = [],
  } = data;

  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Hero Parallax + Fade on scroll
      gsap.to('.hero-content', {
        y: -60,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-container',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // 2. Sections Slide In
      const sections = gsap.utils.toArray<HTMLElement>('.gsap-section');
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <main
        ref={mainRef}
        className="bg-neutral-50 text-neutral-900 min-h-screen font-sans"
      >
        <div className="hero-container">
          <Hero {...hero} resumeUrl={hero.resume?.url} />
        </div>
        <Section title="About Me">
          <About about={about} />
        </Section>
        <Section title="Skills">
          <div className="skill-cards-container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {skills && skills.length > 0 ? (
              skills.map((skill: SkillCardProps, index: number) => (
                <SkillCard key={index} {...skill} />
              ))
            ) : (
              <p className="text-neutral-500 text-sm font-mono col-span-full">
                No skills listed yet.
              </p>
            )}
          </div>
        </Section>
        <Section title="Experiences">
          <div className="experiences-container max-w-4xl mx-auto">
            {experiences && experiences.length > 0 ? (
              experiences.map((experience: StrapiExperience, index: number) => (
                <Experience
                  key={index}
                  {...experience}
                  orgLogo={experience.orgLogo.url}
                />
              ))
            ) : (
              <p className="text-neutral-500 text-sm font-mono">
                No experiences listed yet.
              </p>
            )}
          </div>
        </Section>
        <Section title="Projects">
          <div className="project-cards-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects && projects.length > 0 ? (
              projects.map((project: StrapiProject, index: number) => (
                <ProjectCard
                  key={index}
                  {...project}
                  thumbnail={project.thumbnail.url}
                />
              ))
            ) : (
              <p className="text-neutral-500 text-sm font-mono col-span-full">
                No projects listed yet.
              </p>
            )}
          </div>
        </Section>
        <Section title="Certifications">
          <div className="certifications-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications && certifications.length > 0 ? (
              certifications.map((certification: any, index: number) => (
                <Certification key={index} {...certification} />
              ))
            ) : (
              <p className="text-neutral-500 text-sm font-mono col-span-full">
                No certifications listed yet.
              </p>
            )}
          </div>
        </Section>
        <Section title="Trainings">
          <div className="trainings-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainings && trainings.length > 0 ? (
              trainings.map((training: any, index: number) => (
                <Training key={index} {...training} />
              ))
            ) : (
              <p className="text-neutral-500 text-sm font-mono col-span-full">
                No trainings listed yet.
              </p>
            )}
          </div>
        </Section>
      </main>
      <footer className="bg-neutral-900 text-neutral-300 py-16 px-6 border-t border-neutral-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight uppercase font-sans">
              Yordan Bian
            </h3>
            <p className="text-xs font-mono text-neutral-400 mt-1">
              © {new Date().getFullYear()} — Portfolio
            </p>
          </div>
          {(contacts && contacts.length > 0) ||
          (socials && socials.length > 0) ? (
            <div className="flex flex-col sm:flex-row gap-4">
              {contacts && contacts.length > 0 && (
                <div className="contacts-container flex flex-wrap gap-3">
                  {contacts.map((contact: LinkProps, index: number) => (
                    <Link key={index} {...contact} />
                  ))}
                </div>
              )}
              {socials && socials.length > 0 && (
                <div className="socials-container flex flex-wrap gap-3">
                  {socials.map((social: LinkProps, index: number) => (
                    <Link key={index} {...social} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <p className="text-xs text-neutral-500 font-mono">
              Yordan Bian Portfolio Website
            </p>
          )}
        </div>
      </footer>
    </>
  );
}
