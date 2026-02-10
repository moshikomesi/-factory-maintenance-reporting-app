import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Logo } from './Logo';

interface ReportDetailsScreenProps {
  reportId: string;
  reportType: 'morning' | 'maintenance';
  onBack: () => void;
}

// Mock morning round data
const mockMorningRoundData = {
  id: 'm1',
  date: '2026-02-08',
  performedBy: 'John Smith',
  submittedAt: '2026-02-08 07:45',
  checklist: [
    { label: 'Check main power supply', checked: true, comment: '' },
    { label: 'Inspect emergency stop buttons', checked: true, comment: '' },
    { label: 'Verify lighting systems', checked: true, comment: 'Section B light flickering' },
    { label: 'Check air compressor pressure', checked: true, comment: '' },
    { label: 'Inspect hydraulic oil levels', checked: true, comment: 'Need to refill next week' },
    { label: 'Check conveyor belt alignment', checked: true, comment: '' },
    { label: 'Verify safety guards in place', checked: true, comment: 'Guard C loose - fixed' },
    { label: 'Inspect fire extinguishers', checked: true, comment: '' },
  ],
};

// Mock maintenance log data
const mockMaintenanceLogData = {
  id: 'l1',
  date: '2026-02-08',
  submittedBy: 'David Lee',
  submittedAt: '2026-02-08 16:30',
  entries: [
    {
      date: '2026-02-08',
      machine: 'CNC-01',
      fault: 'Spindle bearing noise',
      spareParts: 'Bearing SKF-6205, Grease',
      workHours: '3.5',
      technician: 'David Lee',
      status: 'Complete',
      cost: '450',
      notes: 'Replaced bearing and lubricated. Tested OK.',
    },
    {
      date: '2026-02-08',
      machine: 'Press-A1',
      fault: 'Hydraulic leak at main cylinder',
      spareParts: 'Seal kit HS-250',
      workHours: '2.5',
      technician: 'David Lee',
      status: 'Complete',
      cost: '320',
      notes: 'Replaced seals. System pressure tested.',
    },
  ],
  generalNotes: 'All maintenance completed successfully. No further issues identified.',
  confirmName: 'David Lee',
};

export function ReportDetailsScreen({ reportId, reportType, onBack }: ReportDetailsScreenProps) {
  const { t, isRTL } = useLanguage();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
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
          <Logo size="sm" isHome={false} onGoHome={onBack} title={t('details.title')} />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {reportType === 'morning' ? (
          /* Morning Round Report Details */
          <>
            {/* Report Info */}
            <div className="bg-white border border-neutral-200 rounded-lg p-4">
              <h2 className="text-sm font-semibold text-neutral-900 mb-3">
                {t('details.reportInfo')}
              </h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">{t('morning.date')}:</span>
                  <span className="font-medium text-neutral-900">{formatDate(mockMorningRoundData.date)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">{t('morning.performedBy')}:</span>
                  <span className="font-medium text-neutral-900">{mockMorningRoundData.performedBy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">{t('details.submittedOn')}:</span>
                  <span className="font-medium text-neutral-900">{mockMorningRoundData.submittedAt}</span>
                </div>
              </div>
            </div>

            {/* Checklist Results */}
            <div className="bg-white border border-neutral-200 rounded-lg p-4">
              <h2 className="text-sm font-semibold text-neutral-900 mb-3">
                {t('morning.checklist')}
              </h2>
              <div className="space-y-3">
                {mockMorningRoundData.checklist.map((item, index) => (
                  <div key={index} className="pb-3 border-b border-neutral-200 last:border-0 last:pb-0">
                    <div className="flex items-start gap-3 mb-1">
                      <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${
                        item.checked ? 'text-teal-600' : 'text-neutral-300'
                      }`} />
                      <div className="flex-1">
                        <span className="text-sm text-neutral-900">
                          {index + 1}. {item.label}
                        </span>
                        {item.comment && (
                          <div className="mt-1 text-sm text-neutral-600 bg-amber-50 border border-amber-200 rounded px-2 py-1">
                            {item.comment}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Maintenance Log Report Details */
          <>
            {/* Report Info */}
            <div className="bg-white border border-neutral-200 rounded-lg p-4">
              <h2 className="text-sm font-semibold text-neutral-900 mb-3">
                {t('details.reportInfo')}
              </h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">{t('log.date')}:</span>
                  <span className="font-medium text-neutral-900">{formatDate(mockMaintenanceLogData.date)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">{t('reports.submittedBy')}:</span>
                  <span className="font-medium text-neutral-900">{mockMaintenanceLogData.submittedBy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">{t('details.submittedOn')}:</span>
                  <span className="font-medium text-neutral-900">{mockMaintenanceLogData.submittedAt}</span>
                </div>
              </div>
            </div>

            {/* Maintenance Entries */}
            <div>
              <h2 className="text-sm font-semibold text-neutral-900 mb-3">
                Maintenance Entries ({mockMaintenanceLogData.entries.length})
              </h2>
              <div className="space-y-3">
                {mockMaintenanceLogData.entries.map((entry, index) => (
                  <div key={index} className="bg-white border border-neutral-200 rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-neutral-900">
                        Entry #{index + 1}
                      </span>
                      <span className="px-2 py-1 bg-teal-100 text-teal-800 rounded text-xs font-medium">
                        {entry.status}
                      </span>
                    </div>
                    <div className="space-y-1.5 text-sm">
                      <div>
                        <span className="text-neutral-600">{t('log.machine')}: </span>
                        <span className="font-medium text-neutral-900">{entry.machine}</span>
                      </div>
                      <div>
                        <span className="text-neutral-600">{t('log.fault')}: </span>
                        <span className="text-neutral-900">{entry.fault}</span>
                      </div>
                      <div>
                        <span className="text-neutral-600">{t('log.spareParts')}: </span>
                        <span className="text-neutral-900">{entry.spareParts}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-neutral-600">{t('log.workHours')}: </span>
                          <span className="font-medium text-neutral-900">{entry.workHours}h</span>
                        </div>
                        <div>
                          <span className="text-neutral-600">{t('log.cost')}: </span>
                          <span className="font-medium text-neutral-900">${entry.cost}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-neutral-600">{t('log.technician')}: </span>
                        <span className="text-neutral-900">{entry.technician}</span>
                      </div>
                      {entry.notes && (
                        <div className="bg-neutral-50 border border-neutral-200 rounded p-2 mt-2">
                          <span className="text-neutral-600">{t('log.notes')}: </span>
                          <span className="text-neutral-900">{entry.notes}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* General Notes */}
            {mockMaintenanceLogData.generalNotes && (
              <div className="bg-white border border-neutral-200 rounded-lg p-4">
                <h2 className="text-sm font-semibold text-neutral-900 mb-2">
                  {t('log.generalNotes')}
                </h2>
                <p className="text-sm text-neutral-700">
                  {mockMaintenanceLogData.generalNotes}
                </p>
              </div>
            )}

            {/* Declaration */}
            <div className="bg-neutral-100 border border-neutral-300 rounded-lg p-4">
              <p className="text-sm text-neutral-900 font-medium mb-2">
                {t('log.declaration')}
              </p>
              <p className="text-sm text-neutral-700">
                <span className="font-semibold">{t('log.name')}: </span>
                {mockMaintenanceLogData.confirmName}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
