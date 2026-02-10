import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Logo } from './Logo';

interface Report {
  id: string;
  date: string;
  submittedBy: string;
  summary: string;
  type: 'morning' | 'maintenance';
}

interface ReportsListScreenProps {
  onBack: () => void;
  onSelectReport: (reportId: string, type: 'morning' | 'maintenance') => void;
}

const mockMorningReports: Report[] = [
  {
    id: 'm1',
    date: '2026-02-08',
    submittedBy: 'אלי זמיר',
    summary: 'הכל תקין',
    type: 'morning',
  },
  {
    id: 'm2',
    date: '2026-02-07',
    submittedBy: 'תאילנדי',
    summary: 'all clear',
    type: 'morning',
  },
  {
    id: 'm3',
    date: '2026-02-06', 
    submittedBy: 'יהודה',
    summary: '2 תקלות',
    type: 'morning',
  },
];

const mockMaintenanceReports: Report[] = [
  {
    id: 'l1',
    date: '2026-02-08',
    submittedBy: 'אלי זמיר',
    summary: '4 maintenance entries, 12.5 work hours',
    type: 'maintenance',
  },
  {
    id: 'l2',
    date: '2026-02-07',
    submittedBy: 'אלי זמיר',
    summary: '2 maintenance entries, 6 work hours',
    type: 'maintenance',
  },
  {
    id: 'l3',
    date: '2026-02-06',
    submittedBy: 'אלי זמיר',
    summary: '3 maintenance entries, 9 work hours',
    type: 'maintenance',
  },
];

export function ReportsListScreen({ onBack, onSelectReport }: ReportsListScreenProps) {
  const { t, isRTL } = useLanguage();
  const [selectedType, setSelectedType] = useState<'morning' | 'maintenance' | null>(null);
  const [filterDate, setFilterDate] = useState('');

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const reports = selectedType === 'morning' ? mockMorningReports : 
                 selectedType === 'maintenance' ? mockMaintenanceReports : [];

  const filteredReports = filterDate 
    ? reports.filter(r => r.date === filterDate)
    : reports;

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (selectedType) {
                setSelectedType(null);
              } else {
                onBack();
              }
            }}
            className="p-2 hover:bg-neutral-100 rounded-lg active:bg-neutral-200 transition-colors"
          >
            <ArrowLeft className={`w-5 h-5 text-neutral-700 ${isRTL ? 'rotate-180' : ''}`} />
          </button>
          <Logo size="sm" isHome={false} onGoHome={onBack} title={t('reports.title')} />
        </div>
      </div>

      <div className="p-4">
        {!selectedType ? (
          /* Report Type Selection */
          <div className="space-y-3">
            <h2 className="text-sm font-medium text-neutral-600 mb-3">
              {t('reports.selectType')}
            </h2>
            <button
              onClick={() => setSelectedType('morning')}
              className="w-full bg-white border border-neutral-200 rounded-lg p-5 text-left hover:bg-neutral-50 active:bg-neutral-100 transition-colors"
            >
              <div className="text-base font-semibold text-neutral-900 mb-1">
                {t('reports.morningRound')}
              </div>
              <div className="text-sm text-neutral-500">
                {mockMorningReports.length} reports available
              </div>
            </button>
            <button
              onClick={() => setSelectedType('maintenance')}
              className="w-full bg-white border border-neutral-200 rounded-lg p-5 text-left hover:bg-neutral-50 active:bg-neutral-100 transition-colors"
            >
              <div className="text-base font-semibold text-neutral-900 mb-1">
                {t('reports.maintenanceLog')}
              </div>
              <div className="text-sm text-neutral-500">
                {mockMaintenanceReports.length} reports available
              </div>
            </button>
          </div>
        ) : (
          /* Report List */
          <div className="space-y-4">
            {/* Date Filter */}
            <div className="bg-white border border-neutral-200 rounded-lg p-3">
              <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                <Calendar className="w-4 h-4" />
                {t('reports.filterByDate')}
              </label>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-neutral-300 rounded text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-800"
              />
              {filterDate && (
                <button
                  onClick={() => setFilterDate('')}
                  className="mt-2 text-xs text-neutral-600 hover:text-neutral-900"
                >
                  Clear filter
                </button>
              )}
            </div>

            {/* Reports */}
            <div className="space-y-3">
              {filteredReports.map((report) => (
                <button
                  key={report.id}
                  onClick={() => onSelectReport(report.id, report.type)}
                  className="w-full bg-white border border-neutral-200 rounded-lg p-4 text-left hover:bg-neutral-50 active:bg-neutral-100 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-sm font-semibold text-neutral-900">
                      {formatDate(report.date)}
                    </div>
                    <div className="px-2 py-0.5 bg-teal-100 text-teal-800 rounded text-xs font-medium">
                      Submitted
                    </div>
                  </div>
                  <div className="text-sm text-neutral-600 mb-1">
                    {t('reports.submittedBy')}: <span className="font-medium text-neutral-900">{report.submittedBy}</span>
                  </div>
                  <div className="text-sm text-neutral-500">
                    {report.summary}
                  </div>
                </button>
              ))}
              
              {filteredReports.length === 0 && (
                <div className="bg-white border border-neutral-200 rounded-lg p-8 text-center text-neutral-500">
                  No reports found
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
