import React, { useState } from 'react';
import { ActivityLogItem } from '../types';
import { ShieldCheck, Download, FileSpreadsheet, RefreshCw, Filter, CheckCircle2, Info, AlertTriangle } from 'lucide-react';
import { exportActivityLogPDF } from '../utils/pdfExport';
import { exportActivityLogsToCSV } from '../utils/storage';

interface ActivityLogSectionProps {
  logs: ActivityLogItem[];
  onClearLogs?: () => void;
  onRefreshLogs?: () => void;
  onNotify: (msg: string) => void;
}

export const ActivityLogSection: React.FC<ActivityLogSectionProps> = ({
  logs,
  onNotify,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredLogs = logs.filter((log) => {
    if (filterCategory !== 'all' && log.category !== filterCategory) return false;
    if (
      searchQuery &&
      !log.action.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !log.details.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleExportCSV = () => {
    const headers = ['ID', 'Timestamp', 'Action', 'Category', 'Details', 'Device', 'Status'];
    const rows = filteredLogs.map((l) => [
      `"${l.id}"`,
      `"${l.timestamp}"`,
      `"${l.action.replace(/"/g, '""')}"`,
      `"${l.category}"`,
      `"${l.details.replace(/"/g, '""')}"`,
      `"${l.device || ''}"`,
      `"${l.status}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `dashain_activity_log_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onNotify('Exported activity telemetry as CSV.');
  };

  const handleExportPDF = () => {
    exportActivityLogPDF(filteredLogs);
    onNotify('Generated downloadable PDF activity audit report.');
  };

  return (
    <section id="activity" className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-stone-200 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Real-Time Audit & Workflow Telemetry</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-display text-stone-900">
              Activity Log & Historical Analysis
            </h2>
            <p className="mt-1 text-sm text-stone-600 max-w-xl">
              Monitor uploads, privacy reconfigurations, shared album access, and device sync in real-time.
            </p>
          </div>

          {/* Export Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handleExportPDF}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-red-800 hover:bg-red-900 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export PDF Audit</span>
            </button>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="bg-[#FAF7F2] p-4 rounded-xl border border-stone-200 mb-6 flex flex-wrap items-center justify-between gap-4">
          {/* Segmented Category Buttons */}
          <div className="flex items-center gap-1 p-1 bg-stone-200/60 rounded-lg overflow-x-auto">
            {[
              { id: 'all', label: 'All Interactions' },
              { id: 'upload', label: 'Uploads' },
              { id: 'privacy', label: 'Privacy Changes' },
              { id: 'access', label: 'Shared Albums' },
              { id: 'export', label: 'Exports' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterCategory(tab.id)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  filterCategory === tab.id
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="Search logs by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs p-2 bg-white border border-stone-200 rounded-lg focus:outline-hidden focus:border-amber-500"
            />
          </div>
        </div>

        {/* Telemetry Table */}
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200 text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Time</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Details</th>
                  <th className="py-3 px-4">Origin & Device</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-xs">
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-stone-400">
                      No logs matching the current filter.
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log) => {
                    const statusIcon =
                      log.status === 'success' ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      ) : log.status === 'warning' ? (
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      ) : (
                        <Info className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                      );

                    return (
                      <tr key={log.id} className="hover:bg-stone-50/70 transition-colors">
                        <td className="py-3 px-4 font-mono tabular-nums text-stone-500 whitespace-nowrap">
                          {log.timestamp}
                        </td>
                        <td className="py-3 px-4 font-semibold text-stone-900 whitespace-nowrap">
                          {log.action}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className="capitalize text-stone-600">{log.category}</span>
                        </td>
                        <td className="py-3 px-4 text-stone-700 min-w-[220px]">
                          {log.details}
                        </td>
                        <td className="py-3 px-4 text-stone-500 whitespace-nowrap font-mono text-[11px]">
                          {log.device}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            {statusIcon}
                            <span className="capitalize text-[11px] font-medium text-stone-700">
                              {log.status}
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="px-4 py-3 bg-stone-50 border-t border-stone-200 text-xs text-stone-500 flex items-center justify-between">
            <span className="font-mono tabular-nums">Showing {filteredLogs.length} total events</span>
            <span>Real-time event streaming enabled</span>
          </div>
        </div>
      </div>
    </section>
  );
};
