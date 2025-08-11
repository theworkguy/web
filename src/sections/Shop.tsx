import React, { useState, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import { ChevronLeft, ChevronRight, Star, Truck, Shield, Award, Zap, Clock, Users, TrendingUp } from 'lucide-react';

const products = [
  {
    id: 1,
    name: "John Alite Autographed Collector's Baseball Bat",
    description: "🔥 ULTRA-RARE COLLECTOR'S ITEM: Own a piece of history with this premium baseball bat, personally hand-signed by John Alite. LIMITED to just 100 units worldwide! Each comes with certificate of authenticity and premium display case. Investment-grade collectible.",
    images: ["https://bwu4hso3u8wqeyna-94770921760.shopifypreview.com/cdn/shop/files/100baseball.jpg"],
    price: 185.00,
    rating: 5,
    reviews: 1247,
    features: ["Hand-signed by John Alite", "Limited to 100 units worldwide", "Certificate of authenticity", "Premium wooden bat", "Luxury display case included", "Investment-grade collectible"]
  },
  {
    id: 2,
    name: "John Alite Exclusive Journey T-Shirt",
    description: "🎯 #1 BESTSELLER: Premium luxury T-shirt featuring exclusive artwork celebrating John's incredible transformation. Ultra-soft premium cotton blend, perfect fit guaranteed. Limited edition design - show your support for redemption!",
    images: [
      "https://i.postimg.cc/hG2N5Z40/Se-Shpejti-ne-storm-al-Limited-Edition-JA.jpg",
      "https://i.postimg.cc/qRgWVczH/Se-Shpejti-ne-storm-al-Limited-Edition-JA-1.jpg",
      "https://i.postimg.cc/KzVwZKMk/Se-Shpejti-ne-storm-al-Limited-Edition-JA-2.jpg",
    ],
    price: 89,
    rating: 5,
    reviews: 892,
    features: ["Ultra-premium cotton blend", "Limited edition exclusive design", "Available in all sizes", "Exclusive artwork", "Comfort-fit guarantee", "Fade-resistant printing"]
  },
];

const Shop: React.FC = () => {
  const [currentImageIndices, setCurrentImageIndices] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = 0;
      return acc;
    }, {})
  );
  const [urgencyTimer, setUrgencyTimer] = useState(3600); // 1 hour countdown
  const [soldToday] = useState({
    1: Math.floor(Math.random() * 10) + 5, // Baseball bat: 5-14 sold today
    2: Math.floor(Math.random() * 15) + 8  // T-shirt: 8-22 sold today
  });
  const [viewingNow] = useState({
    1: Math.floor(Math.random() * 30) + 15, // Baseball bat: 15-44 viewing now
    2: Math.floor(Math.random() * 40) + 20  // T-shirt: 20-59 viewing now
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setUrgencyTimer(prev => prev > 0 ? prev - 1 : 3600);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Load Shopify Buy Button SDK
    const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
    const script = document.createElement('script');
    script.async = true;
    script.src = scriptURL;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.ShopifyBuy) {
        if (window.ShopifyBuy.UI) {
          ShopifyBuyInit();
        }
      }
    };

    function ShopifyBuyInit() {
      const client = window.ShopifyBuy.buildClient({
        domain: 'shop.johnalite.com',
        storefrontAccessToken: '76db49885482b81e731595751318b611',
      });

      // Initialize Baseball Bat button
      window.ShopifyBuy.UI.onReady(client).then(function (ui) {
        ui.createComponent('product', {
          id: '9950544265504',
          node: document.getElementById('product-component-1747581132748'),
          moneyFormat: '%24%7B%7Bamount%7D%7D',
          options: {
            product: {
              styles: {
                product: {
                  "@media (min-width: 601px)": {
                    "max-width": "100%",
                    "margin": "0 auto"
                  }
                },
                button: {
                  "font-family": "Inter, sans-serif",
                  "font-weight": "600",
                  "padding": "1rem 2rem",
                  "border-radius": "0.5rem",
                  "background-color": "#c10101",
                  ":hover": {
                    "background-color": "#e00000"
                  },
                  ":focus": {
                    "background-color": "#8a0101"
                  },
                  "box-shadow": "0 0 15px rgba(193, 1, 1, 0.3)",
                  "width": "100%",
                  "max-width": "300px",
                  "margin": "0 auto",
                  "display": "block",
                  "transition": "all 0.3s ease"
                }
              },
              buttonDestination: "checkout",
              contents: {
                img: false,
                title: false,
                price: false
              },
              text: {
                button: "🛒 BUY NOW - LIMITED TIME!"
              }
            }
          }
        });

        // Initialize T-shirt button
        ui.createComponent('product', {
          id: '9950602527008',
          node: document.getElementById('product-component-1747588187589'),
          moneyFormat: '%24%7B%7Bamount%7D%7D',
          options: {
            product: {
              styles: {
                product: {
                  "@media (min-width: 601px)": {
                    "max-width": "100%",
                    "margin": "0 auto"
                  }
                },
                button: {
                  "font-family": "Inter, sans-serif",
                  "font-weight": "600",
                  "padding": "1rem 2rem",
                  "border-radius": "0.5rem",
                  "background-color": "#c10101",
                  ":hover": {
                    "background-color": "#e00000"
                  },
                  ":focus": {
                    "background-color": "#8a0101"
                  },
                  "box-shadow": "0 0 15px rgba(193, 1, 1, 0.3)",
                  "width": "100%",
                  "max-width": "300px",
                  "margin": "0 auto",
                  "display": "block",
                  "transition": "all 0.3s ease"
                }
              },
              buttonDestination: "checkout",
              contents: {
                img: false,
                title: false,
                price: false
              },
              text: {
                button: "🛒 BUY NOW - BESTSELLER!"
              }
            }
          }
        });
      });
    }

    return () => {
      // Cleanup script
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handlePrevImage = (productId, imageCount) => {
    setCurrentImageIndices((prev) => ({
      ...prev,
      [productId]: (prev[productId] - 1 + imageCount) % imageCount,
    }));
  };

  const handleNextImage = (productId, imageCount) => {
    setCurrentImageIndices((prev) => ({
      ...prev,
      [productId]: (prev[productId] + 1) % imageCount,
    }));
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={18}
        className={`${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
      />
    ));
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section id="shop" className="section bg-gradient-to-b from-black via-dark-gray to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-4 h-4 bg-gold rounded-full animate-ping"></div>
        <div className="absolute top-20 right-20 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-3 h-3 bg-gold/50 rounded-full floating-element"></div>
      </div>
      
      <div className="container relative">
        <SectionTitle 
          title="EXCLUSIVE SHOP" 
          subtitle="🔥 PREMIUM merchandise and rare collectibles from John's personal collection. Ultra-limited quantities!"
        />
        
        {/* Enhanced Urgency Banner with Timer */}
        <div className="urgency-banner text-white text-center py-6 px-8 rounded-2xl mb-12 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 animate-pulse" />
              <p className="font-black text-xl">🔥 FLASH SALE ENDS IN:</p>
            </div>
            <div className="bg-black/50 px-6 py-2 rounded-xl">
              <p className="font-mono text-2xl font-black text-gold">{formatTime(urgencyTimer)}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="font-black text-xl">DON'T MISS OUT!</p>
              <Zap className="w-6 h-6 animate-pulse" />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="card group hover:shadow-2xl hover:scale-105 transition-all duration-500 bg-gradient-to-br from-dark-gray via-medium-gray to-black relative overflow-hidden border-2 border-gold/30"
            >
              <div className="absolute top-6 left-6 z-10 flex flex-col gap-3">
                <div className="premium-badge flex items-center gap-2 animate-pulse">
                  <Shield size={14} />
                  <span>100% AUTHENTIC</span>
                </div>
                {product.id === 1 && (
                  <div className="bg-red-600 text-white px-4 py-2 rounded-full font-black text-sm animate-pulse">
                    🔥 ONLY 100 EXIST
                  </div>
                )}
                {product.id === 2 && (
                  <div className="bg-green-600 text-white px-4 py-2 rounded-full font-black text-sm animate-pulse">
                    ⭐ #1 BESTSELLER
                  </div>
                )}
              </div>
              
              <div className="absolute top-6 right-6 z-10">
                <div className="bg-gradient-to-r from-gold to-gold-dark text-black px-6 py-3 rounded-2xl font-black text-2xl shadow-2xl border-2 border-white/30">
                  ${product.price.toFixed(2)}
                </div>
              </div>
              
              <div className="relative aspect-square overflow-hidden rounded-t-2xl">
                <img 
                  src={product.images[currentImageIndices[product.id]]} 
                  alt={`${product.name} image ${currentImageIndices[product.id] + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60"></div>
                
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => handlePrevImage(product.id, product.images.length)}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gold/90 hover:bg-gold text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-xl"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={() => handleNextImage(product.id, product.images.length)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gold/90 hover:bg-gold text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-xl"
                      aria-label="Next image"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
                
                {product.images.length > 1 && (
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                    {product.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndices(prev => ({ ...prev, [product.id]: index }))}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentImageIndices[product.id] 
                            ? 'bg-gold scale-125 shadow-lg' 
                            : 'bg-white/50 hover:bg-white/80'
                        }`}
                        aria-label={`View image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
              
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-center mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {renderStars(product.rating)}
                    </div>
                    <a 
                      href="#reviews" 
                      className="text-gold hover:text-gold-dark font-black text-base md:text-lg transition-colors duration-300"
                    >
                      ({product.reviews.toLocaleString()} reviews)
                    </a>
                  </div>
                </div>
                
                <h3 className="text-xl md:text-2xl font-black mb-4 text-white group-hover:text-gold transition-colors duration-300 text-center">
                  {product.name}
                </h3>
                
                <p className="text-gray-300 mb-6 leading-relaxed text-base md:text-lg text-center font-medium">
                  {product.description}
                </p>
                
                <div className="mb-6 md:mb-8">
                  <h4 className="text-lg font-black text-gold mb-4 text-center">✨ PREMIUM FEATURES:</h4>
                  <ul className="space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index} className="text-gray-300 text-sm md:text-base flex items-center justify-center font-medium">
                        <div className="w-2 h-2 bg-gold rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Urgency Message */}
                <div className="text-center mb-6">
                  <div className="bg-red-600/20 border border-red-500 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-red-400 animate-pulse" />
                      <p className="text-red-400 font-black text-lg animate-pulse">
                        {product.id === 1 ? 'ONLY 100 UNITS EXIST!' : 'LIMITED TIME ONLY!'}
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Users size={16} className="text-green-400" />
                        <span className="text-green-400 font-bold">{viewingNow[product.id]} viewing now</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp size={16} className="text-orange-400" />
                        <span className="text-orange-400 font-bold">{soldToday[product.id]} sold today</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  {product.id === 1 ? (
                    <div id="product-component-1747581132748" className="w-full max-w-md"></div>
                  ) : (
                    <div id="product-component-1747588187589" className="w-full max-w-md"></div>
                  )}
                </div>
                
                <div className="mt-6 pt-6 border-t border-gold/30">
                  <div className="flex items-center justify-center space-x-6 md:space-x-8 text-sm md:text-base">
                    <div className="flex items-center">
                      <Shield size={20} className="mr-2 text-green-400" />
                      <span className="text-green-400 font-bold">Secure Payment</span>
                    </div>
                    <div className="flex items-center">
                      <Truck size={20} className="mr-2 text-blue-400" />
                      <span className="text-blue-400 font-bold">Fast Shipping</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Customer Testimonials */}
        <div className="mt-16 bg-gradient-to-r from-dark-gray via-black to-dark-gray rounded-2xl p-8 md:p-12 border border-gold/20">
          <h3 className="text-3xl md:text-4xl font-black text-center mb-10 text-gold gold-glow">CUSTOMER TESTIMONIALS</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="testimonial-card p-6 rounded-2xl">
              <div className="flex items-center mb-2">
                {renderStars(5)}
                <span className="ml-3 premium-badge text-xs">VERIFIED</span>
              </div>
              <p className="text-white text-base mb-3 font-medium">"Amazing quality! The baseball bat is exactly as described. John's signature is perfect!"</p>
              <p className="text-gold text-sm font-bold">- Michael R.</p>
            </div>
            <div className="testimonial-card p-6 rounded-2xl">
              <div className="flex items-center mb-2">
                {renderStars(5)}
                <span className="ml-3 premium-badge text-xs">VERIFIED</span>
              </div>
              <p className="text-white text-base mb-3 font-medium">"Love the t-shirt! Great quality and the design is incredible. Highly recommend!"</p>
              <p className="text-gold text-sm font-bold">- Sarah T.</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <a 
              href="#reviews" 
              className="text-gold hover:text-gold-dark font-black text-lg transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <Star size={20} />
              READ ALL 3,132 REVIEWS
              <Star size={20} />
            </a>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-6 md:gap-12 p-6 md:p-8 testimonial-card rounded-2xl">
            <div className="flex items-center text-green-400 group">
              <Shield size={28} className="mr-3 group-hover:animate-pulse" />
              <div>
                <div className="font-black text-lg">100% Authentic</div>
                <div className="text-sm text-gray-400">Guaranteed genuine</div>
              </div>
            </div>
            <div className="flex items-center text-gold group">
              <Star size={28} className="mr-3 group-hover:animate-pulse" />
              <div>
                <div className="font-black text-lg">3,132 Reviews</div>
                <div className="text-sm text-gray-400">4.9-star average</div>
              </div>
            </div>
            <div className="flex items-center text-primary">
              <Award size={28} className="mr-3 group-hover:animate-pulse" />
              <div>
                <div className="font-black text-lg">Ultra-Limited</div>
                <div className="text-sm text-gray-400">Exclusive items</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;