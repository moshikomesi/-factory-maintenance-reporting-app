import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X } from 'lucide-react';

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

interface FaultModalProps {
  onClose: () => void;
  onSave: (fault: Fault) => void;
}

export function FaultModal({ onClose, onSave }: FaultModalProps) {
  const { t } = useLanguage();
  const [machine, setMachine] = useState('');
  const [type, setType] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [technician, setTechnician] = useState('');
  const [notes, setNotes] = useState('');

  const calculateDowntime = () => {
    if (!startTime || !endTime) return 0;
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    const diff = (end.getTime() - start.getTime()) / 1000 / 60;
    return Math.max(0, Math.round(diff));
  };

  const handleSave = () => {
    if (machine && type && startTime && endTime && technician) {
      onSave({
        id: Date.now().toString(),
        machine,
        type,
        startTime,
        endTime,
        technician,
        notes,
        downtime: calculateDowntime(),
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-neutral-200 px-4 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-neutral-900">
            {t('fault.title')}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-neutral-700" />
          </button>
        </div>

        {/* Form */}
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {t('fault.machine')}
            </label>
            <select
              value={machine}
              onChange={(e) => setMachine(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-800"
            >
              <option value="">{t('fault.machine')}</option>
              <option value="CNC-01">CNC-01</option>
              <option value="CNC-02">CNC-02</option>
              <option value="Press-A1">Press-A1</option>
              <option value="Press-B2">Press-B2</option>
              <option value="Conveyor-Main">Conveyor-Main</option>
              <option value="Packaging-Unit-1">Packaging-Unit-1</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {t('fault.type')}
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-800"
            >
              <option value="">{t('fault.type')}</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Electrical">Electrical</option>
              <option value="Hydraulic">Hydraulic</option>
              <option value="Pneumatic">Pneumatic</option>
              <option value="Software">Software</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                {t('fault.startTime')}
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                {t('fault.endTime')}
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-800"
              />
            </div>
          </div>

          {startTime && endTime && (
            <div className="bg-neutral-100 border border-neutral-300 rounded-lg p-3 text-sm text-neutral-700">
              {t('fault.downtime')}: <span className="font-semibold">{calculateDowntime()} {t('details.minutes')}</span>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {t('fault.technician')}
            </label>
            <input
              type="text"
              value={technician}
              onChange={(e) => setTechnician(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-lg text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-800"
              placeholder={t('fault.technician')}
            />
          </div>

          <div>
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

        {/* Actions */}
        <div className="sticky bottom-0 bg-white border-t border-neutral-200 p-4 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-white border border-neutral-300 text-neutral-700 font-medium rounded-lg hover:bg-neutral-50 active:bg-neutral-100 transition-colors"
          >
            {t('fault.cancel')}
          </button>
          <button
            onClick={handleSave}
            disabled={!machine || !type || !startTime || !endTime || !technician}
            className="flex-1 py-3 bg-neutral-800 text-white font-medium rounded-lg hover:bg-neutral-900 active:bg-neutral-950 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors"
          >
            {t('fault.save')}
          </button>
        </div>
      </div>
    </div>
  );
}
