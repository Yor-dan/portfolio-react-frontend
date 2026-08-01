import { formatMonthYear } from '~/utils';

type TrainingProps = {
  name: string;
  organizer: string;
  startDate: string;
  endDate: string;
  iconUrl: string;
  description: string;
};

export default function Training({
  name,
  organizer,
  startDate,
  endDate,
  iconUrl,
  description,
}: TrainingProps) {
  return (
    <div className="training-item">
      <img src={iconUrl} alt={`${organizer} icon`} />
      <h3>{name}</h3>
      <p>{organizer}</p>
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
