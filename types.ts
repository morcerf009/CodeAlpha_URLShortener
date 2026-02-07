
export interface ShortUrl {
  id: string;
  longUrl: string;
  shortCode: string;
  createdAt: number;
  clicks: number;
  title?: string;
}

export enum ViewMode {
  DASHBOARD = 'DASHBOARD',
  REDIRECTING = 'REDIRECTING',
  ERROR = 'ERROR'
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}
