import { formatMonthYear } from '~/utils';

type CertificationProps = {
  iconUrl: string;
  name: string;
  issuer: string;
  validFrom: string;
  validUntil: string;
  url: string;
  description?: string;
};

export default function Certification({
  iconUrl,
  name,
  issuer,
  validFrom,
  validUntil,
  url,
  description,
}: CertificationProps) {
  return (
    <div className="certification-item bg-white border border-neutral-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 rounded-none">
      <div>
        <div className="flex items-center gap-4 mb-4">
          {iconUrl && (
            <div className="w-10 h-10 flex items-center justify-center border border-neutral-200 bg-neutral-50 p-1.5 flex-shrink-0 rounded-none">
              <img
                src={iconUrl}
                alt={`${issuer} icon`}
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          )}
          <div>
            <h3 className="text-base font-bold text-neutral-900 leading-tight font-sans">{name}</h3>
            <p className="text-xs font-medium text-neutral-500 mt-0.5">{issuer}</p>
          </div>
        </div>
        <p className="text-xs font-mono text-neutral-500 mb-3 bg-neutral-50 p-2 border border-neutral-100 inline-block rounded-none">
          Valid: <time dateTime={validFrom}>{formatMonthYear(validFrom)}</time> -{' '}
          <time dateTime={validUntil}>{formatMonthYear(validUntil)}</time>
        </p>
        {description && <p className="text-sm text-neutral-600 mb-4 font-sans">{description}</p>}
      </div>
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-bold text-neutral-900 hover:text-neutral-600 uppercase tracking-wider underline underline-offset-4 mt-2 self-start"
        >
          Credential ↗
        </a>
      )}
    </div>
  );
}

