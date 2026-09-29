export type PrivacyLevel = 'public' | 'family' | 'private';

export interface PhotoItem {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  author: string;
  location: string;
  date: string;
  category: 'tika-jamara' | 'linge-ping' | 'feast' | 'kites' | 'puja' | 'family';
  likes: number;
  views: number;
  privacy: PrivacyLevel;
  folderId?: string;
  isFavorite?: boolean;
  tags: string[];
}

export interface SharedFolder {
  id: string;
  name: string;
  description: string;
  owner: string;
  itemCount: number;
  accessLevel: 'admin' | 'contributor' | 'viewer';
  isPasswordProtected: boolean;
  password?: string;
  expiryDate?: string;
  createdAt: string;
}

export interface FestivalEvent {
  dayNumber: number;
  nepaliName: string;
  englishTitle: string;
  tithi: string;
  date2026: string;
  muhurat?: string;
  description: string;
  rituals: string[];
  significance: string;
  mantra?: string;
  isPublicHoliday: boolean;
  category: 'major-holiday' | 'sacred-puja' | 'social-tradition';
}

export interface Recipe {
  id: string;
  nameNepali: string;
  nameEnglish: string;
  category: 'mains' | 'breads' | 'sides' | 'pickles' | 'desserts';
  prepTime: string;
  cookTime: string;
  servings: string;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  description: string;
  imageUrl: string;
  ingredients: { item: string; amount: string }[];
  steps: string[];
  culturalNote: string;
}

export interface Blessing {
  id: string;
  sanskritVerse?: string;
  nepaliGreeting: string;
  englishMeaning: string;
  context: 'elders-to-younger' | 'universal' | 'friends-colleagues' | 'prosperous-wishes';
  audioPrompt?: string;
}

export interface ActivityLogItem {
  id: string;
  timestamp: string;
  action: string;
  category: 'upload' | 'privacy' | 'access' | 'export' | 'share' | 'interaction';
  details: string;
  ipAddress?: string;
  device?: string;
  status: 'success' | 'warning' | 'info';
}
