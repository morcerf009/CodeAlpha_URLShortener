
import React, { useState, useEffect, useCallback } from 'react';
import { urlService } from './services/urlService';
import { ShortUrl } from './types';
import Header from './components/Header';
import ShortenForm from './components/ShortenForm';
import UrlList from './components/UrlList';

const App: React.FC = () => {
  const [urls, setUrls] = useState<ShortUrl[]>([]);

  const loadUrls = useCallback(() => {
    setUrls(urlService.getUrls());
  }, []);

  useEffect(() => {
    loadUrls();
  }, [loadUrls]);

  const handleUrlCreated = (newUrl: ShortUrl) => {
    setUrls(prev => [newUrl, ...prev]);
  };

  const handleDelete = (id: string) => {
    urlService.deleteUrl(id);
    loadUrls();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Shorten your links, <span className="text-indigo-600">simplify your sharing.</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A fast and secure URL shortener built for speed.
            Generate unique aliases instantly for your long URLs.
          </p>
        </div>

        <section className="mb-16">
          <ShortenForm onUrlCreated={handleUrlCreated} />
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <i className="fas fa-list-ul text-indigo-500"></i>
              Your Links
            </h2>
            <span className="text-sm font-medium bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
              {urls.length} Links Saved
            </span>
          </div>

          <UrlList urls={urls} onDelete={handleDelete} />
        </section>
      </main>

      <footer className="mt-20 py-8 border-t border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>&copy; 2026 MZL. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
