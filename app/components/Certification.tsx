import { formatMonthYear } from '~/utils';

type CertificationProps = {
  iconUrl: string;
  name: string;
  issuer: string;
  validFrom: string;
  validUntil: string;
  url: string;
  description?: string;
};

export default function Certification({
  iconUrl,
  name,
  issuer,
  validFrom,
  validUntil,
  url,
  description,
}: CertificationProps) {
  return (
    <div className="certification-item">
      <img src={iconUrl} alt={`${issuer} icon`} />
      <h3>{name}</h3>
      <p>{issuer}</p>
      <p>
        Valid: <time dateTime={validFrom}>{formatMonthYear(validFrom)}</time> -{' '}
        <time dateTime={validUntil}>{formatMonthYear(validUntil)}</time>
      </p>
      {description && <p>{description}</p>}
      <a href={url} target="_blank" rel="noopener noreferrer">
        Credential ↗️
      </a>
    </div>
  );
}
