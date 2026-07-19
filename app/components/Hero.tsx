type HeroProps = {
  eyebrow?: string;
  title: string;
  subtitle: string;
};

export async function HeroLoader() {
  const res = await fetch(`${process.env.STRAPI_URL}/api/hero`);

  if (!res.ok) {
    console.error('Error fetching hero data:', res.statusText);
  }

  const payload = await res.json();
  const hero = payload?.data || {};

  return {
    title: hero.title || 'Yordan Bian',
    subtitle: hero.subtitle || 'A Software Engineer',
    eyebrow: hero.eyebrow || null,
  };
}

export default function Hero({ eyebrow, title, subtitle }: HeroProps) {
  return (
    <section>
      {eyebrow && <span>{eyebrow}</span>}
      <h1>{title}</h1>
      <span>{subtitle}</span>
    </section>
  );
}
