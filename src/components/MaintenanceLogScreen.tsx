import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, Plus, X, Camera } from 'lucide-react';
import { Logo } from './Logo';

interface LogEntry {
  id: string;
  date: string;
  machine: string;
  fault: string;
  spareParts: string;
  workHours: string;
  update: string;
  clearance: string;
  worker: string;
  notes: string;
  photo?: string;
}

interface MaintenanceLogScreenProps {
  onBack: () => void;
  onSubmit: () => void;
}

export function MaintenanceLogScreen({ onBack, onSubmit }: MaintenanceLogScreenProps) {
  const { t, isRTL } = useLanguage();
  const today = new Date().toLocaleDateString('en-CA');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [entries, setEntries] = useState<LogEntry[]>([
    {
      id: '1',
      date: today,
      machine: '',
      fault: '',
      spareParts: '',
      workHours: '',
      technician: '',
      clearance: '',
      cost: '',
      notes: '',
      photo: undefined,
    },
  ]);
  
  const [generalNotes, setGeneralNotes] = useState('');
  const [confirmName, setConfirmName] = useState('');

  const addEntry = () => {
    const newEntry: LogEntry = {
      id: Date.now().toString(),
      date: today,
      machine: '',
      fault: '',
      spareParts: '',
      workHours: '',
      update: '',
      clearance: '',
      worker: '',
      notes: '',
    };
    setEntries([...entries, newEntry]);
  };

  const removeEntry = (id: string) => {
    if (entries.length > 1) {
      setEntries(entries.filter(entry => entry.id !== id));
    }
  };

  const updateEntry = (id: string, field: keyof LogEntry, value: string) => {
    setEntries(entries.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  const handleCameraCapture = (entryId: string) => {
    const input = fileInputRef.current;
    if (input) {
      input.dataset.entryId = entryId;
      input.click();
    }
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const entryId = (e.target as any).dataset.entryId;
      const reader = new FileReader();
      reader.onload = (event) => {
        const photoData = event.target?.result as string;
        setEntries(entries.map(entry =>
          entry.id === entryId ? { ...entry, photo: photoData } : entry
        ));
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = (entryId: string) => {
    setEntries(entries.map(entry =>
      entry.id === entryId ? { ...entry, photo: undefined } : entry
    ));
  };

  const handleSubmit = () => {
    if (confirmName.trim()) {
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
          <Logo size="sm" isHome={false} onGoHome={onBack} title={t('home.maintenanceLog')} />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Add Entry Button */}
        <button
          onClick={addEntry}
          className="w-full bg-white border border-neutral-300 rounded-lg p-3 flex items-center justify-center gap-2 text-neutral-700 hover:bg-neutral-50 active:bg-neutral-100 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">{t('log.addRow')}</span>
        </button>

        {/* Maintenance Entries */}
        {entries.map((entry, index) => (
          <div key={entry.id} className="bg-white border border-neutral-200 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-neutral-900">
                Entry #{index + 1}
              </span>
              {entries.length > 1 && (
                <button
                  onClick={() => removeEntry(entry.id)}
                  className="p-1 hover:bg-neutral-100 rounded transition-colors"
                >
                  <X className="w-5 h-5 text-neutral-500" />
                </button>
              )}
            </div>

            <div className="grid gap-3">
              {/* Date */}
              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-1">
                  {t('log.date')}
                </label>
                <input
                  type="date"
                  value={entry.date}
                  onChange={(e) => updateEntry(entry.id, 'date', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-800"
                />
              </div>

              {/* Machine */}
              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-1">
                  {t('machine.select')}
                </label>
                <select
                  value={entry.machine}
                  onChange={(e) => updateEntry(entry.id, 'machine', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-800"
                >
                  <option value="">{t('machine.select')}</option>
                  <option value="machine.sorter1">{t('machine.sorter1')}</option>
                  <option value="machine.sorter2">{t('machine.sorter2')}</option>
                  <option value="machine.sorter3">{t('machine.sorter3')}</option>
                  <option value="machine.scale1">{t('machine.scale1')}</option>
                  <option value="machine.packing1">{t('machine.packing1')}</option>
                  <option value="machine.scale2">{t('machine.scale2')}</option>
                  <option value="machine.packing2">{t('machine.packing2')}</option>
                  <option value="machine.scale3">{t('machine.scale3')}</option>
                  <option value="machine.packing3">{t('machine.packing3')}</option>
                  <option value="machine.scale4">{t('machine.scale4')}</option>
                  <option value="machine.packing4">{t('machine.packing4')}</option>
                  <option value="machine.scale5">{t('machine.scale5')}</option>
                  <option value="machine.packing5a">{t('machine.packing5a')}</option>
                  <option value="machine.packing5b">{t('machine.packing5b')}</option>
                  <option value="machine.scale6">{t('machine.scale6')}</option>
                  <option value="machine.packing6a">{t('machine.packing6a')}</option>
                  <option value="machine.packing6b">{t('machine.packing6b')}</option>
                  <option value="machine.sorterLine6">{t('machine.sorterLine6')}</option>
                  <option value="machine.sorterLine5">{t('machine.sorterLine5')}</option>
                  <option value="machine.masters">{t('machine.masters')}</option>
                  <option value="machine.conveyorMotor">{t('machine.conveyorMotor')}</option>
                  <option value="machine.conveyorBelt">{t('machine.conveyorBelt')}</option>
                  <option value="machine.conveyorShaft">{t('machine.conveyorShaft')}</option>
                  <option value="machine.polisher1">{t('machine.polisher1')}</option>
                  <option value="machine.polisher2">{t('machine.polisher2')}</option>
                  <option value="machine.polisher3">{t('machine.polisher3')}</option>
                  <option value="machine.onionArray">{t('machine.onionArray')}</option>
                  <option value="machine.externalWashDrum">{t('machine.externalWashDrum')}</option>
                  <option value="machine.viscose">{t('machine.viscose')}</option>
                  <option value="machine.wearBroken3">{t('machine.wearBroken3')}</option>
                  <option value="machine.wearBroken2">{t('machine.wearBroken2')}</option>
                  <option value="machine.accumulatorInside">{t('machine.accumulatorInside')}</option>
                  <option value="machine.accumulatorOutside">{t('machine.accumulatorOutside')}</option>
                  <option value="machine.smallHopper">{t('machine.smallHopper')}</option>
                  <option value="machine.largeHopper">{t('machine.largeHopper')}</option>
                  <option value="machine.dryCleaningProcess">{t('machine.dryCleaningProcess')}</option>
                  <option value="machine.soakingTank">{t('machine.soakingTank')}</option>
                  <option value="machine.internalWashDrum">{t('machine.internalWashDrum')}</option>
                  <option value="machine.magnet">{t('machine.magnet')}</option>
                  <option value="machine.waterPump">{t('machine.waterPump')}</option>
                  <option value="machine.chlorineSystem">{t('machine.chlorineSystem')}</option>
                  <option value="machine.lubrication">{t('machine.lubrication')}</option>
                  <option value="machine.coolingDoor">{t('machine.coolingDoor')}</option>
                </select>
              </div>

              {/* Fault Description */}
              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-1">
                  {t('log.fault')}
                </label>
                <textarea
                  value={entry.fault}
                  onChange={(e) => updateEntry(entry.id, 'fault', e.target.value)}
                  placeholder={t('log.fault')}
                  rows={2}
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-800 resize-none"
                />
              </div>

              {/* Photo Capture */}
              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-2">
                  {t('log.photo')}
                </label>
                {entry.photo ? (
                  <div className="relative">
                    <img
                      src={entry.photo}
                      alt="Captured"
                      className="w-full h-48 object-cover rounded-lg border border-neutral-300"
                    />
                    <button
                      onClick={() => removePhoto(entry.id)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleCameraCapture(entry.id)}
                    className="w-full p-3 border-2 border-dashed border-neutral-300 rounded-lg flex items-center justify-center gap-2 text-neutral-700 hover:border-neutral-500 hover:bg-neutral-50 transition-colors"
                  >
                    <Camera className="w-5 h-5" />
                    <span className="text-sm font-medium">{t('log.takePicture')}</span>
                  </button>
                )}
              </div>

              {/* Spare Parts */}
              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-1">
                  {t('log.spareParts')}
                </label>
                <input
                  type="text"
                  value={entry.spareParts}
                  onChange={(e) => updateEntry(entry.id, 'spareParts', e.target.value)}
                  placeholder={t('log.spareParts')}
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Work Hours */}
                <div>
                  <label className="block text-xs font-medium text-neutral-600 mb-1">
                    {t('log.workHours')}
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={entry.workHours}
                    onChange={(e) => updateEntry(entry.id, 'workHours', e.target.value)}
                    placeholder="0.0"
                    className="w-full px-3 py-2 bg-white border border-neutral-300 rounded text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-800"
                  />
                </div>

                {/* worker */}
                <div>
                  <label className="block text-xs font-medium text-neutral-600 mb-1">
                    {t('log.worker')}
                  </label>
                  <input
                    type="number"
                    value={entry.cost}
                    onChange={(e) => updateEntry(entry.id, 'worker', e.target.value)}
                    placeholder={t('log.worker')}
                    className="w-full px-3 py-2 bg-white border border-neutral-300 rounded text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-800"
                  />
                </div>
              </div>

                      {/* clearance */}
              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-1">
                  {t('log.clearance')}
                </label>
                <textarea
                  value={entry.notes}
                  onChange={(e) => updateEntry(entry.id, 'clearance', e.target.value)}
                  placeholder={t('log.clearance')}
                  rows={2}
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-800 resize-none"
                />
              </div>

                 {/* clearance */}
              {/* <div>
                <label className="block text-xs font-medium text-neutral-600 mb-1">
                  {t('log.update')}
                </label>
                <textarea
                  value={entry.notes}
                  onChange={(e) => updateEntry(entry.id, 'update', e.target.value)}
                  placeholder={t('log.update')}
                  rows={2}
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-800 resize-none"
                />
              </div> */}

              {/* Additional Notes */}
              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-1">
                  {t('log.notes')}
                </label>
                <textarea
                  value={entry.notes}
                  onChange={(e) => updateEntry(entry.id, 'notes', e.target.value)}
                  placeholder={t('log.notes')}
                  rows={2}
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-800 resize-none"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Declaration */}
        <div className="bg-neutral-100 border border-neutral-300 rounded-lg p-4 space-y-3">
          <p className="text-sm text-neutral-900 font-medium">
            {t('log.declaration')}
          </p>
          <div>
            <label className="block text-xs font-medium text-neutral-600 mb-1">
              {t('log.name')}
            </label>
            <input
              type="text"
              value={confirmName}
              onChange={(e) => setConfirmName(e.target.value)}
              placeholder={t('log.name')}
              className="w-full px-3 py-2 bg-white border border-neutral-300 rounded text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-800"
            />
          </div>
        </div>
      </div>

      {/* Submit Button - Sticky */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-neutral-200">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleSubmit}
            disabled={!confirmName.trim()}
            className="w-full py-4 bg-neutral-800 text-white font-semibold rounded-lg hover:bg-neutral-900 active:bg-neutral-950 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors"
          >
            {t('morning.submit')}
          </button>
        </div>
      </div>

      {/* Hidden File Input for Camera */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handlePhotoSelect}
        className="hidden"
      />
    </div>
  );
}
