import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import { ChevronDown, Star, Users, Award, TrendingUp, Shield, Zap } from 'lucide-react';

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    { text: "John's story changed my life completely", author: "Michael R." },
    { text: "Most powerful speaker I've ever heard", author: "Sarah T." },
    { text: "His books are absolutely incredible", author: "David L." },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
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
        {/* Premium Badge */}
        <div className="mb-6 flex justify-center">
          <div className="premium-badge flex items-center gap-2">
            <Award size={16} />
            <span>OFFICIAL WEBSITE</span>
            <Shield size={16} />
          </div>
        </div>

        <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight text-white leading-none">
          <span className="block mb-2 shimmer bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">JOHN</span> 
          <span className="text-primary neon-glow animate-pulse-slow text-7xl md:text-8xl lg:text-9xl">ALITE</span>
        </h1>
        
        <p className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-gray-200 max-w-4xl mx-auto leading-tight">
          From <span className="text-primary neon-glow">Mob Enforcer</span> to <span className="text-gold gold-glow">Councilman</span> and <span className="text-primary neon-glow">Advocate</span>
        </p>

        <p className="text-xl md:text-3xl italic text-gold gold-glow mb-8 max-w-3xl mx-auto font-light">
          "I turned my past into a purpose"
        </p>

        {/* Rotating Testimonials */}
        <div className="mb-8 h-16 flex items-center justify-center">
          <div className="testimonial-card px-6 py-3 rounded-full max-w-md">
            <p className="text-white font-medium transition-all duration-500">
              "{testimonials[currentTestimonial].text}"
            </p>
            <p className="text-gold text-sm mt-1">- {testimonials[currentTestimonial].author}</p>
          </div>
        </div>
        
        {/* Social Proof Stats */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mb-10 text-sm md:text-base">
          <div className="flex items-center testimonial-card px-6 py-3 rounded-full">
            <Users className="w-5 h-5 mr-2 text-gold" />
            <span className="text-white font-bold">1.5M+ Followers</span>
          </div>
          <div className="flex items-center testimonial-card px-6 py-3 rounded-full">
            <Award className="w-5 h-5 mr-2 text-gold" />
            <span className="text-white font-bold">5 Bestselling Books</span>
          </div>
          <div className="flex items-center testimonial-card px-6 py-3 rounded-full">
            <Star className="w-5 h-5 mr-2 text-yellow-400" />
            <span className="text-white font-bold">Featured on Netflix</span>
          </div>
          <div className="flex items-center testimonial-card px-6 py-3 rounded-full">
            <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
            <span className="text-white font-bold">3,132 Reviews</span>
          </div>
        </div>

        {/* Urgency Banner */}
        <div className="urgency-banner text-white text-center py-4 px-6 rounded-2xl mb-8 shadow-2xl">
          <div className="flex items-center justify-center gap-2">
            <Zap className="w-5 h-5 animate-pulse" />
            <p className="font-black text-lg md:text-xl">🔥 LIMITED TIME: Exclusive Items Available - Don't Miss Out!</p>
            <Zap className="w-5 h-5 animate-pulse" />
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <Button 
            href="#book-john" 
            className="btn-gold min-w-[250px] group relative overflow-hidden text-xl px-10 py-5 animate-pulse-slow shadow-2xl"
            aria-label="Book John Alite for an event"
          >
            <span className="relative z-10 group-hover:animate-pulse font-black flex items-center gap-2">
              <Zap size={20} />
              BOOK ME NOW
              <Zap size={20} />
            </span>
          </Button>
          <Button 
            href="#shop" 
            className="btn-primary min-w-[250px] text-xl px-10 py-5 shadow-2xl"
            aria-label="Shop exclusive merchandise"
          >
            <span className="flex items-center gap-2 font-black">
              <Star size={20} />
              SHOP NOW
              <Star size={20} />
            </span>
          </Button>
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <p className="text-gold font-bold text-lg md:text-xl animate-pulse mb-4">
            ✅ 100% Authentic • 🚚 Fast Shipping • 🔒 Secure Checkout
          </p>
          <p className="text-gray-400 text-sm">
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