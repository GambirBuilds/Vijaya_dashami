import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, Calendar, BookOpen, Utensils, Heart, Image as ImageIcon, ArrowRight } from 'lucide-react';
import { FESTIVAL_DAYS, FESTIVAL_RECIPES, TRADITIONAL_BLESSINGS } from '../data/festivalData';
import { PhotoItem } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: PhotoItem[];
  onSelectEvent: (dayNumber: number) => void;
  onSelectRecipe: (recipeId: string) => void;
  onSelectPhoto: (photo: PhotoItem) => void;
  onNavigate: (sectionId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  photos,
  onSelectEvent,
  onSelectRecipe,
  onSelectPhoto,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');

  // Handle Cmd+K & Escape keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { events: [], recipes: [], blessings: [], photos: [] };

    const matchingEvents = FESTIVAL_DAYS.filter(
      (ev) =>
        ev.nepaliName.toLowerCase().includes(q) ||
        ev.englishTitle.toLowerCase().includes(q) ||
        ev.description.toLowerCase().includes(q) ||
        ev.rituals.some((r) => r.toLowerCase().includes(q))
    ).slice(0, 4);

    const matchingRecipes = FESTIVAL_RECIPES.filter(
      (r) =>
        r.nameNepali.toLowerCase().includes(q) ||
        r.nameEnglish.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.ingredients.some((i) => i.item.toLowerCase().includes(q))
    ).slice(0, 4);

    const matchingBlessings = TRADITIONAL_BLESSINGS.filter(
      (b) =>
        (b.sanskritVerse && b.sanskritVerse.toLowerCase().includes(q)) ||
        b.nepaliGreeting.toLowerCase().includes(q) ||
        b.englishMeaning.toLowerCase().includes(q)
    ).slice(0, 3);

    const matchingPhotos = photos.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.caption.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    ).slice(0, 4);

    return {
      events: matchingEvents,
      recipes: matchingRecipes,
      blessings: matchingBlessings,
      photos: matchingPhotos,
    };
  }, [query, photos]);

  const totalResults =
    searchResults.events.length +
    searchResults.recipes.length +
    searchResults.blessings.length +
    searchResults.photos.length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-stone-200 bg-white">
          <Search className="w-5 h-5 text-amber-700 shrink-0 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search rituals, recipes, greetings, photos (e.g. Sel Roti, Tika, Jamara)..."
            className="w-full bg-transparent text-sm text-stone-900 placeholder-stone-400 focus:outline-hidden"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-stone-400 hover:text-stone-700 mr-2"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="p-4 overflow-y-auto space-y-6">
          {!query ? (
            <div className="py-8 text-center">
              <p className="text-sm text-stone-500 font-medium">Quick Discovery Suggestions</p>
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {['Vijaya Dashami Tika', 'Sel Roti Recipe', 'Bamboo Swing (Linge Ping)', 'Jamara Sowing', 'Khasi ko Masu', 'Sanskrit Ashirwad'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 text-xs bg-stone-100 hover:bg-amber-100 hover:text-amber-900 text-stone-700 rounded-md transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-12 text-center text-sm text-stone-500">
              No matching records found for &ldquo;{query}&rdquo;. Try searching for rituals, recipes, or cultural terms.
            </div>
          ) : (
            <>
              {/* Events & Calendar */}
              {searchResults.events.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    <span>Festival Days & Rituals</span>
                  </div>
                  <div className="space-y-1.5">
                    {searchResults.events.map((ev) => (
                      <button
                        key={ev.dayNumber}
                        onClick={() => {
                          onSelectEvent(ev.dayNumber);
                          onNavigate('calendar');
                          onClose();
                        }}
                        className="w-full text-left p-2.5 rounded-lg hover:bg-stone-100 transition-colors flex items-center justify-between group cursor-pointer"
                      >
                        <div>
                          <div className="text-sm font-semibold text-stone-900 group-hover:text-red-900">
                            Day {ev.dayNumber}: {ev.nepaliName}
                          </div>
                          <div className="text-xs text-stone-500 mt-0.5">
                            <span>{ev.englishTitle}</span>
                            <span className="mx-1.5">·</span>
                            <span>{ev.date2026}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-stone-600 group-hover:translate-x-0.5 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Recipes */}
              {searchResults.recipes.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
                    <Utensils className="w-3.5 h-3.5 text-red-600" />
                    <span>Festive Delicacies & Recipes</span>
                  </div>
                  <div className="space-y-1.5">
                    {searchResults.recipes.map((rcp) => (
                      <button
                        key={rcp.id}
                        onClick={() => {
                          onSelectRecipe(rcp.id);
                          onNavigate('recipes');
                          onClose();
                        }}
                        className="w-full text-left p-2.5 rounded-lg hover:bg-stone-100 transition-colors flex items-center justify-between group cursor-pointer"
                      >
                        <div>
                          <div className="text-sm font-semibold text-stone-900 group-hover:text-red-900">
                            {rcp.nameNepali} ({rcp.nameEnglish})
                          </div>
                          <div className="text-xs text-stone-500 mt-0.5">
                            <span>Prep: {rcp.prepTime}</span>
                            <span className="mx-1.5">·</span>
                            <span>Difficulty: {rcp.difficulty}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-stone-600 group-hover:translate-x-0.5 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Photos */}
              {searchResults.photos.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
                    <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
                    <span>Community Photos</span>
                  </div>
                  <div className="space-y-1.5">
                    {searchResults.photos.map((ph) => (
                      <button
                        key={ph.id}
                        onClick={() => {
                          onSelectPhoto(ph);
                          onClose();
                        }}
                        className="w-full text-left p-2.5 rounded-lg hover:bg-stone-100 transition-colors flex items-center justify-between group cursor-pointer"
                      >
                        <div>
                          <div className="text-sm font-semibold text-stone-900 group-hover:text-red-900">
                            {ph.title}
                          </div>
                          <div className="text-xs text-stone-500 mt-0.5">
                            <span>{ph.location}</span>
                            <span className="mx-1.5">·</span>
                            <span>By {ph.author}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-stone-600 group-hover:translate-x-0.5 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Blessings */}
              {searchResults.blessings.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
                    <Heart className="w-3.5 h-3.5 text-red-600" />
                    <span>Traditional Blessings</span>
                  </div>
                  <div className="space-y-1.5">
                    {searchResults.blessings.map((bl) => (
                      <button
                        key={bl.id}
                        onClick={() => {
                          onNavigate('blessings');
                          onClose();
                        }}
                        className="w-full text-left p-2.5 rounded-lg hover:bg-stone-100 transition-colors group cursor-pointer"
                      >
                        <div className="text-sm text-stone-900 font-medium group-hover:text-red-900 line-clamp-1">
                          {bl.nepaliGreeting}
                        </div>
                        <div className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                          {bl.englishMeaning}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-stone-50 border-t border-stone-200 text-xs text-stone-400 flex items-center justify-between">
          <span>Navigate with search query</span>
          <span>ESC to exit</span>
        </div>
      </div>
    </div>
  );
};
