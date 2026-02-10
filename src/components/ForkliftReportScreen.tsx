import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft } from 'lucide-react';
import { Logo } from './Logo';

interface ForkliftReportScreenProps {
  onBack: () => void;
  onSubmit: () => void;
}

export function ForkliftReportScreen({ onBack, onSubmit }: ForkliftReportScreenProps) {
  const { t, isRTL } = useLanguage();
  const today = new Date().toLocaleDateString('en-CA');
  
  // Treatment section
  const [treatmentDate, setTreatmentDate] = useState(today);
  const [treatmentDescription, setTreatmentDescription] = useState('');
  const [treatmentTechnician, setTreatmentTechnician] = useState('');
  
  // Faults section
  const [faultType, setFaultType] = useState('');
  const [faultDescription, setFaultDescription] = useState('');
  const [repairCost, setRepairCost] = useState('');
  
  // Inspection section
  const [testDate, setTestDate] = useState('');
  const [expirationDate, setExpirationDate] = useState('');

  const handleSubmit = () => {
    onSubmit();
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
          <Logo size="sm" isHome={false} onGoHome={onBack} title={t('forklift.title')} />
        </div>
      </div>


      <div className="bg-white border border-neutral-200 rounded-lg p-4 space-y-4">   
        <div>
          <h2 className="text-base font-semibold text-neutral-900">
              {t('common.forkliftnumber')}
            </h2>
            <select
              value={treatmentTechnician}
              onChange={(e) => setTreatmentTechnician(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-800"
            >
              <option value="">{t('common.forkliftnumber')}</option>
              <option value="1">{t('123456')}</option>
              <option value="2">{t('4567890')}</option>
              <option value="3">{t('123546')}</option>
              <option value="4">{t('1234555')}</option>
            </select>
          </div>  
        </div>
    
      <div className="p-4 space-y-4">
        {/* Treatments Section */}
        <div className="bg-white border border-neutral-200 rounded-lg p-4 space-y-4">
          <h2 className="text-base font-semibold text-neutral-900">
            {t('forklift.treatments')}
          </h2>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {t('common.date')}
            </label>
            <input
              type="date"
              value={treatmentDate}
              onChange={(e) => setTreatmentDate(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {t('common.description')}
            </label>
            <textarea
              value={treatmentDescription}
              onChange={(e) => setTreatmentDescription(e.target.value)}
              placeholder={t('common.description')}
              rows={3}
              className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-lg text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-800 resize-none"
            />
          </div>

        </div>

        {/* Faults Section */}
        <div className="bg-white border border-neutral-200 rounded-lg p-4 space-y-4">
          <h2 className="text-base font-semibold text-neutral-900">
            {t('forklift.faults')}
          </h2>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {t('forklift.faultType')}
            </label>
            <input
              type="text"
              value={faultType}
              onChange={(e) => setFaultType(e.target.value)}
              placeholder={t('forklift.faultType')}
              className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-lg text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {t('common.description')}
            </label>
            <textarea
              value={faultDescription}
              onChange={(e) => setFaultDescription(e.target.value)}
              placeholder={t('common.description')}
              rows={2}
              className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-lg text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-800 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {t('forklift.repairCost')}
            </label>
            <input
              type="number"
              value={repairCost}
              onChange={(e) => setRepairCost(e.target.value)}
              placeholder="0.00"
              className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-lg text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-800"
            />
          </div>
        </div>

        {/* Inspection/Test Section */}
        <div className="bg-white border border-neutral-200 rounded-lg p-4 space-y-4">
          <h2 className="text-base font-semibold text-neutral-900">
            {t('forklift.inspection')}
          </h2>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {t('forklift.testDate')}
            </label>
            <input
              type="date"
              value={testDate}
              onChange={(e) => setTestDate(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {t('forklift.expirationDate')}
            </label>
            <input
              type="date"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-800"
            />
          </div>
        </div>
      </div>

      {/* Submit Button - Sticky */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-neutral-200">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleSubmit}
            className="w-full py-4 bg-neutral-800 text-white font-semibold rounded-lg hover:bg-neutral-900 active:bg-neutral-950 transition-colors"
          >
            {t('common.submit')}
          </button>
        </div>
      </div>
    </div>
  );
}
