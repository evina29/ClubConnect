import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ClubCard.css';

const pillClass = (category) => {
  const key = (category || '').toLowerCase();
  const map = {
    academic: 'club-card-v2__pill--academic',
    arts: 'club-card-v2__pill--arts',
    sports: 'club-card-v2__pill--sports',
    service: 'club-card-v2__pill--service',
    culture: 'club-card-v2__pill--culture',
  };
  return map[key] || 'club-card-v2__pill--academic';
};

const ClubCard = ({ club }) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="club-card-v2"
      onClick={() => navigate(`/clubs/${club.id}`)}
    >
      <span className="club-card-v2__title">{club.name}</span>
      <span className="club-card-v2__desc">{club.description}</span>
      <div className="club-card-v2__footer">
        <span className="club-card-v2__members">
          {club.members} members
        </span>
        <span className={`club-card-v2__pill ${pillClass(club.category)}`}>
          {club.category}
        </span>
        <span className="club-card-v2__chevron" aria-hidden="true">
          ›
        </span>
      </div>
    </button>
  );
};

export default ClubCard;
