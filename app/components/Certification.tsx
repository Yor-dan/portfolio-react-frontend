import { formatMonthYear } from '~/utils';

type CertificationProps = {
  name: string;
  issuer: string;
  validFrom: string;
  validUntil: string;
  url: string;
  description?: string;
};

export default function Certification({
  name,
  issuer,
  validFrom,
  validUntil,
  url,
  description,
}: CertificationProps) {
  return (
    <div className="certification-item">
      <h3>{name}</h3>
      <p>{issuer}</p>
      <p>Valid From: {formatMonthYear(validFrom)}</p>
      <p>Valid Until: {formatMonthYear(validUntil)}</p>
      {description && <p>{description}</p>}
      <a href={url} target="_blank" rel="noopener noreferrer">
        Credential ↗️
      </a>
    </div>
  );
}
