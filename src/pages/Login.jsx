import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/app');
    } catch (err) {
      setError(err.message || 'Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    if (resetEmail) {
      setResetMessage(`Password reset instructions sent to ${resetEmail}`);
      setTimeout(() => {
        setShowResetModal(false);
        setResetMessage('');
        setResetEmail('');
      }, 2000);
    }
  };

  return (
    <div className="login-bg">
      <div className="login-glass">
        <div className="login-title">Welcome Back</div>
        <div className="login-desc">Sign in to continue to ClubConnect</div>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            className="login-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="login-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div style={{ textAlign: 'right', marginBottom: '18px' }}>
            <a 
              href="#" 
              className="login-link"
              onClick={(e) => { e.preventDefault(); setShowResetModal(true); }}
            >
              Forgot password?
            </a>
          </div>
          {error && <div className="login-error">{error}</div>}
          <button 
            type="submit" 
            className="login-btn"
            disabled={loading}
            aria-label="Sign in to your account"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <div style={{ textAlign: 'center', color: '#b6e6c9', fontSize: '1rem' }}>
          Don't have an account?{' '}
          <Link to="/app/register" className="login-link">Sign up</Link>
        </div>
      </div>

      {/* Password Reset Modal */}
      {showResetModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }} onClick={() => setShowResetModal(false)}>
          <div style={{
            background: '#222',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '400px',
            width: '90%',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            color: '#fff'
          }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ color: '#7ED957', marginBottom: '8px' }}>Reset Password</h2>
            <p style={{ color: '#b6e6c9', fontSize: '14px', marginBottom: '24px' }}>
              Enter your email and we'll send you instructions to reset your password
            </p>
            {resetMessage ? (
              <p style={{ color: '#7ED957', fontSize: '14px', textAlign: 'center', padding: '20px' }}>
                ✓ {resetMessage}
              </p>
            ) : (
              <form onSubmit={handleReset}>
                <input
                  type="email"
                  placeholder="Email address"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                  className="login-input"
                  style={{ background: 'rgba(255,255,255,0.10)', color: '#fff', border: 'none' }}
                />
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setShowResetModal(false)}
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: 'transparent',
                      border: '1px solid #444',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      color: '#b6e6c9',
                      fontSize: '14px'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: 'linear-gradient(135deg, #7ED957, #6EB5FF)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;