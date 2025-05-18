import { Book, Movie, MediaItem, Product, TimelineEvent } from '../types';

export const books: Book[] = [
  {
    id: 1,
    title: "Gotti's Rules",
    coverImage: "https://images.pexels.com/photos/6373307/pexels-photo-6373307.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "The untold story of life inside the Gambino crime family, revealing the truth about John Gotti's rise and fall.",
    link: "https://www.amazon.com/Gottis-Rules-Story-Inside-Family/dp/0062346881",
  },
  {
    id: 2,
    title: "Darkest Hour",
    coverImage: "https://images.pexels.com/photos/2873510/pexels-photo-2873510.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "A raw account of survival and redemption through the darkest moments of life in and out of organized crime.",
    link: "#",
  },
  {
    id: 3,
    title: "Prison Rules",
    coverImage: "https://images.pexels.com/photos/8108063/pexels-photo-8108063.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Essential survival strategies from someone who navigated the brutal reality of prison life and emerged stronger.",
    link: "#",
  },
  {
    id: 4,
    title: "Mafia International",
    coverImage: "https://images.pexels.com/photos/3052651/pexels-photo-3052651.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "A global exposé of organized crime syndicates and their international operations, based on firsthand experience.",
    link: "#",
  },
];

export const movies: Movie[] = [
  {
    id: 1,
    title: "Fight Valley 2: Lockdown",
    poster: "https://images.pexels.com/photos/8108063/pexels-photo-8108063.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "John Alite stars in this gritty action film about underground fighting rings and the path to redemption.",
    trailerLink: "#",
  },
  {
    id: 2,
    title: "Ahead",
    poster: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "A powerful documentary exploring my journey from crime to counseling, featuring raw interviews and real footage.",
    trailerLink: "#",
  },
  {
    id: 3,
    title: "4 Guys and a Bag",
    poster: "https://images.pexels.com/photos/7647400/pexels-photo-7647400.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Based on true events from the streets of New York in the 1990s, a gripping tale of loyalty and betrayal.",
    trailerLink: "#",
  },
];

export const mediaItems: MediaItem[] = [
  {
    id: 1,
    source: "Daily Mail",
    logo: "https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Mob Enforcer Joins War Against Fentanyl, 2022",
    excerpt: "Former Gambino associate John Alite leads community efforts to combat the fentanyl crisis after personal tragedy.",
    link: "#",
  },
  {
    id: 2,
    source: "The Independent",
    logo: "https://images.pexels.com/photos/4057663/pexels-photo-4057663.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Trump Photo with John Alite, 2023",
    excerpt: "Exclusive interview about the viral photo and Alite's perspective on politics and reform.",
    link: "#",
  },
  {
    id: 3,
    source: "Yahoo",
    logo: "https://images.pexels.com/photos/5077047/pexels-photo-5077047.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Ex-Mobster Now NJ Councilman, 2025",
    excerpt: "John Alite's remarkable transformation culminates in election victory, focusing on youth programs and criminal justice reform.",
    link: "#",
  },
  {
    id: 4,
    source: "NJToday.NET",
    logo: "https://images.pexels.com/photos/4052198/pexels-photo-4052198.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Redemption Tour Hits Schools, 2024",
    excerpt: "Councilman Alite's powerful anti-crime message resonates with students across New Jersey.",
    link: "#",
  },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Signed Baseball Bat",
    image: "https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: 199.99,
    description: "A piece of my past, now for a good cause. Each bat is personally signed and comes with a certificate of authenticity and custom display case.",
  },
  {
    id: 2,
    name: "Premium T-Shirt",
    image: "https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: 49.99,
    description: "Wear my story. Premium black t-shirt with the 'John Alite - Reformed' logo in striking red. Available in all sizes.",
  },
];

export const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    year: "1980s",
    title: "Mob Beginnings",
    description: "Entered the world of organized crime as a Gambino crime family associate.",
  },
  {
    id: 2,
    year: "2008",
    title: "Cooperation & Testimony",
    description: "Made the decision to cooperate with authorities, testifying against former associates.",
  },
  {
    id: 3,
    year: "2012",
    title: "Release & New Beginnings",
    description: "Released from prison and began the journey of transformation through speaking and mentorship.",
  },
  {
    id: 4,
    year: "2022",
    title: "Fentanyl Advocacy",
    description: "After losing my daughter to fentanyl, dedicated my life to fighting the opioid crisis.",
  },
  {
    id: 5,
    year: "2025",
    title: "Elected Councilman",
    description: "Won election as city councilman, focusing on youth programs and criminal justice reform.",
  },
];