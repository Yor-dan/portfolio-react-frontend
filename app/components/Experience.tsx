type ExperienceListItemProps = {
  title: string;
  organization: string;
  startDate: string;
  endDate?: string;
  description: string;
  orgLogo: string;
};

export type StrapiExperience = Omit<ExperienceListItemProps, 'orgLogo'> & {
  orgLogo: { url: string };
};

export async function ExperiencesLoader(): Promise<StrapiExperience[] | []> {
  try {
    const res = await fetch(
      `${process.env.STRAPI_URL}/api/experiences?populate=orgLogo`,
    );
    const payload = await res.json();
    return payload.data;
  } catch (error) {
    console.error('Error fetching "Experiences" data:', error);
    return [];
  }
}

export default function ExperienceListItem({
  title,
  organization,
  startDate,
  endDate,
  description,
  orgLogo,
}: ExperienceListItemProps) {
  return (
    <div className="experience">
      <h3>{title}</h3>
      <h4>{organization}</h4>
      <img src={orgLogo} alt={organization + ' Logo'} />
      <time>
        {startDate} - {endDate || 'Present'}
      </time>
      <p>{description}</p>
    </div>
  );
}
