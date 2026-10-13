import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LandingNavbar } from './components/landing/LandingNavbar';
import { LandingHero } from './components/landing/LandingHero';
import { ProductWalkthroughPlayer } from './components/landing/ProductWalkthroughPlayer';
import { LandingSections } from './components/landing/LandingSections';
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

  return (
    <>
      {/* 1. Public Landing Page */}
      {currentView === 'landing' && (
        <div className="min-h-screen bg-[var(--color-canvas)]">
          <LandingNavbar />
          <LandingHero />
          <div className="px-4">
            <ProductWalkthroughPlayer />
          </div>
          <LandingSections />
        </div>
      )}

      {/* 2. Onboarding Flow (Simplify Style) */}
      {currentView === 'onboarding' && (
        <OnboardingWizard />
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
    <AppProvider>
      <MainRouter />
    </AppProvider>
  );
}
