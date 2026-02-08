import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'he';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<string, Record<Language, string>> = {
  // Login
  'login.title': { en: 'Factory Maintenance', he: 'תחזוקת מפעל' },
  'login.username': { en: 'Username', he: 'שם משתמש' },
  'login.login': { en: 'Login', he: 'התחבר' },
  
  // Home
  'home.title': { en: 'Daily Reports', he: 'דוחות יומיים' },
  'home.createReport': { en: 'Create New Report', he: 'צור דוח חדש' },
  'home.viewReports': { en: 'View Reports', he: 'צפה בדוחות' },
  'home.faultSummary': { en: 'Fault Summary', he: 'סיכום תקלות' },
  'home.settings': { en: 'Settings', he: 'הגדרות' },
  
  // Create Report
  'report.createTitle': { en: 'Create Daily Report', he: 'צור דוח יומי' },
  'report.date': { en: 'Date', he: 'תאריך' },
  'report.shift': { en: 'Shift', he: 'משמרת' },
  'report.department': { en: 'Department / Line', he: 'מחלקה / קו ייצור' },
  'report.addFault': { en: 'Add Fault', he: 'הוסף תקלה' },
  'report.faults': { en: 'Faults', he: 'תקלות' },
  'report.dailyChecks': { en: 'Daily Checks', he: 'בדיקות יומיות' },
  'report.dailyInspection': { en: 'Daily inspection completed', he: 'בדיקה יומית הושלמה' },
  'report.oilChecked': { en: 'Oil checked', he: 'שמן נבדק' },
  'report.cleaningCompleted': { en: 'Cleaning completed', he: 'ניקיון הושלם' },
  'report.notes': { en: 'Notes', he: 'הערות' },
  'report.submit': { en: 'Submit Report', he: 'שלח דוח' },
  'report.noFaults': { en: 'No faults added yet', he: 'לא נוספו תקלות' },
  
  // Fault Modal
  'fault.title': { en: 'Add Fault', he: 'הוסף תקלה' },
  'fault.machine': { en: 'Machine', he: 'מכונה' },
  'fault.type': { en: 'Fault Type', he: 'סוג תקלה' },
  'fault.startTime': { en: 'Start Time', he: 'שעת התחלה' },
  'fault.endTime': { en: 'End Time', he: 'שעת סיום' },
  'fault.technician': { en: 'Technician Name', he: 'שם טכנאי' },
  'fault.save': { en: 'Save Fault', he: 'שמור תקלה' },
  'fault.cancel': { en: 'Cancel', he: 'ביטול' },
  'fault.downtime': { en: 'Downtime', he: 'זמן השבתה' },
  
  // Reports List
  'reports.title': { en: 'Reports', he: 'דוחות' },
  'reports.shift': { en: 'Shift', he: 'משמרת' },
  'reports.faults': { en: 'faults', he: 'תקלות' },
  'reports.status': { en: 'Status', he: 'סטטוס' },
  'reports.submitted': { en: 'Submitted', he: 'נשלח' },
  'reports.draft': { en: 'Draft', he: 'טיוטה' },
  
  // Report Details
  'details.title': { en: 'Report Details', he: 'פרטי דוח' },
  'details.reportInfo': { en: 'Report Information', he: 'מידע דוח' },
  'details.faultsList': { en: 'Faults List', he: 'רשימת תקלות' },
  'details.totalDowntime': { en: 'Total Downtime', he: 'זמן השבתה כולל' },
  'details.minutes': { en: 'minutes', he: 'דקות' },
  
  // Analytics
  'analytics.title': { en: 'Analytics', he: 'אנליטיקה' },
  'analytics.totalFaults': { en: 'Total Faults This Week', he: 'סה"כ תקלות השבוע' },
  'analytics.totalDowntime': { en: 'Total Downtime', he: 'זמן השבתה כולל' },
  'analytics.problematicMachine': { en: 'Most Problematic Machine', he: 'מכונה בעייתית ביותר' },
  'analytics.hours': { en: 'hours', he: 'שעות' },
  'analytics.faultsByType': { en: 'Faults by Type', he: 'תקלות לפי סוג' },
  
  // Settings
  'settings.title': { en: 'Settings', he: 'הגדרות' },
  'settings.language': { en: 'Change Language', he: 'שנה שפה' },
  'settings.machines': { en: 'Machines List', he: 'רשימת מכונות' },
  'settings.faultTypes': { en: 'Fault Types List', he: 'רשימת סוגי תקלות' },
  'settings.users': { en: 'Users', he: 'משתמשים' },
  
  // Common
  'common.back': { en: 'Back', he: 'חזור' },
  'common.morning': { en: 'Morning', he: 'בוקר' },
  'common.afternoon': { en: 'Afternoon', he: 'צהריים' },
  'common.night': { en: 'Night', he: 'לילה' },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  useEffect(() => {
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage, 
        t, 
        isRTL: language === 'he' 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
