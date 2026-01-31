import { useState } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { Dashboard } from '@/components/modules/Dashboard';
import { UserManagement } from '@/components/modules/UserManagement';
import { TripDataManagement } from '@/components/modules/TripDataManagement';
import { PointsTransactionManagement } from '@/components/modules/PointsTransactionManagement';
import { VIPManagement } from '@/components/modules/VIPManagement';
import { RewardStoreManagement } from '@/components/modules/RewardStoreManagement';
import { CollectiblesManagement } from '@/components/modules/CollectiblesManagement';
import { AnalyticsManagement } from '@/components/modules/AnalyticsManagement';
import { AdManagement } from '@/components/modules/AdManagement';
import { LeaderboardManagement } from '@/components/modules/LeaderboardManagement';
import { ChatManagement } from '@/components/modules/ChatManagement';
import { LandingPage } from '@/components/LandingPage';
import { LoginPage } from '@/components/LoginPage';

type PageType = 'landing' | 'login' | 'admin';

export default function App() {
  const [selectedModule, setSelectedModule] = useState('dashboard');
  const [currentPage, setCurrentPage] = useState<PageType>('landing');

  const handleLogin = () => {
    setCurrentPage('admin');
  };

  const handleLogout = () => {
    setCurrentPage('landing');
    setSelectedModule('dashboard');
  };

  const handleGoToLogin = () => {
    setCurrentPage('login');
  };

  const handleGoToHome = () => {
    setCurrentPage('landing');
  };

  const renderContent = () => {
    switch (selectedModule) {
      case 'dashboard':
        return <Dashboard onModuleSelect={setSelectedModule} />;

      case 'user-management':
        return <UserManagement />;

      case 'trip-management':
        return <TripDataManagement />;

      case 'points-management':
        return <PointsTransactionManagement />;

      case 'vip-management':
        return <VIPManagement />;

      case 'rewards-management':
        return <RewardStoreManagement />;

      case 'collectibles-management':
        return <CollectiblesManagement />;

      case 'analytics-management':
        return <AnalyticsManagement />;

      case 'ad-management':
        return <AdManagement />;

      case 'leaderboard-management':
        return <LeaderboardManagement />;

      case 'chat-management':
        return <ChatManagement />;

      default:
        return <Dashboard onModuleSelect={setSelectedModule} />;
    }
  };

  // Render Landing Page
  if (currentPage === 'landing') {
    return <LandingPage onGoToLogin={handleGoToLogin} />;
  }

  // Render Login Page
  if (currentPage === 'login') {
    return <LoginPage onLogin={handleLogin} onGoToHome={handleGoToHome} />;
  }

  // Render Admin Portal
  return (
    <div className="size-full flex flex-col bg-gray-50">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          selectedModule={selectedModule}
          onModuleSelect={setSelectedModule}
          onLogout={handleLogout}
        />
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
