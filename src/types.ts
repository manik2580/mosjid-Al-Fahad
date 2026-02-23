export interface PrayerTime {
  name: string;
  time: string;
  description?: string;
  isNext?: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  imageUrl: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
}

export interface GalleryItem {
  title: string;
  imageUrl: string;
  category: 'Services' | 'Events' | 'Architecture';
}
