import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Onboarding.css';

const steps = [
  {
    id: 1,
    title: 'Welcome to Club-Connect',
    subtitle: 'Your campus life, in one place.',
    description:
      'Discover clubs, track events, and stay connected with everything happening at your school.',
    emoji: '',
  },
  {
    id: 2,
    title: 'Find your people',
    subtitle: 'Join clubs that match your interests.',
    description:
      'Browse dozens of clubs, see what they do, and join instantly. No more posters you never see again.',
    emoji: '',
  },
  {
    id: 3,
    title: 'Never miss an event',
    subtitle: 'Smart reminders and attendance tracking.',
    description:
      'View all your club meetings and events in one calendar, and track your participation over time.',
    emoji: '',
  },
  {
    id: 4,
    title: 'Ready to get started?',
    subtitle: 'Create your account in seconds.',
    description:
      'Sign up to start building your portfolio of club involvement, projects, and leadership.',
    emoji: '',
  },
];

const Onboarding = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const navigate = useNavigate();
  const isLastStep = stepIndex === steps.length - 1;
  const current = steps[stepIndex];

  const handleNext = () => {
    if (isLastStep) {
      navigate('/app/register');
      return;
    }
    setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleSkip = () => {
    navigate('/app/login');
  };

  return (
 <div className="onboarding-shell">
 <div className="onboarding-phone-frame">
 <header className="onboarding-header">
 <span className="onboarding-logo"> Club-Connect</span>
 <button
            type="button"
            className="onboarding-skip"
            onClick={handleSkip}
          >
           Skip
 </button>
 </header>

 <main className="onboarding-main">
 <div className="onboarding-emoji" aria-hidden="true">
           {current.emoji}
 </div>
 <h1 className="onboarding-title">{current.title}</h1>
         {current.subtitle && (
 <p className="onboarding-subtitle">{current.subtitle}</p>
         )}
 <p className="onboarding-description">{current.description}</p>

 <div className="onboarding-dots" aria-label="Onboarding progress">
           {steps.map((step, index) => (
 <button
                key={step.id}
                type="button"
                className={`onboarding-dot${
                  index === stepIndex ? ' active' : ''
                }`}
                onClick={() => setStepIndex(index)}
                aria-label={`Go to step ${index + 1}`}
                aria-current={index === stepIndex ? 'step' : undefined}
              />
           ))}
 </div>
 </main>

 <footer className="onboarding-footer">
 <button
            type="button"
            className="onboarding-primary"
            onClick={handleNext}
          >
           {isLastStep ? 'Create account' : 'Next'}
 </button>
 <button
            type="button"
            className="onboarding-secondary"
            onClick={() => navigate('/app/login')}
          >
           I already have an account
 </button>
 </footer>
 </div>
 </div>
 );
};

export default Onboarding;

