import { formatMonthYear } from '~/utils';

type TrainingProps = {
  name: string;
  organizer: string;
  startDate: string;
  endDate: string;
  iconUrl: string;
  description: string;
};

export default function Training({
  name,
  organizer,
  startDate,
  endDate,
  iconUrl,
  description,
}: TrainingProps) {
  return (
    <div className="training-item bg-white border border-neutral-200 p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 rounded-none">
      <div className="flex items-center gap-4 mb-4">
        {iconUrl && (
          <div className="w-10 h-10 flex items-center justify-center border border-neutral-200 bg-neutral-50 p-1.5 flex-shrink-0 rounded-none">
            <img
              src={iconUrl}
              alt={`${organizer} icon`}
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}
        <div>
          <h3 className="text-base font-bold text-neutral-900 leading-tight font-sans">{name}</h3>
          <p className="text-xs font-medium text-neutral-500 mt-0.5">{organizer}</p>
        </div>
      </div>
      <div className="text-xs font-mono text-neutral-500 mb-3 bg-neutral-50 p-2 border border-neutral-100 inline-block rounded-none">
        <time dateTime={startDate}>{formatMonthYear(startDate)}</time>
        {' - '}
        {endDate ? (
          <time dateTime={endDate}>{formatMonthYear(endDate)}</time>
        ) : (
          <span className="font-bold text-neutral-900">Present</span>
        )}
      </div>
      <p className="text-sm text-neutral-600 leading-relaxed font-sans">{description}</p>
    </div>
  );
}

