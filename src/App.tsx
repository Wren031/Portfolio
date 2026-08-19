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
import ChatBot from "./components/ChatBot";
import GitHubActivity from "./components/GitHubActivity";

import myImage from "./assets/my_image.jpeg";

const HERO_IMAGES = [
  { src: myImage, alt: "Portrait of Wren Montero Javier" },
  { src: "/images/grad.JPG", alt: "Wren Montero Javier at graduation" },
];

export default function Portfolio() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [heroImage, setHeroImage] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  useEffect(() => {
    if (carouselPaused) return;

    const timer = window.setInterval(() => {
      setHeroImage((current) => (current + 1) % HERO_IMAGES.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [carouselPaused]);

  const changeHeroImage = (direction: number) => {
    setHeroImage((current) => (current + direction + HERO_IMAGES.length) % HERO_IMAGES.length);
  };

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
        <div className="nav-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
            {theme === "dark" ? "Light" : "Dark"}
          </button>
          <button className="nav-cta" onClick={() => scrollTo("Contact")}>Let's Talk</button>
        </div>
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
          <a href="https://github.com/Wren031" target="_blank" rel="noreferrer noopener">GitHub</a>
          <a href="https://www.facebook.com/PringPring25" target="_blank" rel="noreferrer noopener">Facebook</a>
          <a href="mailto:javierrenren1@gmail.com">Email</a>
        </div>
      </div>

      {/* HERO */}
      <section id="home">
        <div className="hero-left">
          <div className="hero-kicker">
            <span className="hero-kicker-line" />
            <span>Full-stack developer · Philippines</span>
          </div>

          <h1 className="hero-name">Hi, I'm Wren Montero Javier.</h1>

          <div className="hero-role">
            Web and mobile development with React, TypeScript, and Node.js.
          </div>

          <p className="hero-desc">
            I build practical digital products with clear interfaces, reliable
            architecture, and attention to the details that make software easy to use.
          </p>

          <div className="hero-btns">
            <button className="btn-primary" onClick={() => scrollTo("Portfolio")}>
              View Projects
            </button>
            <a className="btn-secondary" href="/resume.docx" download="Wren-Montero-Javier-Resume.docx">
              Download Resume
            </a>
            <button className="btn-secondary" onClick={() => scrollTo("Contact")}>
              Contact Me
            </button>
          </div>

          <div className="hero-social">
            <a href="https://github.com/Wren031" target="_blank" rel="noreferrer noopener">GitHub</a>
            <a href="/resume.docx" download="resume.docx">Resume</a>
            <a href="mailto:javierrenren1@gmail.com">Email</a>
          </div>

          <div className="hero-stats">
            {[
              { v: "1+", l: "Years Exp." },
              { v: "20+", l: "Projects" },
              { v: "142", l: "GitHub Contributions · 2026", href: "https://github.com/Wren031" },
            ].map((s) => (
              s.href ? (
                <a className="stat-link" key={s.l} href={s.href} target="_blank" rel="noreferrer noopener">
                  <div className="stat-value">{s.v}</div>
                  <div className="stat-label">{s.l}</div>
                </a>
              ) : (
                <div key={s.l}>
                  <div className="stat-value">{s.v}</div>
                  <div className="stat-label">{s.l}</div>
                </div>
              )
            ))}
          </div>
        </div>

        <div className="hero-right">
          <div
            className="profile-wrapper"
            onMouseEnter={() => setCarouselPaused(true)}
            onMouseLeave={() => setCarouselPaused(false)}
            onFocus={() => setCarouselPaused(true)}
            onBlur={() => setCarouselPaused(false)}
          >
            {HERO_IMAGES.map((image, index) => (
              <img
                key={image.src}
                className={index === heroImage ? "active" : ""}
                src={image.src}
                alt={image.alt}
                aria-hidden={index !== heroImage}
              />
            ))}
            <div className="carousel-controls" aria-label="Hero image controls">
              <button type="button" onClick={() => changeHeroImage(-1)} aria-label="Previous image">Previous</button>
              <span>{String(heroImage + 1).padStart(2, "0")} / {String(HERO_IMAGES.length).padStart(2, "0")}</span>
              <button type="button" onClick={() => changeHeroImage(1)} aria-label="Next image">Next</button>
            </div>
            <div className="carousel-dots" aria-label="Choose hero image">
              {HERO_IMAGES.map((image, index) => (
                <button
                  type="button"
                  key={`dot-${image.src}`}
                  className={index === heroImage ? "active" : ""}
                  onClick={() => setHeroImage(index)}
                  aria-label={`Show image ${index + 1}`}
                  aria-pressed={index === heroImage}
                />
              ))}
            </div>
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
              Selected work across web, mobile, and desktop development.
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
                  <ul className="project-features">
                    {p.features.map((feature) => <li key={feature}>{feature}</li>)}
                  </ul>
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
                      {p.links?.repo && p.links.repo !== "#" && (
                        <a
                          className="project-link"
                          href={p.links.repo}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          GitHub
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

      <GitHubActivity />

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
                  { label: "Email", value: "javierrenren1@gmail.com" },
                  { label: "Based In", value: "Philippines" },
                  { label: "Status", value: "Available for Work" },
                  { label: "Response Time", value: "Within 24 hours" },
                ].map((c, i) => (
                  <div className="contact-info-item" key={c.label} style={{ animationDelay: `${i * 0.1}s` }}>
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
                      href="mailto:javierrenren1@gmail.com"
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
