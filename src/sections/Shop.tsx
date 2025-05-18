import React, { useState, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import { Timer, AlertCircle } from 'lucide-react';

const products = [
  {
    id: 1,
    name: "Signed Baseball Bat",
    description: "Exclusively signed by John Alite, limited to 100 bats.",
    images: ["https://nypost.com/wp-content/uploads/sites/2/2023/11/john-alite-regular-price-200-72488159.jpg"],
    price: 185.00,
    isPreSale: true,
    shippingDate: "June 15, 2025",
    limitedQuantity: 100,
    remainingQuantity: 30,
  },
  {
    id: 2,
    name: "Limited Edition T-Shirt",
    description: "Exclusive T-shirt from John's personal collection, featuring a bold design inspired by his journey.",
    images: [
      "https://i.postimg.cc/hG2N5Z40/Se-Shpejti-ne-storm-al-Limited-Edition-JA.jpg",
      "https://i.postimg.cc/qRgWVczH/Se-Shpejti-ne-storm-al-Limited-Edition-JA-1.jpg",
      "https://i.postimg.cc/KzVwZKMk/Se-Shpejti-ne-storm-al-Limited-Edition-JA-2.jpg",
    ],
    price: 29.99,
  },
];

const Shop: React.FC = () => {
  const [currentImageIndices, setCurrentImageIndices] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = 0;
      return acc;
    }, {})
  );

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const shipDate = new Date('June 15, 2025');
      const now = new Date();
      const difference = shipDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
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

  return (
    <section id="shop" className="section bg-dark-gray metal-texture relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent pointer-events-none"></div>
      
      <div className="container relative">
        <SectionTitle 
          title="Official Shop" 
          subtitle="Exclusive merchandise and collectibles from John's personal collection."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {products.map((product) => (
            <div 
              key={product.id} 
              className={`card group hover:shadow-red-glow transition-all duration-300 bg-gradient-to-br from-dark-gray to-black relative overflow-hidden ${
                product.isPreSale ? 'md:col-span-2' : ''
              }`}
            >
              {product.isPreSale && (
                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-primary text-white px-4 py-2 rounded-full font-bold flex items-center gap-2 animate-pulse">
                    <AlertCircle size={18} />
                    PRE-SALE
                  </div>
                </div>
              )}
              
              <div className="relative aspect-square md:aspect-video overflow-hidden">
                <img 
                  src={product.images[currentImageIndices[product.id]]} 
                  alt={`${product.name} image ${currentImageIndices[product.id] + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60"></div>
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => handlePrevImage(product.id, product.images.length)}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      &lt;
                    </button>
                    <button
                      onClick={() => handleNextImage(product.id, product.images.length)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      &gt;
                    </button>
                  </>
                )}
                <div className="absolute top-4 right-4 bg-primary/90 text-white px-3 py-1 rounded-full font-bold">
                  ${product.price.toFixed(2)}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-gray-400 mb-4">{product.description}</p>
                
                {product.isPreSale && (
                  <div className="mb-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-primary">
                        <Timer size={18} />
                        <span className="font-semibold">Limited Pre-Sale</span>
                      </div>
                      <div className="text-primary font-bold animate-pulse">
                        Only {product.remainingQuantity} left!
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      <div className="text-center p-2 bg-black/30 rounded">
                        <div className="text-2xl font-bold text-primary">{timeLeft.days}</div>
                        <div className="text-xs text-gray-400">Days</div>
                      </div>
                      <div className="text-center p-2 bg-black/30 rounded">
                        <div className="text-2xl font-bold text-primary">{timeLeft.hours}</div>
                        <div className="text-xs text-gray-400">Hours</div>
                      </div>
                      <div className="text-center p-2 bg-black/30 rounded">
                        <div className="text-2xl font-bold text-primary">{timeLeft.minutes}</div>
                        <div className="text-xs text-gray-400">Mins</div>
                      </div>
                      <div className="text-center p-2 bg-black/30 rounded">
                        <div className="text-2xl font-bold text-primary">{timeLeft.seconds}</div>
                        <div className="text-xs text-gray-400">Secs</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>Ships on {product.shippingDate}</span>
                      <span className="text-primary font-semibold">{Math.round((product.remainingQuantity / product.limitedQuantity) * 100)}% remaining</span>
                    </div>
                  </div>
                )}
                
                <Button 
                  variant="primary" 
                  className="w-full group overflow-hidden relative"
                >
                  <span className="relative z-10 group-hover:animate-pulse">
                    {product.isPreSale ? 'Pre-Order Now' : 'Add to Cart'}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary to-primary-dark bg-[length:200%_100%] group-hover:animate-[gradient_2s_ease-in-out_infinite]"></div>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Shop;