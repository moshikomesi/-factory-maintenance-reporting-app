import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FileText, List, BarChart3, Settings } from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const { t } = useLanguage();

  const menuItems = [
    {
      id: 'create',
      label: t('home.createReport'),
      icon: FileText,
      color: 'bg-slate-600',
    },
    {
      id: 'reports',
      label: t('home.viewReports'),
      icon: List,
      color: 'bg-slate-700',
    },
    {
      id: 'analytics',
      label: t('home.faultSummary'),
      icon: BarChart3,
      color: 'bg-teal-700',
    },
    {
      id: 'settings',
      label: t('home.settings'),
      icon: Settings,
      color: 'bg-neutral-700',
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 px-6 py-4">
        <h1 className="text-xl font-semibold text-neutral-900">
          {t('home.title')}
        </h1>
      </div>

      {/* Menu Cards */}
      <div className="p-6 space-y-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="w-full bg-white border border-neutral-200 rounded-lg p-6 flex items-center gap-4 hover:bg-neutral-50 active:bg-neutral-100 transition-colors"
            >
              <div className={`${item.color} w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-lg font-medium text-neutral-900">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
