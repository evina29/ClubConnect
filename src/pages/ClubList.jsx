import React, { useEffect, useState } from 'react';
import ClubCard from '../components/ClubCard.jsx';
import './ClubList.css';

const ClubList = () => {
  const [clubs] = useState([
    { id: '1', name: 'Computer Science Club', description: 'Learn coding, algorithms, and software development', category: 'Academic', members: 45 },
    { id: '2', name: 'Math Club', description: 'Explore advanced mathematics and problem solving', category: 'Academic', members: 32 },
    { id: '3', name: 'Physics Society', description: 'Discuss physics concepts and experiments', category: 'Academic', members: 28 },
    { id: '4', name: 'Chemistry Lab', description: 'Hands-on chemistry experiments and research', category: 'Academic', members: 24 },
    { id: '5', name: 'Biology Research', description: 'Study life sciences and conduct research', category: 'Academic', members: 30 },
    { id: '6', name: 'Engineering Club', description: 'Build and design innovative projects', category: 'Academic', members: 38 },
    { id: '7', name: 'Robotics Team', description: 'Design and program robots for competitions', category: 'Academic', members: 42 },
    { id: '8', name: 'Debate Society', description: 'Develop argumentation and public speaking skills', category: 'Academic', members: 35 },
    { id: '9', name: 'Model UN', description: 'Simulate United Nations conferences', category: 'Academic', members: 40 },
    { id: '10', name: 'Economics Forum', description: 'Discuss economic theories and global markets', category: 'Academic', members: 26 },
    { id: '11', name: 'Literature Circle', description: 'Read and discuss classic and modern literature', category: 'Academic', members: 22 },
    { id: '12', name: 'History Enthusiasts', description: 'Explore historical events and periods', category: 'Academic', members: 20 },
    { id: '13', name: 'Psychology Group', description: 'Study human behavior and mental processes', category: 'Academic', members: 29 },
    { id: '14', name: 'Art Club', description: 'Paint, draw, and express creativity', category: 'Arts', members: 50 },
    { id: '15', name: 'Drama Society', description: 'Perform in plays and theatrical productions', category: 'Arts', members: 48 },
    { id: '16', name: 'Music Ensemble', description: 'Play instruments and perform concerts', category: 'Arts', members: 55 },
    { id: '17', name: 'Dance Crew', description: 'Learn and perform various dance styles', category: 'Arts', members: 44 },
    { id: '18', name: 'Photography Club', description: 'Capture moments and learn photo editing', category: 'Arts', members: 36 },
    { id: '19', name: 'Film Production', description: 'Create short films and documentaries', category: 'Arts', members: 33 },
    { id: '20', name: 'Poetry Slam', description: 'Write and perform spoken word poetry', category: 'Arts', members: 18 },
    { id: '21', name: 'Choir', description: 'Sing in harmony and perform vocal music', category: 'Arts', members: 52 },
    { id: '22', name: 'Creative Writing', description: 'Write stories, novels, and creative pieces', category: 'Arts', members: 27 },
    { id: '23', name: 'Pottery & Ceramics', description: 'Create ceramic art and sculptures', category: 'Arts', members: 21 },
    { id: '24', name: 'Fashion Design', description: 'Design and showcase fashion creations', category: 'Arts', members: 25 },
    { id: '25', name: 'Graphic Design', description: 'Learn digital design and visual communication', category: 'Arts', members: 39 },
    { id: '26', name: 'Basketball Team', description: 'Play competitive basketball', category: 'Sports', members: 60 },
    { id: '27', name: 'Soccer Club', description: 'Train and compete in soccer matches', category: 'Sports', members: 65 },
    { id: '28', name: 'Volleyball Team', description: 'Practice and play volleyball', category: 'Sports', members: 42 },
    { id: '29', name: 'Swimming Club', description: 'Improve swimming techniques and compete', category: 'Sports', members: 38 },
    { id: '30', name: 'Track & Field', description: 'Run, jump, and throw in athletic events', category: 'Sports', members: 47 },
    { id: '31', name: 'Tennis Club', description: 'Learn and play tennis', category: 'Sports', members: 31 },
    { id: '32', name: 'Martial Arts', description: 'Train in various martial arts disciplines', category: 'Sports', members: 34 },
    { id: '33', name: 'Yoga & Wellness', description: 'Practice yoga and mindfulness', category: 'Sports', members: 45 },
    { id: '34', name: 'Cross Country', description: 'Long distance running and racing', category: 'Sports', members: 28 },
    { id: '35', name: 'Ultimate Frisbee', description: 'Play this fast-paced team sport', category: 'Sports', members: 36 },
    { id: '36', name: 'Table Tennis', description: 'Compete in ping pong tournaments', category: 'Sports', members: 24 },
    { id: '37', name: 'Badminton Club', description: 'Play recreational and competitive badminton', category: 'Sports', members: 29 },
    { id: '38', name: 'Cricket Team', description: 'Learn and play cricket', category: 'Sports', members: 40 },
    { id: '39', name: 'Community Service', description: 'Volunteer and give back to the community', category: 'Service', members: 58 },
    { id: '40', name: 'Environmental Club', description: 'Promote sustainability and eco-friendly practices', category: 'Service', members: 52 },
    { id: '41', name: 'Key Club', description: 'Service organization for students', category: 'Service', members: 62 },
    { id: '42', name: 'Habitat for Humanity', description: 'Build homes for those in need', category: 'Service', members: 35 },
    { id: '43', name: 'Food Drive', description: 'Organize food collection for local shelters', category: 'Service', members: 41 },
    { id: '44', name: 'Tutoring Program', description: 'Help students with academic subjects', category: 'Service', members: 48 },
    { id: '45', name: 'Animal Rescue', description: 'Support local animal shelters', category: 'Service', members: 44 },
    { id: '46', name: 'Blood Drive', description: 'Organize blood donation events', category: 'Service', members: 27 },
    { id: '47', name: 'Senior Support', description: 'Visit and assist elderly community members', category: 'Service', members: 23 },
    { id: '48', name: 'Youth Mentorship', description: 'Mentor younger students', category: 'Service', members: 31 },
    { id: '49', name: 'Anime Club', description: 'Watch and discuss anime series', category: 'Culture', members: 46 },
    { id: '50', name: 'Gaming Club', description: 'Play video games and esports', category: 'Culture', members: 72 },
    { id: '51', name: 'Chess Club', description: 'Learn strategies and compete in chess', category: 'Culture', members: 25 },
    { id: '52', name: 'Book Club', description: 'Read and discuss books together', category: 'Culture', members: 33 },
    { id: '53', name: 'Cooking Club', description: 'Learn recipes and culinary techniques', category: 'Culture', members: 37 },
    { id: '54', name: 'Astronomy Club', description: 'Observe stars and study space', category: 'Culture', members: 28 },
    { id: '55', name: 'Language Exchange', description: 'Practice foreign languages with peers', category: 'Culture', members: 41 },
  ]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [filteredClubs, setFilteredClubs] = useState(clubs);

  useEffect(() => {
    let filtered = clubs.filter((club) =>
     club.name.toLowerCase().includes(search.toLowerCase())
    );
    if (filter !== 'All') {
      filtered = filtered.filter((club) => club.category === filter);
    }
    setFilteredClubs(filtered);
  }, [search, filter, clubs]);

  const categories = ['All', 'Academic', 'Arts', 'Sports', 'Service', 'Culture'];

  return (
 <div className="club-list-page">
 <h1 className="club-list-page__title">Explore Clubs</h1>

 <label className="club-list-page__search" htmlFor="explore-club-search">
 <span className="club-list-page__search-icon" aria-hidden="true">
 
       </span>
 <input
          id="explore-club-search"
          className="club-list-page__search-input"
          type="search"
          placeholder="Search clubs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoComplete="off"
        />
 </label>

 <div
        className="club-list-page__chips"
        role="tablist"
        aria-label="Categories"
      >
       {categories.map((cat) => (
 <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={filter === cat}
            className={`club-list-page__chip${filter === cat ? ' club-list-page__chip--active' : ''}`}
            onClick={() => setFilter(cat)}
          >
           {cat}
 </button>
       ))}
 </div>

 <p className="club-list-page__meta">
       {filteredClubs.length} club{filteredClubs.length !== 1 ? 's' : ''}
        {filter !== 'All' ? ` · ${filter}` : ''}
 </p>

 <div className="club-list-page__grid">
       {filteredClubs.map((club) => (
 <ClubCard key={club.id} club={club} />
       ))}
 </div>
 </div>
 );
};

export default ClubList;
