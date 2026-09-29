import React, { useState } from 'react';
import { FESTIVAL_RECIPES } from '../data/festivalData';
import { Recipe } from '../types';
import { Utensils, Clock, Users, ChefHat, Check, Printer, Sparkles } from 'lucide-react';

interface RecipesSectionProps {
  selectedRecipeId?: string;
  onNotify: (msg: string) => void;
}

export const RecipesSection: React.FC<RecipesSectionProps> = ({
  selectedRecipeId,
  onNotify,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeRecipe, setActiveRecipe] = useState<Recipe>(
    FESTIVAL_RECIPES.find((r) => r.id === selectedRecipeId) || FESTIVAL_RECIPES[0]
  );
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);

  const filteredRecipes = FESTIVAL_RECIPES.filter((r) => {
    if (activeCategory === 'all') return true;
    return r.category === activeCategory;
  });

  const toggleIngredient = (item: string) => {
    setCheckedIngredients((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handlePrintRecipe = () => {
    window.print();
    onNotify(`Prepared print preview for ${activeRecipe.nameNepali}`);
  };

  return (
    <section id="recipes" className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-stone-200 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-1 flex items-center gap-1.5">
              <Utensils className="w-3.5 h-3.5" />
              <span>Gastronomic Heritage</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-stone-900">
              Dashain Festive Feast & Recipes
            </h2>
            <p className="mt-1 text-sm text-stone-600 max-w-xl">
              Authentic step-by-step culinary guides for crispy spiral Sel Roti, rich mutton curry, wild Timur potatoes, and roasted tomato pickles.
            </p>
          </div>

          {/* Segmented Category Filter */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg overflow-x-auto">
            {[
              { id: 'all', label: 'All Dishes' },
              { id: 'breads', label: 'Festive Breads' },
              { id: 'mains', label: 'Curries & Mains' },
              { id: 'sides', label: 'Spiced Sides' },
              { id: 'pickles', label: 'Achars & Relish' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Master Recipe Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Dish Selection Cards */}
          <div className="lg:col-span-4 space-y-3">
            {filteredRecipes.map((rcp) => {
              const isSelected = activeRecipe.id === rcp.id;
              return (
                <div
                  key={rcp.id}
                  onClick={() => {
                    setActiveRecipe(rcp);
                    setCheckedIngredients([]);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                    isSelected
                      ? 'bg-amber-50/80 border-amber-500 shadow-xs'
                      : 'bg-[#FAF7F2] border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-stone-200 shrink-0">
                    <img
                      src={rcp.imageUrl}
                      alt={rcp.nameEnglish}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-bold text-stone-900 truncate">
                      {rcp.nameNepali}
                    </div>
                    <div className="text-xs text-stone-500 truncate mt-0.5">
                      {rcp.nameEnglish}
                    </div>
                    <div className="text-[11px] text-amber-800 font-medium mt-1">
                      {rcp.prepTime} · {rcp.difficulty}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Detailed Recipe Cooking Card */}
          <div className="lg:col-span-8 bg-[#FAF7F2] rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs">
            {/* Title & Metadata Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-stone-900">
                  {activeRecipe.nameNepali}
                </h3>
                <div className="text-sm text-stone-600 font-medium mt-1">
                  {activeRecipe.nameEnglish}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintRecipe}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 bg-white border border-stone-200 hover:bg-stone-50 rounded-lg transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Recipe</span>
                </button>
              </div>
            </div>

            {/* Quick Stats Pill Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6 text-center">
              <div className="bg-white p-3 rounded-xl border border-stone-200">
                <Clock className="w-4 h-4 mx-auto text-amber-600 mb-1" />
                <span className="block text-xs font-bold text-stone-900">{activeRecipe.prepTime}</span>
                <span className="text-[10px] text-stone-400 uppercase tracking-wide">Prep Time</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-stone-200">
                <Utensils className="w-4 h-4 mx-auto text-amber-600 mb-1" />
                <span className="block text-xs font-bold text-stone-900">{activeRecipe.cookTime}</span>
                <span className="text-[10px] text-stone-400 uppercase tracking-wide">Cook Time</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-stone-200">
                <Users className="w-4 h-4 mx-auto text-amber-600 mb-1" />
                <span className="block text-xs font-bold text-stone-900">{activeRecipe.servings}</span>
                <span className="text-[10px] text-stone-400 uppercase tracking-wide">Yield</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-stone-200">
                <ChefHat className="w-4 h-4 mx-auto text-amber-600 mb-1" />
                <span className="block text-xs font-bold text-stone-900">{activeRecipe.difficulty}</span>
                <span className="text-[10px] text-stone-400 uppercase tracking-wide">Skill Level</span>
              </div>
            </div>

            {/* Cultural Note Box */}
            <div className="mb-6 p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-950">
              <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Festive Tradition & Heritage: </span>
                <span>{activeRecipe.culturalNote}</span>
              </div>
            </div>

            {/* Ingredients Checklist */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Ingredients Checklist ({activeRecipe.ingredients.length} items)
                </h4>
                <span className="text-[11px] text-stone-500">
                  {checkedIngredients.length} of {activeRecipe.ingredients.length} prepared
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-white p-4 rounded-xl border border-stone-200">
                {activeRecipe.ingredients.map((ing, idx) => {
                  const isChecked = checkedIngredients.includes(ing.item);
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleIngredient(ing.item)}
                      className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                        isChecked ? 'bg-amber-50 text-stone-400 line-through' : 'hover:bg-stone-50 text-stone-800'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                            isChecked ? 'bg-amber-600 border-amber-600 text-white' : 'border-stone-300'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-3" />}
                        </div>
                        <span className="text-xs font-medium truncate">{ing.item}</span>
                      </div>
                      <span className="text-xs text-stone-500 font-mono shrink-0 ml-2">
                        {ing.amount}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step-by-Step Cooking Guide */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-3">
                Step-by-Step Culinary Preparation
              </h4>
              <ol className="space-y-3">
                {activeRecipe.steps.map((step, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-stone-200 text-xs text-stone-800 leading-relaxed"
                  >
                    <span className="w-6 h-6 rounded-full bg-red-100 text-red-900 font-mono font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
