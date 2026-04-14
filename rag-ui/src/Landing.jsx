import React from "react";
import "./Landing.css";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* 🌌 Animated Background Elements */}
      <div className="blur-bg"></div>
      <div className="glow-orb"></div>

      {/* 🔹 STICKY HEADER */}
      <header className="navbar">
        <div className="logo">CollegeSync<span>.</span></div>
        <nav className="nav-links">
          <a href="#demo">Demo</a>
          <a href="#features">Features</a>
          
        </nav>
      </header>

      {/* 🔹 HERO SECTION */}
      <main className="hero-section">
        <h1 className="hero-title">
          Smart Answers for <br /><br />
          <span id="small_text">Modern Campuses</span>
        </h1>
        <p className="hero-subtitle">
          Unlock your college's knowledge base. Instant answers from notices, 
          calendars, and handbooks using advanced RAG technology.
        </p>
        <div className="cta-group">
          <button className="btn-glow" onClick={() => navigate("/signup")}>
            Get Started
          </button>
          <button className="btn-outline" onClick={()=> navigate("/login")}>
            Sign In
          </button>
        </div>
      </main>

      {/* 🔹 DEMO SECTION */}
      <section id="demo" className="section-container">
        <h2 className="section-label">See it in Action</h2>
        <div className="chat-demo-card">
          <div className="chat-header">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
            <span className="status">System Online</span>
          </div>
          <div className="chat-body">
            <div className="chat-bubble user">When is the annual fest?</div>
            <div className="chat-bubble bot">
              Retrieving context from <strong>Notice_Board_2026.pdf</strong>... <br />
              The Annual Fest is scheduled for <strong>March 15th-18th</strong>.
            </div>
            <div className="chat-bubble user">Is that the updated date?</div>
            <div className="chat-bubble bot">
              Yes. I've cross-referenced the <strong>Revised_Calendar_v2</strong> 
              uploaded 2 hours ago. The original March 10th date is now void.
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 FEATURES GRID */}
      <section id="features" className="features-grid">
        <div className="feature-card">
          <div className="icon">🧠</div>
          <h3>Contextual RAG</h3>
          <p>We don't just search keywords; we understand college documents.</p>
        </div>
        <div className="feature-card">
          <div className="icon">⏱️</div>
          <h3>Version Control</h3>
          <p>Always prioritizes the most recent notices and official updates.</p>
        </div>
        <div className="feature-card">
          <div className="icon">🛡️</div>
          <h3>Admin Security</h3>
          <p>Verified college credentials required for content management.</p>
        </div>
      </section>

      {/* 🔹 FOOTER */}
      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h2>CollegeSync</h2>
            <p>Elevating campus communication through AI.</p>
          </div>
          <div className="footer-links">
            <h4>Contact</h4>
            <p>support@collegesync.edu</p>
            <p>Pune, Maharashtra</p>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; 2026 CollegeSync. Built for students, by developers. 🚀
        </div>
      </footer>
    </div>
  );
}

export default Landing;