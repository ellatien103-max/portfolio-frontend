import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import ProfileCard from './ProfileCard';
import SkillBadge from './SkillBadge';
import ProjectCard from './ProjectCard';
import Counter from './Counter';
import ContactForm from './ContactForm';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import './App.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const START_DATE = new Date('2026-03-01'); // ← set this to your real day-1 date

function getDaysBuilding() {
  const now = new Date();
  const diffMs = now - START_DATE;
  return Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1; // +1 so day 1 shows as "1", not "0"
}

function App() {
  // ── STATE ──
  const [isDark, setIsDark] = useState(false);
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem('adminToken')
  );

// trigger deploy
 
  // ── DARK MODE ──
  function toggleDark() {
    setIsDark(prev => !prev);
    document.body.classList.toggle('dark');
  }

  // ── FETCH PORTFOLIO FROM API ──
  useEffect(() => {
   fetch(`${import.meta.env.VITE_API_URL}/api/portfolio`)
      .then(res => res.json())
      .then(data => {
        setPortfolio(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not load data — is your server running?');
        setLoading(false);
      });
  }, []);

  // ── GREETING BAR ──
  useEffect(() => {
    const hour = new Date().getHours();
    let greeting;
    if (hour < 12) greeting = 'Good morning — thanks for stopping by ☀️ ';
    else if (hour < 18) greeting = 'Good afternoon — welcome to my portfolio 🌤️ ';
    else greeting = 'Good evening — glad you\'re here 🌙 ';
    const bar = document.getElementById('greeting-bar');
    if (bar) bar.textContent = greeting;
  }, []);

  // ── SKILLS INTERSECTION OBSERVER ──
  useEffect(() => {
    if (!portfolio) return;
    const skillsSection = document.getElementById('skills-section');
    if (!skillsSection) return;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('skills-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(skillsSection);
    return () => observer.disconnect();
  }, [portfolio]);

  // ── ADMIN HANDLERS ──
  function handleAdminLogin(token) {
    setAdminToken(token);
    localStorage.setItem('adminToken', token);
  }

  function handleAdminLogout() {
    setAdminToken(null);
    localStorage.removeItem('adminToken');
  }

  return (
    <div className={isDark ? 'app dark' : 'app'}>

      {/* GREETING BAR */}
      <div id="greeting-bar" className="greeting-bar"></div>

      {/* NAVBAR */}
      <Navbar isDark={isDark} toggleDark={toggleDark} />

      <div className="app-inner">

        {/* ── HERO ── */}
        <section id="home" className="hero">
          <div className="hero-badge">✦ Available for collaborations</div>
          <h1>
            I build things —<br />
            <em>brands</em> that connect<br />
            and software that solves.
          </h1>
          <p className="hero-role">
            Software Engineer & Brand Strategist.
          </p>
          <p className="hero-body">
            Spent years helping brands find their voice. Now I'm adding software
            engineering to that — building in public, one day at a time.
          </p>
          <div className="hero-btns">
            <a href="#projects" className="btn-primary">See what I've built →</a>
            <a href="#contact" className="btn-secondary">Let's talk</a>
          </div>
        </section>

        {/* ── STATS ROW ── */}
        <div className="stats-row">
          <div className="stat">
            <div className="stat-number">
              <Counter target={getDaysBuilding()} />
            </div>
            <div className="stat-label">Days building</div>
          </div>
          <div className="stat">
            <div className="stat-number">12</div>
            <div className="stat-label">Weeks of code</div>
          </div>
          <div className="stat">
            <div className="stat-number">77+</div>
            <div className="stat-label">WIT Tracker users</div>
          </div>
          <div className="stat">
            <div className="stat-number">2</div>
            <div className="stat-label">Live product shipped</div>
          </div>
        </div>

        <hr className="divider" />

        {/* ── LOADING STATE ── */}
        {loading && (
          <div className="state-message">
            <div className="spinner"></div>
            <p>Loading portfolio...</p>
          </div>
        )}

        {/* ── ERROR STATE ── */}
        {error && (
          <div className="state-message error-state">
            <p>⚠ {error}</p>
          </div>
        )}

        {/* ── MAIN CONTENT ── */}
        {portfolio && (
          <>
            {/* ABOUT */}
            <section className="section" id="about">
              <h2>About <em>me</em></h2>
              <ProfileCard
                name={portfolio.name}
                role={portfolio.role}
                bio={portfolio.bio}
              />
            </section>

            <hr className="divider" />

            {/* SKILLS */}
            <section className="section" id="skills">
              <h2>My <em>skills</em></h2>
              <div className="skills-section" id="skills-section">
                {portfolio.skills.map((skill, i) => (
                  <SkillBadge key={i} skill={skill} index={i} />
                ))}
              </div>
            </section>

            <hr className="divider" />

            {/* PROJECTS */}
            <section className="section" id="projects">
              <h2>What I've <em>built</em></h2>
              <div className="projects-grid">
                {portfolio.projects.map((project, i) => (
                  <ProjectCard
                    key={i}
                    tag={project.tag}
                    title={project.title}
                    description={project.description}
                    stack={project.stack}
                    link={project.url}
                  />
                ))}
              </div>
            </section>

            <hr className="divider" />

            {/* CONTACT */}
            <section className="section" id="contact">
              <h2>Let's <em>build something</em></h2>
              <p className="section-note">
                Whether you want to collaborate, follow the journey, or just say
                hi — I'm here for all of it.
              </p>
              <ContactForm apiUrl={API} />
            </section>

            {/* FOOTER */}
            <footer>
              <div className="footer-links">
                <a href="https://instagram.com/isabel_atieno" target="_blank" rel="noreferrer">Instagram</a>
                <a href="#" target="_blank" rel="noreferrer">LinkedIn</a>
                <a href="#" target="_blank" rel="noreferrer">GitHub</a>
                <a href="https://wittracker.com" target="_blank" rel="noreferrer">WIT Tracker</a>
                <button
                  className="footer-admin-btn"
                  onClick={() => setShowAdmin(true)}
                >
                  Admin
                </button>
              </div>
              <p>
              <strong>{portfolio.name}</strong>
              </p>
            </footer>
          </>
        )}

      </div>{/* end app-inner */}

      {/* ── ADMIN OVERLAY ── */}
      {showAdmin && (
        <div
          className="admin-overlay"
          onClick={e => {
            if (e.target.className === 'admin-overlay') setShowAdmin(false);
          }}
        >
          <div className="admin-modal">
            {adminToken ? (
              <AdminDashboard
                token={adminToken}
                apiUrl={API}
                onLogout={handleAdminLogout}
                onClose={() => setShowAdmin(false)}
              />
            ) : (
              <AdminLogin
                apiUrl={API}
                onLogin={handleAdminLogin}
                onClose={() => setShowAdmin(false)}
              />
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default App;