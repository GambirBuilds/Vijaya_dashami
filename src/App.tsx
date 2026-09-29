import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CountdownBanner } from './components/CountdownBanner';
import { CalendarSection } from './components/CalendarSection';
import { HistorySection } from './components/HistorySection';
import { GallerySection } from './components/GallerySection';
import { RecipesSection } from './components/RecipesSection';
import { GreetingsSection } from './components/GreetingsSection';
import { ActivityLogSection } from './components/ActivityLogSection';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { UploadModal } from './components/UploadModal';
import { SharedFoldersModal } from './components/SharedFoldersModal';
import { PhotoItem, SharedFolder, ActivityLogItem, PrivacyLevel } from './types';
import {
  loadStoredPhotos,
  saveStoredPhotos,
  loadStoredFolders,
  saveStoredFolders,
  loadActivityLogs,
  appendActivityLog,
} from './utils/storage';
import { Sparkles, CheckCircle2, WifiOff } from 'lucide-react';

export default function App() {
  const [photos, setPhotos] = useState<PhotoItem[]>(() => loadStoredPhotos());
  const [folders, setFolders] = useState<SharedFolder[]>(() => loadStoredFolders());
  const [activityLogs, setActivityLogs] = useState<ActivityLogItem[]>(() => loadActivityLogs());
  const [isOffline, setIsOffline] = useState(false);

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isFolderManagerOpen, setIsFolderManagerOpen] = useState(false);

  // Navigation & selection state
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(10);
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>('recipe-sel-roti');

  // Ambient floating petals toggle
  const [ambientPetals, setAmbientPetals] = useState(true);

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const notify = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3200);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Handle Photo Addition
  const handleAddPhoto = (newPhoto: PhotoItem) => {
    const updated = [newPhoto, ...photos];
    setPhotos(updated);
    saveStoredPhotos(updated);
    const log = appendActivityLog(
      'Community Photo Published',
      'upload',
      `"${newPhoto.title}" added to gallery (${newPhoto.category}) with ${newPhoto.privacy} access.`,
      'success'
    );
    setActivityLogs((prev) => [log, ...prev]);
  };

  // Handle Photo Privacy Update
  const handleUpdatePhotoPrivacy = (photoId: string, newPrivacy: PrivacyLevel) => {
    const updated = photos.map((p) => (p.id === photoId ? { ...p, privacy: newPrivacy } : p));
    setPhotos(updated);
    saveStoredPhotos(updated);
    const photo = photos.find((p) => p.id === photoId);
    const log = appendActivityLog(
      'Privacy Setting Modified',
      'privacy',
      `Changed access for "${photo?.title || photoId}" to ${newPrivacy.toUpperCase()}.`,
      'info'
    );
    setActivityLogs((prev) => [log, ...prev]);
    notify(`Updated access to ${newPrivacy.toUpperCase()}`);
  };

  // Handle Favorite Toggle
  const handleToggleFavorite = (photoId: string) => {
    const updated = photos.map((p) => {
      if (p.id === photoId) {
        const nextFav = !p.isFavorite;
        notify(nextFav ? 'Added to Festival Favorites' : 'Removed from Favorites');
        return { ...p, isFavorite: nextFav };
      }
      return p;
    });
    setPhotos(updated);
    saveStoredPhotos(updated);
  };

  // Handle Photo Like
  const handleLikePhoto = (photoId: string) => {
    const updated = photos.map((p) => (p.id === photoId ? { ...p, likes: p.likes + 1 } : p));
    setPhotos(updated);
    saveStoredPhotos(updated);
    notify('Appreciated festive memory! ❤️');
  };

  // Handle Folder Creation
  const handleCreateFolder = (newFolder: SharedFolder) => {
    const updated = [newFolder, ...folders];
    setFolders(updated);
    saveStoredFolders(updated);
    const log = appendActivityLog(
      'Shared Folder Provisioned',
      'access',
      `New collaborative album "${newFolder.name}" configured with ${newFolder.accessLevel} permissions.`,
      'success'
    );
    setActivityLogs((prev) => [log, ...prev]);
  };

  // Handle Folder Deletion
  const handleDeleteFolder = (folderId: string) => {
    const folder = folders.find((f) => f.id === folderId);
    const updated = folders.filter((f) => f.id !== folderId);
    setFolders(updated);
    saveStoredFolders(updated);
    const log = appendActivityLog(
      'Shared Folder Removed',
      'access',
      `Album "${folder?.name || folderId}" was deleted.`,
      'warning'
    );
    setActivityLogs((prev) => [log, ...prev]);
  };

  // Handle Network Mode Toggle
  const handleToggleOffline = () => {
    const nextState = !isOffline;
    setIsOffline(nextState);
    const log = appendActivityLog(
      nextState ? 'Network Switched to Offline' : 'Device Reconnected & Synced',
      'interaction',
      nextState
        ? 'Offline local caching active. Unsent actions will queue locally.'
        : 'Reconnected to network. Local modifications synchronized.',
      nextState ? 'warning' : 'success'
    );
    setActivityLogs((prev) => [log, ...prev]);
    notify(nextState ? 'Switched to Offline Mode (Local Cache Active)' : 'Connected: Synchronized with Cloud');
  };

  // Scroll to section helper
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900 flex flex-col relative selection:bg-amber-500 selection:text-white">
      {/* Ambient Floating Marigold Petal Particle Animation */}
      {ambientPetals && (
        <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden" aria-hidden="true">
          <div
            className="absolute top-0 w-3 h-3 bg-amber-400 rounded-full opacity-60 animate-petal"
            style={{ left: '10%', animationDuration: '16s', animationDelay: '0s' }}
          />
          <div
            className="absolute top-0 w-2.5 h-2.5 bg-red-500 rounded-full opacity-50 animate-petal"
            style={{ left: '28%', animationDuration: '14s', animationDelay: '3s' }}
          />
          <div
            className="absolute top-0 w-3.5 h-3.5 bg-amber-500 rounded-full opacity-70 animate-petal"
            style={{ left: '55%', animationDuration: '19s', animationDelay: '1.5s' }}
          />
          <div
            className="absolute top-0 w-2 h-2 bg-yellow-400 rounded-full opacity-60 animate-petal"
            style={{ left: '78%', animationDuration: '13s', animationDelay: '4s' }}
          />
          <div
            className="absolute top-0 w-3 h-3 bg-amber-600 rounded-full opacity-50 animate-petal"
            style={{ left: '92%', animationDuration: '17s', animationDelay: '2s' }}
          />
        </div>
      )}

      {/* Offline Alert Strip if active */}
      {isOffline && (
        <div className="bg-amber-600 text-white text-xs px-4 py-1.5 flex items-center justify-center gap-2 font-medium z-50">
          <WifiOff className="w-3.5 h-3.5" />
          <span>Offline Mode Active: Using local persistent device cache. All records remain fully functional.</span>
        </div>
      )}

      {/* Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenUpload={() => setIsUploadOpen(true)}
        isOffline={isOffline}
        onToggleOffline={handleToggleOffline}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <div id="overview">
          <CountdownBanner />
        </div>

        <CalendarSection
          selectedDayNumber={selectedDayNumber}
          onSelectDayNumber={(num) => setSelectedDayNumber(num)}
          onNotify={notify}
        />

        <HistorySection />

        <GallerySection
          photos={photos}
          folders={folders}
          onUploadClick={() => setIsUploadOpen(true)}
          onOpenFolderManager={() => setIsFolderManagerOpen(true)}
          onUpdatePhotoPrivacy={handleUpdatePhotoPrivacy}
          onToggleFavorite={handleToggleFavorite}
          onLikePhoto={handleLikePhoto}
          onNotify={notify}
        />

        <RecipesSection
          selectedRecipeId={selectedRecipeId}
          onNotify={notify}
        />

        <GreetingsSection onNotify={notify} />

        <ActivityLogSection
          logs={activityLogs}
          onNotify={notify}
        />
      </main>

      {/* Footer */}
      <Footer
        isOffline={isOffline}
        onToggleOffline={handleToggleOffline}
        onNavigate={handleNavigate}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        photos={photos}
        onSelectEvent={(num) => setSelectedDayNumber(num)}
        onSelectRecipe={(id) => setSelectedRecipeId(id)}
        onSelectPhoto={() => handleNavigate('gallery')}
        onNavigate={handleNavigate}
      />

      {/* Upload Photo Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        folders={folders}
        onAddPhoto={handleAddPhoto}
        onNotify={notify}
      />

      {/* Shared Folders Manager Modal */}
      <SharedFoldersModal
        isOpen={isFolderManagerOpen}
        onClose={() => setIsFolderManagerOpen(false)}
        folders={folders}
        onCreateFolder={handleCreateFolder}
        onDeleteFolder={handleDeleteFolder}
        onNotify={notify}
      />

      {/* Toast Notification Popup */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white text-xs px-4 py-3 rounded-xl shadow-2xl border border-stone-700 flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
