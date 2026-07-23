import type { Route } from './+types/home';
import { useLoaderData } from 'react-router';
import Hero, { HeroLoader } from '~/components/Hero';
import Section from '~/components/Section';
import About, { AboutLoader } from '~/components/About';
import SkillCard, { SkillsLoader } from '~/components/SkillCard';
import ProjectCard, {
  type StrapiProject,
  ProjectsLoader,
} from '~/components/ProjectCard';
import ExperienceListItem, {
  type StrapiExperience,
  ExperiencesLoader,
} from '~/components/Experience';
import Link, { LinksLoader } from '~/components/Link';

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
  return {
    strapiUrl: process.env.STRAPI_URL,
    hero: await HeroLoader(),
    about: await AboutLoader(),
    skills: await SkillsLoader(),
    projects: await ProjectsLoader(),
    experiences: await ExperiencesLoader(),
    links: await LinksLoader(),
  };
}

export default function Home() {
  const { strapiUrl, hero, about, skills, projects, experiences, links } =
    useLoaderData<typeof loader>();

  return (
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
            skills.map((skill, index: number) => (
              <SkillCard key={index} {...skill} />
            ))
          ) : (
            <p>Error fetching skills.</p>
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
                thumbnailImage={strapiUrl + project.thumbnailImage.url}
              />
            ))
          ) : (
            <p>Error fetching projects.</p>
          )}
        </div>
      </Section>
      <Section title="Experiences">
        <div className="experiences-container">
          {experiences.length > 0 ? (
            experiences.map((experience: StrapiExperience, index: number) => (
              <ExperienceListItem
                key={index}
                {...experience}
                orgLogo={strapiUrl + experience.orgLogo.url}
              />
            ))
          ) : (
            <p>Error fetching experiences.</p>
          )}
        </div>
      </Section>
      <div className="links-container">
        {links.length > 0 ? (
          links.map((link, index: number) => <Link key={index} {...link} />)
        ) : (
          <p>Error fetching links.</p>
        )}
      </div>
    </main>
  );
}
