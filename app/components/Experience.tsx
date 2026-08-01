import { formatMonthYear } from '~/utils';

type ExperienceProps = {
  title: string;
  organization: string;
  startDate: string;
  endDate?: string;
  description: string;
  orgLogo: string;
};

export type StrapiExperience = Omit<ExperienceProps, 'orgLogo'> & {
  orgLogo: { url: string };
};

export default function Experience({
  title,
  organization,
  startDate,
  endDate,
  description,
  orgLogo,
}: ExperienceProps) {
  return (
    <div className="experience">
      <h3>{title}</h3>
      <h4>{organization}</h4>
      <img src={orgLogo} alt={organization + ' Logo'} />
      <div>
        <time dateTime={startDate}>{formatMonthYear(startDate)}</time>
        {' - '}
        {endDate ? (
          <time dateTime={endDate}>{formatMonthYear(endDate)}</time>
        ) : (
          <span>Present</span>
        )}
      </div>
      <p>{description}</p>
    </div>
  );
}
