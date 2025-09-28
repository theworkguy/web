import React, { useState, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import { ChevronLeft, ChevronRight, Star, Truck, Shield, Award } from 'lucide-react';

const products = [
  {
    id: 1,
    name: "John Alite Autographed Collector's Baseball Bat",
    description: "Premium wooden baseball bat personally hand-signed by John Alite. Each bat comes with a certificate of authenticity. A unique collectible for fans and supporters of John's transformation story.",
    images: ["https://bwu4hso3u8wqeyna-94770921760.shopifypreview.com/cdn/shop/files/100baseball.jpg"],
    price: 185.00,
    rating: 5,
    reviews: 47,
    features: ["Hand-signed by John Alite", "Certificate of authenticity", "Premium wooden bat", "Limited availability"]
  },
  {
    id: 2,
    name: "John Alite Journey T-Shirt",
    description: "High-quality cotton t-shirt featuring artwork that represents John's journey from his past to his current advocacy work. Comfortable fit and durable design.",
    images: [
      "https://i.postimg.cc/hG2N5Z40/Se-Shpejti-ne-storm-al-Limited-Edition-JA.jpg",
      "https://i.postimg.cc/qRgWVczH/Se-Shpejti-ne-storm-al-Limited-Edition-JA-1.jpg",
      "https://i.postimg.cc/KzVwZKMk/Se-Shpejti-ne-storm-al-Limited-Edition-JA-2.jpg",
    ],
    price: 49.99,
    rating: 5,
    reviews: 23,
    features: ["100% cotton", "Available in multiple sizes", "Unique design", "Comfortable fit"]
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
                button: "Purchase Now"
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
                button: "Purchase Now"
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

  return (
    <section id="shop" className="section bg-gradient-to-b from-black via-dark-gray to-black">
      <div className="container">
        <SectionTitle 
          title="Official Merchandise" 
          subtitle="Support John's advocacy work with authentic merchandise and collectibles."
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="card group hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-dark-gray via-medium-gray to-black border border-gray-700"
            >
              <div className="absolute top-6 right-6 z-10">
                <div className="bg-gradient-to-r from-gold to-gold-dark text-black px-6 py-3 rounded-2xl font-bold text-2xl shadow-2xl">
                  ${product.price.toFixed(2)}
                </div>
              </div>
              
              <div className="relative aspect-square overflow-hidden rounded-t-2xl">
                <img 
                  src={product.images[currentImageIndices[product.id]]} 
                  alt={`${product.name} image ${currentImageIndices[product.id] + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
              
              <div className="p-8">
                <div className="flex items-center justify-center mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-gold font-bold text-lg">
                      ({product.reviews} reviews)
                    </span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-gold transition-colors duration-300 text-center">
                  {product.name}
                </h3>
                
                <p className="text-gray-300 mb-6 leading-relaxed text-lg text-center">
                  {product.description}
                </p>
                
                <div className="mb-8">
                  <h4 className="text-lg font-bold text-gold mb-4 text-center">Features:</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="text-gray-300 flex items-center justify-center">
                        <div className="w-2 h-2 bg-gold rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex justify-center">
                  {product.id === 1 ? (
                    <div id="product-component-1747581132748" className="w-full max-w-md"></div>
                  ) : (
                    <div id="product-component-1747588187589" className="w-full max-w-md"></div>
                  )}
                </div>
                
                <div className="mt-6 pt-6 border-t border-gold/30">
                  <div className="flex items-center justify-center space-x-8">
                    <div className="flex items-center">
                      <Shield size={20} className="mr-2 text-green-400" />
                      <span className="text-green-400 font-bold">Secure</span>
                    </div>
                    <div className="flex items-center">
                      <Truck size={20} className="mr-2 text-blue-400" />
                      <span className="text-blue-400 font-bold">Fast Shipping</span>
                    </div>
                    <div className="flex items-center">
                      <Award size={20} className="mr-2 text-gold" />
                      <span className="text-gold font-bold">Authentic</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center gap-12 p-8 testimonial-card rounded-2xl">
            <div className="flex items-center text-green-400">
              <Shield size={28} className="mr-3" />
              <div>
                <div className="font-bold text-lg">100% Authentic</div>
                <div className="text-sm text-gray-400">Guaranteed genuine</div>
              </div>
            </div>
            <div className="flex items-center text-blue-400">
              <Truck size={28} className="mr-3" />
              <div>
                <div className="font-bold text-lg">Fast Shipping</div>
                <div className="text-sm text-gray-400">Quick delivery</div>
              </div>
            </div>
            <div className="flex items-center text-gold">
              <Award size={28} className="mr-3" />
              <div>
                <div className="font-bold text-lg">Quality Products</div>
                <div className="text-sm text-gray-400">Premium materials</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;