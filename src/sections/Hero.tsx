import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import { ChevronDown, Star, Users, Award, TrendingUp, Shield, Zap } from 'lucide-react';

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      style={{
        backgroundImage: `
          linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(193, 1, 1, 0.1) 50%, rgba(0, 0, 0, 0.9) 100%),
          url(https://media.zenfs.com/en/aol_ny_post_us_news_articles_123/0d10a8121ac519474a61310555df1ac6)
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transform: `translateY(${scrollY * 0.3}px)`,
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-ping"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-gold rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-primary/50 rounded-full floating-element"></div>
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-gold/50 rounded-full floating-element" style={{ animationDelay: '2s' }}></div>
      </div>

      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 backdrop-blur-sm"
        style={{ opacity: scrollY / 1000 }}
      ></div>

      <div className="container px-4 z-10 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-4 md:mb-6 tracking-tight text-white leading-tight">
          <span className="block mb-1 md:mb-2 shimmer bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">JOHN</span> 
          <span className="text-primary neon-glow animate-pulse-slow text-5xl sm:text-6xl md:text-8xl lg:text-9xl">ALITE</span>
        </h1>
        
        <p className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-200 max-w-4xl mx-auto leading-tight px-2">
          From <span className="text-primary neon-glow">Mob Enforcer</span> to <span className="text-gold gold-glow">Councilman</span> and <span className="text-primary neon-glow">Advocate</span>
        </p>

        <p className="text-base sm:text-lg md:text-2xl lg:text-3xl italic text-gold gold-glow mb-6 md:mb-8 max-w-3xl mx-auto font-light px-2">
          "I turned my past into a purpose"
        </p>

        {/* Social Proof Stats */}
        <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center items-center gap-3 md:gap-6 mb-8 md:mb-10 text-xs sm:text-sm md:text-base px-2">
          <div className="flex items-center testimonial-card px-3 sm:px-4 md:px-6 py-2 md:py-3 rounded-full">
            <Users className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 md:mr-2 text-gold" />
            <span className="text-white font-bold text-xs sm:text-sm md:text-base">1.5M+ Followers</span>
          </div>
          <div className="flex items-center testimonial-card px-3 sm:px-4 md:px-6 py-2 md:py-3 rounded-full">
            <Award className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 md:mr-2 text-gold" />
            <span className="text-white font-bold text-xs sm:text-sm md:text-base">5 Bestselling Books</span>
          </div>
          <div className="flex items-center testimonial-card px-3 sm:px-4 md:px-6 py-2 md:py-3 rounded-full">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 md:mr-2 text-yellow-400" />
            <span className="text-white font-bold text-xs sm:text-sm md:text-base">Featured on Netflix</span>
          </div>
          <div className="flex items-center testimonial-card px-3 sm:px-4 md:px-6 py-2 md:py-3 rounded-full">
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 md:mr-2 text-green-400" />
            <span className="text-white font-bold text-xs sm:text-sm md:text-base">3,132 Reviews</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6 px-4">
          <Button 
            href="#book-john" 
            className="btn-gold w-full sm:w-auto sm:min-w-[200px] md:min-w-[250px] group relative overflow-hidden text-lg md:text-xl px-6 md:px-10 py-4 md:py-5 shadow-2xl"
            aria-label="Book John Alite for an event"
          >
            <span className="relative z-10 font-black flex items-center gap-2">
              BOOK ME NOW
            </span>
          </Button>
          <Button 
            href="#shop" 
            className="btn-primary w-full sm:w-auto sm:min-w-[200px] md:min-w-[250px] text-lg md:text-xl px-6 md:px-10 py-4 md:py-5 shadow-2xl"
            aria-label="Shop exclusive merchandise"
          >
            <span className="font-black">
              SHOP NOW
            </span>
          </Button>
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <p className="text-gold font-bold text-sm sm:text-base md:text-lg lg:text-xl mb-4 px-2">
            ✅ 100% Authentic • 🚚 Fast Shipping • 🔒 Secure Checkout
          </p>
          <p className="text-gray-400 text-xs sm:text-sm px-2">
            Join thousands of satisfied customers worldwide
          </p>
        </div>
      </div>
      
      <a 
        href="#shop"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gold hover:text-primary transition-colors duration-300 animate-bounce"
        aria-label="Scroll down to shop"
      >
        <ChevronDown size={40} />
      </a>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%)] opacity-50"></div>
      </div>
    </section>
  );
};

export default Hero;