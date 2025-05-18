export interface Book {
  id: number;
  title: string;
  coverImage: string;
  description: string;
  link: string;
}

export interface Movie {
  id: number;
  title: string;
  poster: string;
  description: string;
  trailerLink: string;
}

export interface MediaItem {
  id: number;
  source: string;
  logo: string;
  title: string;
  excerpt: string;
  link: string;
}

export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
}

export interface TimelineEvent {
  id: number;
  year: string;
  title: string;
  description: string;
}