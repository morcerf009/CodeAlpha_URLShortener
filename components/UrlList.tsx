
import React from 'react';
import { ShortUrl } from '../types';

interface UrlListProps {
  urls: ShortUrl[];
  onDelete: (id: string) => void;
}

const UrlList: React.FC<UrlListProps> = ({ urls, onDelete }) => {
  const getShortUrl = (code: string) => `http://localhost:5000/${code}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Link copied to clipboard!');
  };

  if (urls.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-slate-200">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-link-slash text-slate-300 text-2xl"></i>
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-1">No links found</h3>
        <p className="text-slate-500">Shorten your first link above to see it in your list.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {urls.map((url) => (
        <div
          key={url.id}
          className="bg-white border border-slate-100 rounded-xl p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow group"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg font-bold text-slate-900 truncate">/{url.shortCode}</span>
              <span className="text-xs text-slate-400 font-medium">• {new Date(url.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="text-sm text-slate-500 truncate max-w-md">
              {url.longUrl}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
              <i className="fas fa-chart-line text-indigo-500 text-xs"></i>
              <span className="text-sm font-bold text-slate-700">{url.clicks} <span className="text-slate-400 font-normal">Clicks</span></span>
            </div>

            <div className="flex items-center gap-2 ml-auto md:ml-0">
              <button
                onClick={() => copyToClipboard(getShortUrl(url.shortCode))}
                className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                title="Copy Link"
              >
                <i className="fas fa-copy"></i>
              </button>

              <a
                href={getShortUrl(url.shortCode)}
                target="_blank"
                rel="noreferrer"
                className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                title="Open Link"
              >
                <i className="fas fa-external-link-alt"></i>
              </a>

              <button
                onClick={() => onDelete(url.id)}
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                title="Delete Link"
              >
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UrlList;
