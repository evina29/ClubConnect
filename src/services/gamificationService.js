// Gamification Service - Badges, Points, Achievements
export const badges = [
  { id: 'attendance_streak_5', name: '5-Day Streak', icon: '', description: 'Attended 5 events in a row', points: 50 },
  { id: 'attendance_streak_10', name: '10-Day Streak', icon: '', description: 'Attended 10 events in a row', points: 100 },
  { id: 'early_bird', name: 'Early Bird', icon: '', description: 'First to join an event 5 times', points: 30 },
  { id: 'social_butterfly', name: 'Social Butterfly', icon: '', description: 'Joined 5+ clubs', points: 75 },
  { id: 'event_pioneer', name: 'Event Pioneer', icon: '', description: 'Attended 20+ events', points: 150 },
  { id: 'club_leader', name: 'Club Leader', icon: '', description: 'President or Officer role', points: 200 },
  { id: 'community_champion', name: 'Community Champion', icon: '', description: '100+ hours volunteered', points: 300 },
  { id: 'mentor_master', name: 'Mentor Master', icon: '', description: 'Mentored 5+ students', points: 100 },
];

export const achievements = {
  eventsAttended: [
    { threshold: 5, name: 'Getting Started', icon: '', points: 20 },
    { threshold: 10, name: 'Regular Attendee', icon: '', points: 40 },
    { threshold: 20, name: 'Event Enthusiast', icon: '', points: 80 },
    { threshold: 50, name: 'Event Master', icon: '', points: 200 },
  ],
  clubsJoined: [
    { threshold: 1, name: 'First Steps', icon: '', points: 10 },
    { threshold: 3, name: 'Explorer', icon: '', points: 30 },
    { threshold: 5, name: 'Connector', icon: '', points: 60 },
    { threshold: 10, name: 'Super Connector', icon: '', points: 150 },
  ],
  hoursVolunteered: [
    { threshold: 10, name: 'Helpful Helper', icon: '', points: 25 },
    { threshold: 25, name: 'Dedicated Volunteer', icon: '', points: 50 },
    { threshold: 50, name: 'Community Hero', icon: '', points: 100 },
    { threshold: 100, name: 'Legendary Volunteer', icon: '', points: 250 },
  ],
};

export const calculateUserLevel = (totalPoints) => {
  if (totalPoints < 100) return { level: 1, title: 'Newcomer', color: '#95E1D3' };
  if (totalPoints < 250) return { level: 2, title: 'Member', color: '#6EB5FF' };
  if (totalPoints < 500) return { level: 3, title: 'Active Member', color: '#FFE066' };
  if (totalPoints < 1000) return { level: 4, title: 'Super Member', color: '#FF9AA2' };
  if (totalPoints < 2000) return { level: 5, title: 'Leader', color: '#7ED957' };
  return { level: 6, title: 'Legend', color: '#FFD700' };
};

export const checkNewAchievements = (userStats) => {
  const newBadges = [];
  
  // Check event attendance badges
  if (userStats.eventsAttended >= 20 && !userStats.badges?.includes('event_pioneer')) {
    newBadges.push('event_pioneer');
  }
  
  // Check club membership badges
  if (userStats.clubsJoined >= 5 && !userStats.badges?.includes('social_butterfly')) {
    newBadges.push('social_butterfly');
  }
  
  // Check leadership badges
  if (userStats.role === 'president' && !userStats.badges?.includes('club_leader')) {
    newBadges.push('club_leader');
  }
  
  return newBadges;
};

export const getLeaderboard = (users) => {
  return users
    .map(user => ({
      ...user,
      totalPoints: user.points || 0,
      level: calculateUserLevel(user.points || 0)
    }))
    .sort((a, b) => b.totalPoints - a.totalPoints)
    .slice(0, 10);
};
