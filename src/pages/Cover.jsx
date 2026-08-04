import React from 'react';
import { Link } from 'react-router-dom';
import './Cover.css';

const Cover = () => (
  <div className="cover">
    <header className="cover__header">
      <span className="cover__brand">ClubConnect</span>
      <Link to="/app/login" className="cover__signin">
        Sign in
      </Link>
    </header>

    <main className="cover__main">
      <h1 className="cover__title">Find and keep up with your school clubs</h1>

      <p className="cover__text">
        Browse clubs, see upcoming events, RSVP, and check in with a QR code.
        Everything about your clubs in one place.
      </p>

      <div className="cover__actions">
        <Link to="/app/register" className="cover__btn cover__btn--primary">
          Get started
        </Link>
        <Link to="/onboarding" className="cover__btn">
          Take the tour
        </Link>
      </div>
    </main>

    <footer className="cover__footer">
      ClubConnect &middot; Made for students
    </footer>
  </div>
);

export default Cover;
