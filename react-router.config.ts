import type { Config } from '@react-router/dev/config';

export default {
  // Config options...
  ssr: false,

  prerender: [
    '/',
    '/projects',
    '/projects/',
    '/projects/portfolio-website-with-cms',
    '/projects/strava-dashboard-using-grafana',
  ],
} satisfies Config;
