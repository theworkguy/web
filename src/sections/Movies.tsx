import React from 'react';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import { Play } from 'lucide-react';

// Hardcoded movie items with accurate details
const movies = [
  {
    id: 1,
    title: "Fear City: New York vs The Mafia",
    description: "A 2020 Netflix documentary series exploring the mafia’s dominance in 1970s and 1980s New York, featuring John Alite’s firsthand accounts of his time as a Gambino crime family enforcer.",
    poster: "https://upload.wikimedia.org/wikipedia/en/b/bc/NewYorkvsTheMafia.jpeg", // Replace with /images/fear-city-poster.jpg
    trailerLink: "https://www.netflix.com/title/80183792", // Updated to a general Netflix link; replace with direct trailer if available
  },
  {
    id: 2,
    title: "The Perfect Gangster",
    description: "A 2023 film based on John Alite’s book, depicting his life as a Gambino enforcer, his involvement in organized crime, and his path to redemption after turning his life around.",
    poster: "https://m.media-amazon.com/images/M/MV5BZGIxNmQ0M2UtY2QzNS00YzA2LWFiYmItMTc2YTE4ZjdjMDZjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", // Placeholder; replace with /images/perfect-gangster-poster.jpg
    trailerLink: "https://www.youtube.com/watch?v=k7XY7u6rRMg", // Provided trailer link
  },
];

const Movies: React.FC = () => {
  return (
    <section id="movies" className="section bg-dark-gray grain-texture">
      <div className="container">
        <SectionTitle 
          title="Featured Films" 
          subtitle="From the streets to the silver screen."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {movies.map((movie) => (
            <div key={movie.id} className="card group">
              <div className="relative aspect-[16/9] overflow-hidden">
                <img 
                  src={movie.poster} 
                  alt={`${movie.title} poster`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <Play size={48} className="text-primary" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
                <p className="text-gray-400 mb-4">{movie.description}</p>
                <Button href={movie.trailerLink} variant="primary" className="w-full">
                  Watch Trailer
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Movies;