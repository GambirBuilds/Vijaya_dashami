import React from 'react';
import { Sparkles, Shield, Wifi, WifiOff } from 'lucide-react';

interface FooterProps {
  isOffline: boolean;
  onToggleOffline: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  isOffline,
  onToggleOffline,
  onNavigate,
}) => {
  return (
    <footer className="bg-[#1C1414] text-stone-300 border-t border-stone-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-stone-800">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-xl font-bold font-display text-amber-200">
              बडा दशैं · Vijaya Dashami Cultural Hub
            </span>
            <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
              Dedicated to preserving and celebrating the profound cultural heritage, rituals, cuisine, and family reunions of Nepal’s greatest festival.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-stone-400">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
              <span>Offline-Enabled PWA & Local Encrypted Sync</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Cultural Sections
            </div>
            <ul className="space-y-1.5 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('overview')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Festival Overview & Countdown
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('calendar')}
                  className="hover:text-amber-300 transition-colors"
                >
                  15-Day Auspicious Calendar
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('history')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Goddess Durga & Traditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('recipes')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Sel Roti & Festive Feast
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('blessings')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Sanskrit Ashirwad Verses
                </button>
              </li>
            </ul>
          </div>

          {/* Device Sync & Offline Engine */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Device Synchronization
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Photos, recipes, and notes remain accessible offline even in remote mountain areas without internet connectivity.
            </p>
            <button
              onClick={onToggleOffline}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-stone-700 bg-stone-900 text-stone-300 hover:text-white transition-colors cursor-pointer"
            >
              {isOffline ? <WifiOff className="w-3.5 h-3.5 text-amber-400" /> : <Wifi className="w-3.5 h-3.5 text-emerald-400" />}
              <span>{isOffline ? 'Mode: Offline Local' : 'Mode: Connected Sync'}</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div>
            © 2026 Bada Dashain Cultural Preservation Project. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>May this Dashain bring auspicious light to your home.</span>
            <span>🌾 🌸 🪔</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
