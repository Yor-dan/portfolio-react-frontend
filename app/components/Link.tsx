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
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img src={iconUrl} alt={platform + ' Icon'} />
      </a>
    </div>
  );
}
