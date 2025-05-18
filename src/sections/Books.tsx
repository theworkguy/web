import React from 'react';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';

// Hardcoded book items sorted from latest to oldest
const books = [
  {
    id: 1,
    title: "Mafia International",
    description: "A firsthand account of Alite’s international operations with the Gambino crime family and his eventual turn against organized crime.",
    coverImage: "https://m.media-amazon.com/images/I/61iMJX4+FcL._SL1360_.jpg", // Replace with actual cover image
    link: "https://a.co/d/7OIg75Y",
  },
  {
    id: 2,
    title: "Prison Rules",
    description: "Insights into the brutal world of prison life and the lessons learned behind bars.",
    coverImage: "https://m.media-amazon.com/images/I/815VvoyfCQL._SL1500_.jpg", // Replace with actual cover image
    link: "https://a.co/d/1XiVnZU", // Placeholder; search Amazon for actual link
  },
  {
    id: 3,
    title: "Darkest Hour",
    description: "A raw and unflinching account of John Alite's childhood and the influences that led him into a life of crime.",
    coverImage: "https://m.media-amazon.com/images/I/61SVlk+QezL._SL1500_.jpg", // Replace with actual cover image
    link: "https://a.co/d/gdVtTy7",
  },
  {
    id: 4,
    title: "Gotti's Rules",
    description: "An insider’s look at the Gambino crime family and John Gotti Jr.'s leadership.",
    coverImage: "https://m.media-amazon.com/images/I/A1ST7xaoPtL._SL1500_.jpg", // Replace with actual cover image
    link: "https://a.co/d/g35gC3Z",
  },
];

const Books: React.FC = () => {
  return (
    <section id="books" className="section bg-black grain-texture">
      <div className="container">
        <SectionTitle 
          title="Books by John" 
          subtitle="Raw stories from the streets to redemption."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {books.map((book) => (
            <div key={book.id} className="card group hover:transform hover:scale-105 transition-all duration-300">
              <div className="relative aspect-[2/3] overflow-hidden">
                <img 
                  src={book.coverImage} 
                  alt={`${book.title} cover`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{book.title}</h3>
                <p className="text-gray-400 mb-4 text-sm">{book.description}</p>
                <Button href={book.link} variant="primary" className="w-full">
                  Buy Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Books;