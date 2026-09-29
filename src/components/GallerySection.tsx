import React, { useState, useMemo } from 'react';
import { PhotoItem, SharedFolder, PrivacyLevel } from '../types';
import {
  Heart,
  Share2,
  Lock,
  Globe,
  Users,
  Folder,
  Download,
  Filter,
  Eye,
  Plus,
  FolderPlus,
  Check,
  Smile,
  Copy,
  SlidersHorizontal,
} from 'lucide-react';
import { exportFavoritesPDF } from '../utils/pdfExport';

interface GallerySectionProps {
  photos: PhotoItem[];
  folders: SharedFolder[];
  onUploadClick: () => void;
  onOpenFolderManager: () => void;
  onUpdatePhotoPrivacy: (photoId: string, newPrivacy: PrivacyLevel) => void;
  onToggleFavorite: (photoId: string) => void;
  onLikePhoto: (photoId: string) => void;
  onNotify: (msg: string) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  photos,
  folders,
  onUploadClick,
  onOpenFolderManager,
  onUpdatePhotoPrivacy,
  onToggleFavorite,
  onLikePhoto,
  onNotify,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'likes-desc' | 'views-desc'>('likes-desc');
  const [activeFolderFilter, setActiveFolderFilter] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [shareModalPhoto, setShareModalPhoto] = useState<PhotoItem | null>(null);
  const [customShareCaption, setCustomShareCaption] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [privacyEditorPhoto, setPrivacyEditorPhoto] = useState<PhotoItem | null>(null);

  // Emojis for custom post caption enhancement
  const festivalEmojis = ['🌾', '🌸', '🪔', '🪁', '🕉️', '🌺', '🎈', '🕊️', '🎊', '✨', '🥟', '🍛'];

  // Filtered & Sorted Photos
  const displayPhotos = useMemo(() => {
    return photos
      .filter((p) => {
        if (activeCategory !== 'all' && p.category !== activeCategory) return false;
        if (activeFolderFilter !== 'all' && p.folderId !== activeFolderFilter) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'date-desc') return new Date(b.date).getTime() - new Date(a.date).getTime();
        if (sortBy === 'date-asc') return new Date(a.date).getTime() - new Date(b.date).getTime();
        if (sortBy === 'likes-desc') return b.likes - a.likes;
        if (sortBy === 'views-desc') return b.views - a.views;
        return 0;
      });
  }, [photos, activeCategory, activeFolderFilter, sortBy]);

  const favoriteCount = photos.filter((p) => p.isFavorite).length;

  const handleExportFavoritesPDF = () => {
    const favorites = photos.filter((p) => p.isFavorite);
    if (favorites.length === 0) {
      onNotify('Select some favorite memories using the heart icon before exporting PDF.');
      return;
    }
    exportFavoritesPDF(favorites, 'Cultural Archivist');
    onNotify(`Generated PDF Report for ${favorites.length} favorite memories.`);
  };

  const openShareModal = (photo: PhotoItem) => {
    setShareModalPhoto(photo);
    setCustomShareCaption(`${photo.caption}\n\nCelebrating Bada Dashain 2083! 🌾✨`);
    setCopiedLink(false);
  };

  const handleAddEmoji = (emoji: string) => {
    setCustomShareCaption((prev) => prev + ' ' + emoji);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
    onNotify('Post share link copied to clipboard!');
  };

  const handleSocialShare = (platform: 'whatsapp' | 'facebook' | 'twitter' | 'linkedin') => {
    if (!shareModalPhoto) return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(customShareCaption);

    let shareUrl = '';
    if (platform === 'whatsapp') {
      shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
    } else if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`;
    } else if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    } else if (platform === 'linkedin') {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=500');
      onNotify(`Shared to ${platform.charAt(0).toUpperCase() + platform.slice(1)}!`);
    }
  };

  return (
    <section id="gallery" className="py-16 bg-[#FAF7F2] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header & Primary Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-stone-200 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-1">
              Living Memories & Community Archive
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-display text-stone-900">
              Dashain Photo Gallery
            </h2>
            <p className="mt-1 text-sm text-stone-600 max-w-xl">
              Upload festive memories, curate albums, adjust privacy per photo, and export archival PDF reports.
            </p>
          </div>

          {/* Action Button Strip */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleExportFavoritesPDF}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-amber-900 bg-amber-100 hover:bg-amber-200/80 rounded-lg transition-colors cursor-pointer"
              title="Download PDF report of bookmarked memories"
            >
              <Download className="w-3.5 h-3.5 text-amber-700" />
              <span>Export Favorites PDF ({favoriteCount})</span>
            </button>

            <button
              onClick={onOpenFolderManager}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-stone-700 bg-white hover:bg-stone-50 border border-stone-200 rounded-lg transition-colors cursor-pointer"
            >
              <Folder className="w-3.5 h-3.5 text-stone-600" />
              <span>Manage Folders ({folders.length})</span>
            </button>

            <button
              onClick={onUploadClick}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-red-800 hover:bg-red-900 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Upload Photo</span>
            </button>
          </div>
        </div>

        {/* Filter & Sorting Controls Strip */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 mb-8 space-y-3 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Category Segmented Control */}
            <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg overflow-x-auto">
              {[
                { id: 'all', label: 'All Categories' },
                { id: 'tika-jamara', label: 'Tika & Jamara' },
                { id: 'linge-ping', label: 'Linge Ping Swings' },
                { id: 'feast', label: 'Feast & Sel Roti' },
                { id: 'kites', label: 'Kite Flying' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                    activeCategory === tab.id
                      ? 'bg-white text-stone-900 shadow-xs font-semibold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Sort & Folder Filters */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              {/* Sort By Dropdown */}
              <div className="flex items-center gap-1.5 text-stone-600">
                <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500" />
                <span className="font-medium">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-stone-50 border border-stone-200 rounded-md px-2 py-1 text-stone-800 focus:outline-hidden"
                >
                  <option value="likes-desc">Most Liked (Popularity)</option>
                  <option value="views-desc">Most Viewed</option>
                  <option value="date-desc">Newest Date First</option>
                  <option value="date-asc">Oldest Date First</option>
                </select>
              </div>

              {/* Shared Folder Filter */}
              <div className="flex items-center gap-1.5 text-stone-600">
                <Folder className="w-3.5 h-3.5 text-stone-500" />
                <span className="font-medium">Album:</span>
                <select
                  value={activeFolderFilter}
                  onChange={(e) => setActiveFolderFilter(e.target.value)}
                  className="bg-stone-50 border border-stone-200 rounded-md px-2 py-1 text-stone-800 focus:outline-hidden"
                >
                  <option value="all">All Shared Albums</option>
                  {folders.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        {displayPhotos.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-stone-200">
            <p className="text-base font-semibold text-stone-700">No photos match the selected filter</p>
            <p className="text-xs text-stone-500 mt-1">Try resetting the category filter or upload a new photo.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setActiveFolderFilter('all');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-red-900 bg-red-50 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayPhotos.map((photo) => {
              const privacyIcon =
                photo.privacy === 'public' ? (
                  <Globe className="w-3.5 h-3.5 text-emerald-600" />
                ) : photo.privacy === 'family' ? (
                  <Users className="w-3.5 h-3.5 text-amber-600" />
                ) : (
                  <Lock className="w-3.5 h-3.5 text-red-600" />
                );

              return (
                <div
                  key={photo.id}
                  className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
                >
                  {/* Photo Container */}
                  <div
                    onClick={() => setSelectedPhoto(photo)}
                    className="relative aspect-4/3 overflow-hidden bg-stone-100 cursor-pointer"
                  >
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient Scrim for Top Action Badges */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 opacity-70 group-hover:opacity-90 transition-opacity" />

                    {/* Top Row: Privacy & Favorite Button */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPrivacyEditorPhoto(photo);
                        }}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-900/70 backdrop-blur-xs text-[11px] text-white hover:bg-stone-900 transition-colors"
                        title="Click to adjust privacy settings"
                      >
                        {privacyIcon}
                        <span className="capitalize">{photo.privacy}</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(photo.id);
                        }}
                        className={`p-2 rounded-full backdrop-blur-xs transition-colors ${
                          photo.isFavorite
                            ? 'bg-red-600 text-white shadow-xs'
                            : 'bg-stone-900/60 text-white/80 hover:text-white hover:bg-stone-900'
                        }`}
                        title={photo.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        <Heart className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>

                    {/* Bottom Floating Stats */}
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-white/90 z-10">
                      <span className="font-medium text-[11px]">{photo.location}</span>
                      <div className="flex items-center gap-3 text-[11px]">
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3 fill-current text-red-400" />
                          <span>{photo.likes}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>{photo.views}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content & Zero-Pill Metadata */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Quiet Unboxed Metadata Line (No pills) */}
                      <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1.5">
                        <span>{photo.author}</span>
                        <span aria-hidden="true">·</span>
                        <span>{photo.date}</span>
                      </div>

                      <h3
                        onClick={() => setSelectedPhoto(photo)}
                        className="text-base font-bold font-display text-stone-900 hover:text-red-900 transition-colors cursor-pointer line-clamp-1"
                      >
                        {photo.title}
                      </h3>

                      <p className="mt-1.5 text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {photo.caption}
                      </p>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                      <button
                        onClick={() => onLikePhoto(photo.id)}
                        className="flex items-center gap-1.5 text-stone-600 hover:text-red-800 transition-colors cursor-pointer"
                      >
                        <Heart className="w-3.5 h-3.5 text-red-600" />
                        <span>Like</span>
                      </button>

                      <button
                        onClick={() => openShareModal(photo)}
                        className="flex items-center gap-1.5 text-stone-600 hover:text-amber-800 transition-colors cursor-pointer"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Share & Caption</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Photo Detail Modal */}
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-xs">
            <div className="relative w-full max-w-4xl bg-[#FAF7F2] rounded-2xl overflow-hidden shadow-2xl border border-stone-200 max-h-[90vh] flex flex-col md:flex-row">
              {/* Left Photo View */}
              <div className="md:w-3/5 bg-stone-950 flex items-center justify-center relative min-h-[300px]">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  className="max-h-[80vh] w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Right Content */}
              <div className="md:w-2/5 p-6 flex flex-col justify-between overflow-y-auto">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                    <span className="text-xs text-stone-500">{selectedPhoto.date}</span>
                    <button
                      onClick={() => setSelectedPhoto(null)}
                      className="text-stone-400 hover:text-stone-700 text-sm font-semibold"
                    >
                      Close ✕
                    </button>
                  </div>

                  <h3 className="text-xl font-bold font-display text-stone-900 mt-3">
                    {selectedPhoto.title}
                  </h3>

                  <div className="text-xs text-stone-500 mt-1">
                    <span>Taken by {selectedPhoto.author}</span>
                    <span className="mx-1.5">·</span>
                    <span>{selectedPhoto.location}</span>
                  </div>

                  <p className="mt-4 text-sm text-stone-700 leading-relaxed whitespace-pre-line">
                    {selectedPhoto.caption}
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {selectedPhoto.tags.map((tag) => (
                      <span key={tag} className="text-xs text-stone-500 font-mono">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Privacy Selector Inside Modal */}
                  <div className="mt-6 p-3 bg-white rounded-xl border border-stone-200">
                    <div className="text-xs font-semibold text-stone-600 mb-2">Adjust Access Setting</div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(['public', 'family', 'private'] as PrivacyLevel[]).map((lvl) => (
                        <button
                          key={lvl}
                          onClick={() => {
                            onUpdatePhotoPrivacy(selectedPhoto.id, lvl);
                            setSelectedPhoto({ ...selectedPhoto, privacy: lvl });
                          }}
                          className={`py-1.5 px-2 text-xs font-medium rounded-lg capitalize transition-colors cursor-pointer ${
                            selectedPhoto.privacy === lvl
                              ? 'bg-amber-600 text-white font-semibold'
                              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modal Bottom Actions */}
                <div className="pt-6 border-t border-stone-200 flex items-center justify-between gap-3">
                  <button
                    onClick={() => {
                      onToggleFavorite(selectedPhoto.id);
                      setSelectedPhoto({ ...selectedPhoto, isFavorite: !selectedPhoto.isFavorite });
                    }}
                    className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-colors ${
                      selectedPhoto.isFavorite
                        ? 'border-red-500 bg-red-50 text-red-900'
                        : 'border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span>{selectedPhoto.isFavorite ? 'Favorited' : 'Add Favorite'}</span>
                  </button>

                  <button
                    onClick={() => openShareModal(selectedPhoto)}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-red-800 hover:bg-red-900 rounded-lg transition-colors cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share Post</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Social Media Sharing & Caption Modal with Interactive Emoji Keyboard */}
        {shareModalPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-xs">
            <div className="relative w-full max-w-lg bg-[#FAF7F2] rounded-2xl p-6 border border-stone-200 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div>
                  <h3 className="text-lg font-bold font-display text-stone-900">
                    Share Festive Memory
                  </h3>
                  <div className="text-xs text-stone-500">
                    Customize post caption, add emojis, and export to social platforms
                  </div>
                </div>
                <button
                  onClick={() => setShareModalPhoto(null)}
                  className="text-stone-400 hover:text-stone-700 text-sm font-semibold"
                >
                  ✕
                </button>
              </div>

              {/* Caption Editor */}
              <div className="mt-4">
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Custom Post Caption
                </label>
                <textarea
                  rows={4}
                  value={customShareCaption}
                  onChange={(e) => setCustomShareCaption(e.target.value)}
                  className="w-full text-xs p-3 bg-white border border-stone-200 rounded-xl focus:border-amber-500 focus:outline-hidden"
                  placeholder="Add your festive wishes or blessings..."
                />

                {/* Interactive Festive Emoji Keyboard */}
                <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] text-stone-500 flex items-center gap-1 mr-1">
                    <Smile className="w-3.5 h-3.5" /> Add Emoji:
                  </span>
                  {festivalEmojis.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => handleAddEmoji(emoji)}
                      className="p-1.5 bg-stone-100 hover:bg-amber-100 rounded-md text-sm transition-transform hover:scale-120 cursor-pointer"
                      title="Insert emoji"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Social Channels Row */}
              <div className="mt-6">
                <div className="text-xs font-semibold text-stone-700 mb-2">
                  Share Directly To:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={() => handleSocialShare('whatsapp')}
                    className="p-2.5 text-xs font-semibold bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366]/20 rounded-xl border border-[#25D366]/30 flex flex-col items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>WhatsApp</span>
                  </button>
                  <button
                    onClick={() => handleSocialShare('facebook')}
                    className="p-2.5 text-xs font-semibold bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]/20 rounded-xl border border-[#1877F2]/30 flex flex-col items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Facebook</span>
                  </button>
                  <button
                    onClick={() => handleSocialShare('twitter')}
                    className="p-2.5 text-xs font-semibold bg-stone-900/10 text-stone-900 hover:bg-stone-900/20 rounded-xl border border-stone-300 flex flex-col items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>X (Twitter)</span>
                  </button>
                  <button
                    onClick={() => handleSocialShare('linkedin')}
                    className="p-2.5 text-xs font-semibold bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2]/20 rounded-xl border border-[#0A66C2]/30 flex flex-col items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>LinkedIn</span>
                  </button>
                </div>
              </div>

              {/* Copy Link Row */}
              <div className="mt-4 pt-4 border-t border-stone-200 flex items-center justify-between">
                <span className="text-xs text-stone-500">Or copy instant direct link:</span>
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-800 bg-white border border-stone-200 hover:bg-stone-50 rounded-lg transition-colors cursor-pointer"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Link Copied!' : 'Copy Link'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Privacy Editor Quick Modal */}
        {privacyEditorPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs">
            <div className="w-full max-w-sm bg-[#FAF7F2] rounded-2xl p-6 border border-stone-200 shadow-2xl">
              <h3 className="text-base font-bold font-display text-stone-900 mb-1">
                Photo Privacy & Access Control
              </h3>
              <p className="text-xs text-stone-500 mb-4">
                Choose who can discover and view &ldquo;{privacyEditorPhoto.title}&rdquo;.
              </p>

              <div className="space-y-2">
                {[
                  {
                    lvl: 'public',
                    title: 'Public Community',
                    desc: 'Visible to all global Dashain celebrants and discoverable in search.',
                    icon: Globe,
                  },
                  {
                    lvl: 'family',
                    title: 'Family & Friends',
                    desc: 'Restricted to designated family circle or shared album members.',
                    icon: Users,
                  },
                  {
                    lvl: 'private',
                    title: 'Private Archive',
                    desc: 'Only you can view and manage this memory.',
                    icon: Lock,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  const isCurrent = privacyEditorPhoto.privacy === item.lvl;
                  return (
                    <button
                      key={item.lvl}
                      onClick={() => {
                        onUpdatePhotoPrivacy(privacyEditorPhoto.id, item.lvl as PrivacyLevel);
                        setPrivacyEditorPhoto(null);
                      }}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                        isCurrent
                          ? 'border-amber-500 bg-amber-50 shadow-xs'
                          : 'border-stone-200 bg-white hover:bg-stone-50'
                      }`}
                    >
                      <Icon className={`w-4 h-4 mt-0.5 ${isCurrent ? 'text-amber-700' : 'text-stone-500'}`} />
                      <div>
                        <div className="text-xs font-bold text-stone-900">{item.title}</div>
                        <div className="text-[11px] text-stone-500 mt-0.5">{item.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 pt-3 border-t border-stone-200 text-right">
                <button
                  onClick={() => setPrivacyEditorPhoto(null)}
                  className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
