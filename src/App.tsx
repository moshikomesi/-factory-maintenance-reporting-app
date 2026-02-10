import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { LoginScreen } from './components/LoginScreen';
import { HomeScreen } from './components/HomeScreen';
import { MorningRoundScreen } from './components/MorningRoundScreen';
import { MaintenanceLogScreen } from './components/MaintenanceLogScreen';
import { TreatmentsReportScreen } from './components/TreatmentsReportScreen';
import { ForkliftReportScreen } from './components/ForkliftReportScreen';
import { AnnualPlansScreen } from './components/AnnualPlansScreen';
import { ReportsListScreen } from './components/ReportsListScreen';
import { ReportDetailsScreen } from './components/ReportDetailsScreen';
import { SettingsScreen } from './components/SettingsScreen';

type Screen = 'login' | 'home' | 'morningRound' | 'maintenanceLog' | 'treatments' | 'forklift' | 'annualPlans' | 'reports' | 'reportDetails' | 'settings';
type UserRole = 'superAdmin' | 'manager' | 'worker';

// Role detection based on username
function detectRole(username: string): UserRole {
  const lower = username.toLowerCase();
  
  // Super Admin keywords (English + Hebrew)
  if (lower.includes('admin') || lower.includes('super') || lower.includes('אדמין')) {
    return 'superAdmin';
  }
  
  // Manager keywords (English + Hebrew)
  if (lower.includes('manager') || lower.includes('מנהל') || lower.includes('מנהלן')) {
    return 'manager';
  }
  
  // Worker keywords (English + Hebrew + Thai) or default
  return 'worker';
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [username, setUsername] = useState('');
  const [userRole, setUserRole] = useState<UserRole>('worker');
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [selectedReportType, setSelectedReportType] = useState<'morning' | 'maintenance' | null>(null);

  const handleLogin = (name: string) => {
    setUsername(name);
    setUserRole(detectRole(name));
    setCurrentScreen('home');
  };

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  const handleLogout = () => {
    setCurrentScreen('login');
    setUsername('');
    setUserRole('worker');
    setSelectedReportId(null);
    setSelectedReportType(null);
  };

  const handleSelectReport = (reportId: string, type: 'morning' | 'maintenance') => {
    setSelectedReportId(reportId);
    setSelectedReportType(type);
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
          <HomeScreen onNavigate={handleNavigate} userRole={userRole} onLogout={handleLogout} />
        )}
        
        {currentScreen === 'morningRound' && (
          <MorningRoundScreen 
            onBack={() => setCurrentScreen('home')} 
            onSubmit={handleReportSubmitted}
          />
        )}
        
        {currentScreen === 'maintenanceLog' && (
          <MaintenanceLogScreen 
            onBack={() => setCurrentScreen('home')} 
            onSubmit={handleReportSubmitted}
          />
        )}
        
        {currentScreen === 'treatments' && (
          <TreatmentsReportScreen 
            onBack={() => setCurrentScreen('home')} 
            onSubmit={handleReportSubmitted}
          />
        )}
        
        {currentScreen === 'forklift' && (
          <ForkliftReportScreen 
            onBack={() => setCurrentScreen('home')} 
            onSubmit={handleReportSubmitted}
          />
        )}
        
        {currentScreen === 'annualPlans' && (
          <AnnualPlansScreen 
            onBack={() => setCurrentScreen('home')}
          />
        )}
        
        {currentScreen === 'reports' && (
          <ReportsListScreen 
            onBack={() => setCurrentScreen('home')}
            onSelectReport={handleSelectReport}
          />
        )}
        
        {currentScreen === 'reportDetails' && selectedReportId && selectedReportType && (
          <ReportDetailsScreen 
            reportId={selectedReportId}
            reportType={selectedReportType}
            onBack={() => setCurrentScreen('reports')}
          />
        )}
        
        {currentScreen === 'settings' && (
          <SettingsScreen onBack={() => setCurrentScreen('home')} userRole={userRole} />
        )}
      </div>
    </LanguageProvider>
  );
}