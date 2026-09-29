import React, { useState } from 'react';
import { SharedFolder } from '../types';
import { FolderPlus, Lock, Key, Copy, Check, Shield, Trash2, X } from 'lucide-react';

interface SharedFoldersModalProps {
  isOpen: boolean;
  onClose: () => void;
  folders: SharedFolder[];
  onCreateFolder: (newFolder: SharedFolder) => void;
  onDeleteFolder: (folderId: string) => void;
  onNotify: (msg: string) => void;
}

export const SharedFoldersModal: React.FC<SharedFoldersModalProps> = ({
  isOpen,
  onClose,
  folders,
  onCreateFolder,
  onDeleteFolder,
  onNotify,
}) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [accessLevel, setAccessLevel] = useState<'admin' | 'contributor' | 'viewer'>('contributor');
  const [isPasswordProtected, setIsPasswordProtected] = useState(false);
  const [password, setPassword] = useState('');
  const [expiryOption, setExpiryOption] = useState<'none' | '7days' | '30days'>('none');
  const [copiedFolderId, setCopiedFolderId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    let expiryDate: string | undefined = undefined;
    if (expiryOption === '7days') {
      const d = new Date();
      d.setDate(d.getDate() + 7);
      expiryDate = d.toISOString().slice(0, 10);
    } else if (expiryOption === '30days') {
      const d = new Date();
      d.setDate(d.getDate() + 30);
      expiryDate = d.toISOString().slice(0, 10);
    }

    const newFolder: SharedFolder = {
      id: `folder-${Date.now()}`,
      name: name.trim(),
      description: description.trim() || 'Shared festive memories and family blessings album.',
      owner: 'You (Curator)',
      itemCount: 0,
      accessLevel,
      isPasswordProtected,
      password: isPasswordProtected ? password : undefined,
      expiryDate,
      createdAt: new Date().toISOString().slice(0, 10),
    };

    onCreateFolder(newFolder);
    setName('');
    setDescription('');
    setPassword('');
    setIsPasswordProtected(false);
    setShowCreateForm(false);
    onNotify(`Created shared album "${newFolder.name}" with ${accessLevel} access.`);
  };

  const handleCopyLink = (folder: SharedFolder) => {
    const link = `${window.location.origin}/#gallery?folder=${folder.id}`;
    navigator.clipboard.writeText(link);
    setCopiedFolderId(folder.id);
    setTimeout(() => setCopiedFolderId(null), 2000);
    onNotify(`Share invitation link for "${folder.name}" copied!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-2xl overflow-hidden shadow-2xl border border-stone-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-white">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-600" />
            <div>
              <h3 className="text-base font-bold font-display text-stone-900">
                Shared Albums & Granular Access Control
              </h3>
              <div className="text-xs text-stone-500">
                Collaborative family folders, contributor rights, and encrypted links
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 text-sm font-semibold"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Top Bar with Create Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
              Active Albums ({folders.length})
            </span>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-red-800 hover:bg-red-900 rounded-lg transition-colors cursor-pointer"
            >
              <FolderPlus className="w-3.5 h-3.5" />
              <span>{showCreateForm ? 'Cancel Creation' : 'New Shared Album'}</span>
            </button>
          </div>

          {/* Create Form Drawer */}
          {showCreateForm && (
            <form onSubmit={handleCreate} className="p-4 bg-white rounded-xl border border-stone-300 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Create Collaborative Festival Album
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Album Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Pokhara Relatives 2026"
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Access Permission Level
                  </label>
                  <select
                    value={accessLevel}
                    onChange={(e) => setAccessLevel(e.target.value as any)}
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:border-amber-500"
                  >
                    <option value="contributor">Contributor (Can upload & view)</option>
                    <option value="viewer">Viewer (Read-only)</option>
                    <option value="admin">Admin (Full edit & privacy control)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Description / Purpose
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g., Photos from grandmother's courtyard Tika ceremony..."
                  className="w-full text-xs p-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                {/* Password Protection */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-xs font-medium text-stone-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isPasswordProtected}
                      onChange={(e) => setIsPasswordProtected(e.target.checked)}
                      className="rounded text-amber-600 focus:ring-amber-500"
                    />
                    <span>Protect with Passcode</span>
                  </label>
                  {isPasswordProtected && (
                    <input
                      type="password"
                      placeholder="Enter album passcode"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full text-xs p-2 bg-stone-50 border border-stone-200 rounded-lg"
                    />
                  )}
                </div>

                {/* Expiry Option */}
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Link Expiration Window
                  </label>
                  <select
                    value={expiryOption}
                    onChange={(e) => setExpiryOption(e.target.value as any)}
                    className="w-full text-xs p-2 bg-stone-50 border border-stone-200 rounded-lg"
                  >
                    <option value="none">No Expiry (Permanent)</option>
                    <option value="7days">Expires in 7 Days</option>
                    <option value="30days">Expires in 30 Days (After Tihar)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 text-right">
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-amber-700 hover:bg-amber-800 rounded-lg cursor-pointer"
                >
                  Save & Provision Album
                </button>
              </div>
            </form>
          )}

          {/* Folder List */}
          <div className="space-y-3">
            {folders.map((f) => (
              <div
                key={f.id}
                className="p-4 bg-white rounded-xl border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-stone-900">{f.name}</span>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-stone-100 text-stone-700 capitalize">
                      {f.accessLevel}
                    </span>
                    {f.isPasswordProtected && (
                      <span className="flex items-center gap-0.5 text-[10px] text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                        <Lock className="w-3 h-3" /> Protected
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-500">{f.description}</p>
                  <div className="text-[11px] text-stone-400 flex items-center gap-2">
                    <span>Owner: {f.owner}</span>
                    <span>·</span>
                    <span>Created: {f.createdAt}</span>
                    {f.expiryDate && (
                      <>
                        <span>·</span>
                        <span className="text-amber-700">Expires: {f.expiryDate}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleCopyLink(f)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-stone-200 hover:bg-stone-50 transition-colors text-stone-700 cursor-pointer"
                    title="Copy invite URL"
                  >
                    {copiedFolderId === f.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Remove shared folder "${f.name}"?`)) {
                        onDeleteFolder(f.id);
                        onNotify(`Deleted folder "${f.name}".`);
                      }
                    }}
                    className="p-1.5 text-stone-400 hover:text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                    title="Delete album"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-stone-50 border-t border-stone-200 text-xs text-stone-400 text-right">
          Changes to access control apply in real-time across synced devices
        </div>
      </div>
    </div>
  );
};
