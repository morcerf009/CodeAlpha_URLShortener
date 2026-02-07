
import React, { useEffect, useState } from 'react';
import { urlService } from '../services/urlService';
import { ShortUrl } from '../types';

interface RedirectHandlerProps {
  code: string;
}

const RedirectHandler: React.FC<RedirectHandlerProps> = ({ code }) => {
  const [urlData, setUrlData] = useState<ShortUrl | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(3);

  useEffect(() => {
    const urls = urlService.getUrls();
    const found = urls.find(u => u.shortCode === code);

    if (found) {
      setUrlData(found);
      urlService.incrementClick(code);
      
      const timer = setInterval(() => {
        setSeconds(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            window.location.assign(found.longUrl);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setError('Short link not found or has expired.');
    }
  }, [code]);

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
        <div className="max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-exclamation-triangle text-red-500 text-2xl"></i>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Link Not Found</h1>
          <p className="text-slate-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.hash = ''}
            className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-all"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-indigo-600 flex items-center justify-center p-6 text-center text-white">
      <div className="max-w-md w-full">
        <div className="mb-8">
          <div className="bg-white/20 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 backdrop-blur-md">
            <i className="fas fa-paper-plane text-3xl"></i>
          </div>
          <h1 className="text-3xl font-bold mb-2">Redirecting...</h1>
          <p className="text-indigo-100">You are being sent to:</p>
          <div className="bg-white/10 mt-3 p-3 rounded-xl truncate text-sm font-mono border border-white/10">
            {urlData?.longUrl}
          </div>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="relative w-24 h-24">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="44"
                stroke="currentColor"
                strokeWidth="4"
                fill="transparent"
                className="text-white/10"
              />
              <circle
                cx="48"
                cy="48"
                r="44"
                stroke="currentColor"
                strokeWidth="4"
                fill="transparent"
                strokeDasharray={276}
                strokeDashoffset={276 - (276 * (3 - seconds) / 3)}
                className="text-white transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-2xl font-black">
              {seconds}
            </div>
          </div>

          <p className="text-sm opacity-80">Hold tight, this will only take a moment.</p>
          
          <button 
            onClick={() => urlData && window.location.assign(urlData.longUrl)}
            className="px-6 py-2 bg-white text-indigo-600 font-bold rounded-lg hover:bg-indigo-50 transition-all text-sm"
          >
            Click here if you aren't redirected
          </button>
        </div>
      </div>
    </div>
  );
};

export default RedirectHandler;
