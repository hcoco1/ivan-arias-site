import resume from './resume.json';

export const SITE = {
  title: 'Ivan Arias',
  description: 'Ivan Arias, GIS Analyst: geospatial data & Web GIS. Maps and spatial tools built with Python, PostGIS and Leaflet.',
  email: resume.email,
  twitter: '@hcoco1',
};

export type NavId = 'home' | 'projects' | 'writing' | 'about';

export const NAV: { id: NavId; label: string; href: string }[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'projects', label: 'Projects', href: '/projects/' },
  { id: 'writing', label: 'Writing', href: '/blog/' },
  { id: 'about', label: 'About', href: '/about/' },
];
