import resume from './resume.json';

export const SITE = {
  title: 'Ivan Arias',
  description: 'Ivan Arias, GIS Analyst in Den Haag: geospatial data & Web GIS. Maps and spatial tools built with Python, PostGIS and Leaflet.',
  email: resume.email,
  twitter: '@hcoco1',
};

/** schema.org Person for JSON-LD (`site` is Astro.site). Pages link to it by its `@id`. */
export const person = (site: URL) => {
  const [city, country] = resume.location.split(', ');
  return {
    '@type': 'Person',
    '@id': new URL('/#person', site).href,
    name: resume.name,
    jobTitle: resume.role,
    url: site.href,
    address: { '@type': 'PostalAddress', addressLocality: city, addressCountry: country },
    sameAs: [resume.links.github, resume.links.linkedin, resume.links.twitter],
  };
};

export type NavId = 'home' | 'projects' | 'writing' | 'about';

export const NAV: { id: NavId; label: string; href: string }[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'projects', label: 'Projects', href: '/projects/' },
  { id: 'writing', label: 'Writing', href: '/blog/' },
  { id: 'about', label: 'About', href: '/about/' },
];
