type SkillCardProps = {
  name: string;
  cdn: string;
};

export async function SkillsLoader(): Promise<SkillCardProps[] | []> {
  try {
    const res = await fetch(`${process.env.STRAPI_URL}/api/skills`);
    const payload = await res.json();
    return payload.data;
  } catch (error) {
    console.error('Error fetching "Skills" data:', error);
    return [];
  }
}

export default function SkillCard({ name, cdn }: SkillCardProps) {
  return (
    <div className="skill-card">
      <img src={cdn} alt={`${name} Icon`} />
      <h3>{name}</h3>
    </div>
  );
}
