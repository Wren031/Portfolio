export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Experience {
  year: string;
  role: string;
  company: string;
  desc: string;
}

export interface ProjectLinks {
  demo?: string;
  repo?: string;
}

export interface Project {
  title: string;
  tag: string;
  desc: string;
  tech: string[];
  color: string;
  loc: string;
  commits: number;
  image: string;
  links: ProjectLinks;
}

export interface Service {
  icon: string;
  title: string;
  desc: string;
}
