import { formatMonthYear } from '~/utils';

type ProjectCardProps = {
  title: string;
  overview: string;
  date: string;
  thumbnail: string;
  liveUrl?: string;
  githubUrl?: string;
};

export type StrapiProject = Omit<ProjectCardProps, 'thumbnail'> & {
  thumbnail: { url: string };
};

export default function ProjectCard({
  title,
  overview,
  thumbnail,
  date,
  liveUrl,
  githubUrl,
}: ProjectCardProps) {
  return (
    <div className="project-card bg-white border border-neutral-200 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 group rounded-none">
      <div>
        <div className="relative aspect-[3/2] w-full overflow-hidden bg-neutral-100 border-b border-neutral-200">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="%2394a3b8" stroke-width="1"><rect x="3" y="3" width="18" height="18"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>';
            }}
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-neutral-900 group-hover:text-neutral-700 transition-colors font-sans mb-2">
            {title}
          </h3>
          <div className="mb-3">
            <time dateTime={date} className="inline-block text-xs font-mono text-neutral-500 bg-neutral-50 px-2 py-1 border border-neutral-200">
              {formatMonthYear(date)}
            </time>
          </div>
          <p className="text-neutral-600 text-sm leading-relaxed mb-6 font-sans">
            {overview}
          </p>
        </div>
      </div>
      <div className="px-6 pb-6 pt-0 flex items-center gap-3">
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2.5 border border-neutral-900 transition-colors rounded-none"
          >
            Live Demo ↗
          </a>
        )}
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-white hover:bg-neutral-100 text-neutral-900 px-4 py-2.5 border border-neutral-300 transition-colors rounded-none"
          >
            GitHub ↗
          </a>
        )}
      </div>
    </div>
  );
}

