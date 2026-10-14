import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { LandingNavbar } from './components/landing/LandingNavbar';
import { LandingHero } from './components/landing/LandingHero';
import { LandingSections } from './components/landing/LandingSections';
import { CookieBanner } from './components/landing/CookieBanner';
import { OnboardingWizard } from './components/onboarding/OnboardingWizard';
import { AppLayout } from './components/app/AppLayout';
import { HomeFeed } from './components/app/HomeFeed';
import { StartupsDirectory } from './components/app/StartupsDirectory';
import { PeopleDirectory } from './components/app/PeopleDirectory';
import { ActionFeed } from './components/app/ActionFeed';
import { WorkspaceView } from './components/app/WorkspaceView';
import { MessagesView } from './components/app/MessagesView';
import { ProfileView } from './components/app/ProfileView';
import { FeedbackModal } from './components/common/FeedbackModal';
import { PostBuildModal } from './components/app/PostBuildModal';
import { CommandPalette } from './components/common/CommandPalette';
import { ToastContainer } from './components/common/ToastContainer';

const MainRouter: React.FC = () => {
  const { currentView } = useApp();

  // Scroll reveal observer that activates on scroll down and resets when scrolling back to the top
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          } else {
            // When element is below viewport after scrolling up, remove class so it can animate again!
            if (entry.boundingClientRect.top > 0) {
              entry.target.classList.remove('is-revealed');
            }
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [currentView]);

  return (
    <>
      {/* 1. Public Landing Page */}
      {currentView === 'landing' && (
        <div className="min-h-screen bg-[#fbfbfa]">
          <LandingNavbar />
          <LandingHero />
          <LandingSections />
          <CookieBanner />
        </div>
      )}

      {/* 2. Onboarding Flow with Built-in Safeguards */}
      {currentView === 'onboarding' && (
        <ErrorBoundary fallbackMessage="Onboarding Step Recovery Active">
          <OnboardingWizard />
        </ErrorBoundary>
      )}

      {/* 3. Core Authenticated App Views */}
      {currentView !== 'landing' && currentView !== 'onboarding' && (
        <AppLayout>
          {currentView === 'home' && <HomeFeed />}
          {currentView === 'startups' && <StartupsDirectory />}
          {currentView === 'people' && <PeopleDirectory />}
          {currentView === 'feed' && <ActionFeed />}
          {currentView === 'workspace' && <WorkspaceView />}
          {currentView === 'messages' && <MessagesView />}
          {currentView === 'profile' && <ProfileView />}
        </AppLayout>
      )}

      {/* Global Modals & Notifications */}
      <FeedbackModal />
      <PostBuildModal />
      <CommandPalette />
      <ToastContainer />
    </>
  );
};

export default function App() {
  return (
    <ErrorBoundary fallbackMessage="Application State Boundary">
      <AppProvider>
        <MainRouter />
      </AppProvider>
    </ErrorBoundary>
  );
}
