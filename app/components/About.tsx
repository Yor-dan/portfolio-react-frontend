export async function AboutLoader(): Promise<string> {
  try {
    const res = await fetch(`${process.env.STRAPI_URL}/api/about`);
    const payload = await res.json();
    return payload.data.about;
  } catch (error) {
    console.error('Error fetching "About" data:', error);
    return 'Hello, There👋. I am Yordan! a computer science graduate with a passion for full-stack development.';
  }
}

export default function About({ about }: { about: string }) {
  return <p>{about}</p>;
}
