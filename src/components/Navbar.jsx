import React from 'react';
import { NavLink } from 'react-router-dom';

const tabs = [
  { to: '/app', label: 'Home', icon: '🏠', end: true },
  { to: '/clubs', label: 'Clubs', icon: '👥', end: false },
  { to: '/app/calendar', label: 'Events', icon: '📅', end: false },
  { to: '/app/profile', label: 'Profile', icon: '👤', end: false },
];

const Navbar = () => {
  return (
    <nav className="navbar mobile-tab-bar" aria-label="Main">
      <ul className="navbar-links nav-links">
        {tabs.map(({ to, label, icon, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                `nav-link${isActive ? ' nav-link--active' : ''}`
              }
            >
              <span className="nav-link-icon" aria-hidden="true">
                {icon}
              </span>
              <span className="nav-link-label">{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
