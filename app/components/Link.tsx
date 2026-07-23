// Socials and external links

type LinkProps = {
  platform: string;
  url: string;
  logoUrl: string;
};

export async function LinksLoader(): Promise<LinkProps[] | []> {
  try {
    const res = await fetch(`${process.env.STRAPI_URL}/api/links`);
    const payload = await res.json();
    return payload.data;
  } catch (error) {
    console.error('Error fetching "Links" data:', error);
    return [];
  }
}

export default function Link({ platform, url, logoUrl }: LinkProps) {
  return (
    <div>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img src={logoUrl} alt={platform + ' Logo'} />
      </a>
    </div>
  );
}
