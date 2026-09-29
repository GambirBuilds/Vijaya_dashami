import React, { useState } from 'react';
import { FESTIVAL_DAYS } from '../data/festivalData';
import { FestivalEvent } from '../types';
import { Calendar as CalendarIcon, Clock, Bell, Check, Sparkles } from 'lucide-react';

interface CalendarSectionProps {
  selectedDayNumber?: number;
  onSelectDayNumber?: (num: number) => void;
  onNotify?: (msg: string) => void;
}

export const CalendarSection: React.FC<CalendarSectionProps> = ({
  selectedDayNumber,
  onSelectDayNumber,
  onNotify,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'major-holiday' | 'sacred-puja' | 'social-tradition'>('all');
  const [selectedDay, setSelectedDay] = useState<FestivalEvent>(
    FESTIVAL_DAYS.find((d) => d.dayNumber === (selectedDayNumber || 10)) || FESTIVAL_DAYS[9]
  );
  const [bookmarkedDays, setBookmarkedDays] = useState<number[]>([1, 7, 8, 9, 10, 15]);

  const toggleBookmark = (dayNum: number, title: string) => {
    setBookmarkedDays((prev) => {
      const exists = prev.includes(dayNum);
      const updated = exists ? prev.filter((d) => d !== dayNum) : [...prev, dayNum];
      if (onNotify) {
        onNotify(exists ? `Removed reminder for Day ${dayNum}` : `Reminder saved for Day ${dayNum}: ${title}`);
      }
      return updated;
    });
  };

  const filteredDays = FESTIVAL_DAYS.filter((d) => {
    if (activeCategory === 'all') return true;
    return d.category === activeCategory;
  });

  const handleDayClick = (day: FestivalEvent) => {
    setSelectedDay(day);
    if (onSelectDayNumber) onSelectDayNumber(day.dayNumber);
  };

  return (
    <section id="calendar" className="py-16 bg-[#FAF7F2] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-stone-200">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-1">
              Rituals & Auspicious Tithis
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-display text-stone-900">
              15-Day Festive Calendar
            </h2>
            <p className="mt-1 text-sm text-stone-600 max-w-xl">
              Chronological journey from the sacred clay kalash of Ghatasthapana to the moonlit vigil of Kojagrat Purnima.
            </p>
          </div>

          {/* Interactive Filter Tabs (Segmented control) */}
          <div className="flex items-center gap-1 p-1 bg-stone-200/70 rounded-lg mt-4 md:mt-0 overflow-x-auto">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                activeCategory === 'all'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All 15 Days
            </button>
            <button
              onClick={() => setActiveCategory('major-holiday')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                activeCategory === 'major-holiday'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Major Holidays
            </button>
            <button
              onClick={() => setActiveCategory('sacred-puja')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                activeCategory === 'sacred-puja'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Sacred Pujas
            </button>
            <button
              onClick={() => setActiveCategory('social-tradition')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                activeCategory === 'social-tradition'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Traditions & Swings
            </button>
          </div>
        </div>

        {/* 2-Column Master/Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 15-Day Selectable Timeline List */}
          <div className="lg:col-span-5 space-y-2 max-h-[640px] overflow-y-auto pr-1">
            {filteredDays.map((day) => {
              const isSelected = selectedDay.dayNumber === day.dayNumber;
              const isBookmarked = bookmarkedDays.includes(day.dayNumber);

              return (
                <div
                  key={day.dayNumber}
                  onClick={() => handleDayClick(day)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-amber-50/90 border-amber-500 shadow-xs'
                      : 'bg-white border-stone-200/80 hover:border-amber-300 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center font-mono font-bold text-sm shrink-0 ${
                        isSelected
                          ? 'bg-red-800 text-white'
                          : day.isPublicHoliday
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {day.dayNumber}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-stone-900 truncate">
                        {day.nepaliName}
                      </div>
                      <div className="text-xs text-stone-500 truncate flex items-center gap-1.5 mt-0.5">
                        <span>{day.date2026}</span>
                        <span aria-hidden="true">·</span>
                        <span className="truncate">{day.tithi}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {day.muhurat && (
                      <span className="hidden sm:inline-block text-[11px] text-amber-800 font-medium bg-amber-100/60 px-2 py-0.5 rounded">
                        Sait Available
                      </span>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(day.dayNumber, day.englishTitle);
                      }}
                      className={`p-1.5 rounded-md hover:bg-stone-200 transition-colors ${
                        isBookmarked ? 'text-amber-600' : 'text-stone-300'
                      }`}
                      title={isBookmarked ? 'Reminder active' : 'Set reminder'}
                    >
                      <Bell className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Detailed Selected Day Feature Card */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-stone-100">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                  Day {selectedDay.dayNumber} of Dashain · {selectedDay.tithi}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-stone-900 mt-1">
                  {selectedDay.nepaliName}
                </h3>
                <div className="text-sm font-medium text-stone-600 mt-0.5">
                  {selectedDay.englishTitle}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleBookmark(selectedDay.dayNumber, selectedDay.englishTitle)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                    bookmarkedDays.includes(selectedDay.dayNumber)
                      ? 'border-amber-400 bg-amber-50 text-amber-900 font-semibold'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  {bookmarkedDays.includes(selectedDay.dayNumber) ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-amber-600" />
                      <span>Reminder Active</span>
                    </>
                  ) : (
                    <>
                      <Bell className="w-3.5 h-3.5 text-stone-400" />
                      <span>Set Reminder</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Auspicious Muhurat Notice if present */}
            {selectedDay.muhurat && (
              <div className="mt-5 p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-amber-900 uppercase tracking-wide">
                    Auspicious Timing (शुभ साइत)
                  </div>
                  <div className="text-sm font-bold text-amber-950 mt-0.5">
                    {selectedDay.muhurat}
                  </div>
                  <div className="text-xs text-amber-800/80 mt-0.5">
                    Recommended astronomical window for ceremonial rituals and blessings.
                  </div>
                </div>
              </div>
            )}

            {/* Narrative Description */}
            <div className="mt-6 text-sm text-stone-700 leading-relaxed">
              <p>{selectedDay.description}</p>
            </div>

            {/* Daily Rituals Checklist */}
            <div className="mt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
                Key Customs & Rituals
              </h4>
              <ul className="space-y-2.5">
                {selectedDay.rituals.map((r, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-stone-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 shrink-0" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sacred Mantra if present */}
            {selectedDay.mantra && (
              <div className="mt-6 p-4 rounded-xl bg-stone-50 border border-stone-200">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-red-900 uppercase tracking-wider mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-red-700" />
                  <span>Sacred Invocation Mantra</span>
                </div>
                <div className="text-sm font-medium text-stone-900 font-serif leading-relaxed">
                  {selectedDay.mantra}
                </div>
              </div>
            )}

            {/* Significance Footer */}
            <div className="mt-6 pt-5 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span className="flex items-center gap-1.5">
                <CalendarIcon className="w-4 h-4 text-stone-400" />
                <span>{selectedDay.date2026}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedDay.isPublicHoliday ? 'National Public Holiday' : 'Ritual Observance'}</span>
              </span>
              <span className="italic">{selectedDay.significance}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
