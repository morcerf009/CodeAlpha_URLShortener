import React, { useState } from 'react';
import { urlService } from '../services/urlService';
import { ShortUrl } from '../types';

interface ShortenFormProps {
  onUrlCreated: (url: ShortUrl) => void;
}

const ShortenForm: React.FC<ShortenFormProps> = ({ onUrlCreated }) => {
  const [url, setUrl] = useState('');
  const [isShortening, setIsShortening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsShortening(true);

    const result = await urlService.shorten(url);

    if (result.success && result.data) {
      onUrlCreated(result.data);
      setUrl('');
    } else {
      setError(result.error || 'Something went wrong');
    }
    setIsShortening(false);
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-slate-700 mb-1">Destination URL</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-link text-slate-400"></i>
              </div>
              <input
                type="url"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/very-long-link"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg flex items-center gap-2">
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </div>
        )}

        <div className="flex flex-col md:flex-row items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={isShortening}
            className="w-full md:w-auto px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-[0.98] disabled:opacity-70"
          >
            {isShortening ? <i className="fas fa-spinner fa-spin"></i> : 'Shorten Link'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShortenForm;
