import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Icon from '../components/Icon';
import './Home.css';

const CATEGORIES = ['All', 'Academic', 'Service', 'Arts', 'Sports'];

const FEATURED_CLUB = {
  id: 2,
  name: 'Robotics Club',
  tagline: 'Building ideas. Creating impact.',
  members: 24,
};

const UPCOMING_EVENTS = [
  {
    id: 'cleanup',
    title: 'Environmental Clean-Up',
    meta: 'May 20 . 3:30 PM',
    icon: 'leaf',
    route: '/app/events/cleanup',
  },
  {
    id: 'deca',
    title: 'DECA General Meeting',
    meta: 'May 22 . 4:00 PM',
    icon: 'chart',
    route: '/app/events/deca',
  },
  {
    id: 'jazz',
    title: 'Jazz Band Spring Concert',
    meta: 'May 24 . 7:00 PM',
    icon: 'music',
    route: '/app/events/jazz',
  },
  {
    id: 'soccer',
    title: 'Varsity Soccer vs. Westview',
    meta: 'May 28 . 5:00 PM',
    icon: 'ball',
    route: '/app/events/soccer',
  },
];

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const firstName = useMemo(() => {
    const raw = user?.name?.trim() || 'there';
    return raw.split(/\s+/)[0];
  }, [user?.name]);

  return (
    <div className="dashboard dashboard--discover">
      <header className="discover-header">
        <h1 className="discover-greeting">
          Hi, <span className="discover-greeting-highlight">{firstName}</span>
        </h1>
        <Link
          to="/app/profile"
          className="discover-profile-link"
          aria-label="Open profile"
        >
          <Icon name="user" size={22} />
        </Link>
      </header>

      <section className="discover-section" aria-labelledby="discover-clubs-heading">
        <h2 id="discover-clubs-heading" className="discover-section-title">
          Discover Clubs
        </h2>
        <label className="discover-search" htmlFor="club-search">
          <Icon name="search" size={18} className="discover-search-icon" />
          <input
            id="club-search"
            type="search"
            className="discover-search-input"
            placeholder="Search clubs, events, or interests..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoComplete="off"
          />
        </label>
        <div
          className="discover-chips"
          role="tablist"
          aria-label="Club categories"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat}
              className={`discover-chip${activeCategory === cat ? ' discover-chip--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="discover-section" aria-labelledby="featured-heading">
        <h2 id="featured-heading" className="visually-hidden">
          Featured club
        </h2>
        <button
          type="button"
          className="featured-club-card"
          onClick={() => navigate(`/clubs/${FEATURED_CLUB.id}`)}
        >
          <h3 className="featured-club-card__title">{FEATURED_CLUB.name}</h3>
          <p className="featured-club-card__tagline">{FEATURED_CLUB.tagline}</p>
          <p className="featured-club-card__meta">
            {FEATURED_CLUB.members} Members
          </p>
        </button>
      </section>

      <section
        className="discover-section discover-section--events"
        aria-labelledby="upcoming-events-heading"
      >
        <div className="discover-section-row">
          <h2 id="upcoming-events-heading" className="discover-section-title discover-section-title--inline">
            Upcoming Events
          </h2>
          <button
            type="button"
            className="discover-link-all"
            onClick={() => navigate('/app/calendar')}
          >
            View All
          </button>
        </div>
        <ul className="event-row-list">
          {UPCOMING_EVENTS.map((ev) => (
            <li key={ev.id}>
              <button
                type="button"
                className="event-row"
                onClick={() => navigate(ev.route)}
              >
                <span className="event-row__thumb">
                  <Icon name={ev.icon} size={20} />
                </span>
                <span className="event-row__text">
                  <span className="event-row__title">{ev.title}</span>
                  <span className="event-row__meta">{ev.meta}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Home;
