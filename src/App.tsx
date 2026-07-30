import { useState, useEffect } from "react";

import {
  NAV_LINKS,
  SKILLS,
  SKILL_CATEGORIES,
  TECH_STACK,
  EXPERIENCE,
  PROJECTS,
  SERVICES,
} from "./data";

import AnimSection from "./components/AnimSection";
import SkillBar from "./components/SkillBar";
import TypeWriter from "./components/TypeWriter";
import ChatBot from "./components/ChatBot";

import profileImg from "./assets/profile.jpg";

export default function Portfolio() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.toLowerCase()));
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting)
            setActive(e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1));
        }),
      { threshold: 0.3 }
    );
    sections.forEach((s) => s && obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  const tags = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.tag)))];
  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.tag === filter);

  return (
    <>
      {/* NAVIGATION */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-logo" onClick={() => scrollTo("home")}>
        <span className="nav-logo-dot" />
        <span>{"<wren.dev/>"}</span>
      </div>
        <ul className="nav-ul">
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <a className={active === l ? "on" : ""} onClick={() => scrollTo(l)}>
                {l}
              </a>
            </li>
          ))}
        </ul>
        <button className="nav-cta" onClick={() => scrollTo("Contact")}>
          <span className="nav-cta-icon" onClick={(e) => { e.stopPropagation(); toggleTheme(); }} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
            {theme === "dark" ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </span>
          Let's Talk
        </button>
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mm ${menuOpen ? "open" : ""}`}>
        <div className="mm-label">Navigation</div>
        {NAV_LINKS.map((l, i) => (
          <a key={l} onClick={() => scrollTo(l)}>
            <span className="mm-idx">0{i + 1}</span> {l}
          </a>
        ))}
        <div className="mm-footer">
          <a href="https://github.com/your-username" target="_blank" rel="noreferrer noopener" title="GitHub">GH</a>
          <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noreferrer noopener" title="LinkedIn">LI</a>
          <a href="https://twitter.com/your-handle" target="_blank" rel="noreferrer noopener" title="Twitter">X</a>
          <a href="mailto:javierrenren1@gmail.com" title="Email">@</a>
        </div>
      </div>

      {/* HERO */}
      <section id="home">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />

        <div className="hero-left">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Available for opportunities
          </div>

          <div className="hero-greeting">Hi, I'm</div>

          <h1 className="hero-name">Wren Montero Javier</h1>

          <div className="hero-role">
            <TypeWriter words={["Full-Stack Developer"]} />
          </div>

          <p className="hero-desc">
            I build high-performance, visually stunning digital experiences.
            Specializing in modern web technologies and scalable architecture.
          </p>

          <div className="hero-btns">
            <button className="btn-primary" onClick={() => scrollTo("Portfolio")}>
              View Projects
            </button>
                <a
                  className="btn-secondary"
                  href="/resume.docx"
                  download="resume.docx"
                >
                  Download Resume
                </a>
                <button className="btn-secondary" onClick={() => scrollTo("Contact")}>
              Contact Me
            </button>
          </div>

          <div className="hero-social">
            <a href="https://github.com/your-username" target="_blank" rel="noreferrer noopener" title="GitHub">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            
            <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noreferrer noopener" title="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://twitter.com/your-handle" target="_blank" rel="noreferrer noopener" title="Twitter / X">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://mail.google.com/mail/u/0/#inbox" title="Email">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            </a>
          </div>

          <div className="hero-stats">
            {[
              { v: "1+", l: "Years Exp." },
              { v: "20+", l: "Projects" },
              { v: "50+", l: "Commits" },
            ].map((s) => (
              <div key={s.l}>
                <div className="stat-value">{s.v}</div>
                <div className="stat-label">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-right">
          <div className="profile-wrapper">
            <img src={profileImg} alt="Wren Montero Javier" />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="si">
          <AnimSection>
            <div className="section-label">about_me</div>
            <h2>I write code that works.</h2>
            <p className="section-sub">
              Hi — I'm a web developer based in the Philippines. I focus on writing
              clean, maintainable code and building UIs that feel as good as they look.
            </p>
          </AnimSection>
          <div className="about-grid">
            <AnimSection>
              <div className="about-text">
                <p>
                  I'm comfortable across the full frontend stack and can hold my own on
                  the backend. I care about <strong>performance</strong>,{" "}
                  <strong>accessibility</strong>, and shipping on time.
                </p>
                <p>
                  Every project I work on gets my full attention — from pixel-perfect
                  implementations to robust architecture decisions.
                </p>

                <div className="section-label" style={{ marginTop: "2rem", marginBottom: "1.1rem" }}>
                  skills
                </div>
                {SKILLS.map((s) => (
                  <SkillBar key={s.name} skill={s} />
                ))}

                <div className="section-label" style={{ marginTop: "2rem", marginBottom: "1rem" }}>
                  tech_stack
                </div>
                <div className="tech-tags">
                  {TECH_STACK.map((t) => (
                    <span key={t} className="tech-tag">{t}</span>
                  ))}
                </div>
              </div>
            </AnimSection>
            <AnimSection delay={0.15}>
              <div className="code-block">
                <div className="code-titlebar">
                  <div className="code-dot" style={{ background: "#ff5f57" }} />
                  <div className="code-dot" style={{ background: "#febc2e" }} />
                  <div className="code-dot" style={{ background: "#28c840" }} />
                  <span className="code-filename">about.js</span>
                </div>
                <div className="code-body">
                  <div><span className="ck">const</span> <span className="cc">developer</span> = {"{"}</div>
                  <div><span className="indent" /><span className="cpk">name</span>: <span className="cs">"Wren Montero Javier"</span>,</div>
                  <div><span className="indent" /><span className="cpk">role</span>: <span className="cs">"Web Developer"</span>,</div>
                  <div><span className="indent" /><span className="cpk">location</span>: <span className="cs">"Poblaction, Valencia City Bukidnon Philippines"</span>,</div>
                  <div><span className="indent" /><span className="cpk">available</span>: <span className="cy">true</span>,</div>
                  <div><span className="indent" /><span className="cpk">focus</span>: [</div>
                  <div><span className="indent" /><span className="indent" /><span className="cs">"Clean Code"</span>,</div>
                  <div><span className="indent" /><span className="indent" /><span className="cs">"Fast UIs"</span>,</div>
                  <div><span className="indent" /><span className="indent" /><span className="cs">"Great UX"</span>,</div>
                  <div><span className="indent" />],</div>
                  <div><span className="indent" /><span className="cpk">coffee</span>: <span className="cy">Infinity</span>,</div>
                  <div>{"};"}</div>
                  <br />
                  <div><span className="cm">// Let's build something great</span></div>
                  <div><span className="cp">export default</span> developer;</div>
                </div>
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience">
        <div className="si">
          <AnimSection>
            <div className="section-label">career</div>
            <h2>Work Experience</h2>
            <p className="section-sub">
              Roles where I've grown, shipped, and levelled up as a developer.
            </p>
          </AnimSection>
          <div className="timeline">
            {EXPERIENCE.map((e, i) => (
              <AnimSection key={e.role} delay={i * 0.1}>
                <div className="timeline-item">
                  <div className="timeline-dot">
                    <div className="timeline-dot-inner" />
                  </div>
                  <div className="timeline-year">{e.year}</div>
                  <div className="timeline-role">{e.role}</div>
                  <div className="timeline-company">{e.company}</div>
                  <div className="timeline-desc">{e.desc}</div>
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
            <div className="section-label">projects</div>
            <h2>Things I've Built</h2>
            <p className="section-sub">
              Real projects with real code. Hover any card to explore.
            </p>
            <div className="filter-bar">
              {tags.map((t) => (
                <button
                  key={t}
                  className={`filter-btn ${filter === t ? "on" : ""}`}
                  onClick={() => setFilter(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </AnimSection>
          <div className="project-grid">
            {filtered.map((p, i) => (
              <AnimSection key={p.title} delay={i * 0.07}>
                <div
                  className="project-card"
                  style={
                    {
                      "--ca": p.color,
                      "--cg": `${p.color}18`,
                    } as React.CSSProperties & Record<string, string>
                  }
                >
                  <div className="project-header">
                    <span className="project-tag">{p.tag}</span>
                    <div className="project-meta">
                      <span className="project-meta-item">
                        <span>{p.loc}</span> loc
                      </span>
                      <span className="project-meta-item">
                        <span>{p.commits}</span> commits
                      </span>
                    </div>
                  </div>
                  {p.image && (
                    <div className="project-image">
                      <img src={p.image} alt={p.title} loading="lazy" />
                    </div>
                  )}
                  <div className="project-title">{p.title}</div>
                  <div className="project-desc">{p.desc}</div>
                  <div className="project-techs">
                    {p.tech.map((t) => (
                      <span key={t} className="project-chip">{t}</span>
                    ))}
                  </div>
                  {(p.links?.demo || p.links?.repo) && (
                    <div className="project-links">
                      {p.links?.demo && p.links.demo !== "#" && (
                        <a
                          className="project-link"
                          href={p.links.demo}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          ↗ Live Demo
                        </a>
                      )}
                      {p.links?.repo && (
                        <a
                          className="project-link"
                          href={p.links.repo}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          ⟨/⟩ Source
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <div className="si">
          <AnimSection>
            <div className="section-label">expertise</div>
            <h2>Skills & Technologies</h2>
            <p className="section-sub">
              A comprehensive overview of the tools and technologies I work with daily.
            </p>
          </AnimSection>
          <div className="skills-grid">
            {SKILL_CATEGORIES.map((cat, i) => (
              <AnimSection key={cat.category} delay={i * 0.06}>
                <div className="skill-category">
                  <div className="skill-cat-title">{cat.category}</div>
                  <div className="skill-badges">
                    {cat.skills.map((s) => (
                      <span key={s} className="skill-badge">{s}</span>
                    ))}
                  </div>
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
            <div className="section-label">services</div>
            <h2>What I Can Do For You</h2>
            <p className="section-sub">
              Whether you need a landing page or a full web app — I've got you covered.
            </p>
          </AnimSection>
          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <AnimSection key={s.title} delay={i * 0.08}>
                <div className="service-card">
                  <span className="service-icon">{s.icon}</span>
                  <div className="service-title">{s.title}</div>
                  <div className="service-desc">{s.desc}</div>
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
            <div className="section-label">contact</div>
            <h2>Let's Work Together</h2>
            <p className="section-sub">
              Got a project? An idea? Just want to say hi? My inbox is always open.
            </p>
          </AnimSection>
          <div className="contact-grid">
            <AnimSection>
              <div>
                {[
                  { icon: "✉", label: "Email", value: "javierrenren1@gmail.com" },
                  { icon: "📍", label: "Based In", value: "Philippines" },
                  { icon: "🟢", label: "Status", value: "Available for Work" },
                  { icon: "⏱", label: "Response Time", value: "Within 24 hours" },
                ].map((c, i) => (
                  <div className="contact-info-item" key={c.label} style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className="contact-icon-box">{c.icon}</div>
                    <div>
                      <div className="contact-label">{c.label}</div>
                      <div className="contact-value">{c.value}</div>
                    </div>
                  </div>
                ))}
                <div className="section-label" style={{ marginTop: "1.5rem", marginBottom: "1rem" }}>
                  find_me
                </div>
                  <div className="contact-socials">
                    <a
                      className="contact-social-link"
                      href="https://github.com/Wren031"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      GitHub
                    </a>

                    <a
                      className="contact-social-link"
                      href="https://www.facebook.com/PringPring25"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Facebook
                    </a>

                    <a
                      className="contact-social-link"
                      href="https://linkedin.com/in/your-profile"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      LinkedIn
                    </a>

                    <a
                      className="contact-social-link"
                      href="https://twitter.com/your-handle"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Twitter / X
                    </a>

                    <a
                      className="contact-social-link"
                      href="mailto:your-email@gmail.com"
                    >
                      Email
                    </a>
                  </div>
              </div>
            </AnimSection>
            <AnimSection delay={0.15}>
              <form onSubmit={handleSubmit}>
                <div className="contact-form">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="john@email.com"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                  <div className="form-group full">
                    <label>Message</label>
                    <textarea
                      placeholder="Hey! I'd love to work with you on..."
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </div>
                  <button type="submit" className="form-submit">
                    Send Message
                  </button>
                  {error && <div className="form-error">✕ {error}</div>}
                  {sent && <div className="form-success">✓ Message sent! I'll get back to you soon.</div>}
                </div>
              </form>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* CHATBOT */}
      <ChatBot />

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-logo">
            <span className="footer-logo-dot" />
            Wren Montero Javier
          </div>
          <div className="footer-copy">
            &copy; {new Date().getFullYear()} — Full-Stack Developer
          </div>
          <nav className="footer-nav">
            {["Home", "Portfolio", "Services", "Contact"].map((l) => (
              <a key={l} onClick={() => scrollTo(l)}>{l}</a>
            ))}
          </nav>
        </div>
      </footer>
    </>
  );
}
