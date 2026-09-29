import React, { useState, useEffect } from 'react';
import { FESTIVAL_MILESTONES, HERO_IMAGE } from '../data/festivalData';
import { Sparkles, Calendar, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CountdownBanner: React.FC = () => {
  const [selectedMilestoneId, setSelectedMilestoneId] = useState('vijaya-dashami');
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false });

  const activeMilestone =
    FESTIVAL_MILESTONES.find((m) => m.id === selectedMilestoneId) || FESTIVAL_MILESTONES[4];

  useEffect(() => {
    const calculate = () => {
      const target = new Date(activeMilestone.targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [activeMilestone.targetDate]);

  const fireFestivePetals = () => {
    confetti({
      particleCount: 65,
      spread: 90,
      origin: { y: 0.3 },
      colors: ['#F59E0B', '#B91C1C', '#D97706', '#78350F', '#FEF08A'],
    });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#2B0E0E] via-[#3B1212] to-[#1E0B0B] text-white py-12 lg:py-16 border-b border-amber-950/40">
      {/* Background Hero Subtle Artwork & Scrim */}
      <div className="absolute inset-0 z-0 opacity-25 mix-blend-luminosity pointer-events-none">
        <img
          src={HERO_IMAGE}
          alt="Dashain Puja Thali and Autumn Skies"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-red-950/90 via-red-950/75 to-amber-950/85 z-1" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-300 mb-3">
            <span className="w-6 h-px bg-amber-400" />
            <span>शुभ विजयादशमी २०८३ · Ashwin 2083</span>
            <span className="w-6 h-px bg-amber-400" />
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-amber-50 drop-shadow-sm text-balance">
            The Great Festival of Triumph & Family Bonds
          </h1>
          <p className="mt-3 text-sm sm:text-base text-amber-200/85 font-normal max-w-2xl mx-auto leading-relaxed">
            Celebrating the sacred victory of Goddess Durga, the flourishing of golden Jamara, and the cherished embrace of elder blessings across Nepal and the worldwide diaspora.
          </p>
        </div>

        {/* Milestone Selector Tabs */}
        <div className="flex items-center justify-center gap-1.5 p-1 bg-stone-900/60 backdrop-blur-md rounded-xl max-w-3xl mx-auto border border-amber-500/20 overflow-x-auto scrollbar-none mb-8">
          {FESTIVAL_MILESTONES.map((m) => {
            const isSelected = m.id === selectedMilestoneId;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedMilestoneId(m.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-amber-500 text-stone-950 font-semibold shadow-xs'
                    : 'text-amber-200/80 hover:text-white hover:bg-white/5'
                }`}
              >
                {m.title.split(' ')[0]}
              </button>
            );
          })}
        </div>

        {/* Countdown Visual & Timer Board */}
        <div className="max-w-4xl mx-auto bg-stone-950/70 backdrop-blur-md border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-1">
                Upcoming Landmark
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                {activeMilestone.title}
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 mt-1">
                {activeMilestone.subtitle} · {activeMilestone.description}
              </p>
            </div>

            {/* Auspicious Sait / Direction Info */}
            {activeMilestone.muhurat && (
              <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-2.5 shrink-0">
                <Compass className="w-5 h-5 text-amber-400 shrink-0" />
                <div className="text-left">
                  <div className="text-[11px] uppercase tracking-wider text-amber-300 font-medium">Auspicious Sait</div>
                  <div className="text-xs font-semibold text-white">{activeMilestone.muhurat}</div>
                </div>
              </div>
            )}
          </div>

          {/* Time Digits Grid */}
          <div className="grid grid-cols-4 gap-3 sm:gap-6 my-6 text-center">
            <div className="bg-stone-900/80 rounded-xl p-3 sm:p-5 border border-amber-500/20">
              <span className="block text-2xl sm:text-5xl font-extrabold font-mono tabular-nums text-amber-400">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[11px] sm:text-xs tracking-wider uppercase text-amber-200/70 mt-1 block">
                Days
              </span>
            </div>

            <div className="bg-stone-900/80 rounded-xl p-3 sm:p-5 border border-amber-500/20">
              <span className="block text-2xl sm:text-5xl font-extrabold font-mono tabular-nums text-amber-400">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[11px] sm:text-xs tracking-wider uppercase text-amber-200/70 mt-1 block">
                Hours
              </span>
            </div>

            <div className="bg-stone-900/80 rounded-xl p-3 sm:p-5 border border-amber-500/20">
              <span className="block text-2xl sm:text-5xl font-extrabold font-mono tabular-nums text-amber-400">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[11px] sm:text-xs tracking-wider uppercase text-amber-200/70 mt-1 block">
                Minutes
              </span>
            </div>

            <div className="bg-stone-900/80 rounded-xl p-3 sm:p-5 border border-amber-500/20">
              <span className="block text-2xl sm:text-5xl font-extrabold font-mono tabular-nums text-amber-300">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[11px] sm:text-xs tracking-wider uppercase text-amber-200/70 mt-1 block">
                Seconds
              </span>
            </div>
          </div>

          {/* Quick Actions Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs text-stone-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Target: {new Date(activeMilestone.targetDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={fireFestivePetals}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold rounded-lg transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Shower Marigold Petals</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
