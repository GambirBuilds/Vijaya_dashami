import React, { useState } from 'react';
import { PhotoItem, SharedFolder, PrivacyLevel } from '../types';
import { X, Upload, Globe, Users, Lock, Sparkles, Folder } from 'lucide-react';
import { HERO_IMAGE, SWING_IMAGE, TIKA_IMAGE, FEAST_IMAGE } from '../data/festivalData';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  folders: SharedFolder[];
  onAddPhoto: (newPhoto: PhotoItem) => void;
  onNotify: (msg: string) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  folders,
  onAddPhoto,
  onNotify,
}) => {
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('Kathmandu, Nepal');
  const [category, setCategory] = useState<PhotoItem['category']>('tika-jamara');
  const [privacy, setPrivacy] = useState<PrivacyLevel>('public');
  const [folderId, setFolderId] = useState<string>(folders[0]?.id || '');
  const [tagsInput, setTagsInput] = useState('Dashain2083, FamilyBlessing');
  const [previewImage, setPreviewImage] = useState<string>(TIKA_IMAGE);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setPreviewImage(uploadEvent.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) {
      onNotify('Please provide both memory title and contributor name.');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    const newPhoto: PhotoItem = {
      id: `photo-${Date.now()}`,
      title: title.trim(),
      caption: caption.trim() || 'Joyous moments celebrated during Bada Dashain!',
      imageUrl: previewImage,
      author: author.trim(),
      location: location.trim(),
      date: new Date().toISOString().slice(0, 10),
      category,
      likes: 1,
      views: 12,
      privacy,
      folderId: folderId || undefined,
      isFavorite: false,
      tags: tags.length ? tags : ['Dashain', 'FestiveCelebration'],
    };

    onAddPhoto(newPhoto);
    onNotify(`Successfully uploaded "${newPhoto.title}"!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-[#FAF7F2] rounded-2xl overflow-hidden shadow-2xl border border-stone-200 max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-white">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <h3 className="text-base font-bold font-display text-stone-900">
              Share Festival Memory
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 text-sm font-semibold"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          {/* Photo Preview / Upload Area */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Photo Upload & Preview
            </label>
            <div className="flex items-start gap-4">
              <div className="w-32 h-24 rounded-xl overflow-hidden bg-stone-100 border border-stone-300 shrink-0">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 space-y-2">
                <input
                  type="file"
                  id="photo-file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="photo-file"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Choose Image File</span>
                </label>
                <div className="text-[11px] text-stone-500">
                  Or pick a festive archetype:
                </div>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => setPreviewImage(TIKA_IMAGE)}
                    className="text-[10px] px-2 py-0.5 bg-stone-100 hover:bg-amber-100 rounded text-stone-700"
                  >
                    Tika
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewImage(SWING_IMAGE)}
                    className="text-[10px] px-2 py-0.5 bg-stone-100 hover:bg-amber-100 rounded text-stone-700"
                  >
                    Swing
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewImage(FEAST_IMAGE)}
                    className="text-[10px] px-2 py-0.5 bg-stone-100 hover:bg-amber-100 rounded text-stone-700"
                  >
                    Feast
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewImage(HERO_IMAGE)}
                    className="text-[10px] px-2 py-0.5 bg-stone-100 hover:bg-amber-100 rounded text-stone-700"
                  >
                    Kites
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Title & Contributor */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Memory Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Grandfather's Tika Blessing"
                className="w-full text-xs p-2.5 bg-white border border-stone-200 rounded-lg focus:border-amber-500 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Your Name / Family *
              </label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g., Aarav & Sunita Shrestha"
                className="w-full text-xs p-2.5 bg-white border border-stone-200 rounded-lg focus:border-amber-500 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Location & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Pokhara, Sydney, Kathmandu"
                className="w-full text-xs p-2.5 bg-white border border-stone-200 rounded-lg focus:border-amber-500 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full text-xs p-2.5 bg-white border border-stone-200 rounded-lg focus:border-amber-500 focus:outline-hidden"
              >
                <option value="tika-jamara">Tika & Jamara</option>
                <option value="linge-ping">Linge Ping Swings</option>
                <option value="feast">Feast & Delicacies</option>
                <option value="kites">Kite Flying (Changa)</option>
                <option value="puja">Puja & Rituals</option>
                <option value="family">Family Reunion</option>
              </select>
            </div>
          </div>

          {/* Caption */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Festive Caption / Story
            </label>
            <textarea
              rows={3}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Describe the moment, family elders present, or heartfelt blessings received..."
              className="w-full text-xs p-2.5 bg-white border border-stone-200 rounded-lg focus:border-amber-500 focus:outline-hidden"
            />
          </div>

          {/* Privacy Settings & Granular Controls */}
          <div className="p-3.5 bg-stone-100/80 rounded-xl border border-stone-200">
            <div className="text-xs font-bold text-stone-800 mb-1.5">
              Privacy & Access Control
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'public', label: 'Public', icon: Globe, desc: 'All celebrants' },
                { id: 'family', label: 'Family Only', icon: Users, desc: 'Shared circle' },
                { id: 'private', label: 'Private', icon: Lock, desc: 'Only you' },
              ].map((p) => {
                const Icon = p.icon;
                const isSelected = privacy === p.id;
                return (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => setPrivacy(p.id as PrivacyLevel)}
                    className={`p-2 rounded-lg border text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 mb-1" />
                    <div className="text-xs font-semibold">{p.label}</div>
                    <div className={`text-[10px] ${isSelected ? 'text-amber-100' : 'text-stone-400'}`}>
                      {p.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Folder Assignment */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Assign to Shared Album / Folder
            </label>
            <div className="flex items-center gap-2">
              <Folder className="w-4 h-4 text-stone-400" />
              <select
                value={folderId}
                onChange={(e) => setFolderId(e.target.value)}
                className="w-full text-xs p-2 bg-white border border-stone-200 rounded-lg focus:border-amber-500 focus:outline-hidden"
              >
                <option value="">None (Unorganized)</option>
                {folders.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name} ({f.accessLevel} access)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Tags (Comma separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="Dashain2083, SelRoti, Tika"
              className="w-full text-xs p-2 bg-white border border-stone-200 rounded-lg focus:border-amber-500 focus:outline-hidden"
            />
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-red-800 hover:bg-red-900 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              Publish Memory
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
