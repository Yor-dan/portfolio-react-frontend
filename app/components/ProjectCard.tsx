import { formatMonthYear } from '~/utils';

type ProjectCardProps = {
  title: string;
  overview: string;
  date: string;
  thumbnailImage: string;
  liveUrl?: string;
  githubUrl?: string;
};

export type StrapiProject = Omit<ProjectCardProps, 'thumbnailImage'> & {
  thumbnailImage: { url: string };
};

export default function ProjectCard({
  title,
  overview,
  thumbnailImage,
  date,
  liveUrl,
  githubUrl,
}: ProjectCardProps) {
  return (
    <div className="project-card">
      <img src={thumbnailImage} alt={title} />
      <h3>{title}</h3>
      <p>{overview}</p>
      <time dateTime={date}>{formatMonthYear(date)}</time>
      {liveUrl && (
        <a href={liveUrl} target="_blank" rel="noopener noreferrer">
          Live Demo
        </a>
      )}
      {githubUrl && (
        <a href={githubUrl} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      )}
    </div>
  );
}
