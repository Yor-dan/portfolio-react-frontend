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
