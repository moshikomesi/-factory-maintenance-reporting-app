import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, TrendingUp, Clock, AlertTriangle } from 'lucide-react';

interface AnalyticsScreenProps {
  onBack: () => void;
}

const faultsByType = [
  { type: 'Mechanical', count: 12, color: 'bg-slate-600' },
  { type: 'Electrical', count: 8, color: 'bg-teal-600' },
  { type: 'Hydraulic', count: 6, color: 'bg-amber-600' },
  { type: 'Pneumatic', count: 3, color: 'bg-blue-600' },
  { type: 'Software', count: 2, color: 'bg-purple-600' },
];

export function AnalyticsScreen({ onBack }: AnalyticsScreenProps) {
  const { t, isRTL } = useLanguage();

  const maxCount = Math.max(...faultsByType.map(f => f.count));

  return (
    <div className="min-h-screen bg-neutral-50 pb-6">
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
            {t('analytics.title')}
          </h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* KPI Cards */}
        <div className="space-y-3">
          {/* Total Faults */}
          <div className="bg-white border border-neutral-200 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-5 h-5 text-neutral-600" />
                  <h3 className="text-sm font-medium text-neutral-600">
                    {t('analytics.totalFaults')}
                  </h3>
                </div>
                <div className="text-3xl font-bold text-neutral-900">31</div>
              </div>
              <div className="text-xs text-neutral-500 bg-neutral-100 px-2 py-1 rounded">
                This week
              </div>
            </div>
          </div>

          {/* Total Downtime */}
          <div className="bg-white border border-neutral-200 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-5 h-5 text-neutral-600" />
                  <h3 className="text-sm font-medium text-neutral-600">
                    {t('analytics.totalDowntime')}
                  </h3>
                </div>
                <div className="text-3xl font-bold text-neutral-900">
                  24.5 <span className="text-lg font-medium text-neutral-600">{t('analytics.hours')}</span>
                </div>
              </div>
              <div className="text-xs text-neutral-500 bg-neutral-100 px-2 py-1 rounded">
                This week
              </div>
            </div>
          </div>

          {/* Most Problematic Machine */}
          <div className="bg-white border border-neutral-200 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-5 h-5 text-neutral-600" />
                  <h3 className="text-sm font-medium text-neutral-600">
                    {t('analytics.problematicMachine')}
                  </h3>
                </div>
                <div className="text-2xl font-bold text-neutral-900">CNC-01</div>
                <div className="text-sm text-neutral-500 mt-1">8 faults this week</div>
              </div>
            </div>
          </div>
        </div>

        {/* Faults by Type Chart */}
        <div className="bg-white border border-neutral-200 rounded-lg p-4">
          <h2 className="text-sm font-semibold text-neutral-900 mb-4">
            {t('analytics.faultsByType')}
          </h2>
          <div className="space-y-3">
            {faultsByType.map((item) => {
              const percentage = (item.count / maxCount) * 100;
              return (
                <div key={item.type}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-neutral-700 font-medium">
                      {item.type}
                    </span>
                    <span className="text-sm font-semibold text-neutral-900">
                      {item.count}
                    </span>
                  </div>
                  <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weekly Trend - Simple representation */}
        <div className="bg-white border border-neutral-200 rounded-lg p-4">
          <h2 className="text-sm font-semibold text-neutral-900 mb-4">
            Weekly Trend
          </h2>
          <div className="flex items-end justify-between gap-2 h-32">
            {[
              { day: 'Mon', faults: 4 },
              { day: 'Tue', faults: 6 },
              { day: 'Wed', faults: 3 },
              { day: 'Thu', faults: 7 },
              { day: 'Fri', faults: 5 },
              { day: 'Sat', faults: 4 },
              { day: 'Sun', faults: 2 },
            ].map((day, idx) => {
              const height = (day.faults / 7) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col justify-end items-center flex-1">
                    <div
                      className="w-full bg-slate-600 rounded-t transition-all duration-500"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <div className="text-xs text-neutral-500 font-medium">
                    {day.day}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
