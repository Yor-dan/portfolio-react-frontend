export type SkillCardProps = {
  name: string;
  iconUrl: string;
};

export default function SkillCard({ name, iconUrl }: SkillCardProps) {
  return (
    <div className="skill-card bg-white border border-neutral-200 p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md hover:border-neutral-400 group rounded-none">
      <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-neutral-50 border border-neutral-100 p-3 group-hover:bg-white group-hover:scale-105 transition-all duration-300">
        <img
          src={iconUrl}
          alt={`${name} Icon`}
          className="w-full h-full object-contain transition-all duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>
      <h3 className="text-sm font-semibold text-neutral-800 tracking-wide text-center uppercase font-sans">
        {name}
      </h3>
    </div>
  );
}

