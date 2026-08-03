type SectionProps = {
  title: string;
  children: React.ReactNode;
};

export default function Section({ title, children }: SectionProps) {
  return (
    <section className="gsap-section py-20 px-6 max-w-6xl mx-auto border-t border-neutral-200">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 uppercase font-sans">
          {title}
        </h2>
        <div className="h-px bg-neutral-200 flex-1" />
      </div>
      {children}
    </section>
  );
}

