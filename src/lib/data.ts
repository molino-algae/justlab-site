// Typed access to the YAML data files. Import from here, not the .yaml directly,
// so pages get real types and autocomplete.
import siteRaw from "../data/site.yaml";
import publicationsRaw from "../data/publications.yaml";
import alumniRaw from "../data/alumni.yaml";

export interface NavItem {
  label: string;
  href: string;
}
export interface Affiliation {
  name: string;
  short: string;
  logo: string;
  url: string;
}
export interface SiteData {
  name: string;
  acronym: string;
  tagline: string;
  description: string;
  department: string;
  institution: string;
  address: { lines: string[]; maps?: string };
  email: string;
  nav: NavItem[];
  affiliations: Affiliation[];
  socials: Record<string, string>;
  openScience: boolean;
}

export interface Publication {
  doi: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  volume?: string;
  pages?: string;
  note?: string;
  type: "article" | "review" | "preprint" | "chapter" | "thesis";
  featured?: boolean;
  areas?: string[];
  highlight?: string;
}

export interface AlumnusUG {
  name: string;
  institution: string;
  period: string;
}
export interface AlumnusG extends AlumnusUG {
  level: string;
}
export interface AlumniData {
  undergraduate: AlumnusUG[];
  graduate: AlumnusG[];
}

export const site = siteRaw as SiteData;
export const publications = publicationsRaw as Publication[];
export const alumni = alumniRaw as AlumniData;
