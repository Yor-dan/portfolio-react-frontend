import type { Route } from './+types/home';
import { useLoaderData } from 'react-router';
import { portfolioQuery } from '~/utils';
import Hero from '~/components/Hero';
import Section from '~/components/Section';
import About from '~/components/About';
import SkillCard, { type SkillCardProps } from '~/components/SkillCard';
import Experience, { type StrapiExperience } from '~/components/Experience';
import ProjectCard, { type StrapiProject } from '~/components/ProjectCard';
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
  const {
    strapiUrl,
    hero,
    about,
    skills,
    experiences,
    projects,
    certifications,
    contacts,
    socials,
  } = useLoaderData<typeof loader>();

  return (
    <>
      <main>
        <div className="hero-container">
          <Hero {...hero} />
        </div>
        <Section title="About Me">
          <About about={about} />
        </Section>
        <Section title="Skills">
          <div className="skill-cards-container">
            {skills.length > 0 ? (
              skills.map((skill: SkillCardProps, index: number) => (
                <SkillCard key={index} {...skill} />
              ))
            ) : (
              <p>Error displaying skills.</p>
            )}
          </div>
        </Section>
        <Section title="Projects">
          <div className="project-cards-container">
            {projects.length > 0 ? (
              projects.map((project: StrapiProject, index: number) => (
                <ProjectCard
                  key={index}
                  {...project}
                  thumbnail={strapiUrl + project.thumbnail.url}
                />
              ))
            ) : (
              <p>Error displaying projects.</p>
            )}
          </div>
        </Section>
        <Section title="Experiences">
          <div className="experiences-container">
            {experiences.length > 0 ? (
              experiences.map((experience: StrapiExperience, index: number) => (
                <Experience
                  key={index}
                  {...experience}
                  orgLogo={strapiUrl + experience.orgLogo.url}
                />
              ))
            ) : (
              <p>Error displaying experiences.</p>
            )}
          </div>
        </Section>
      </main>
      <footer>
        <p>Yordan Bian 2026</p>
        {contacts.length > 0 && socials.length > 0 ? (
          <div>
            <div className="contacts-container">
              {contacts.map(
                (link: LinkProps, index: number) =>
                  link.category === 'contact' && <Link key={index} {...link} />,
              )}
            </div>
            <div className="socials-container">
              {socials.map(
                (link: LinkProps, index: number) =>
                  link.category === 'social' && <Link key={index} {...link} />,
              )}
            </div>
          </div>
        ) : (
          <p>Error displaying contacts and socials.</p>
        )}
      </footer>
    </>
  );
}
