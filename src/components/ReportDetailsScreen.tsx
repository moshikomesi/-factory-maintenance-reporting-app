import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, Clock } from 'lucide-react';

interface ReportDetailsScreenProps {
  reportId: string;
  onBack: () => void;
}

// Mock data
const mockReportDetails = {
  id: '1',
  date: '2026-02-08',
  shift: 'morning',
  department: 'Production Line A',
  status: 'submitted',
  faults: [
    {
      id: '1',
      machine: 'CNC-01',
      type: 'Mechanical',
      startTime: '08:15',
      endTime: '09:30',
      downtime: 75,
      technician: 'John Smith',
      notes: 'Belt replacement required. Ordered spare parts.',
    },
    {
      id: '2',
      machine: 'Press-A1',
      type: 'Hydraulic',
      startTime: '11:00',
      endTime: '11:45',
      downtime: 45,
      technician: 'Sarah Johnson',
      notes: 'Pressure valve adjusted.',
    },
    {
      id: '3',
      machine: 'Conveyor-Main',
      type: 'Electrical',
      startTime: '14:20',
      endTime: '15:10',
      downtime: 50,
      technician: 'Mike Chen',
      notes: 'Motor overheating. Cleaned and tested.',
    },
  ],
  checks: {
    inspection: true,
    oil: true,
    cleaning: true,
  },
  notes: 'Overall good shift. All maintenance completed on schedule.',
};

export function ReportDetailsScreen({ reportId, onBack }: ReportDetailsScreenProps) {
  const { t, isRTL } = useLanguage();
  const report = mockReportDetails;

  const totalDowntime = report.faults.reduce((sum, fault) => sum + fault.downtime, 0);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getShiftLabel = (shift: string) => {
    if (shift === 'morning') return t('common.morning');
    if (shift === 'afternoon') return t('common.afternoon');
    if (shift === 'night') return t('common.night');
    return shift;
  };

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
            {t('details.title')}
          </h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Report Info */}
        <div className="bg-white border border-neutral-200 rounded-lg p-4">
          <h2 className="text-sm font-semibold text-neutral-900 mb-3">
            {t('details.reportInfo')}
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-600">{t('report.date')}:</span>
              <span className="font-medium text-neutral-900">{formatDate(report.date)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">{t('report.shift')}:</span>
              <span className="font-medium text-neutral-900">{getShiftLabel(report.shift)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">{t('report.department')}:</span>
              <span className="font-medium text-neutral-900">{report.department}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">{t('reports.status')}:</span>
              <span className="px-2 py-1 bg-teal-100 text-teal-800 rounded text-xs font-medium">
                {t('reports.submitted')}
              </span>
            </div>
          </div>
        </div>

        {/* Total Downtime */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-amber-900">
              {t('details.totalDowntime')}
            </span>
            <span className="text-2xl font-bold text-amber-900">
              {totalDowntime} <span className="text-base font-medium">{t('details.minutes')}</span>
            </span>
          </div>
        </div>

        {/* Faults List */}
        <div>
          <h2 className="text-sm font-semibold text-neutral-900 mb-3">
            {t('details.faultsList')} ({report.faults.length})
          </h2>
          <div className="space-y-3">
            {report.faults.map((fault) => (
              <div
                key={fault.id}
                className="bg-white border border-neutral-200 rounded-lg p-4"
              >
                <h3 className="font-semibold text-neutral-900 mb-1">
                  {fault.machine}
                </h3>
                <p className="text-sm text-neutral-600 mb-2">{fault.type}</p>
                <div className="flex items-center gap-2 text-sm text-neutral-500 mb-2">
                  <Clock className="w-4 h-4" />
                  <span>{fault.startTime} - {fault.endTime}</span>
                  <span className="text-neutral-400">•</span>
                  <span className="font-semibold text-neutral-900">
                    {fault.downtime} {t('details.minutes')}
                  </span>
                </div>
                <p className="text-sm text-neutral-600 mb-2">
                  <span className="font-medium">Technician:</span> {fault.technician}
                </p>
                {fault.notes && (
                  <p className="text-sm text-neutral-600 italic bg-neutral-50 rounded p-2 mt-2">
                    {fault.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Daily Checks */}
        <div className="bg-white border border-neutral-200 rounded-lg p-4">
          <h2 className="text-sm font-semibold text-neutral-900 mb-3">
            {t('report.dailyChecks')}
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className={`w-5 h-5 rounded flex items-center justify-center ${
                report.checks.inspection ? 'bg-teal-600' : 'bg-neutral-300'
              }`}>
                {report.checks.inspection && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-neutral-900">{t('report.dailyInspection')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-5 h-5 rounded flex items-center justify-center ${
                report.checks.oil ? 'bg-teal-600' : 'bg-neutral-300'
              }`}>
                {report.checks.oil && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-neutral-900">{t('report.oilChecked')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-5 h-5 rounded flex items-center justify-center ${
                report.checks.cleaning ? 'bg-teal-600' : 'bg-neutral-300'
              }`}>
                {report.checks.cleaning && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-neutral-900">{t('report.cleaningCompleted')}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {report.notes && (
          <div className="bg-white border border-neutral-200 rounded-lg p-4">
            <h2 className="text-sm font-semibold text-neutral-900 mb-2">
              {t('report.notes')}
            </h2>
            <p className="text-sm text-neutral-700">
              {report.notes}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
