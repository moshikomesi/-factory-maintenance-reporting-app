import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, ChevronDown, ChevronUp, Plus, X } from 'lucide-react';
import { Logo } from './Logo';

interface AnnualPlansScreenProps {
  onBack: () => void;
}

type PlanType = 'preventive' | 'summer';

interface MonthData {
  lubricationIntake: string[];
  lubricationConveyors: string[];
  coolingService: string[];
  tempSensorInspection: string[];
}

interface SummerMaintenanceRow {
  id: string;
  machine: string;
  plannedStart: string;
  requiredDays: string;
  plannedFinish: string;
  plannedWork: string;
  actualStart: string;
  actualFinish: string;
  performedBy: string[];
}

export function AnnualPlansScreen({ onBack }: AnnualPlansScreenProps) {
  const { t, isRTL } = useLanguage();
  const [planType, setPlanType] = useState<PlanType>('preventive');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [expandedMonth, setExpandedMonth] = useState<number | null>(null);
  
  // Preventive plan data
  const [monthsData, setMonthsData] = useState<MonthData[]>(
    Array.from({ length: 12 }, () => ({
      lubricationIntake: [''],
      lubricationConveyors: [''],
      coolingService: [''],
      tempSensorInspection: [''],
    }))
  );

  // Summer maintenance plan data
  const machines = [
    'machine.carrotIntake',
    'machine.dryCleaning',
    'machine.washingDrum',
    'machine.sortingBelt',
    'machine.perforator',
  ];

  const [summerRows, setSummerRows] = useState<SummerMaintenanceRow[]>(
    machines.map((machine, index) => ({
      id: index.toString(),
      machine,
      plannedStart: '',
      requiredDays: '',
      plannedFinish: '',
      plannedWork: '',
      actualStart: '',
      actualFinish: '',
      performedBy: [],
    }))
  );

  const months = Array.from({ length: 12 }, (_, i) => ({
    key: `month.${['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'][i]}`,
    index: i,
  }));

  const technicians = ['tech.eli', 'tech.thaiDom', 'tech.solomon', 'tech.yehuda'];

  const addDate = (monthIndex: number, field: keyof MonthData) => {
    const newMonthsData = [...monthsData];
    newMonthsData[monthIndex][field].push('');
    setMonthsData(newMonthsData);
  };

  const updateDate = (monthIndex: number, field: keyof MonthData, dateIndex: number, value: string) => {
    const newMonthsData = [...monthsData];
    newMonthsData[monthIndex][field][dateIndex] = value;
    setMonthsData(newMonthsData);
  };

  const removeDate = (monthIndex: number, field: keyof MonthData, dateIndex: number) => {
    const newMonthsData = [...monthsData];
    if (newMonthsData[monthIndex][field].length > 1) {
      newMonthsData[monthIndex][field].splice(dateIndex, 1);
      setMonthsData(newMonthsData);
    }
  };

  const updateSummerRow = (id: string, field: keyof SummerMaintenanceRow, value: any) => {
    setSummerRows(summerRows.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const toggleTechnician = (rowId: string, tech: string) => {
    setSummerRows(summerRows.map(row => {
      if (row.id === rowId) {
        const performedBy = row.performedBy.includes(tech)
          ? row.performedBy.filter(t => t !== tech)
          : [...row.performedBy, tech];
        return { ...row, performedBy };
      }
      return row;
    }));
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
          <Logo size="sm" isHome={false} onGoHome={onBack} title={t('home.annualPlans')} />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Plan Type Toggle */}
        <div className="bg-white border border-neutral-200 rounded-lg p-3">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setPlanType('preventive')}
              className={`px-4 py-2.5 rounded-lg font-medium transition-colors ${
                planType === 'preventive'
                  ? 'bg-neutral-800 text-white'
                  : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              {t('annual.preventive')}
            </button>
            <button
              onClick={() => setPlanType('summer')}
              className={`px-4 py-2.5 rounded-lg font-medium transition-colors ${
                planType === 'summer'
                  ? 'bg-neutral-800 text-white'
                  : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              {t('annual.summer')}
            </button>
          </div>
        </div>

        {/* Year Selector */}
        <div className="bg-white border border-neutral-200 rounded-lg p-4">
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            {t('annual.year')}
          </label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            min="2020"
            max="2030"
            className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-800"
          />
        </div>

        {planType === 'preventive' ? (
          /* Preventive Maintenance Plan */
          <div className="space-y-2">
            {months.map(({ key, index }) => (
              <div key={index} className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedMonth(expandedMonth === index ? null : index)}
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-neutral-50 transition-colors"
                >
                  <span className="font-medium text-neutral-900">{t(key)}</span>
                  {expandedMonth === index ? (
                    <ChevronUp className="w-5 h-5 text-neutral-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-neutral-500" />
                  )}
                </button>
                
                {expandedMonth === index && (
                  <div className="px-4 pb-4 space-y-4 border-t border-neutral-200">
                    {/* Lubrication - Intake System */}
                    <div className="pt-4">
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        {t('annual.lubricationIntake')}
                      </label>
                      {monthsData[index].lubricationIntake.map((date, dateIndex) => (
                        <div key={dateIndex} className="flex gap-2 mb-2">
                          <input
                            type="date"
                            value={date}
                            onChange={(e) => updateDate(index, 'lubricationIntake', dateIndex, e.target.value)}
                            className="flex-1 px-3 py-2 bg-white border border-neutral-300 rounded text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-800"
                          />
                          {monthsData[index].lubricationIntake.length > 1 && (
                            <button
                              onClick={() => removeDate(index, 'lubricationIntake', dateIndex)}
                              className="p-2 hover:bg-neutral-100 rounded transition-colors"
                            >
                              <X className="w-4 h-4 text-neutral-500" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={() => addDate(index, 'lubricationIntake')}
                        className="text-sm text-neutral-600 hover:text-neutral-900 flex items-center gap-1"
                      >
                        <Plus className="w-4 h-4" />
                        {t('annual.addDate')}
                      </button>
                    </div>

                    {/* Lubrication - Conveyors */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        {t('annual.lubricationConveyors')}
                      </label>
                      {monthsData[index].lubricationConveyors.map((date, dateIndex) => (
                        <div key={dateIndex} className="flex gap-2 mb-2">
                          <input
                            type="date"
                            value={date}
                            onChange={(e) => updateDate(index, 'lubricationConveyors', dateIndex, e.target.value)}
                            className="flex-1 px-3 py-2 bg-white border border-neutral-300 rounded text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-800"
                          />
                          {monthsData[index].lubricationConveyors.length > 1 && (
                            <button
                              onClick={() => removeDate(index, 'lubricationConveyors', dateIndex)}
                              className="p-2 hover:bg-neutral-100 rounded transition-colors"
                            >
                              <X className="w-4 h-4 text-neutral-500" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={() => addDate(index, 'lubricationConveyors')}
                        className="text-sm text-neutral-600 hover:text-neutral-900 flex items-center gap-1"
                      >
                        <Plus className="w-4 h-4" />
                        {t('annual.addDate')}
                      </button>
                    </div>

                    {/* Monthly Cooling Service */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        {t('annual.coolingService')}
                      </label>
                      {monthsData[index].coolingService.map((date, dateIndex) => (
                        <div key={dateIndex} className="flex gap-2 mb-2">
                          <input
                            type="date"
                            value={date}
                            onChange={(e) => updateDate(index, 'coolingService', dateIndex, e.target.value)}
                            className="flex-1 px-3 py-2 bg-white border border-neutral-300 rounded text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-800"
                          />
                          {monthsData[index].coolingService.length > 1 && (
                            <button
                              onClick={() => removeDate(index, 'coolingService', dateIndex)}
                              className="p-2 hover:bg-neutral-100 rounded transition-colors"
                            >
                              <X className="w-4 h-4 text-neutral-500" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={() => addDate(index, 'coolingService')}
                        className="text-sm text-neutral-600 hover:text-neutral-900 flex items-center gap-1"
                      >
                        <Plus className="w-4 h-4" />
                        {t('annual.addDate')}
                      </button>
                    </div>

                    {/* Annual Temperature Sensor Inspection */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        {t('annual.tempSensorInspection')}
                      </label>
                      {monthsData[index].tempSensorInspection.map((date, dateIndex) => (
                        <div key={dateIndex} className="flex gap-2 mb-2">
                          <input
                            type="date"
                            value={date}
                            onChange={(e) => updateDate(index, 'tempSensorInspection', dateIndex, e.target.value)}
                            className="flex-1 px-3 py-2 bg-white border border-neutral-300 rounded text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-800"
                          />
                          {monthsData[index].tempSensorInspection.length > 1 && (
                            <button
                              onClick={() => removeDate(index, 'tempSensorInspection', dateIndex)}
                              className="p-2 hover:bg-neutral-100 rounded transition-colors"
                            >
                              <X className="w-4 h-4 text-neutral-500" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={() => addDate(index, 'tempSensorInspection')}
                        className="text-sm text-neutral-600 hover:text-neutral-900 flex items-center gap-1"
                      >
                        <Plus className="w-4 h-4" />
                        {t('annual.addDate')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Summer Maintenance Plan */
          <div className="space-y-3">
            {summerRows.map((row) => (
              <div key={row.id} className="bg-white border border-neutral-200 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-neutral-900">
                    {t(row.machine)}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-neutral-600 mb-1">
                      {t('annual.plannedStart')}
                    </label>
                    <input
                      type="date"
                      value={row.plannedStart}
                      onChange={(e) => updateSummerRow(row.id, 'plannedStart', e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-neutral-300 rounded text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-600 mb-1">
                      {t('annual.requiredDays')}
                    </label>
                    <input
                      type="number"
                      value={row.requiredDays}
                      onChange={(e) => updateSummerRow(row.id, 'requiredDays', e.target.value)}
                      placeholder="0"
                      className="w-full px-3 py-2 bg-white border border-neutral-300 rounded text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-600 mb-1">
                    {t('annual.plannedFinish')}
                  </label>
                  <input
                    type="date"
                    value={row.plannedFinish}
                    onChange={(e) => updateSummerRow(row.id, 'plannedFinish', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-neutral-300 rounded text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-600 mb-1">
                    {t('annual.plannedWork')}
                  </label>
                  <textarea
                    value={row.plannedWork}
                    onChange={(e) => updateSummerRow(row.id, 'plannedWork', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 bg-white border border-neutral-300 rounded text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-800 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-neutral-600 mb-1">
                      {t('annual.actualStart')}
                    </label>
                    <input
                      type="date"
                      value={row.actualStart}
                      onChange={(e) => updateSummerRow(row.id, 'actualStart', e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-neutral-300 rounded text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-600 mb-1">
                      {t('annual.actualFinish')}
                    </label>
                    <input
                      type="date"
                      value={row.actualFinish}
                      onChange={(e) => updateSummerRow(row.id, 'actualFinish', e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-neutral-300 rounded text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-600 mb-2">
                    {t('annual.performedBy')}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {technicians.map((tech) => (
                      <button
                        key={tech}
                        onClick={() => toggleTechnician(row.id, tech)}
                        className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                          row.performedBy.includes(tech)
                            ? 'bg-neutral-800 text-white'
                            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                        }`}
                      >
                        {t(tech)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
