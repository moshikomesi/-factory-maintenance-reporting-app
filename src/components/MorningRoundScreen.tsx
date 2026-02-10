import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft } from 'lucide-react';
import { Logo } from './Logo';

interface ChecklistItem {
  id: number;
  label: string;
  checked: boolean;
  comment: string;
}

interface MorningRoundScreenProps {
  onBack: () => void;
  onSubmit: () => void;
}

export function MorningRoundScreen({ onBack, onSubmit }: MorningRoundScreenProps) {
  const { t, isRTL } = useLanguage();
  const today = new Date().toLocaleDateString('en-CA');
  const [date, setDate] = useState(today);
  const [performedBy, setPerformedBy] = useState('');
  
  // Generate checklist with translated labels
  const checklistLabels = Array.from({ length: 35 }, (_, i) => t(`check.${i + 1}`));
  
  const [checklist, setChecklist] = useState<ChecklistItem[]>(
    checklistLabels.map((label, index) => ({
      id: index,
      label,
      checked: false,
      comment: '',
    }))
  );

  const handleCheckboxChange = (id: number) => {
    setChecklist(
      checklist.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleCommentChange = (id: number, comment: string) => {
    setChecklist(
      checklist.map((item) =>
        item.id === id ? { ...item, comment } : item
      )
    );
  };

  const handleSubmit = () => {
    if (performedBy.trim()) {
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
          <Logo size="sm" isHome={false} onGoHome={onBack} title={t('morning.title')} />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Date and Performed By */}
        <div className="bg-white border border-neutral-200 rounded-lg p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                {t('morning.date')}
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                {t('morning.performedBy')}
              </label>
              <input
                type="text"
                value={performedBy}
                onChange={(e) => setPerformedBy(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-lg text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-800"
                placeholder={t('morning.performedBy')}
              />
            </div>
          </div>
        </div>

        {/* Checklist Section */}
        <div className="bg-white border border-neutral-200 rounded-lg p-4">
          <h2 className="text-sm font-semibold text-neutral-900 mb-4">
            {t('morning.checklist')}
          </h2>
          <div className="space-y-3">
            {checklist.map((item, index) => (
              <div
                key={item.id}
                className="pb-3 border-b border-neutral-200 last:border-0 last:pb-0"
              >
                <div className="flex items-start gap-3 mb-2">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleCheckboxChange(item.id)}
                    className="w-5 h-5 mt-0.5 rounded border-neutral-300 text-neutral-800 focus:ring-2 focus:ring-neutral-800 flex-shrink-0"
                  />
                  <div className="flex-1">
                    <label className="text-sm text-neutral-900 cursor-pointer">
                      {index + 1}. {item.label}
                    </label>
                  </div>
                </div>
                <div className={`${isRTL ? 'mr-8' : 'ml-8'}`}>
                  <input
                    type="text"
                    value={item.comment}
                    onChange={(e) => handleCommentChange(item.id, e.target.value)}
                    placeholder={t('morning.comments')}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:bg-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Submit Button - Sticky */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-neutral-200">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleSubmit}
            disabled={!performedBy.trim()}
            className="w-full py-4 bg-neutral-800 text-white font-semibold rounded-lg hover:bg-neutral-900 active:bg-neutral-950 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors"
          >
            {t('morning.submit')}
          </button>
        </div>
      </div>
    </div>
  );
}