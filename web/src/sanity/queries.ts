import { defineQuery, type PortableTextBlock } from "next-sanity";

export const HOME_QUERY = defineQuery(`{
  "about": *[_type == "about"][0]{
    name,
    location,
    status,
    oneLiner,
    shortBio,
    longBio,
    work[]{ _key, role, org, location, dates, description },
    education[]{ _key, degree, institution, years },
    skills[]{ _key, category, items },
    email,
    github,
    linkedin
  },
  "projects": *[_type == "project" && defined(slug.current)] | order(order asc){
    _id,
    title,
    "slug": slug.current,
    card,
    tags,
    url,
    year,
    screenshot{ alt, asset },
    "hasDetail": count(coalesce(detail, [])) > 0
  },
  "other": *[_type == "otherProject"] | order(year desc){
    _id,
    title,
    url,
    year
  }
}`);

export const PROJECT_QUERY = defineQuery(
  `*[_type == "project" && slug.current == $slug && count(coalesce(detail, [])) > 0][0]{
    _id,
    title,
    card,
    url,
    detail,
    stack
  }`
);

export const DETAIL_SLUGS_QUERY = defineQuery(
  `*[_type == "project" && defined(slug.current) && count(coalesce(detail, [])) > 0].slug.current`
);

export interface WorkEntry {
  _key: string;
  role: string;
  org: string | null;
  location: string | null;
  dates: string | null;
  description: string | null;
}

export interface EducationEntry {
  _key: string;
  degree: string;
  institution: string | null;
  years: string | null;
}

export interface SkillGroup {
  _key: string;
  category: string;
  items: string | null;
}

export interface About {
  name: string;
  location: string | null;
  status: string | null;
  oneLiner: string | null;
  shortBio: string | null;
  longBio: PortableTextBlock[] | null;
  work: WorkEntry[] | null;
  education: EducationEntry[] | null;
  skills: SkillGroup[] | null;
  email: string | null;
  github: string | null;
  linkedin: string | null;
}

export interface Screenshot {
  alt: string | null;
  asset: { _ref: string; _type: string } | null;
}

export interface ProjectCard {
  _id: string;
  title: string;
  slug: string;
  card: string;
  tags: string[] | null;
  url: string;
  year: number | null;
  screenshot: Screenshot | null;
  hasDetail: boolean;
}

export interface OtherProject {
  _id: string;
  title: string;
  url: string;
  year: number;
}

export interface HomeData {
  about: About | null;
  projects: ProjectCard[];
  other: OtherProject[];
}

export interface ProjectDetail {
  _id: string;
  title: string;
  card: string;
  url: string;
  detail: PortableTextBlock[];
  stack: string | null;
}
