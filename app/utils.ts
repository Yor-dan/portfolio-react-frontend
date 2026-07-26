import qs from 'qs';

export const portfolioQuery = qs.stringify(
  {
    populate: {
      hero: true,
      skills: {
        populate: '*',
      },
      experiences: {
        populate: '*',
      },
      projects: {
        populate: '*',
      },
      certifications: {
        populate: '*',
      },
      contacts: {
        populate: '*',
      },
      socials: {
        populate: '*',
      },
    },
  },
  {
    encodeValuesOnly: true,
  },
);

// Use case: "2025-07-01" -> "July 2025"
export const formatMonthYear = (dateString: string): string => {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC', // prevent timezone bugs
  }).format(date);
};
