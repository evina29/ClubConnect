import React from 'react';
import { Link } from 'react-router-dom';
import './Cover.css';

const Cover = () => (
  <div className="cover">
    <div className="cover__bg" aria-hidden="true" />

    <main className="cover__main cover__panel">
      <p className="cover__eyebrow">
        <span className="cover__eyebrow-dot" aria-hidden="true" />
        Campus life, elevated
      </p>

      <h1 className="cover__logo">ClubConnect</h1>

      <p className="cover__headline">
        Find your clubs.
        <span className="cover__headline-accent"> Own your story.</span>
      </p>

      <p className="cover__lede">
        Discover teams, events, and leadership opportunities in one beautiful
        place—built for students who want more from school than a schedule.
      </p>

      <div className="cover__actions">
        <Link to="/app/register" className="cover__btn cover__btn--primary">
          Get started
        </Link>
        <Link to="/app/login" className="cover__btn cover__btn--ghost">
          Sign in
        </Link>
      </div>

      <div className="cover__stats" role="list">
        <div className="cover__stat" role="listitem">
          <span className="cover__stat-value">50+</span>
          <span className="cover__stat-label">schools</span>
        </div>
        <div className="cover__stat" role="listitem">
          <span className="cover__stat-value">1 hub</span>
          <span className="cover__stat-label">for every club</span>
        </div>
        <div className="cover__stat" role="listitem">
          <span className="cover__stat-value">24/7</span>
          <span className="cover__stat-label">always on</span>
        </div>
      </div>

      <Link to="/onboarding" className="cover__link-quiet">
        Take a quick tour
        <span className="cover__link-arrow" aria-hidden="true">
          →
        </span>
      </Link>
    </main>

    <footer className="cover__footer">
      <span>© 2026 ClubConnect</span>
      <span className="cover__footer-dot" aria-hidden="true">
        ·
      </span>
      <span>Made for students</span>
      <span className="cover__footer-dot" aria-hidden="true">
        ·
      </span>
      <a
        href={`${import.meta.env.BASE_URL}clubconnect-logo.html`}
        target="_blank"
        rel="noopener noreferrer"
        className="cover__footer-link"
      >
        Logo sheet
      </a>
    </footer>
  </div>
);

export default Cover;
