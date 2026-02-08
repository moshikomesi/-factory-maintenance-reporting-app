import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { LoginScreen } from './components/LoginScreen';
import { HomeScreen } from './components/HomeScreen';
import { CreateReportScreen } from './components/CreateReportScreen';
import { ReportsListScreen } from './components/ReportsListScreen';
import { ReportDetailsScreen } from './components/ReportDetailsScreen';
import { AnalyticsScreen } from './components/AnalyticsScreen';
import { SettingsScreen } from './components/SettingsScreen';

type Screen = 'login' | 'home' | 'create' | 'reports' | 'reportDetails' | 'analytics' | 'settings';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [username, setUsername] = useState('');
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

  const handleLogin = (name: string) => {
    setUsername(name);
    setCurrentScreen('home');
  };

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  const handleSelectReport = (reportId: string) => {
    setSelectedReportId(reportId);
    setCurrentScreen('reportDetails');
  };

  const handleReportSubmitted = () => {
    setCurrentScreen('home');
  };

  return (
    <LanguageProvider>
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {currentScreen === 'login' && (
          <LoginScreen onLogin={handleLogin} />
        )}
        
        {currentScreen === 'home' && (
          <HomeScreen onNavigate={handleNavigate} />
        )}
        
        {currentScreen === 'create' && (
          <CreateReportScreen 
            onBack={() => setCurrentScreen('home')} 
            onSubmit={handleReportSubmitted}
          />
        )}
        
        {currentScreen === 'reports' && (
          <ReportsListScreen 
            onBack={() => setCurrentScreen('home')}
            onSelectReport={handleSelectReport}
          />
        )}
        
        {currentScreen === 'reportDetails' && selectedReportId && (
          <ReportDetailsScreen 
            reportId={selectedReportId}
            onBack={() => setCurrentScreen('reports')}
          />
        )}
        
        {currentScreen === 'analytics' && (
          <AnalyticsScreen onBack={() => setCurrentScreen('home')} />
        )}
        
        {currentScreen === 'settings' && (
          <SettingsScreen onBack={() => setCurrentScreen('home')} />
        )}
      </div>
    </LanguageProvider>
  );
}
