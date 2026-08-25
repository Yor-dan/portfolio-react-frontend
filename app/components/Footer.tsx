import { useRouteLoaderData } from 'react-router';
import type { Route } from '../+types/root';
import Link, { type LinkProps } from '~/components/Link';

type FooterProps = {
  contacts?: LinkProps[];
  socials?: LinkProps[];
};

export default function Footer({
  contacts: propContacts,
  socials: propSocials,
}: FooterProps = {}) {
  const rootData = useRouteLoaderData<Route.ComponentProps['loaderData']>('root');

  const contacts = propContacts ?? rootData?.contacts ?? [];
  const socials = propSocials ?? rootData?.socials ?? [];

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
        {(contacts && contacts.length > 0) ||
        (socials && socials.length > 0) ? (
          <div className="flex flex-col sm:flex-row gap-4">
            {contacts && contacts.length > 0 && (
              <div className="contacts-container flex flex-wrap gap-3">
                {contacts.map((contact: LinkProps, index: number) => (
                  <Link
                    key={index}
                    {...contact}
                    iconUrl={contact.iconUrl || (contact as any).icon?.url}
                  />
                ))}
              </div>
            )}
            {socials && socials.length > 0 && (
              <div className="socials-container flex flex-wrap gap-3">
                {socials.map((social: LinkProps, index: number) => (
                  <Link
                    key={index}
                    {...social}
                    iconUrl={social.iconUrl || (social as any).icon?.url}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <p className="text-xs text-neutral-500 font-mono">
            Yordan Bian Portfolio Website
          </p>
        )}
      </div>
    </footer>
  );
}

