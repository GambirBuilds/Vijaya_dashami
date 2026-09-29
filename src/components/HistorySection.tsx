import React from 'react';
import { SWING_IMAGE, TIKA_IMAGE } from '../data/festivalData';
import { BookOpen } from 'lucide-react';

export const HistorySection: React.FC = () => {
  return (
    <section id="history" className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-1 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Origins & Living Heritage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-stone-900 tracking-tight">
            The Eternal Triumph of Light & Kinship
          </h2>
          <p className="mt-3 text-stone-600 leading-relaxed text-base">
            Dashain (बडा दशैं), celebrated during the crisp autumn month of Ashwin, stands as the paramount cultural festival of Nepal. Rooted in both epic mythology and agrarian cycles, it unites communities across Himalayan valleys and the global diaspora.
          </p>
        </div>

        {/* Editorial 2-Column Story Grid with Drop Cap */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Narrative Column */}
          <div className="lg:col-span-7 space-y-6 text-stone-700 leading-relaxed text-[15px]">
            <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-red-900">
              The foundational lore of Dashain is immortalized in the Markandeya Purana, where the demon king Mahishasura, empowered by invincibility boons, unleashed terror across the celestial realms. In response, the combined radiance of the cosmic trinity manifested as Goddess Durga—a ten-armed warrior armed with the divine disc of Vishnu, the trident of Shiva, and the thunderbolt of Indra.
            </p>

            <p>
              For nine fierce days and nights, the Goddess waged relentless war against the legions of deception, ultimately slaying the buffalo demon on the tenth day. Hence, this triumphant day is revered as <strong>Vijaya Dashami</strong>—the tenth day of supreme victory. Concurrently, the tradition marks the return of Lord Rama after conquering Ravana, reinforcing the universal principle that righteousness unfailingly vanquishes darkness.
            </p>

            {/* Editorial Pull Quote */}
            <div className="my-8 py-6 px-6 border-l-2 border-amber-600 bg-amber-50/50 rounded-r-xl">
              <blockquote className="text-lg sm:text-xl font-display italic text-amber-950 leading-snug">
                &ldquo;दशैंमा एकपटक भए पनि भुइँ छोड्नुपर्छ — To break away from the ground at least once during Dashain on the bamboo swing is to unburden the spirit and welcome renewal.&rdquo;
              </blockquote>
              <cite className="block text-xs uppercase tracking-wider text-amber-800 font-semibold mt-3 not-italic">
                — Ancient Nepali Proverb & Mountain Tradition
              </cite>
            </div>

            <p>
              Beyond the battlefield allegory, Dashain in Nepal is intrinsically tied to the rhythm of the soil. As the fierce monsoon rains recede and terraced paddy fields ripen into shades of amber gold, Dashain heralds the season of bountiful harvest, clean mountain air, and long-anticipated family reunions. Relatives hike over rugged ridges or fly across continents to bow before elders and receive sacred blessings.
            </p>
          </div>

          {/* Right Column: Visual Archival Cards */}
          <div className="lg:col-span-5 space-y-8">
            {/* Visual 1: Tika Ritual */}
            <div className="group rounded-2xl overflow-hidden border border-stone-200 bg-stone-50 shadow-xs">
              <div className="aspect-4/3 overflow-hidden bg-stone-100">
                <img
                  src={TIKA_IMAGE}
                  alt="Traditional Tika and Jamara blessing ritual"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="text-base font-bold font-display text-stone-900">
                  The Sacred Akshata & Golden Jamara
                </h3>
                <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                  Red vermilion, whole unblemished rice grains, and yogurt form the auspicious Tika. Tender yellow barley sprouts, tenderly nurtured in darkness, are placed behind ears as natural symbols of prosperity and health.
                </p>
              </div>
            </div>

            {/* Visual 2: Linge Ping */}
            <div className="group rounded-2xl overflow-hidden border border-stone-200 bg-stone-50 shadow-xs">
              <div className="aspect-4/3 overflow-hidden bg-stone-100">
                <img
                  src={SWING_IMAGE}
                  alt="High bamboo swing Linge Ping on Nepal village hilltop"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="text-base font-bold font-display text-stone-900">
                  Linge Ping: Four-Pillar Bamboo Swings
                </h3>
                <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                  Erected collectively by village communities using forest bamboo poles and hand-braided babiyo grass ropes. Villagers of all ages soar toward the sky amidst joyous laughter and autumn breezes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Cultural Practice Grid */}
        <div className="mt-14 pt-10 border-t border-stone-200">
          <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-6">
            The Living Pillars of Dashain Observance
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-xl border border-stone-200 bg-[#FAF7F2]">
              <div className="text-amber-800 font-serif font-bold text-lg mb-1">01. Ghatasthapana & Jamara</div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Barley sown inside sacred clay pots in the quiet sanctuary of Dashain Ghar. The absence of sunlight creates radiant yellow shoots rich in natural chlorophyll.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-stone-200 bg-[#FAF7F2]">
              <div className="text-amber-800 font-serif font-bold text-lg mb-1">02. Fulpati & Royal Foliage</div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Nine sacred leafy stems representing the nine forms of Durga transported from Gorkha palace to Kathmandu in royal palanquin accompanied by traditional buglers.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-stone-200 bg-[#FAF7F2]">
              <div className="text-amber-800 font-serif font-bold text-lg mb-1">03. Changa (Kite Flying)</div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Paper kites soaring over temple spires to convey a symbolic message to Lord Indra, king of rain, asking to hold back further showers for the harvest.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-stone-200 bg-[#FAF7F2]">
              <div className="text-amber-800 font-serif font-bold text-lg mb-1">04. Dakshina & Ashirwad</div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Vedic verses of long life, courage, and virtue recited by parents and grandparents, accompanied by crisp monetary tokens of affection (Dakshina).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
