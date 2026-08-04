import React from 'react';
import { Link } from 'react-router-dom';
import './Cover.css';

const Cover = () => (
  <div className="cover">
    <header className="cover__topbar">
      <span className="cover__wordmark">
        ClubConnect<span className="cover__dot">.</span>
      </span>
      <Link to="/app/login" className="cover__signin">
        Sign in
      </Link>
    </header>

    <main className="cover__main">
      <p className="cover__eyebrow">For school clubs</p>

      <h1 className="cover__headline">
        Find your club.
        <br />
        Keep up with <span className="cover__mark">all of them</span>.
      </h1>

      <p className="cover__lede">
        See what your clubs are doing, RSVP to events, and check in with a QR
        code. One place instead of five group chats and a paper sign up sheet.
      </p>

      <div className="cover__actions">
        <Link to="/app/register" className="cover__btn cover__btn--primary">
          Get started
        </Link>
        <Link to="/onboarding" className="cover__btn cover__btn--ghost">
          Take the tour
        </Link>
      </div>

      <ul className="cover__chips">
        <li className="cover__chip">Browse clubs</li>
        <li className="cover__chip">RSVP to events</li>
        <li className="cover__chip">QR check in</li>
        <li className="cover__chip">Points &amp; badges</li>
      </ul>
    </main>

    <footer className="cover__footer">
      <span>ClubConnect</span>
      <span aria-hidden="true">/</span>
      <span>Made for students</span>
    </footer>
  </div>
);

export default Cover;
