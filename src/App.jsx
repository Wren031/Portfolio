import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home", "About", "Experience", "Portfolio", "Services", "Contact"];

const SKILLS = [
  { name: "HTML & CSS", level: 95 },
  { name: "JavaScript", level: 92 },
  { name: "React", level: 90 },
  { name: "Node.js", level: 82 },
  { name: "Git & GitHub", level: 88 },
  { name: "REST APIs", level: 85 },
];

const TECH_STACK = ["React","Next.js","JavaScript","TypeScript","Tailwind CSS","Node.js","Express","MongoDB","PostgreSQL","Git","Figma","Docker"];

const EXPERIENCE = [
  { year: "2023 – Present", role: "Frontend Web Developer", company: "Your Company", desc: "Building responsive, performant web applications using React and modern CSS. Collaborating with designers and backend teams to ship polished products." },
  { year: "2021 – 2023", role: "Junior Web Developer", company: "Previous Company", desc: "Developed and maintained client websites. Improved page load speeds by 35% through code splitting and lazy loading strategies." },
  { year: "2020 – 2021", role: "Web Development Intern", company: "Startup / Freelance", desc: "Built landing pages and small business websites. Learned version control, agile workflows, and client communication." },
];

const PROJECTS = [
  { title: "DevTracker", tag: "Productivity", desc: "A developer productivity dashboard to track coding sessions, set goals, and visualize GitHub activity in real time.", tech: ["React","Node.js","GitHub API","Chart.js"], color: "#00ffe1", loc: "4.2k", commits: 87 },
  { title: "SnapStore", tag: "E-Commerce", desc: "Full-stack online store with product filtering, cart system, Stripe checkout, and admin panel for inventory management.", tech: ["Next.js","MongoDB","Stripe","Tailwind"], color: "#ff2d78", loc: "6.8k", commits: 132 },
  { title: "CodePaste", tag: "Dev Tool", desc: "A syntax-highlighted code snippet sharing tool with expiring links, theme switcher, and one-click copy.", tech: ["React","Express","Redis","Prism.js"], color: "#a259ff", loc: "2.1k", commits: 54 },
  { title: "WeatherNow", tag: "API Project", desc: "Real-time weather web app with 7-day forecasts, geolocation, animated icons, and dark/light mode toggle.", tech: ["JavaScript","OpenWeather API","CSS3"], color: "#ffd60a", loc: "1.4k", commits: 38 },
  { title: "TaskFlow", tag: "SaaS MVP", desc: "Kanban-style project management tool with drag-and-drop, real-time collaboration via WebSockets, and team workspaces.", tech: ["React","Socket.io","PostgreSQL","JWT"], color: "#00ffe1", loc: "8.3k", commits: 201 },
  { title: "PortfolioGen", tag: "CLI Tool", desc: "An npm package that scaffolds a developer portfolio from a JSON config — deployed to Vercel in under 60 seconds.", tech: ["Node.js","CLI","Handlebars","npm"], color: "#ff2d78", loc: "900", commits: 29 },
];

const SERVICES = [
  { icon: "⬡", title: "Landing Pages", desc: "Fast, pixel-perfect landing pages optimised for conversions and Core Web Vitals." },
  { icon: "◈", title: "Web Apps", desc: "Full-featured SPAs and PWAs built with React, Vue, or vanilla JS — clean and maintainable." },
  { icon: "⬢", title: "API Development", desc: "RESTful and GraphQL APIs with auth, rate-limiting, and full documentation." },
  { icon: "◉", title: "Performance Audits", desc: "Lighthouse deep-dives, bundle analysis, and actionable improvements to speed up your site." },
  { icon: "⬟", title: "Code Reviews", desc: "Thorough pull request reviews, refactoring advice, and best-practice guidance for your team." },
  { icon: "◆", title: "Freelance Dev", desc: "End-to-end freelance projects from wireframe to live deployment with ongoing support." },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function AnimSection({ children, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(36px)", transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s` }}>
      {children}
    </div>
  );
}

function SkillBar({ skill }) {
  const [ref, inView] = useInView(0.3);
  return (
    <div ref={ref} style={{ marginBottom: "1.1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.45rem", fontSize: "0.87rem" }}>
        <span style={{ fontWeight: 500 }}>{skill.name}</span>
        <span style={{ color: "var(--muted)", fontVariantNumeric: "tabular-nums" }}>{skill.level}%</span>
      </div>
      <div style={{ height: "2px", background: "var(--border)", borderRadius: "99px", overflow: "hidden" }}>
        <div style={{ height: "100%", width: inView ? `${skill.level}%` : "0%", background: "linear-gradient(90deg,var(--cyan),var(--purple))", borderRadius: "99px", transition: "width 1.3s cubic-bezier(0.4,0,0.2,1)" }} />
      </div>
    </div>
  );
}

function TypeWriter({ words }) {
  const [idx, setIdx] = useState(0);
  const [sub, setSub] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[idx];
    const spd = del ? 50 : sub < word.length ? 90 : 1800;
    const t = setTimeout(() => {
      if (!del && sub === word.length) { setDel(true); return; }
      if (del && sub === 0) { setDel(false); setIdx((i) => (i + 1) % words.length); return; }
      setSub((s) => s + (del ? -1 : 1));
    }, spd);
    return () => clearTimeout(t);
  }, [sub, del, idx, words]);
  return <span style={{ color: "var(--cyan)" }}>{words[idx].slice(0, sub)}<span style={{ animation: "blink 1s step-end infinite" }}>|</span></span>;
}

export default function Portfolio() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.toLowerCase()));
    const obs = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1)); }), { threshold: 0.35 });
    sections.forEach((s) => s && obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => { document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  const handleSubmit = (e) => { e.preventDefault(); setSent(true); setForm({ name: "", email: "", message: "" }); setTimeout(() => setSent(false), 5000); };

  const tags = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.tag)))];
  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.tag === filter);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Outfit:wght@300;400;500;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{
          --bg:#040608;--bg2:#07090f;--card:#0b0e18;--card2:#0f1220;
          --border:rgba(255,255,255,0.06);
          --cyan:#00ffe1;--pink:#ff2d78;--purple:#a259ff;--yellow:#ffd60a;
          --text:#dde3f0;--muted:#55637a;
          --mono:'Fira Code',monospace;--ui:'Outfit',sans-serif;
        }
        html{scroll-behavior:smooth}
        body{background:var(--bg);color:var(--text);font-family:var(--ui);overflow-x:hidden}
        body::before{
          content:'';position:fixed;inset:0;z-index:0;pointer-events:none;
          background-image:linear-gradient(rgba(0,255,225,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,225,0.022) 1px,transparent 1px);
          background-size:52px 52px;
        }
        body::after{
          content:'';position:fixed;inset:0;z-index:0;pointer-events:none;
          background:radial-gradient(ellipse 80% 55% at 50% -5%,rgba(0,255,225,0.07) 0%,transparent 70%);
        }
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulseCyan{0%,100%{box-shadow:0 0 0 0 rgba(0,255,225,0.35)}50%{box-shadow:0 0 0 7px rgba(0,255,225,0)}}

        /* NAV */
        nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:0 clamp(1.5rem,5vw,4rem);height:66px;transition:all .3s}
        nav.scrolled{background:rgba(4,6,8,0.92);backdrop-filter:blur(20px);border-bottom:1px solid rgba(0,255,225,0.07)}
        .logo{font-family:var(--mono);font-size:.95rem;font-weight:600;color:var(--cyan);cursor:pointer;letter-spacing:.02em;display:flex;align-items:center;gap:.3rem}
        .logo-b{color:var(--muted)}
        .nav-ul{display:flex;gap:1.8rem;list-style:none}
        .nav-ul a{font-family:var(--mono);font-size:.76rem;color:var(--muted);cursor:pointer;transition:color .2s;text-decoration:none;letter-spacing:.03em}
        .nav-ul a::before{content:'./';color:var(--cyan);opacity:0;transition:opacity .2s}
        .nav-ul a:hover::before,.nav-ul a.on::before{opacity:1}
        .nav-ul a:hover,.nav-ul a.on{color:var(--cyan)}
        .nav-btn{font-family:var(--mono);font-size:.76rem;background:transparent;border:1px solid var(--cyan);color:var(--cyan);padding:.45rem 1.1rem;border-radius:4px;cursor:pointer;transition:background .2s,color .2s;letter-spacing:.04em}
        .nav-btn:hover{background:var(--cyan);color:#000}
        .hb{display:none;flex-direction:column;gap:5px;cursor:pointer;background:none;border:none;padding:4px}
        .hb span{display:block;width:22px;height:1.5px;background:var(--cyan);transition:.3s}
        .mm{display:none;position:fixed;inset:0;z-index:99;background:rgba(4,6,8,.98);backdrop-filter:blur(24px);flex-direction:column;align-items:center;justify-content:center;gap:2.5rem}
        .mm.open{display:flex}
        .mm a{font-family:var(--mono);font-size:1.8rem;font-weight:600;color:var(--text);cursor:pointer;text-decoration:none;transition:color .2s}
        .mm a::before{content:'> ';color:var(--cyan)}
        .mm a:hover{color:var(--cyan)}
        .mm-close{position:absolute;top:1.5rem;right:2rem;background:none;border:none;color:var(--muted);font-size:1.5rem;cursor:pointer;font-family:var(--mono)}

        /* SECTIONS */
        section{position:relative;z-index:1}
        .si{max-width:1100px;margin:0 auto;padding:7rem clamp(1.5rem,5vw,3rem)}
        .eye{font-family:var(--mono);font-size:.7rem;color:var(--cyan);letter-spacing:.14em;text-transform:uppercase;display:flex;align-items:center;gap:.5rem;margin-bottom:.75rem}
        .eye::before{content:'//';color:var(--muted)}
        h2{font-family:var(--ui);font-size:clamp(2rem,4vw,2.8rem);font-weight:800;letter-spacing:-.02em;line-height:1.1;margin-bottom:.9rem}
        .sub{color:var(--muted);line-height:1.7;max-width:520px;margin-bottom:3rem;font-size:.96rem}

        /* HERO */
        #home{min-height:100vh;display:flex;align-items:center;padding:0 clamp(1.5rem,8vw,9rem)}
        .badge{display:inline-flex;align-items:center;gap:.5rem;font-family:var(--mono);font-size:.7rem;color:var(--muted);background:var(--card);border:1px solid var(--border);padding:.35rem .9rem;border-radius:99px;margin-bottom:1.8rem;animation:fadeUp .6s ease .05s both}
        .dot{width:7px;height:7px;border-radius:50%;background:var(--cyan);animation:pulseCyan 2s ease infinite}
        .pre{font-family:var(--mono);font-size:.8rem;color:var(--muted);margin-bottom:1.1rem;animation:fadeUp .6s ease .1s both}
        .hn{font-family:var(--ui);font-size:clamp(3rem,7vw,5.8rem);font-weight:800;line-height:1;letter-spacing:-.03em;margin-bottom:.6rem;animation:fadeUp .6s ease .2s both}
        .hr{font-family:var(--mono);font-size:clamp(.95rem,2.2vw,1.3rem);margin-bottom:1.7rem;animation:fadeUp .6s ease .32s both}
        .hd{color:var(--muted);font-size:.98rem;line-height:1.75;max-width:500px;margin-bottom:2.2rem;animation:fadeUp .6s ease .42s both}
        .hbtns{display:flex;gap:.9rem;flex-wrap:wrap;animation:fadeUp .6s ease .5s both}
        .btn-p{font-family:var(--mono);font-size:.82rem;background:var(--cyan);color:#000;padding:.78rem 1.7rem;border:none;border-radius:4px;cursor:pointer;font-weight:600;transition:opacity .2s,transform .2s;letter-spacing:.04em}
        .btn-p:hover{opacity:.85;transform:translateY(-2px)}
        .btn-g{font-family:var(--mono);font-size:.82rem;background:transparent;color:var(--cyan);padding:.78rem 1.7rem;border:1px solid rgba(0,255,225,.3);border-radius:4px;cursor:pointer;transition:border-color .2s,background .2s;letter-spacing:.04em}
        .btn-g:hover{border-color:var(--cyan);background:rgba(0,255,225,.06)}
        .stats{display:flex;gap:3rem;margin-top:4rem;padding-top:2.2rem;border-top:1px solid var(--border);flex-wrap:wrap;animation:fadeUp .6s ease .6s both}
        .sv{font-family:var(--mono);font-size:2.1rem;font-weight:600;color:var(--cyan);line-height:1}
        .sl{font-size:.72rem;color:var(--muted);margin-top:.3rem;letter-spacing:.07em;text-transform:uppercase}

        /* ABOUT */
        #about{background:var(--bg2)}
        .ag{display:grid;grid-template-columns:1fr 1.15fr;gap:5rem;align-items:start}
        .cb{background:var(--card2);border:1px solid var(--border);border-radius:10px;overflow:hidden;font-family:var(--mono);font-size:.8rem}
        .ctb{display:flex;align-items:center;gap:.5rem;padding:.7rem 1rem;background:var(--card);border-bottom:1px solid var(--border)}
        .cd{width:10px;height:10px;border-radius:50%}
        .cf{margin-left:auto;font-size:.68rem;color:var(--muted)}
        .cbody{padding:1.4rem;line-height:2.1}
        .cm{color:var(--muted)}.ck{color:#79b8ff}.cs{color:#9ecbff}.cc{color:var(--cyan)}.cp{color:var(--purple)}.cpk{color:var(--pink)}.cy{color:var(--yellow)}
        .ind{display:inline-block;width:1.4rem}
        .tg{display:flex;flex-wrap:wrap;gap:.55rem;margin-top:1.8rem}
        .tt{font-family:var(--mono);font-size:.7rem;color:var(--cyan);border:1px solid rgba(0,255,225,.18);padding:.28rem .7rem;border-radius:4px;background:rgba(0,255,225,.04);letter-spacing:.04em;transition:background .2s,border-color .2s;cursor:default}
        .tt:hover{background:rgba(0,255,225,.1);border-color:var(--cyan)}

        /* EXPERIENCE */
        .tg2{display:grid;grid-template-columns:1fr 1fr;gap:1.25rem}
        .tc{background:var(--card);border:1px solid var(--border);border-radius:10px;padding:1.75rem;position:relative;overflow:hidden;transition:border-color .3s}
        .tc::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--cyan),var(--purple));opacity:0;transition:opacity .3s}
        .tc:hover{border-color:rgba(0,255,225,.22)}.tc:hover::before{opacity:1}
        .ty{font-family:var(--mono);font-size:.7rem;color:var(--cyan);margin-bottom:.55rem}
        .tr{font-family:var(--ui);font-size:1.08rem;font-weight:700;margin-bottom:.22rem}
        .tco{font-family:var(--mono);font-size:.75rem;color:var(--muted);margin-bottom:.8rem}
        .td{color:var(--muted);line-height:1.65;font-size:.88rem}

        /* PORTFOLIO */
        #portfolio{background:var(--bg2)}
        .fb{display:flex;gap:.55rem;flex-wrap:wrap;margin-bottom:2.5rem}
        .fb-btn{font-family:var(--mono);font-size:.7rem;letter-spacing:.06em;padding:.38rem 1rem;border-radius:4px;border:1px solid var(--border);background:transparent;color:var(--muted);cursor:pointer;transition:all .2s}
        .fb-btn:hover{border-color:rgba(0,255,225,.3);color:var(--cyan)}
        .fb-btn.on{border-color:var(--cyan);color:var(--cyan);background:rgba(0,255,225,.07)}
        .pg{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:1.2rem}
        .pc{background:var(--card);border:1px solid var(--border);border-radius:10px;padding:1.7rem;cursor:pointer;transition:border-color .3s,transform .3s;position:relative;overflow:hidden}
        .pc::after{content:'';position:absolute;inset:0;opacity:0;background:radial-gradient(ellipse 70% 50% at 50% 0%,var(--cg,rgba(0,255,225,.07)),transparent);transition:opacity .4s}
        .pc:hover{border-color:var(--ca,var(--cyan));transform:translateY(-4px)}.pc:hover::after{opacity:1}
        .pt{display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem}
        .ptag{font-family:var(--mono);font-size:.66rem;color:var(--ca,var(--cyan));letter-spacing:.08em;border:1px solid currentColor;padding:.18rem .6rem;border-radius:99px;opacity:.8}
        .pmeta{display:flex;gap:.75rem}
        .pmi{font-family:var(--mono);font-size:.65rem;color:var(--muted)}
        .pmi span{color:var(--ca,var(--cyan))}
        .ptitle{font-family:var(--ui);font-size:1.25rem;font-weight:700;margin-bottom:.55rem}
        .pdesc{color:var(--muted);font-size:.87rem;line-height:1.65;margin-bottom:1.3rem}
        .ptechs{display:flex;gap:.4rem;flex-wrap:wrap}
        .chip{font-family:var(--mono);font-size:.65rem;color:var(--muted);padding:.2rem .52rem;background:rgba(255,255,255,.03);border:1px solid var(--border);border-radius:3px}

        /* SERVICES */
        .sg{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1.2rem}
        .sc{background:var(--card);border:1px solid var(--border);border-radius:10px;padding:1.9rem;transition:border-color .3s,background .3s;position:relative}
        .sc::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--cyan),transparent);opacity:0;transition:opacity .3s}
        .sc:hover{border-color:rgba(0,255,225,.2);background:rgba(0,255,225,.02)}.sc:hover::before{opacity:1}
        .si2{font-size:1.5rem;color:var(--cyan);margin-bottom:.9rem;display:block}
        .st{font-family:var(--ui);font-size:1rem;font-weight:700;margin-bottom:.6rem}
        .sd{color:var(--muted);font-size:.87rem;line-height:1.65}

        /* CONTACT */
        #contact{background:var(--bg2)}
        .cg{display:grid;grid-template-columns:1fr 1.5fr;gap:5rem;align-items:start}
        .ci{display:flex;gap:.9rem;margin-bottom:1.8rem}
        .cion{width:38px;height:38px;border-radius:6px;flex-shrink:0;background:rgba(0,255,225,.07);border:1px solid rgba(0,255,225,.15);display:flex;align-items:center;justify-content:center;font-size:.88rem}
        .clbl{font-family:var(--mono);font-size:.68rem;color:var(--muted);letter-spacing:.08em;text-transform:uppercase}
        .cval{font-size:.93rem;font-weight:500;margin-top:.15rem}
        .fr{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
        .fg{margin-bottom:1rem}
        .fg label{display:block;font-family:var(--mono);font-size:.68rem;color:var(--muted);margin-bottom:.42rem;letter-spacing:.08em}
        .fg input,.fg textarea{width:100%;background:var(--card2);border:1px solid var(--border);border-radius:6px;padding:.78rem 1rem;color:var(--text);font-family:var(--ui);font-size:.92rem;outline:none;transition:border-color .2s,box-shadow .2s}
        .fg input::placeholder,.fg textarea::placeholder{color:var(--muted)}
        .fg input:focus,.fg textarea:focus{border-color:rgba(0,255,225,.45);box-shadow:0 0 0 3px rgba(0,255,225,.06)}
        .fg textarea{resize:vertical;min-height:120px}
        .fsub{width:100%;padding:.88rem;background:var(--cyan);color:#000;border:none;border-radius:6px;font-family:var(--mono);font-size:.82rem;font-weight:600;cursor:pointer;transition:opacity .2s,transform .2s;letter-spacing:.06em}
        .fsub:hover{opacity:.85;transform:translateY(-2px)}
        .fsuc{margin-top:.7rem;padding:.82rem 1rem;border-radius:6px;background:rgba(0,255,225,.08);border:1px solid rgba(0,255,225,.25);font-family:var(--mono);font-size:.8rem;color:var(--cyan)}

        /* FOOTER */
        footer{border-top:1px solid var(--border);padding:1.8rem clamp(1.5rem,5vw,4rem);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;position:relative;z-index:1}
        .fl{font-family:var(--mono);font-size:.88rem;color:var(--cyan)}
        .fc{font-family:var(--mono);font-size:.7rem;color:var(--muted)}
        .fn{display:flex;gap:1.5rem}
        .fn a{font-family:var(--mono);font-size:.7rem;color:var(--muted);cursor:pointer;text-decoration:none;transition:color .2s}
        .fn a:hover{color:var(--cyan)}

        @media(max-width:800px){
          .nav-ul,.nav-btn{display:none}
          .hb{display:flex}
          .ag,.cg,.tg2{grid-template-columns:1fr}
          .fr{grid-template-columns:1fr}
          .stats{gap:1.8rem}
        }
      `}</style>

      {/* NAV */}
      <nav className={scrolled ? "scrolled" : ""}>
        <div className="logo" onClick={() => scrollTo("home")}>
          <span className="logo-b">[</span>&nbsp;dev.portfolio&nbsp;<span className="logo-b">]</span>
        </div>
        <ul className="nav-ul">
          {NAV_LINKS.map((l) => (
            <li key={l}><a className={active === l ? "on" : ""} onClick={() => scrollTo(l)}>{l}</a></li>
          ))}
        </ul>
        <button className="nav-btn" onClick={() => scrollTo("Contact")}>hire_me()</button>
        <button className="hb" onClick={() => setMenuOpen(true)}><span /><span /><span /></button>
      </nav>

      <div className={`mm ${menuOpen ? "open" : ""}`}>
        <button className="mm-close" onClick={() => setMenuOpen(false)}>✕</button>
        {NAV_LINKS.map((l) => <a key={l} onClick={() => scrollTo(l)}>{l}</a>)}
      </div>

      {/* HOME */}
      <section id="home">
        <div style={{ maxWidth: 760 }}>
          <div className="badge"><span className="dot" /> available for projects &amp; opportunities</div>
          <div className="pre"><span style={{ color: "var(--muted)" }}>// </span>Hello, World! — I'm</div>
          <h1 className="hn">Wren Montero Javier</h1>
          <p className="hr"><TypeWriter words={["Web Developer.", "Frontend Engineer.", "UI Craftsman.", "Code & Coffee ☕"]} /></p>
          <p className="hd">I build clean, fast, and accessible websites and web apps. Passionate about great code, pixel-perfect UIs, and shipping products that users actually love.</p>
          <div className="hbtns">
            <button className="btn-p" onClick={() => scrollTo("Portfolio")}>View Projects →</button>
            <button className="btn-g" onClick={() => scrollTo("Contact")}>Contact Me</button>
          </div>
          <div className="stats">
            {[{ v: "3+", l: "Years Coding" }, { v: "20+", l: "Projects Built" }, { v: "10k+", l: "Lines of Code" }].map((s) => (
              <div key={s.l}><div className="sv">{s.v}</div><div className="sl">{s.l}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="si">
          <div className="ag">
            <AnimSection>
              <div className="eye">about_me</div>
              <h2>I write code that works.</h2>
              <p className="sub">Hi — I'm a web developer based in the Philippines 🇵🇭. I focus on writing clean, maintainable code and building UIs that feel as good as they look.</p>
              <p style={{ color: "var(--muted)", lineHeight: "1.75", fontSize: ".94rem", marginBottom: "2rem" }}>I'm comfortable across the full frontend stack and can hold my own on the backend. I care about performance, accessibility, and shipping on time.</p>
              <div className="eye" style={{ marginBottom: "1.1rem" }}>skills</div>
              {SKILLS.map((s) => <SkillBar key={s.name} skill={s} />)}
            </AnimSection>
            <AnimSection delay={0.15}>
              <div className="cb">
                <div className="ctb">
                  <div className="cd" style={{ background: "#ff5f57" }} />
                  <div className="cd" style={{ background: "#febc2e" }} />
                  <div className="cd" style={{ background: "#28c840" }} />
                  <span className="cf">about.js</span>
                </div>
                <div className="cbody">
                  <div><span className="ck">const</span> <span className="cc">developer</span> = {"{"}</div>
                  <div><span className="ind" /><span className="cpk">name</span>: <span className="cs">"Your Name"</span>,</div>
                  <div><span className="ind" /><span className="cpk">role</span>: <span className="cs">"Web Developer"</span>,</div>
                  <div><span className="ind" /><span className="cpk">location</span>: <span className="cs">"Philippines 🇵🇭"</span>,</div>
                  <div><span className="ind" /><span className="cpk">available</span>: <span className="cy">true</span>,</div>
                  <div><span className="ind" /><span className="cpk">focus</span>: [</div>
                  <div><span className="ind" /><span className="ind" /><span className="cs">"Clean Code"</span>,</div>
                  <div><span className="ind" /><span className="ind" /><span className="cs">"Fast UIs"</span>,</div>
                  <div><span className="ind" /><span className="ind" /><span className="cs">"Great UX"</span>,</div>
                  <div><span className="ind" />],</div>
                  <div><span className="ind" /><span className="cpk">coffee</span>: <span className="cy">Infinity</span>,</div>
                  <div>{"};"}  </div>
                  <br />
                  <div><span className="cm">// Let's build something great</span></div>
                  <div><span className="cp">export default</span> developer;</div>
                </div>
              </div>
              <div className="eye" style={{ marginTop: "2rem", marginBottom: "1rem" }}>tech_stack</div>
              <div className="tg">{TECH_STACK.map((t) => <span key={t} className="tt">{t}</span>)}</div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience">
        <div className="si">
          <AnimSection>
            <div className="eye">career</div>
            <h2>Work Experience</h2>
            <p className="sub">Roles where I've grown, shipped, and levelled up as a developer.</p>
          </AnimSection>
          <div className="tg2">
            {EXPERIENCE.map((e, i) => (
              <AnimSection key={e.role} delay={i * 0.1}>
                <div className="tc">
                  <div className="ty">{e.year}</div>
                  <div className="tr">{e.role}</div>
                  <div className="tco">@ {e.company}</div>
                  <div className="td">{e.desc}</div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio">
        <div className="si">
          <AnimSection>
            <div className="eye">projects</div>
            <h2>Things I've Built</h2>
            <p className="sub">Real projects with real code. Hover any card to explore.</p>
            <div className="fb">
              {tags.map((t) => <button key={t} className={`fb-btn ${filter === t ? "on" : ""}`} onClick={() => setFilter(t)}>{t}</button>)}
            </div>
          </AnimSection>
          <div className="pg">
            {filtered.map((p, i) => (
              <AnimSection key={p.title} delay={i * 0.07}>
                <div className="pc" style={{ "--ca": p.color, "--cg": `${p.color}12` }}>
                  <div className="pt">
                    <span className="ptag">{p.tag}</span>
                    <div className="pmeta">
                      <span className="pmi"><span>{p.loc}</span> loc</span>
                      <span className="pmi"><span>{p.commits}</span> commits</span>
                    </div>
                  </div>
                  <div className="ptitle">{p.title}</div>
                  <div className="pdesc">{p.desc}</div>
                  <div className="ptechs">{p.tech.map((t) => <span key={t} className="chip">{t}</span>)}</div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services">
        <div className="si">
          <AnimSection>
            <div className="eye">services</div>
            <h2>What I Can Do For You</h2>
            <p className="sub">Whether you need a landing page or a full web app — I've got you covered.</p>
          </AnimSection>
          <div className="sg">
            {SERVICES.map((s, i) => (
              <AnimSection key={s.title} delay={i * 0.08}>
                <div className="sc">
                  <span className="si2">{s.icon}</span>
                  <div className="st">{s.title}</div>
                  <div className="sd">{s.desc}</div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="si">
          <AnimSection>
            <div className="eye">contact</div>
            <h2>Let's Work Together</h2>
            <p className="sub">Got a project? An idea? Just want to say hi? My inbox is always open.</p>
          </AnimSection>
          <div className="cg">
            <AnimSection>
              <div>
                {[
                  { i: "✉", l: "Email", v: "you@example.com" },
                  { i: "📍", l: "Based In", v: "Philippines 🇵🇭" },
                  { i: "🟢", l: "Status", v: "Available for Work" },
                  { i: "⏱", l: "Response Time", v: "Within 24 hours" },
                ].map((c) => (
                  <div className="ci" key={c.l}>
                    <div className="cion">{c.i}</div>
                    <div><div className="clbl">{c.l}</div><div className="cval">{c.v}</div></div>
                  </div>
                ))}
                <div className="eye" style={{ marginTop: "1.5rem", marginBottom: "1rem" }}>find_me</div>
                <div style={{ display: "flex", gap: ".55rem", flexWrap: "wrap" }}>
                  {["GitHub", "LinkedIn", "Twitter", "CodePen"].map((s) => (
                    <span key={s} style={{ fontFamily: "var(--mono)", fontSize: ".7rem", border: "1px solid var(--border)", padding: ".28rem .72rem", borderRadius: "4px", color: "var(--muted)", cursor: "pointer", transition: "all .2s" }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--cyan)"; e.currentTarget.style.color = "var(--cyan)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--muted)"; }}
                    >{s}</span>
                  ))}
                </div>
              </div>
            </AnimSection>
            <AnimSection delay={0.15}>
              <form onSubmit={handleSubmit}>
                <div className="fr">
                  <div className="fg"><label>name</label><input type="text" placeholder="John Doe" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
                  <div className="fg"><label>email</label><input type="email" placeholder="john@email.com" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
                </div>
                <div className="fg"><label>message</label><textarea placeholder="Hey! I'd love to work with you on..." required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></div>
                <button type="submit" className="fsub">send_message() →</button>
                {sent && <div className="fsuc">✓ Message sent! I'll get back to you soon.</div>}
              </form>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="fl">[ dev.portfolio ]</div>
        <div className="fc">// © 2025 Your Name — built with React + Vite</div>
        <nav className="fn">
          {["Home", "Portfolio", "Services", "Contact"].map((l) => <a key={l} onClick={() => scrollTo(l)}>{l}</a>)}
        </nav>
      </footer>
    </>
  );
}
