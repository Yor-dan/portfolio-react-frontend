// types for Strapi returned data

export type Hero = {
  eyebrow: string;
  title: string;
  resume?: {
    url: string;
  };
};

export type Skill = {
  name: string;
  iconUrl: string;
};

export type Experience = {
  orgLogo: {
    url: string;
  };
  title: string;
  organization: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type Project = {
  id: number;
  title: string;
  slug: string;
  description: string;
  date: string;
  liveUrl?: string;
  githubUrl?: string;
  thumbnail: {
    url: string;
  };
  article: string;
};

export type Certification = {
  iconUrl: string;
  name: string;
  issuer: string;
  validFrom: string;
  validUntil: string;
  url: string;
  description?: string;
};

export type Training = {
  name: string;
  organizer: string;
  startDate: string;
  endDate: string;
  iconUrl: string;
  description: string;
};
