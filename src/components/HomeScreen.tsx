import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ClipboardList, FileText, Droplets, Truck, Calendar, List, Settings } from 'lucide-react';
import { Logo } from './Logo';

type UserRole = 'superAdmin' | 'manager' | 'worker';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
  userRole: UserRole;
  onLogout: () => void;
}

export function HomeScreen({ onNavigate, userRole, onLogout }: HomeScreenProps) {
  const { t } = useLanguage();

  const allMenuItems = [
    {
      id: 'morningRound',
      label: t('home.morningRound'),
      icon: ClipboardList,
      color: 'bg-slate-600',
      roles: ['superAdmin', 'manager', 'worker'] as UserRole[],
    },
    {
      id: 'maintenanceLog',
      label: t('home.maintenanceLog'),
      icon: FileText,
      color: 'bg-teal-700',
      roles: ['superAdmin', 'manager', 'worker'] as UserRole[],
    },
    {
      id: 'treatments',
      label: t('home.treatmentsReport'),
      icon: Droplets,
      color: 'bg-blue-700',
      roles: ['superAdmin', 'manager', 'worker'] as UserRole[],
    },
    {
      id: 'forklift',
      label: t('home.forkliftReport'),
      icon: Truck,
      color: 'bg-amber-700',
      roles: ['superAdmin', 'manager', 'worker'] as UserRole[],
    },
    {
      id: 'annualPlans',
      label: t('home.annualPlans'),
      icon: Calendar,
      color: 'bg-purple-700',
      roles: ['superAdmin', 'manager'] as UserRole[],
    },
    {
      id: 'reports',
      label: t('home.viewReports'),
      icon: List,
      color: 'bg-slate-700',
      roles: ['superAdmin', 'manager', 'worker'] as UserRole[],
    },
    {
      id: 'settings',
      label: t('home.settings'),
      icon: Settings,
      color: 'bg-neutral-700',
      roles: ['superAdmin', 'manager'] as UserRole[],
    },
  ];

  // Filter menu items based on user role
  const menuItems = allMenuItems.filter(item => item.roles.includes(userRole));

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 px-6 py-4">
        <Logo size="sm" isHome={true} onLogout={onLogout} title={t('home.title')} />
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