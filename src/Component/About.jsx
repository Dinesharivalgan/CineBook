import React from 'react';
import { useNavigate } from 'react-router-dom';
import './About.css';

function About() {
  const navigate = useNavigate();

  const features = [
    { icon: '🎬', title: 'Book Any Movie', desc: 'Hollywood, Bollywood, Tamil, Telugu — all in one place.' },
    { icon: '⚡', title: 'Instant Booking', desc: 'Pick seats, pay online, get e-ticket in seconds.' },
    { icon: '🏟️', title: '100+ Theatres', desc: 'Top theatres across Coimbatore & Tamil Nadu.' },
    { icon: '💳', title: 'Secure Payments', desc: 'UPI, Cards, Net Banking — 100% encrypted & safe.' },
    { icon: '📱', title: 'Mobile First', desc: 'Available on Android & iOS. Book anytime, anywhere.' },
    { icon: '🎟️', title: 'Event Tickets', desc: 'Concerts, shows, and local events — all in one app.' },
  ];

  return (
    <div id="about-section" className="about-section-wrapper">

            <div className="as-hero">
        <span className="as-hero-badge">🎥 About CineBook</span>
        <h2 className="as-hero-title">
          Your City's <span className="as-highlight">Cinema</span> Companion
        </h2>
        <p className="as-hero-sub">
          CineBook makes movie-going effortless — discover what's showing, pick your seats,
          and get to the theatre without the wait.
        </p>
      </div>

      
      <div className="as-stats">
        <div className="as-stat">
          <span className="as-stat-num">100+</span>
          <span className="as-stat-label">Theatres</span>
        </div>
        <div className="as-stat-divider" />
        <div className="as-stat">
          <span className="as-stat-num">50K+</span>
          <span className="as-stat-label">Happy Users</span>
        </div>
        <div className="as-stat-divider" />
        <div className="as-stat">
          <span className="as-stat-num">24/7</span>
          <span className="as-stat-label">Support</span>
        </div>
        <div className="as-stat-divider" />
        <div className="as-stat">
          <span className="as-stat-num">5★</span>
          <span className="as-stat-label">App Rating</span>
        </div>
      </div>

  
      <div className="as-features-wrap">
        <h3 className="as-section-title">Why Choose CineBook?</h3>
        <p className="as-section-sub">Everything you need for the perfect movie experience</p>
        <div className="as-features-grid">
          {features.map((f, i) => (
            <div className="as-feature-card" key={i}>
              <div className="as-feature-icon">{f.icon}</div>
              <h4 className="as-feature-title">{f.title}</h4>
              <p className="as-feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      
      <div className="as-care-wrap">
        <div className="as-care-card">
          <div className="as-care-left">
            <span className="as-care-badge">📞 Customer Care</span>
            <h3 className="as-care-title">We're Here for You</h3>
            <p className="as-care-desc">
              Got a problem with your booking? Need help with a refund?
              Our support team is available 24×7.
            </p>
            <div className="as-care-contacts">
              <a href="tel:9360686485" className="as-care-btn as-phone">📞 9360686485</a>
              <a href="mailto:cinebook@gmail.com" className="as-care-btn as-email">✉️ cinebook@gmail.com</a>
            </div>
            <button className="as-contact-page-btn" onClick={() => navigate('/contact')}>
              Visit Contact Page →
            </button>
          </div>
          <div className="as-care-right">
            <div className="as-care-hours">
              <div className="as-hours-row">
                <span>🕐 Support Hours</span>
                <strong>24 × 7</strong>
              </div>
              <div className="as-hours-row">
                <span>⏱ Avg Response</span>
                <strong>&lt; 5 mins</strong>
              </div>
              <div className="as-hours-row">
                <span>📍 Address</span>
                <strong>Thirumazhisai, Chennai</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="as-download">
        <h3 className="as-download-title">Get the App — It's Free</h3>
        <p className="as-download-sub">Book smarter. Watch better.</p>
        <div className="as-download-btns">
          <a href="#" className="as-dl-btn">
            <span className="as-dl-icon">▶</span>
            <span>
              <small>GET IT ON</small>
              Google Play
            </span>
          </a>
          <a href="#" className="as-dl-btn">
            <span className="as-dl-icon">⌘</span>
            <span>
              <small>Download on the</small>
              App Store
            </span>
          </a>
        </div>
      </div>

    </div>
  );
}

export default About;