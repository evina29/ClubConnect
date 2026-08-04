import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './SocialFeed.css';

const SocialFeed = () => {
  const { user } = useAuth();
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Sarah Chen',
      authorRole: 'Robotics Club President',
      authorPic: '',
      content: 'Excited to announce our robotics team placed 1st at the regional competition! ',
      likes: 45,
      comments: 12,
      timestamp: '2 hours ago',
      clubTag: 'Robotics'
    },
    {
      id: 2,
      author: 'Marcus Johnson',
      authorRole: 'Drama Club Member',
      authorPic: '',
      content: 'Opening night of our spring musical is this Friday! Come support the arts! ',
      likes: 32,
      comments: 8,
      timestamp: '5 hours ago',
      clubTag: 'Drama'
    },
    {
      id: 3,
      author: 'Emma Rodriguez',
      authorRole: 'Chess Club Officer',
      authorPic: '',
      content: 'Great turnout at today\'s chess workshop! Thanks to everyone who came. Next session: advanced strategies. ',
      likes: 28,
      comments: 6,
      timestamp: '1 day ago',
      clubTag: 'Chess'
    }
  ]);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const post = {
      id: Date.now(),
      author: user?.name || 'Anonymous',
      authorRole: user?.role || 'Member',
      authorPic: user?.profilePic || '',
      content: newPost,
      likes: 0,
      comments: 0,
      timestamp: 'Just now',
      clubTag: user?.clubs?.[0] || 'General'
    };

    setPosts([post, ...posts]);
    setNewPost('');
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
     post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  return (
 <div className="social-feed-page">
 <div className="feed-header">
 <h1> Community Feed</h1>
 <p>Connect with fellow club members</p>
 </div>

 <div className="create-post-card">
 <div className="post-author-pic">{user?.profilePic || ''}</div>
 <form onSubmit={handlePostSubmit} className="create-post-form">
 <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share an update with your community..."
            rows="3"
            aria-label="Create a new post"
          />
 <div className="post-actions">
 <div className="post-options">
 <button type="button" className="option-btn"> Photo</button>
 <button type="button" className="option-btn"> Poll</button>
 <button type="button" className="option-btn"> Event</button>
 </div>
 <button type="submit" className="post-btn" disabled={!newPost.trim()}>
             Post
 </button>
 </div>
 </form>
 </div>

 <div className="posts-container">
       {posts.map(post => (
 <div key={post.id} className="post-card">
 <div className="post-header">
 <div className="post-author-info">
 <div className="post-author-pic">{post.authorPic}</div>
 <div>
 <div className="post-author-name">{post.author}</div>
 <div className="post-author-meta">
                   {post.authorRole} • {post.timestamp}
 </div>
 </div>
 </div>
 <div className="club-tag">{post.clubTag}</div>
 </div>

 <div className="post-content">
 <p>{post.content}</p>
 </div>

 <div className="post-engagement">
 <div className="engagement-stats">
 <span>{post.likes} likes</span>
 <span>{post.comments} comments</span>
 </div>
 </div>

 <div className="post-actions-bar">
 <button 
                className="action-btn"
                onClick={() => handleLike(post.id)}
                aria-label="Like post"
              >
                Like
 </button>
 <button className="action-btn" aria-label="Comment on post">
                Comment
 </button>
 <button className="action-btn" aria-label="Share post">
                Share
 </button>
 </div>
 </div>
       ))}
 </div>
 </div>
 );
};

export default SocialFeed;
