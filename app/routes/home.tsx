import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Yordan Bian's Personal Portfolio" },
    {
      name: 'description',
      content: "Yordan's journey and things he built along the way.",
    },
  ];
}

export default function Home() {}
