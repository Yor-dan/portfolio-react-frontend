// Contacts and socials

export type LinkProps = {
  platform: string;
  url: string;
  category: 'contact' | 'social';
  logoUrl: string;
};

export default function Link({ platform, url, logoUrl }: LinkProps) {
  return (
    <div>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img src={logoUrl} alt={platform + ' Icon'} />
      </a>
    </div>
  );
}
