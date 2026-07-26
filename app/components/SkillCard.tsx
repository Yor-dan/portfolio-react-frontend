export type SkillCardProps = {
  name: string;
  cdn: string;
};

export default function SkillCard({ name, cdn }: SkillCardProps) {
  return (
    <div className="skill-card">
      <img src={cdn} alt={`${name} Icon`} />
      <h3>{name}</h3>
    </div>
  );
}
