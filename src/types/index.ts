export interface UrlMapping {
  id: string;
  originalUrl: string;
  shortCode: string;
  createdAt: number;
  clicks: number;
}

export interface UrlState {
  urls: UrlMapping[];
  loading: boolean;
  error: string | null;
}