import { Project } from "../types";

import inventoryImg from "../assets/project/inventory.png";
import clansImg from "../assets/project/clans.png";
import dermaImg from "../assets/project/dermatologies.png";
import profiberImg from "../assets/project/profiber.png";
import screenshotImg from "../assets/project/Screenshot 2026-06-29 080042.png";

export const PROJECTS: Project[] = [
  {
    title: "POS & Inventory Management System",
    tag: "Desktop Application",
    desc: "A desktop-based Point of Sale and Inventory Management System developed in Java using NetBeans with Microsoft Access as the database. The system streamlines sales transactions, inventory tracking, product management, customer records, supplier management, and sales reporting.",
    tech: ["Java", "NetBeans", "Java Swing", "MS Access", "JDBC"],
    color: "#00ffe1",
    loc: "15k",
    commits: 156,
    image: inventoryImg,
    links: {
      demo: "#",
      repo: "#",
    },
  },
  {
    title: "ClanHub",
    tag: "Web App",
    desc: "A community platform for gaming clans with match scheduling, member rankings, chat rooms, and tournament brackets.",
    tech: ["React", "Node.js", "MongoDB", "Socket.io"],
    color: "#ff2d78",
    loc: "6.8k",
    commits: 132,
    image: clansImg,
    links: {
      demo: "https://clans-web.vercel.app/",
      repo: "#",
    },
  },
  {
    title: "DermaCare Clinic",
    tag: "Web App",
    desc: "A dermatology clinic management system with appointment booking, patient records, prescription management, and telehealth integration.",
    tech: ["Next.js", "PostgreSQL", "Tailwind CSS", "Prisma"],
    color: "#a259ff",
    loc: "2.1k",
    commits: 54,
    image: dermaImg,
    links: {
      demo: "https://clinic-derma.vercel.app/",
      repo: "#", 
    },
  },
  {
    title: "ProFiber ISP",
    tag: "Web App",
    desc: "An ISP customer portal with plan comparison, service requests, billing dashboard, and network status monitoring.",
    tech: ["Vue.js", "Express", "Redis", "Docker"],
    color: "#ffd60a",
    loc: "1.4k",
    commits: 38,
    image: profiberImg,
    links: {
      demo: "https://pro-fiber-59bl.vercel.app/",
      repo: "#", // Replace with GitHub repo if public
    },
  },
  {
    title: "TaskFlow",
    tag: "SaaS MVP",
    desc: "A Kanban-style project management application featuring drag-and-drop functionality, real-time collaboration, and team workspaces.",
    tech: ["React", "Socket.io", "PostgreSQL", "JWT"],
    color: "#00ffe1",
    loc: "8.3k",
    commits: 201,
    image: screenshotImg,
    links: {
      demo: "#",
      repo: "#", // Replace with GitHub repo if available
    },
  },
];