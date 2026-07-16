import type { Route } from './+types/home';
import { useLoaderData } from 'react-router';
import Hero from '~/components/Hero';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Yordan Bian's Personal Portfolio" },
    {
      name: 'description',
      content: "Yordan's journey and things he built along the way.",
    },
  ];
}

export async function loader() {
  const res = await fetch(`${process.env.STRAPI_URL}/api/her`);

  if (!res.ok) {
    console.error('Error fetching hero data:', res.statusText);
  }

  const payload = await res.json();
  const hero = payload?.data || {};

  return {
    title: hero.title || 'Yordan Bian',
    subtitle: hero.subtitle || 'A Software Engineer',
    eyebrow: hero.eyebrow || null,
  };
}

export default function Home() {
  const { title, subtitle, eyebrow } = useLoaderData<typeof loader>();

  return (
    <div className="hero">
      <Hero {...{ title, subtitle, eyebrow }} />
    </div>
  );
}
