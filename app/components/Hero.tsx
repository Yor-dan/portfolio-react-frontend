type HeroProps = {
  eyebrow?: string;
  title: string;
  subtitle: string;
};

export default function Hero({ eyebrow, title, subtitle }: HeroProps) {
  return (
    <section>
      {eyebrow && <span>{eyebrow}</span>}
      <h1>{title}</h1>
      <span>{subtitle}</span>
    </section>
  );
}
