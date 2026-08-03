// Contacts and socials

export type LinkProps = {
  platform: string;
  url: string;
  category: 'contact' | 'social';
  iconUrl: string;
};

export default function Link({ platform, url, iconUrl }: LinkProps) {
  return (
    <div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        title={platform}
        className="flex items-center gap-2.5 bg-white border border-neutral-200 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-neutral-800 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all shadow-sm rounded-none group"
      >
        {iconUrl && (
          <img
            src={iconUrl}
            alt={platform + ' Icon'}
            className="w-4 h-4 object-contain filter group-hover:invert transition-all"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        )}
        <span>{platform}</span>
      </a>
    </div>
  );
}

