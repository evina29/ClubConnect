import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from './Icon.jsx';

const tabs = [
  { to: '/app', label: 'Home', icon: 'home', end: true },
  { to: '/clubs', label: 'Clubs', icon: 'users', end: false },
  { to: '/app/calendar', label: 'Events', icon: 'calendar', end: false },
  { to: '/app/profile', label: 'Profile', icon: 'user', end: false },
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
                <Icon name={icon} size={22} />
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
