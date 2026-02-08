import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, Plus, X, Clock } from 'lucide-react';
import { FaultModal } from './FaultModal';

interface Fault {
  id: string;
  machine: string;
  type: string;
  startTime: string;
  endTime: string;
  technician: string;
  notes: string;
  downtime: number;
}

interface CreateReportScreenProps {
  onBack: () => void;
  onSubmit: () => void;
}

export function CreateReportScreen({ onBack, onSubmit }: CreateReportScreenProps) {
  const { t, isRTL } = useLanguage();
  const [showFaultModal, setShowFaultModal] = useState(false);
  const [faults, setFaults] = useState<Fault[]>([]);
  const [shift, setShift] = useState('morning');
  const [department, setDepartment] = useState('line-a');
  const [checks, setChecks] = useState({
    inspection: false,
    oil: false,
    cleaning: false,
  });
  const [notes, setNotes] = useState('');

  const handleAddFault = (fault: Fault) => {
    setFaults([...faults, fault]);
    setShowFaultModal(false);
  };

  const handleRemoveFault = (id: string) => {
    setFaults(faults.filter(f => f.id !== id));
  };

  const handleSubmit = () => {
    // In real app, would save report
    onSubmit();
  };

  const today = new Date().toLocaleDateString('en-CA');

  return (
    <div className="min-h-screen bg-neutral-50 pb-24">
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
            {t('report.createTitle')}
          </h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Basic Info */}
        <div className="bg-white border border-neutral-200 rounded-lg p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {t('report.date')}
            </label>
            <input
              type="date"
              value={today}
              readOnly
              className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {t('report.shift')}
            </label>
            <select
              value={shift}
              onChange={(e) => setShift(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-800"
            >
              <option value="morning">{t('common.morning')}</option>
              <option value="afternoon">{t('common.afternoon')}</option>
              <option value="night">{t('common.night')}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {t('report.department')}
            </label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-800"
            >
              <option value="line-a">Production Line A</option>
              <option value="line-b">Production Line B</option>
              <option value="packaging">Packaging</option>
              <option value="warehouse">Warehouse</option>
            </select>
          </div>
        </div>

        {/* Faults Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-neutral-900">
              {t('report.faults')}
            </h2>
            <button
              onClick={() => setShowFaultModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-neutral-800 text-white rounded-lg hover:bg-neutral-900 active:bg-neutral-950 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span className="font-medium">{t('report.addFault')}</span>
            </button>
          </div>

          {faults.length === 0 ? (
            <div className="bg-white border border-neutral-200 rounded-lg p-6 text-center text-neutral-500">
              {t('report.noFaults')}
            </div>
          ) : (
            <div className="space-y-3">
              {faults.map((fault) => (
                <div
                  key={fault.id}
                  className="bg-white border border-neutral-200 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-neutral-900 mb-1">
                        {fault.machine}
                      </h3>
                      <p className="text-sm text-neutral-600 mb-2">{fault.type}</p>
                      <div className="flex items-center gap-2 text-sm text-neutral-500">
                        <Clock className="w-4 h-4" />
                        <span>{fault.startTime} - {fault.endTime}</span>
                        <span className="text-neutral-400">•</span>
                        <span>{fault.downtime} {t('details.minutes')}</span>
                      </div>
                      <p className="text-sm text-neutral-600 mt-2">
                        {fault.technician}
                      </p>
                      {fault.notes && (
                        <p className="text-sm text-neutral-500 mt-2 italic">
                          {fault.notes}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemoveFault(fault.id)}
                      className="p-1 hover:bg-neutral-100 rounded"
                    >
                      <X className="w-5 h-5 text-neutral-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Daily Checks */}
        <div className="bg-white border border-neutral-200 rounded-lg p-4">
          <h2 className="text-base font-semibold text-neutral-900 mb-4">
            {t('report.dailyChecks')}
          </h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={checks.inspection}
                onChange={(e) => setChecks({ ...checks, inspection: e.target.checked })}
                className="w-6 h-6 rounded border-neutral-300 text-neutral-800 focus:ring-2 focus:ring-neutral-800"
              />
              <span className="text-neutral-900">{t('report.dailyInspection')}</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={checks.oil}
                onChange={(e) => setChecks({ ...checks, oil: e.target.checked })}
                className="w-6 h-6 rounded border-neutral-300 text-neutral-800 focus:ring-2 focus:ring-neutral-800"
              />
              <span className="text-neutral-900">{t('report.oilChecked')}</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={checks.cleaning}
                onChange={(e) => setChecks({ ...checks, cleaning: e.target.checked })}
                className="w-6 h-6 rounded border-neutral-300 text-neutral-800 focus:ring-2 focus:ring-neutral-800"
              />
              <span className="text-neutral-900">{t('report.cleaningCompleted')}</span>
            </label>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {t('report.notes')}
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-lg text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-800 resize-none"
              placeholder={t('report.notes')}
            />
          </div>
        </div>
      </div>

      {/* Submit Button - Sticky */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-neutral-200">
        <button
          onClick={handleSubmit}
          className="w-full py-4 bg-neutral-800 text-white font-semibold rounded-lg hover:bg-neutral-900 active:bg-neutral-950 transition-colors"
        >
          {t('report.submit')}
        </button>
      </div>

      {/* Fault Modal */}
      {showFaultModal && (
        <FaultModal
          onClose={() => setShowFaultModal(false)}
          onSave={handleAddFault}
        />
      )}
    </div>
  );
}
