import React, { useState } from 'react';
import { Search, Sparkles, Wifi, WifiOff, Menu, X, Camera, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenUpload: () => void;
  isOffline: boolean;
  onToggleOffline: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenUpload,
  isOffline,
  onToggleOffline,
  activeSection,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const triggerJamaraShower = () => {
    // Festive Marigold Orange and Vermilion Red Confetti Shower
    confetti({
      particleCount: 55,
      spread: 70,
      origin: { y: 0.15 },
      colors: ['#D97706', '#B91C1C', '#F59E0B', '#991B1B', '#EAB308'],
    });
  };

  const navLinks = [
    { id: 'overview', label: 'Overview' },
    { id: 'calendar', label: '15-Day Calendar' },
    { id: 'history', label: 'Cultural History' },
    { id: 'gallery', label: 'Photo Gallery' },
    { id: 'recipes', label: 'Festive Recipes' },
    { id: 'blessings', label: 'Greetings & Blessings' },
    { id: 'activity', label: 'Activity & Audit' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#overview"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('overview');
            }}
            className="text-xl font-bold tracking-tight text-amber-950 font-display hover:text-red-900 transition-colors shrink-0"
          >
            बडा दशैं · Vijaya Dashami
          </a>

          {/* Zone 2: 4-6 text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-700">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-1 transition-colors whitespace-nowrap cursor-pointer ${
                    isActive ? 'text-red-900 font-semibold' : 'hover:text-stone-950'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-2.5">
            {/* Quick Search */}
            <button
              onClick={onOpenSearch}
              aria-label="Search festival archive"
              className="p-2 text-stone-600 hover:text-red-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
              title="Search rituals, recipes, greetings (Cmd+K)"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Offline Simulator Indicator / Toggle */}
            <button
              onClick={onToggleOffline}
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer border ${
                isOffline
                  ? 'border-amber-400 bg-amber-50 text-amber-900'
                  : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
              }`}
              title={isOffline ? 'Currently Offline: Using local device cache' : 'Online & Synchronized'}
            >
              {isOffline ? <WifiOff className="w-3.5 h-3.5 text-amber-700" /> : <Wifi className="w-3.5 h-3.5 text-emerald-600" />}
              <span className="whitespace-nowrap">{isOffline ? 'Offline Cache' : 'Live Sync'}</span>
            </button>

            {/* Petal Shower Trigger */}
            <button
              onClick={triggerJamaraShower}
              aria-label="Shower auspicious marigold petals"
              className="hidden md:flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-amber-900 bg-amber-100/80 hover:bg-amber-200/80 rounded-lg transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span className="whitespace-nowrap">Petal Shower</span>
            </button>

            {/* Primary Action: Community Upload */}
            <button
              onClick={onOpenUpload}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-red-800 hover:bg-red-900 rounded-lg transition-colors shadow-sm whitespace-nowrap cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Share Memory</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-600 hover:text-stone-900 rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-[#FAF7F2] px-4 pt-3 pb-5 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeSection === link.id
                  ? 'bg-amber-100/60 text-red-900 font-semibold'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-stone-200 flex items-center justify-between px-3 text-xs text-stone-600">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Local Encryption & Sync
            </span>
            <button
              onClick={onToggleOffline}
              className="font-medium text-amber-800 hover:underline"
            >
              Toggle {isOffline ? 'Online' : 'Offline'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
