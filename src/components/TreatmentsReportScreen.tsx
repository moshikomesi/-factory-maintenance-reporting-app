import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft } from 'lucide-react';
import { Logo } from './Logo';

interface TreatmentsReportScreenProps {
  onBack: () => void;
  onSubmit: () => void;
}

type EquipmentType = 'airCompressor' | 'coolingSystem';

export function TreatmentsReportScreen({ onBack, onSubmit }: TreatmentsReportScreenProps) {
  const { t, isRTL } = useLanguage();
  const today = new Date().toLocaleDateString('en-CA');
  
  const [equipment, setEquipment] = useState<EquipmentType>('airCompressor');
  const [date, setDate] = useState(today);
  const [treatmentType, setTreatmentType] = useState('');
  const [description, setDescription] = useState('');
  const [technician, setTechnician] = useState('');
  const [cost, setCost] = useState('');
  const [nextScheduled, setNextScheduled] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    if (date && description && technician) {
      onSubmit();
    }
  };

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
          <Logo size="sm" isHome={false} onGoHome={onBack} title={t('treatments.title')} />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Equipment Selection */}
        <div className="bg-white border border-neutral-200 rounded-lg p-4">
          <label className="block text-sm font-medium text-neutral-700 mb-3">
            {t('treatments.equipment')}
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setEquipment('airCompressor')}
              className={`px-4 py-3 rounded-lg border-2 font-medium transition-colors ${
                equipment === 'airCompressor'
                  ? 'border-neutral-800 bg-neutral-800 text-white'
                  : 'border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              {t('treatments.airCompressor')}
            </button>
            <button
              onClick={() => setEquipment('coolingSystem')}
              className={`px-4 py-3 rounded-lg border-2 font-medium transition-colors ${
                equipment === 'coolingSystem'
                  ? 'border-neutral-800 bg-neutral-800 text-white'
                  : 'border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              {t('treatments.coolingSystem')}
            </button>
          </div>
        </div>

        {/* Treatment Details */}
        <div className="bg-white border border-neutral-200 rounded-lg p-4 space-y-4">
          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {t('common.date')}
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-800"
            />
          </div>

          {/* Treatment Type */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {t('treatments.treatmentType')}
            </label>
            <input
              type="text"
              value={treatmentType}
              onChange={(e) => setTreatmentType(e.target.value)}
              placeholder={t('treatments.treatmentType')}
              className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-lg text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-800"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {t('treatments.description')}
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t('treatments.description')}
              rows={3}
              className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-lg text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-800 resize-none"
            />
          </div>

          {/* Technician */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {t('common.technician')}
            </label>
            <select
              value={technician}
              onChange={(e) => setTechnician(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-800"
            >
              <option value="">{t('common.technician')}</option>
              <option value="eli">{t('tech.eli')}</option>
              <option value="thaiDom">{t('tech.thaiDom')}</option>
              <option value="solomon">{t('tech.solomon')}</option>
              <option value="yehuda">{t('tech.yehuda')}</option>
            </select>
          </div>

          {/* Cost */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {t('common.cost')}
            </label>
            <input
              type="number"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              placeholder="0.00"
              className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-lg text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-800"
            />
          </div>

          {/* Next Scheduled Date */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {t('treatments.nextScheduled')}
            </label>
            <input
              type="date"
              value={nextScheduled}
              onChange={(e) => setNextScheduled(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-800"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {t('log.notes')}
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t('log.notes')}
              rows={3}
              className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-lg text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-800 resize-none"
            />
          </div>
        </div>
      </div>

      {/* Submit Button - Sticky */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-neutral-200">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleSubmit}
            disabled={!date || !description || !technician}
            className="w-full py-4 bg-neutral-800 text-white font-semibold rounded-lg hover:bg-neutral-900 active:bg-neutral-950 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors"
          >
            {t('common.submit')}
          </button>
        </div>
      </div>
    </div>
  );
}
