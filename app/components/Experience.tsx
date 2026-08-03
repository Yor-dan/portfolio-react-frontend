import { formatMonthYear } from '~/utils';

type ExperienceProps = {
  title: string;
  organization: string;
  startDate: string;
  endDate?: string;
  description: string;
  orgLogo: string;
};

export type StrapiExperience = Omit<ExperienceProps, 'orgLogo'> & {
  orgLogo: { url: string };
};

export default function Experience({
  title,
  organization,
  startDate,
  endDate,
  description,
  orgLogo,
}: ExperienceProps) {
  return (
    <div className="experience relative pl-8 sm:pl-10 pb-12 last:pb-0 group">
      {/* Vertical Timeline Line */}
      <div className="absolute left-[15px] sm:left-[19px] top-4 bottom-0 w-px bg-neutral-200 group-last:hidden" />
      
      {/* Node Marker */}
      <div className="absolute left-[12px] sm:left-[16px] top-2.5 w-2.5 h-2.5 bg-neutral-900 border-2 border-neutral-900 group-hover:bg-white transition-colors rounded-none" />

      {/* Card Content */}
      <div className="bg-white border border-neutral-200 p-6 sm:p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 rounded-none">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-4">
            {orgLogo && (
              <div className="w-12 h-12 flex items-center justify-center border border-neutral-200 p-1.5 bg-neutral-50 rounded-none flex-shrink-0">
                <img
                  src={orgLogo}
                  alt={organization + ' Logo'}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-neutral-900 tracking-tight">{title}</h3>
              <h4 className="text-sm font-medium text-neutral-600">{organization}</h4>
            </div>
          </div>
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 bg-neutral-50 px-3 py-1.5 border border-neutral-200 self-start sm:self-auto rounded-none">
            <time dateTime={startDate}>{formatMonthYear(startDate)}</time>
            {' — '}
            {endDate ? (
              <time dateTime={endDate}>{formatMonthYear(endDate)}</time>
            ) : (
              <span className="font-bold text-neutral-900">Present</span>
            )}
          </div>
        </div>
        <p className="text-neutral-700 text-sm sm:text-base leading-relaxed whitespace-pre-line font-sans">
          {description}
        </p>
      </div>
    </div>
  );
}

