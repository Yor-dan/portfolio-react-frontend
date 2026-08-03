type HeroProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
};

export default function Hero({ eyebrow, title, subtitle }: HeroProps) {
  const currentYear = new Date().getFullYear();
  const displayEyebrow = eyebrow || `PORTFOLIO / ${currentYear}`;
  const displayTitle = title || 'Yordan Bian';
  const displaySubtitle = subtitle || 'Full-Stack Developer';

  return (
    <section className="hero-container relative min-h-[85vh] sm:min-h-screen flex flex-col justify-center items-start px-6 max-w-6xl mx-auto py-20 bg-grid-pattern overflow-hidden">
      <div className="hero-content relative z-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-neutral-300 bg-white text-xs font-mono uppercase tracking-widest text-neutral-600 mb-8 shadow-sm rounded-none">
          <span className="w-2 h-2 bg-neutral-900 inline-block animate-pulse" />
          {displayEyebrow}
        </div>
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-neutral-900 mb-6 uppercase leading-none font-sans">
          {displayTitle}
        </h1>
        <p className="text-xl sm:text-2xl text-neutral-600 font-normal leading-relaxed mb-10 max-w-2xl">
          {displaySubtitle}
        </p>
        <div>
          <a
            href="#resume"
            className="inline-flex items-center gap-3 bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-sm px-7 py-4 border border-neutral-900 shadow-sm hover:shadow-md transition-all rounded-none group"
          >
            <span>Download resume</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-y-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>
      
      <div className="absolute right-6 bottom-10 hidden md:block text-right pointer-events-none">
        <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest">SCROLL TO EXPLORE</div>
        <div className="w-px h-12 bg-neutral-300 ml-auto mt-2 animate-bounce" />
      </div>
    </section>
  );
}

