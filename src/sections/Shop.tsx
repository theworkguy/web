import React, { useState, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import { ChevronLeft, ChevronRight, Star, Truck, Shield } from 'lucide-react';

const products = [
  {
    id: 1,
    name: "John Alite Autographed Collector's Baseball Bat",
    description: "Own a piece of history with this exclusive baseball bat, hand-signed by John Alite. Limited to just 100 units, this rare collectible is a must-have for fans and memorabilia enthusiasts. Each bat is uniquely authenticated, making it a one-of-a-kind treasure.",
    images: ["https://bwu4hso3u8wqeyna-94770921760.shopifypreview.com/cdn/shop/files/100baseball.jpg"],
    price: 185.00,
    rating: 5,
    reviews: 247,
    features: ["Hand-signed by John Alite", "Limited to 100 units", "Certificate of authenticity", "Premium wooden bat"]
  },
  {
    id: 2,
    name: "John Alite Exclusive Journey T-Shirt",
    description: "Celebrate John Alite's remarkable story with this limited-edition T-shirt, featuring a striking design from his personal collection. Only 50 shirts available, making this a rare and bold statement piece for true fans.",
    images: [
      "https://i.postimg.cc/hG2N5Z40/Se-Shpejti-ne-storm-al-Limited-Edition-JA.jpg",
      "https://i.postimg.cc/qRgWVczH/Se-Shpejti-ne-storm-al-Limited-Edition-JA-1.jpg",
      "https://i.postimg.cc/KzVwZKMk/Se-Shpejti-ne-storm-al-Limited-Edition-JA-2.jpg",
    ],
    price: 89,
    rating: 5,
    reviews: 189,
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
          subtitle="Exclusive merchandise and collectibles from John's personal collection."
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="card group hover:shadow-red-glow transition-all duration-300 bg-gradient-to-br from-dark-gray to-black relative overflow-hidden"
            >
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-primary text-white px-3 py-1 rounded-full font-bold text-sm flex items-center gap-1">
                  <Shield size={14} />
                  AUTHENTIC
                </div>
              </div>
              
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={product.images[currentImageIndices[product.id]]} 
                  alt={`${product.name} image ${currentImageIndices[product.id] + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-60"></div>
                
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => handlePrevImage(product.id, product.images.length)}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={() => handleNextImage(product.id, product.images.length)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                      aria-label="Next image"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
                
                <div className="absolute top-4 right-4 bg-primary/90 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                  ${product.price.toFixed(2)}
                </div>
                
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
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-gray-400 text-sm">({product.reviews} reviews)</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors duration-300">
                  {product.name}
                </h3>
                
                <p className="text-gray-400 mb-4 leading-relaxed">
                  {product.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-primary mb-2">Key Features:</h4>
                  <ul className="space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index} className="text-gray-300 text-sm flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></div>
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
                
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
                    <div className="flex items-center">
                      <Shield size={16} className="mr-1 text-green-400" />
                      Secure Payment
                    </div>
                    <div className="flex items-center">
                      <Truck size={16} className="mr-1 text-blue-400" />
                      Fast Delivery
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-flex items-center justify-center space-x-8 p-6 bg-black/30 rounded-lg backdrop-blur-sm">
            <div className="flex items-center text-green-400">
              <Shield size={24} className="mr-2" />
              <div>
                <div className="font-semibold">100% Authentic</div>
                <div className="text-sm text-gray-400">Guaranteed genuine</div>
              </div>
            </div>
            <div className="flex items-center text-yellow-400">
              <Star size={24} className="mr-2" />
              <div>
                <div className="font-semibold">5-Star Rated</div>
                <div className="text-sm text-gray-400">Customer approved</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;