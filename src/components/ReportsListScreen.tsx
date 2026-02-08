import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft } from 'lucide-react';

interface Report {
  id: string;
  date: string;
  shift: string;
  faultCount: number;
  status: 'submitted' | 'draft';
  department: string;
}

interface ReportsListScreenProps {
  onBack: () => void;
  onSelectReport: (reportId: string) => void;
}

const mockReports: Report[] = [
  {
    id: '1',
    date: '2026-02-08',
    shift: 'morning',
    faultCount: 3,
    status: 'submitted',
    department: 'Production Line A',
  },
  {
    id: '2',
    date: '2026-02-07',
    shift: 'afternoon',
    faultCount: 1,
    status: 'submitted',
    department: 'Production Line B',
  },
  {
    id: '3',
    date: '2026-02-07',
    shift: 'morning',
    faultCount: 2,
    status: 'submitted',
    department: 'Packaging',
  },
  {
    id: '4',
    date: '2026-02-06',
    shift: 'night',
    faultCount: 4,
    status: 'submitted',
    department: 'Production Line A',
  },
  {
    id: '5',
    date: '2026-02-06',
    shift: 'afternoon',
    faultCount: 0,
    status: 'submitted',
    department: 'Warehouse',
  },
];

export function ReportsListScreen({ onBack, onSelectReport }: ReportsListScreenProps) {
  const { t, isRTL } = useLanguage();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getShiftLabel = (shift: string) => {
    if (shift === 'morning') return t('common.morning');
    if (shift === 'afternoon') return t('common.afternoon');
    if (shift === 'night') return t('common.night');
    return shift;
  };

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
            {t('reports.title')}
          </h1>
        </div>
      </div>

      {/* Reports List */}
      <div className="p-4 space-y-3">
        {mockReports.map((report) => (
          <button
            key={report.id}
            onClick={() => onSelectReport(report.id)}
            className="w-full bg-white border border-neutral-200 rounded-lg p-4 text-left hover:bg-neutral-50 active:bg-neutral-100 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="text-sm font-semibold text-neutral-900 mb-1">
                  {formatDate(report.date)}
                </div>
                <div className="text-sm text-neutral-600">
                  {report.department}
                </div>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  report.status === 'submitted'
                    ? 'bg-teal-100 text-teal-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {report.status === 'submitted' ? t('reports.submitted') : t('reports.draft')}
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-neutral-500">
              <span>
                {t('reports.shift')}: <span className="text-neutral-700 font-medium">{getShiftLabel(report.shift)}</span>
              </span>
              <span className="text-neutral-400">•</span>
              <span>
                <span className="text-neutral-900 font-semibold">{report.faultCount}</span> {t('reports.faults')}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
