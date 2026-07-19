import type { Route } from './+types/home';
import { useLoaderData } from 'react-router';
import Hero, { HeroLoader } from '~/components/Hero';

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
  return {
    hero: await HeroLoader(),
  };
}

export default function Home() {
  const { hero } = useLoaderData<typeof loader>();

  return (
    <div className="hero">
      <Hero {...hero} />
    </div>
  );
}
