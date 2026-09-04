import { formatMonthYear } from '~/utils';
import type { Project } from '~/types';

type ProjectCardProps = Omit<Project, 'thumbnail'> & {
  thumbnail: string;
};

export default function ProjectCard({
  title,
  slug,
  description,
  thumbnail,
  date,
  liveUrl,
  githubUrl,
}: ProjectCardProps) {
  return (
    <div className="project-card bg-white border border-neutral-200 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 group rounded-none">
      <div>
        <div className="relative aspect-3/2 w-full overflow-hidden bg-neutral-100 border-b border-neutral-200">
          <a href={`projects/${slug}`}>
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="%2394a3b8" stroke-width="1"><rect x="3" y="3" width="18" height="18"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>';
              }}
            />
          </a>
        </div>
        <div className="p-6">
          <h3 className="text-lg md:text-xl font-bold text-neutral-900 group-hover:text-neutral-700 transition-colors font-sans">
            {title}
          </h3>
          <div className="mb-4">
            <time
              dateTime={date}
              className="inline-block text-xs font-bold font-sans text-neutral-500"
            >
              {formatMonthYear(date)}
            </time>
          </div>
          <p className="text-neutral-600 text-sm md:text-base leading-relaxed mb-6 font-sans">
            {description}
          </p>
        </div>
      </div>
      <div className="px-6 pb-6 pt-0 flex">
        <a
          href={`projects/${slug}`}
          className="hover:underline text-sm text-neutral-500"
        >
          Read more →
        </a>
      </div>
    </div>
  );
}
