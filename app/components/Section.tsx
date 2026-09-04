type SectionProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function Section({ title, subtitle, children }: SectionProps) {
  return (
    <section className="gsap-section py-20 px-6 max-w-6xl mx-auto border-t border-neutral-200">
      <div className="mb-12">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 uppercase font-sans">
            {title}
          </h2>
          <div className="h-px bg-neutral-200 flex-1" />
        </div>
        {subtitle && (
          <p className="mt-2 text-base md:text-lg text-neutral-500 font-sans italic">
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}
