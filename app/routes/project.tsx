import type { Route } from './+types/project';
import { Link, useLoaderData } from 'react-router';
import { useMemo } from 'react';
import type { Project } from '~/types';
import { formatMonthYear } from '~/utils';
import DOMPurify from 'dompurify';

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData) {
    return [
      { title: 'Project Not Found | Yordan Bian' },
      {
        name: 'description',
        content: 'The requested project could not be found.',
      },
    ];
  }

  return [
    { title: `${loaderData.title} | Yordan Bian` },
    {
      name: 'description',
      content:
        loaderData.description ||
        `${loaderData.title} - Project by Yordan Bian`,
    },
  ];
}

export async function loader({
  params,
}: Route.LoaderArgs): Promise<Project | null> {
  try {
    const slug = params.slug;
    const url = `${process.env.STRAPI_URL}/api/projects?filters[slug][$eq]=${slug}&populate=*`;
    const response = await fetch(url);
    const result = await response.json();
    return {
      ...result.data?.[0],
    };
  } catch (error) {
    console.error('Error fetching project data:', error);
    return null;
  }
}

export default function ProjectRoute() {
  const project = useLoaderData<typeof loader>();

  const sanitizedArticle = useMemo(() => {
    if (!project?.article) return '';
    if (
      typeof window !== 'undefined' &&
      typeof DOMPurify?.sanitize === 'function'
    ) {
      return DOMPurify.sanitize(project.article, {
        ADD_TAGS: ['iframe', 'figure', 'figcaption', 'oembed'],
        ADD_ATTR: [
          'target',
          'allow',
          'allowfullscreen',
          'frameborder',
          'scrolling',
          'style',
        ],
      });
    }
    return project.article;
  }, [project?.article]);

  if (!project) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col justify-center items-center px-6 text-center">
        <div className="max-w-md w-full bg-white border border-neutral-200 p-8 sm:p-12 shadow-sm rounded-none">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-neutral-300 bg-neutral-50 text-xs font-mono uppercase tracking-widest text-neutral-600 mb-6 rounded-none">
            404
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase text-neutral-900 mb-3 tracking-tight font-sans">
            Project Not Found
          </h1>
          <p className="text-neutral-600 text-sm mb-8 leading-relaxed font-sans">
            The project article you are looking for does not exist or may have
            been removed.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 w-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 border border-neutral-900 transition-colors shadow-sm rounded-none"
          >
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans flex flex-col justify-between">
      <div>
        {/* Minimalist Top Navigation Bar */}
        <header className="border-b border-neutral-200 bg-white/90 backdrop-blur-sm sticky top-0 z-30">
          <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-4 flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-neutral-900 transition-colors group"
            >
              <span className="font-mono text-sm transform group-hover:-translate-x-0.5 transition-transform">
                ←
              </span>
              <span>Back</span>
            </Link>
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
              Project
            </span>
          </div>
        </header>

        {/* Main Content Area with Wide Margins on Large Screens */}
        <main className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-8 sm:pt-12 pb-16">
          {/* Top Banner / Thumbnail Image */}
          {project.thumbnail?.url && (
            <div className="relative aspect-video sm:aspect-21/9 w-full overflow-hidden bg-neutral-100 border border-neutral-200 shadow-sm mb-10 sm:mb-14 rounded-none">
              <img
                src={project.thumbnail.url}
                alt={project.title}
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="%2394a3b8" stroke-width="1"><rect x="3" y="3" width="18" height="18"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>';
                }}
              />
            </div>
          )}

          {/* Project Header Info */}
          <header className="mb-10 sm:mb-14">
            {/* Date Badge */}
            {project.date && (
              <div className="mb-4">
                <time
                  dateTime={project.date}
                  className="inline-block text-xs font-mono font-bold tracking-wider text-neutral-600 bg-white border border-neutral-200 px-3 py-1 shadow-2xs rounded-none"
                >
                  {formatMonthYear(project.date)}
                </time>
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-neutral-900 font-sans mb-6 leading-tight">
              {project.title}
            </h1>

            {/* Action Links */}
            {(project.liveUrl || project.githubUrl) && (
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-neutral-900 hover:bg-neutral-800 text-white px-5 py-3 border border-neutral-900 shadow-xs hover:shadow-sm transition-all rounded-none"
                  >
                    <span>Live Demo</span>
                    <span>↗</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-white hover:bg-neutral-100 text-neutral-900 px-5 py-3 border border-neutral-300 shadow-xs hover:shadow-sm transition-all rounded-none"
                  >
                    <span>GitHub Repository</span>
                    <span>↗</span>
                  </a>
                )}
              </div>
            )}
          </header>

          {/* Thin Divider */}
          <div className="h-px bg-neutral-200 mb-10 sm:mb-14" />

          {/* CKEditor 5 Article Body */}
          {sanitizedArticle ? (
            <article
              className="project-article text-neutral-800 font-sans max-w-4xl
                [&_h1]:text-3xl [&_h1]:sm:text-4xl [&_h1]:font-black [&_h1]:tracking-tight [&_h1]:text-neutral-900 [&_h1]:uppercase [&_h1]:mt-12 [&_h1]:mb-6 [&_h1]:font-sans
                [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-neutral-900 [&_h2]:uppercase [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:font-sans [&_h2]:pb-2 [&_h2]:border-b [&_h2]:border-neutral-200
                [&_h3]:text-xl [&_h3]:sm:text-2xl [&_h3]:font-bold [&_h3]:tracking-tight [&_h3]:text-neutral-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:font-sans
                [&_h4]:text-lg [&_h4]:sm:text-xl [&_h4]:font-bold [&_h4]:text-neutral-900 [&_h4]:mt-6 [&_h4]:mb-2 [&_h4]:font-sans
                [&_p]:text-neutral-700 [&_p]:text-base [&_p]:sm:text-lg [&_p]:leading-relaxed [&_p]:mb-6 [&_p]:font-sans
                [&_a]:text-neutral-900 [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-neutral-400 [&_a]:font-semibold hover:[&_a]:decoration-neutral-900 hover:[&_a]:text-black [&_a]:transition-colors
                [&_strong]:font-bold [&_strong]:text-neutral-900
                [&_em]:italic [&_em]:text-neutral-800
                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:space-y-2 [&_ul]:text-neutral-700 [&_ul]:text-base [&_ul]:sm:text-lg
                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol]:space-y-2 [&_ol]:text-neutral-700 [&_ol]:text-base [&_ol]:sm:text-lg
                [&_li]:leading-relaxed [&_li>p]:mb-1
                [&_blockquote]:border-l-2 [&_blockquote]:border-neutral-900 [&_blockquote]:bg-neutral-100/60 [&_blockquote]:py-3.5 [&_blockquote]:px-5 [&_blockquote]:my-6 [&_blockquote]:text-neutral-700 [&_blockquote]:italic [&_blockquote]:font-sans [&_blockquote_p]:mb-0
                [&_:not(pre)>code]:bg-neutral-100 [&_:not(pre)>code]:text-neutral-900 [&_:not(pre)>code]:font-mono [&_:not(pre)>code]:text-sm [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:border [&_:not(pre)>code]:border-neutral-200 [&_:not(pre)>code]:rounded-none
                [&_pre]:bg-neutral-900 [&_pre]:text-neutral-100 [&_pre]:p-5 [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:font-mono [&_pre]:text-sm [&_pre]:border [&_pre]:border-neutral-800 [&_pre]:leading-relaxed [&_pre]:rounded-none
                [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:border-none [&_pre_code]:text-neutral-100
                [&_figure]:my-8 [&_figure]:w-full
                [&_figure.image]:my-8 [&_figure.image]:border [&_figure.image]:border-neutral-200 [&_figure.image]:bg-neutral-100 [&_figure.image]:overflow-hidden [&_figure.image]:shadow-xs
                [&_img]:w-full [&_img]:h-auto [&_img]:object-cover [&_img]:rounded-none
                [&_figure>img]:w-full [&_figure>img]:h-auto
                [&_figcaption]:text-xs [&_figcaption]:font-mono [&_figcaption]:text-neutral-500 [&_figcaption]:p-2.5 [&_figcaption]:text-center [&_figcaption]:border-t [&_figcaption]:border-neutral-200 [&_figcaption]:bg-neutral-50
                [&_figure.image-style-side]:sm:float-right [&_figure.image-style-side]:sm:max-w-sm [&_figure.image-style-side]:sm:ml-6 [&_figure.image-style-side]:sm:mb-6
                [&_figure.image-style-align-left]:sm:float-left [&_figure.image-style-align-left]:sm:max-w-sm [&_figure.image-style-align-left]:sm:mr-6 [&_figure.image-style-align-left]:sm:mb-6
                [&_figure.image-style-align-right]:sm:float-right [&_figure.image-style-align-right]:sm:max-w-sm [&_figure.image-style-align-right]:sm:ml-6 [&_figure.image-style-align-right]:sm:mb-6
                [&_figure.image-style-align-center]:mx-auto
                [&_figure.media]:my-8 [&_figure.media]:aspect-video [&_figure.media]:w-full
                [&_iframe]:w-full [&_iframe]:aspect-video [&_iframe]:border [&_iframe]:border-neutral-200
                [&_table]:w-full [&_table]:border-collapse [&_table]:border [&_table]:border-neutral-200 [&_table]:my-6 [&_table]:text-sm [&_table]:text-neutral-800
                [&_figure.table]:overflow-x-auto [&_figure.table]:my-6
                [&_th]:bg-neutral-100 [&_th]:border [&_th]:border-neutral-200 [&_th]:p-3 [&_th]:text-left [&_th]:font-bold [&_th]:text-neutral-900 [&_th]:text-xs [&_th]:uppercase [&_th]:tracking-wider
                [&_td]:border [&_td]:border-neutral-200 [&_td]:p-3 [&_td]:text-neutral-700
                [&_tr:nth-child(even)]:bg-neutral-50/50
                [&_hr]:my-10 [&_hr]:border-0 [&_hr]:border-t [&_hr]:border-neutral-200
                [&_ul.todo-list]:list-none [&_ul.todo-list]:pl-0
                [&_ul.todo-list_li]:flex [&_ul.todo-list_li]:items-start [&_ul.todo-list_li]:gap-2"
              dangerouslySetInnerHTML={{ __html: sanitizedArticle }}
            />
          ) : (
            <div className="p-8 border border-neutral-200 bg-white text-center text-neutral-500 font-mono text-sm shadow-xs rounded-none">
              No article content available for this project.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
