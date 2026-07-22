type HeroProps = {
  eyebrow?: string | null;
  title: string;
  subtitle: string;
};

export async function HeroLoader(): Promise<HeroProps> {
  try {
    const res = await fetch(`${process.env.STRAPI_URL}/api/hero`);

    const payload = await res.json();
    const hero = payload.data;

    return {
      title: hero.title,
      subtitle: hero.subtitle,
      eyebrow: hero.eyebrow,
    };
  } catch (error) {
    console.error('Error fetching "Hero" data:', error);

    return {
      title: 'Yordan Bian',
      subtitle: 'A Software Engineer',
      eyebrow: null,
    };
  }
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
