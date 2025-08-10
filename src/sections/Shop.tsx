import React, { useState, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import { ChevronLeft, ChevronRight, Star, Truck, Shield } from 'lucide-react';

const products = [
  {
    id: 1,
    name: "John Alite Autographed Collector's Baseball Bat",
    description: "🔥 EXCLUSIVE: Own a piece of history with this baseball bat, hand-signed by John Alite. LIMITED to just 100 units worldwide! This rare collectible comes with certificate of authenticity. Perfect for collectors and fans.",
    images: ["https://bwu4hso3u8wqeyna-94770921760.shopifypreview.com/cdn/shop/files/100baseball.jpg"],
    price: 185.00,
    rating: 5,
    reviews: 1247,
    features: ["Hand-signed by John Alite", "Limited to 100 units", "Certificate of authenticity", "Premium wooden bat"]
  },
  {
    id: 2,
    name: "John Alite Exclusive Journey T-Shirt",
    description: "🎯 BESTSELLER: Celebrate John's incredible journey with this premium T-shirt featuring exclusive artwork. High-quality cotton blend, perfect fit guaranteed. Show your support for redemption and second chances!",
    images: [
      "https://i.postimg.cc/hG2N5Z40/Se-Shpejti-ne-storm-al-Limited-Edition-JA.jpg",
      "https://i.postimg.cc/qRgWVczH/Se-Shpejti-ne-storm-al-Limited-Edition-JA-1.jpg",
      "https://i.postimg.cc/KzVwZKMk/Se-Shpejti-ne-storm-al-Limited-Edition-JA-2.jpg",
    ],
    price: 89,
    rating: 5,
    reviews: 892,
    features: ["Premium cotton blend", "Limited edition design", "Available in multiple sizes", "Exclusive artwork"]
  },
];

const Shop: React.FC = () => {
  const [currentImageIndices, setCurrentImageIndices] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = 0;
      return acc;
    }, {})
  );

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
                button: "Buy Now"
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
                button: "Buy Now"
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
        size={16}
        className={`${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
      />
    ));
  };

  return (
    <section id="shop" className="section bg-dark-gray metal-texture relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent pointer-events-none"></div>
      
      <div className="container relative">
        <SectionTitle 
          title="Official Shop" 
          subtitle="🔥 EXCLUSIVE merchandise and collectibles from John's personal collection. Limited quantities available!"
        />
        
        {/* Urgency Banner */}
        <div className="bg-gradient-to-r from-primary to-primary-dark text-white text-center py-3 px-6 rounded-lg mb-8 animate-pulse">
          <p className="font-bold text-lg">⚡ FLASH SALE: Limited Time Only - Grab Yours Before They're Gone!</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="card group hover:shadow-red-glow hover:scale-105 transition-all duration-300 bg-gradient-to-br from-dark-gray to-black relative overflow-hidden border border-primary/20"
            >
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                <div className="bg-primary text-white px-3 py-1 rounded-full font-bold text-sm flex items-center gap-1 animate-pulse">
                  <Shield size={14} />
                  ✅ AUTHENTIC
                </div>
                {product.id === 1 && (
                  <div className="bg-yellow-500 text-black px-3 py-1 rounded-full font-bold text-xs">
                    🔥 ONLY 100 LEFT
                  </div>
                )}
                {product.id === 2 && (
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full font-bold text-xs">
                    ⭐ BESTSELLER
                  </div>
                )}
              </div>
              
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-primary/90 text-white px-4 py-2 rounded-full font-bold text-xl shadow-lg border-2 border-white/20">
                  ${product.price.toFixed(2)}
                </div>
              </div>
              
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={product.images[currentImageIndices[product.id]]} 
                  alt={`${product.name} image ${currentImageIndices[product.id] + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70"></div>
                
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => handlePrevImage(product.id, product.images.length)}
                      className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-primary/80 hover:bg-primary text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={() => handleNextImage(product.id, product.images.length)}
                      className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-primary/80 hover:bg-primary text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                      aria-label="Next image"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
                
                {product.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {product.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndices(prev => ({ ...prev, [product.id]: index }))}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentImageIndices[product.id] 
                            ? 'bg-primary scale-125' 
                            : 'bg-white/50 hover:bg-white/80'
                        }`}
                        aria-label={`View image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
              
              <div className="p-4 md:p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-yellow-400 font-bold text-sm md:text-base">({product.reviews.toLocaleString()} reviews)</span>
                  </div>
                </div>
                
                <h3 className="text-lg md:text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors duration-300 text-center">
                  {product.name}
                </h3>
                
                <p className="text-gray-300 mb-4 leading-relaxed text-sm md:text-base text-center">
                  {product.description}
                </p>
                
                <div className="mb-4 md:mb-6">
                  <h4 className="text-sm font-semibold text-primary mb-2 text-center">✨ What You Get:</h4>
                  <ul className="space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index} className="text-gray-300 text-xs md:text-sm flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Urgency Message */}
                <div className="text-center mb-4">
                  <p className="text-yellow-400 font-bold text-sm animate-pulse">
                    ⏰ {product.id === 1 ? 'Only 100 units available!' : 'Limited time offer!'}
                  </p>
                </div>
                
                <div className="flex justify-center">
                  {product.id === 1 ? (
                    <div id="product-component-1747581132748" className="w-full max-w-md"></div>
                  ) : (
                    <div id="product-component-1747588187589" className="w-full max-w-md"></div>
                  )}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-700/50">
                  <div className="flex items-center justify-center space-x-4 md:space-x-6 text-xs md:text-sm text-gray-400">
                    <div className="flex items-center">
                      <Shield size={16} className="mr-1 text-green-400" />
                      <span className="hidden sm:inline">Secure Payment</span>
                      <span className="sm:hidden">Secure</span>
                    </div>
                    <div className="flex items-center">
                      <Truck size={16} className="mr-1 text-blue-400" />
                      <span className="hidden sm:inline">Fast Delivery</span>
                      <span className="sm:hidden">Fast Ship</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Customer Testimonials */}
        <div className="mt-12 bg-gradient-to-r from-dark-gray to-black rounded-lg p-6 md:p-8">
          <h3 className="text-2xl font-bold text-center mb-6 text-primary">What Customers Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-black/50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                {renderStars(5)}
                <span className="ml-2 text-yellow-400 font-bold">Verified Purchase</span>
              </div>
              <p className="text-gray-300 text-sm mb-2">"Amazing quality! The baseball bat is exactly as described. John's signature is perfect!"</p>
              <p className="text-gray-500 text-xs">- Michael R.</p>
            </div>
            <div className="bg-black/50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                {renderStars(5)}
                <span className="ml-2 text-yellow-400 font-bold">Verified Purchase</span>
              </div>
              <p className="text-gray-300 text-sm mb-2">"Love the t-shirt! Great quality and the design is incredible. Highly recommend!"</p>
              <p className="text-gray-500 text-xs">- Sarah T.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-4 md:gap-8 p-4 md:p-6 bg-black/30 rounded-lg backdrop-blur-sm">
            <div className="flex items-center text-green-400">
              <Shield size={24} className="mr-2" />
              <div>
                <div className="font-semibold">100% Authentic</div>
                <div className="text-xs md:text-sm text-gray-400">Guaranteed genuine</div>
              </div>
            </div>
            <div className="flex items-center text-yellow-400">
              <Star size={24} className="mr-2" />
              <div>
                <div className="font-semibold">2000+ Reviews</div>
                <div className="text-xs md:text-sm text-gray-400">5-star average</div>
              </div>
            </div>
            <div className="flex items-center text-primary">
              <Award size={24} className="mr-2" />
              <div>
                <div className="font-semibold">Limited Edition</div>
                <div className="text-xs md:text-sm text-gray-400">Exclusive items</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;