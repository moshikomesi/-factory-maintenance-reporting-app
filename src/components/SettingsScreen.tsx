import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, ChevronRight, Globe, Wrench, AlertCircle, Users } from 'lucide-react';

interface SettingsScreenProps {
  onBack: () => void;
}

export function SettingsScreen({ onBack }: SettingsScreenProps) {
  const { t, isRTL, language, setLanguage } = useLanguage();

  const settingsItems = [
    {
      id: 'language',
      icon: Globe,
      label: t('settings.language'),
      value: language === 'en' ? 'English' : 'עברית',
      action: () => setLanguage(language === 'en' ? 'he' : 'en'),
    },
    {
      id: 'machines',
      icon: Wrench,
      label: t('settings.machines'),
      value: '12 machines',
    },
    {
      id: 'faultTypes',
      icon: AlertCircle,
      label: t('settings.faultTypes'),
      value: '6 types',
    },
    {
      id: 'users',
      icon: Users,
      label: t('settings.users'),
      value: '8 users',
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-neutral-100 rounded-lg active:bg-neutral-200 transition-colors"
          >
            <ArrowLeft className={`w-5 h-5 text-neutral-700 ${isRTL ? 'rotate-180' : ''}`} />
          </button>
          <h1 className="text-lg font-semibold text-neutral-900">
            {t('settings.title')}
          </h1>
        </div>
      </div>

      {/* Settings List */}
      <div className="p-4">
        <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
          {settingsItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.action}
                className={`w-full px-4 py-4 flex items-center gap-4 hover:bg-neutral-50 active:bg-neutral-100 transition-colors ${
                  index !== settingsItems.length - 1 ? 'border-b border-neutral-200' : ''
                }`}
              >
                <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-neutral-700" />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium text-neutral-900">
                    {item.label}
                  </div>
                  {item.value && (
                    <div className="text-xs text-neutral-500 mt-0.5">
                      {item.value}
                    </div>
                  )}
                </div>
                <ChevronRight className={`w-5 h-5 text-neutral-400 flex-shrink-0 ${isRTL ? 'rotate-180' : ''}`} />
              </button>
            );
          })}
        </div>

        {/* App Info */}
        <div className="mt-8 text-center">
          <div className="text-xs text-neutral-500">
            Factory Maintenance System
          </div>
          <div className="text-xs text-neutral-400 mt-1">
            Version 1.0.0
          </div>
        </div>
      </div>
    </div>
  );
}
