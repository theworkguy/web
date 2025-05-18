import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="hero" 
      className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden grain-texture bg-black"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url(https://media.zenfs.com/en/aol_ny_post_us_news_articles_123/0d10a8121ac519474a61310555df1ac6)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transform: `translateY(${scrollY * 0.3}px)`,
      }}
    >
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        style={{ opacity: scrollY / 1000 }}
      ></div>

      <div className="container px-4 z-10 text-center animate-fade-in">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight text-white" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
          <span className="block">JOHN</span> 
          <span className="text-primary neon-glow animate-pulse-slow">ALITE</span>
        </h1>
        
        <p className="text-xl md:text-2xl font-heading mb-4 text-gray-200 max-w-xl mx-auto">
          From <span className="text-primary neon-glow">Mob Enforcer</span> to <span className="text-primary neon-glow">Councilman</span> and <span className="text-primary neon-glow">Advocate</span>
        </p>

        <p className="text-lg md:text-2xl italic text-gray-300 mb-8 max-w-2xl mx-auto">
          "I turned my past into a purpose"
        </p>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <Button 
            href="#book-john" 
            variant="primary" 
            className="min-w-[200px] group relative overflow-hidden"
            aria-label="Book John Alite for an event"
          >
            <span className="relative z-10 group-hover:animate-pulse">Book Me Now</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary to-primary-dark bg-[length:200%_100%] group-hover:animate-[gradient_2s_ease-in-out_infinite]"></div>
          </Button>
          <Button 
            href="#about" 
            variant="outline" 
            className="min-w-[200px] border-primary text-white hover:bg-primary hover:text-white hover:neon-glow transition-all duration-300"
            aria-label="Read John Alite’s story"
          >
            My Story
          </Button>
        </div>
      </div>
      
      <a 
        href="#shop"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white hover:text-primary transition-colors duration-300 animate-bounce"
        aria-label="Scroll down to shop"
      >
        <ChevronDown size={32} />
      </a>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%)] opacity-40"></div>
      </div>
    </section>
  );
};

export default Hero;