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
  { title: "Landing Pages", desc: "Fast, responsive landing pages optimized for accessibility and Core Web Vitals." },
  { title: "Web Applications", desc: "Maintainable web applications built around clear user flows and reliable data." },
  { title: "API Development", desc: "Structured REST APIs with authentication, validation, and practical documentation." },
  { title: "Performance Audits", desc: "Focused reviews of loading, rendering, and bundle performance with actionable fixes." },
  { title: "Code Reviews", desc: "Practical code reviews that improve readability, reliability, and long-term maintenance." },
  { title: "Full-Stack Delivery", desc: "End-to-end implementation from interface planning through deployment and support." },
];
