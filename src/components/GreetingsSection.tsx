import React, { useState } from 'react';
import { TRADITIONAL_BLESSINGS } from '../data/festivalData';
import { Blessing } from '../types';
import { Heart, Copy, Check, Sparkles, Send, Download } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GreetingsSectionProps {
  onNotify: (msg: string) => void;
}

export const GreetingsSection: React.FC<GreetingsSectionProps> = ({ onNotify }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Card Creator State
  const [recipient, setRecipient] = useState('Pujya Buwa & Aama');
  const [sender, setSender] = useState('With reverence, Suman');
  const [cardTheme, setCardTheme] = useState<'marigold' | 'vermilion' | 'bronze' | 'twilight'>('marigold');
  const [customMsg, setCustomMsg] = useState(
    'बडा दशैं तथा विजयादशमीको पावन अवसरमा सुख, शान्ति, सुस्वास्थ्य एवं उत्तरोत्तर प्रगतिको हार्दिक मंगलमय शुभकामना!'
  );
  const [copiedCard, setCopiedCard] = useState(false);

  const handleCopyGreeting = (blessing: Blessing) => {
    const textToCopy = `${blessing.sanskritVerse ? blessing.sanskritVerse + '\n\n' : ''}${blessing.nepaliGreeting}\n\nMeaning: ${blessing.englishMeaning}\n\n— Happy Dashain! 🌾✨`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(blessing.id);
    setTimeout(() => setCopiedId(null), 2000);
    onNotify('Festive blessing copied to clipboard!');
  };

  const handleCopyCardText = () => {
    const cardText = `🌺 BADA DASHAIN BLESSINGS 🌺\nTo: ${recipient}\n\n"${customMsg}"\n\n${sender}\n\nशुभ विजयादशमी २०८३! 🌾✨`;
    navigator.clipboard.writeText(cardText);
    setCopiedCard(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#D97706', '#B91C1C', '#F59E0B'],
    });
    setTimeout(() => setCopiedCard(false), 2000);
    onNotify('Personalized greeting card text copied!');
  };

  const cardThemeStyles = {
    marigold: 'bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 text-white border-amber-400/50',
    vermilion: 'bg-gradient-to-br from-red-800 via-red-900 to-stone-950 text-white border-red-500/50',
    bronze: 'bg-gradient-to-br from-stone-800 via-amber-950 to-stone-900 text-amber-50 border-amber-600/40',
    twilight: 'bg-gradient-to-br from-slate-900 via-indigo-950 to-stone-950 text-indigo-50 border-indigo-500/30',
  };

  return (
    <section id="blessings" className="py-16 bg-[#FAF7F2] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-1 flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5" />
            <span>Sacred Mantras & Ashirwad</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-stone-900">
            Traditional Greetings & Blessings
          </h2>
          <p className="mt-2 text-stone-600 leading-relaxed text-sm sm:text-base">
            The revered Sanskrit verses chanted during Tika blessings, alongside contemporary greetings to share with elders, relatives, and loved ones.
          </p>
        </div>

        {/* Traditional Sanskrit Verses Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {TRADITIONAL_BLESSINGS.map((blessing) => {
            const isCopied = copiedId === blessing.id;
            return (
              <div
                key={blessing.id}
                className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-xs hover:border-amber-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-stone-100 text-xs text-stone-400">
                    <span className="capitalize font-medium text-amber-800">
                      {blessing.context.replace('-', ' ')}
                    </span>
                    <button
                      onClick={() => handleCopyGreeting(blessing)}
                      className="flex items-center gap-1 text-stone-600 hover:text-amber-800 transition-colors cursor-pointer"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  {/* Sanskrit Stanza if available */}
                  {blessing.sanskritVerse && (
                    <div className="mt-4 p-4 rounded-xl bg-amber-50/70 border border-amber-200/70">
                      <div className="text-xs uppercase tracking-wider font-semibold text-red-900 mb-1.5 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-red-700" />
                        <span>Vedic Ashirwad Shloka</span>
                      </div>
                      <pre className="text-sm sm:text-base font-serif font-bold text-stone-900 whitespace-pre-line leading-relaxed font-sans">
                        {blessing.sanskritVerse}
                      </pre>
                    </div>
                  )}

                  {/* Nepali Meaning */}
                  <div className="mt-4 text-sm font-semibold text-stone-900 leading-relaxed">
                    {blessing.nepaliGreeting}
                  </div>

                  {/* English Philosophical Translation */}
                  <p className="mt-3 text-xs text-stone-600 leading-relaxed italic border-t border-stone-100 pt-3">
                    &ldquo;{blessing.englishMeaning}&rdquo;
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Custom Greeting Card Generator */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-10 shadow-xs">
          <div className="max-w-2xl mb-8">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-1">
              Personalized Creator
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-stone-900">
              Create a Festive Blessing Card
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Personalize recipient names, choose rich festive palettes, and export digital greetings for WhatsApp, messaging, or printing.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Form Controls */}
            <div className="lg:col-span-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Recipient Name / Family
                </label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="e.g., Dear Maya & Family"
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Blessing Message / Shubhakamana
                </label>
                <textarea
                  rows={3}
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Sender Sign-off
                </label>
                <input
                  type="text"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  placeholder="e.g., With love, Aarav"
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:border-amber-500"
                />
              </div>

              {/* Theme Selector */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Visual Palette Theme
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'marigold', name: 'Marigold Gold' },
                    { id: 'vermilion', name: 'Vermilion Red' },
                    { id: 'bronze', name: 'Temple Bronze' },
                    { id: 'twilight', name: 'Himalayan Night' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setCardTheme(t.id as any)}
                      className={`p-2 rounded-lg text-xs font-medium border text-center transition-colors cursor-pointer ${
                        cardTheme === t.id
                          ? 'border-amber-600 bg-amber-50 text-amber-950 font-bold'
                          : 'border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Live Card Preview */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div
                className={`w-full max-w-md aspect-4/3 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl border ${cardThemeStyles[cardTheme]}`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs opacity-85">
                    <span className="uppercase tracking-widest font-mono text-[10px]">
                      शुभ विजयादशमी २०८३
                    </span>
                    <span>🌾✨</span>
                  </div>

                  <div className="mt-4">
                    <div className="text-xs uppercase tracking-wider opacity-75">Dedicated To:</div>
                    <div className="text-lg font-bold font-display">{recipient || 'Valued Friend'}</div>
                  </div>

                  <p className="mt-3 text-xs sm:text-sm leading-relaxed opacity-95 line-clamp-3">
                    &ldquo;{customMsg}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-white/20 flex items-center justify-between text-xs opacity-90">
                  <span className="italic">{sender || 'Family & Well-wishers'}</span>
                  <span className="font-mono text-[11px]">Nepal 2026</span>
                </div>
              </div>

              {/* Action Buttons for Card */}
              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={handleCopyCardText}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-red-800 hover:bg-red-900 rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  {copiedCard ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCard ? 'Copied Card Text!' : 'Copy Formatted Card Text'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
