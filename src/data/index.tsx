import { Skill, SkillCategory, Service } from "../types";

export { NAV_LINKS } from "./nav";
export { EXPERIENCE } from "./experience";
export { PROJECTS } from "./projects";
export { TECH_STACK } from "./techStack";

export const SKILLS: Skill[] = [
  { name: "HTML & CSS", level: 95 },
  { name: "JavaScript", level: 92 },
  { name: "React", level: 90 },
    { name: "React Native", level: 85 },
  { name: "Node.js", level: 82 },
  { name: "Git & GitHub", level: 88 },
  { name: "REST APIs", level: 85 },

];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML/CSS"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Nest.js", "Express",],
  },
  {
    category: "Mobile",
    skills: ["React Native", "Flutter", "Android Studio"],
  },
  {
    category: "Database",
    skills: ["PostgreSQL", "MS Access", "PocketBase", "Supabase"],
  },
  {
    category: "Cloud & DevOps",
    skills: ["Docker", "Git", "Vercel", "Netlify", "Render"],
  },
  {
    category: "Tools & Design",
    skills: ["Figma", "VS Code"],
  },
];

export const SERVICES: Service[] = [
  { icon: "⬡", title: "Landing Pages", desc: "Fast, pixel-perfect landing pages optimised for conversions and Core Web Vitals." },
  { icon: "◈", title: "Web Apps", desc: "Full-featured SPAs and PWAs built with React, Vue, or vanilla JS — clean and maintainable." },
  { icon: "⬢", title: "API Development", desc: "RESTful and GraphQL APIs with auth, rate-limiting, and full documentation." },
  { icon: "◉", title: "Performance Audits", desc: "Lighthouse deep-dives, bundle analysis, and actionable improvements to speed up your site." },
  { icon: "⬟", title: "Code Reviews", desc: "Thorough pull request reviews, refactoring advice, and best-practice guidance for your team." },
  { icon: "◆", title: "Freelance Dev", desc: "End-to-end freelance projects from wireframe to live deployment with ongoing support." },
];
