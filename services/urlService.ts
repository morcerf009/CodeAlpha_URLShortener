
import { ShortUrl, ApiResponse } from '../types';

const API_BASE_URL = 'http://localhost:5000';

export const urlService = {
  getUrls: (): ShortUrl[] => {
    const data = localStorage.getItem('linkswift_urls');
    return data ? JSON.parse(data) : [];
  },

  saveUrl: (url: ShortUrl): void => {
    const urls = urlService.getUrls();
    urls.unshift(url);
    localStorage.setItem('linkswift_urls', JSON.stringify(urls));
  },

  deleteUrl: (id: string): void => {
    const urls = urlService.getUrls();
    const filtered = urls.filter(u => u.id !== id);
    localStorage.setItem('linkswift_urls', JSON.stringify(filtered));
  },

  validateUrl: (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  shorten: async (longUrl: string): Promise<ApiResponse<ShortUrl>> => {
    if (!urlService.validateUrl(longUrl)) {
      return { success: false, error: 'Invalid URL provided' };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/shorten`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalUrl: longUrl }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to shorten URL');
      }

      const data = await response.json();

      const newUrl: ShortUrl = {
        id: Math.random().toString(36).substr(2, 9),
        longUrl,
        shortCode: data.shortCode,
        createdAt: Date.now(),
        clicks: 0,
        title: new URL(longUrl).hostname
      };

      urlService.saveUrl(newUrl);
      return { success: true, data: newUrl };
    } catch (err: any) {
      return { success: false, error: err.message || 'Server connection failed' };
    }
  }
};
