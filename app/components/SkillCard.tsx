export type SkillCardProps = {
  name: string;
  iconUrl: string;
};

export default function SkillCard({ name, iconUrl }: SkillCardProps) {
  return (
    <div className="skill-card">
      <img src={iconUrl} alt={`${name} Icon`} />
      <h3>{name}</h3>
    </div>
  );
}
