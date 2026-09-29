import { PhotoItem, SharedFolder, ActivityLogItem, PrivacyLevel } from '../types';
import { INITIAL_PHOTOS, INITIAL_FOLDERS } from '../data/festivalData';

const STORAGE_KEYS = {
  PHOTOS: 'dashain_photos_v1',
  FOLDERS: 'dashain_folders_v1',
  ACTIVITY: 'dashain_activity_v1',
  OFFLINE: 'dashain_offline_state_v1',
  PENDING_SYNC: 'dashain_pending_sync_v1',
};

const INITIAL_LOGS: ActivityLogItem[] = [
  {
    id: 'log-1',
    timestamp: new Date(Date.now() - 3600000 * 4).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    action: 'Cloud Sync Completed',
    category: 'interaction',
    details: 'Festive cultural archive synced across connected mobile & desktop devices.',
    status: 'success',
    device: 'Web Client',
    ipAddress: '103.1.204.82 (Kathmandu, NP)',
  },
  {
    id: 'log-2',
    timestamp: new Date(Date.now() - 3600000 * 2).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    action: 'Shared Folder Initialized',
    category: 'access',
    details: 'Created "Kathmandu Tika 2026" album with Admin permissions.',
    status: 'info',
    device: 'Desktop Chrome',
    ipAddress: '103.1.204.82 (Kathmandu, NP)',
  },
  {
    id: 'log-3',
    timestamp: new Date(Date.now() - 1800000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    action: 'Privacy Rule Verified',
    category: 'privacy',
    details: 'Family & Friends access control enabled for Linge Ping high-flying album.',
    status: 'info',
    device: 'iOS Mobile Safari',
    ipAddress: '49.126.11.45 (Pokhara, NP)',
  },
];

export const loadStoredPhotos = (): PhotoItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PHOTOS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(INITIAL_PHOTOS));
      return INITIAL_PHOTOS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_PHOTOS;
  }
};

export const saveStoredPhotos = (photos: PhotoItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(photos));
  } catch {
    // localStorage quota handling
  }
};

export const loadStoredFolders = (): SharedFolder[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FOLDERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.FOLDERS, JSON.stringify(INITIAL_FOLDERS));
      return INITIAL_FOLDERS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_FOLDERS;
  }
};

export const saveStoredFolders = (folders: SharedFolder[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.FOLDERS, JSON.stringify(folders));
  } catch {
    // ignore
  }
};

export const loadActivityLogs = (): ActivityLogItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVITY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ACTIVITY, JSON.stringify(INITIAL_LOGS));
      return INITIAL_LOGS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_LOGS;
  }
};

export const appendActivityLog = (
  action: string,
  category: ActivityLogItem['category'],
  details: string,
  status: ActivityLogItem['status'] = 'info'
): ActivityLogItem => {
  const newLog: ActivityLogItem = {
    id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    action,
    category,
    details,
    status,
    device: navigator.userAgent.includes('Mobile') ? 'Mobile Device' : 'Desktop Browser',
    ipAddress: '103.1.204.82 (Session Local)',
  };

  try {
    const existing = loadActivityLogs();
    const updated = [newLog, ...existing.slice(0, 49)];
    localStorage.setItem(STORAGE_KEYS.ACTIVITY, JSON.stringify(updated));
  } catch {
    // ignore
  }

  return newLog;
};

export const exportActivityLogsToCSV = (logs: ActivityLogItem[]) => {
  const headers = ['ID', 'Timestamp', 'Action', 'Category', 'Details', 'Device', 'Status'];
  const rows = logs.map(l => [
    `"${l.id}"`,
    `"${l.timestamp}"`,
    `"${l.action.replace(/"/g, '""')}"`,
    `"${l.category}"`,
    `"${l.details.replace(/"/g, '""')}"`,
    `"${l.device || ''}"`,
    `"${l.status}"`,
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `dashain_activity_log_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
