import { useRouteLoaderData } from 'react-router';
import type { Route } from '../+types/root';
import Link, { type LinkProps } from '~/components/Link';

export default function Footer() {
  const rootData =
    useRouteLoaderData<Route.ComponentProps['loaderData']>('root');
  let footerContent: React.ReactNode;

  if (!rootData) {
    footerContent = (
      <p className="text-xs text-neutral-500 font-mono">
        Links not available at the moment.
      </p>
    );
  } else {
    const contacts = rootData.contacts;
    const socials = rootData.socials;

    footerContent = (
      <div className="flex flex-col sm:flex-row gap-4">
        {contacts.length > 0 && (
          <div className="contacts-container flex flex-wrap gap-3">
            {contacts.map((contact: LinkProps, index: number) => (
              <Link
                key={index}
                {...contact}
                iconUrl={contact.iconUrl || (contact as any).icon.url}
              />
            ))}
          </div>
        )}
        {socials.length > 0 && (
          <div className="socials-container flex flex-wrap gap-3">
            {socials.map((social: LinkProps, index: number) => (
              <Link
                key={index}
                {...social}
                iconUrl={social.iconUrl || (social as any).icon.url}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <footer className="bg-neutral-900 text-neutral-300 py-16 px-6 border-t border-neutral-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight uppercase font-sans">
            Yordan Bian
          </h3>
          <p className="text-xs font-mono text-neutral-400 mt-1">
            © {new Date().getFullYear()} — Portfolio
          </p>
        </div>
        {footerContent}
      </div>
    </footer>
  );
}
