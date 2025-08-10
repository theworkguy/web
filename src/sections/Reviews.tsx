import React, { useState, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import { Star, User, Calendar, ThumbsUp, Filter, Search } from 'lucide-react';
import emailjs from 'emailjs-com';

interface Review {
  id: number;
  name: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
  helpful: number;
  category: string;
}

// Sample reviews data
const sampleReviews: Review[] = [
  {
    id: 1,
    name: "Michael Rodriguez",
    rating: 5,
    title: "Life-changing experience",
    content: "John's speaking engagement at our corporate event was absolutely incredible. His raw honesty about his past and journey to redemption left everyone speechless. The way he connects with the audience is unmatched. Highly recommend booking him!",
    date: "2024-12-15",
    verified: true,
    helpful: 47,
    category: "Speaking"
  },
  {
    id: 2,
    name: "Sarah Thompson",
    rating: 5,
    title: "Amazing merchandise quality",
    content: "Ordered the autographed baseball bat and I'm blown away by the quality. The signature is perfect and the certificate of authenticity gives me confidence. Fast shipping too! Worth every penny.",
    date: "2024-12-10",
    verified: true,
    helpful: 32,
    category: "Merchandise"
  },
  {
    id: 3,
    name: "David Chen",
    rating: 5,
    title: "Powerful books",
    content: "Read all of John's books and they're absolutely gripping. 'Gotti's Rules' especially opened my eyes to the reality behind organized crime. His writing style is engaging and honest.",
    date: "2024-12-08",
    verified: true,
    helpful: 28,
    category: "Books"
  },
  {
    id: 4,
    name: "Jennifer Martinez",
    rating: 5,
    title: "Inspiring transformation story",
    content: "As someone working in criminal justice reform, John's story is incredibly inspiring. His dedication to helping at-risk youth is genuine and impactful. Met him at a conference and he's the real deal.",
    date: "2024-12-05",
    verified: true,
    helpful: 41,
    category: "Speaking"
  },
  {
    id: 5,
    name: "Robert Johnson",
    rating: 5,
    title: "Excellent t-shirt quality",
    content: "The Journey t-shirt is fantastic quality. The design is unique and the fabric feels premium. Wearing it proudly to show support for second chances and redemption.",
    date: "2024-12-03",
    verified: true,
    helpful: 19,
    category: "Merchandise"
  },
  {
    id: 6,
    name: "Lisa Anderson",
    rating: 5,
    title: "Authentic and powerful",
    content: "John spoke at our university and it was the most impactful presentation we've ever had. Students were completely engaged. His message about choices and consequences really resonated.",
    date: "2024-11-28",
    verified: true,
    helpful: 35,
    category: "Speaking"
  }
];

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(sampleReviews);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>(sampleReviews);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    title: '',
    content: '',
    category: 'Speaking'
  });
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init('ceFfbNNJNC9zbuzGA');
  }, []);

  // Filter and search reviews
  useEffect(() => {
    let filtered = reviews;
    
    if (filterCategory !== 'All') {
      filtered = filtered.filter(review => review.category === filterCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(review => 
        review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sort reviews
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'highest':
          return b.rating - a.rating;
        case 'helpful':
          return b.helpful - a.helpful;
        default:
          return 0;
      }
    });
    
    setFilteredReviews(filtered);
  }, [reviews, filterCategory, searchTerm, sortBy]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('');

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: `New Review Submission:
      
Rating: ${formData.rating}/5 stars
Title: ${formData.title}
Category: ${formData.category}
Review: ${formData.content}`,
      to_email: 'johnaliteofficially@gmail.com',
    };

    emailjs.send(
      'service_9fehd8u',
      'template_ep8nfvm',
      templateParams
    )
      .then(() => {
        setStatus('Review submitted successfully! It will be published after moderation.');
        setFormData({
          name: '',
          email: '',
          rating: 5,
          title: '',
          content: '',
          category: 'Speaking'
        });
        setShowSubmitForm(false);
        setIsLoading(false);
      })
      .catch((error) => {
        setStatus('Failed to submit review. Please try again.');
        console.error('EmailJS error:', error);
        setIsLoading(false);
      });
  };

  const renderStars = (rating: number, size: number = 16) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={size}
        className={`${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const categories = ['All', 'Speaking', 'Books', 'Merchandise'];

  return (
    <section id="reviews" className="section bg-dark-gray grain-texture">
      <div className="container">
        <SectionTitle 
          title="Customer Reviews" 
          subtitle="See what people are saying about John Alite's work and impact"
        />

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="text-center bg-black/30 p-4 rounded-lg">
            <div className="text-2xl md:text-3xl font-bold text-primary">4.9</div>
            <div className="flex justify-center mb-1">
              {renderStars(5, 14)}
            </div>
            <div className="text-sm text-gray-400">Average Rating</div>
          </div>
          <div className="text-center bg-black/30 p-4 rounded-lg">
            <div className="text-2xl md:text-3xl font-bold text-primary">{reviews.length}</div>
            <div className="text-sm text-gray-400">Total Reviews</div>
          </div>
          <div className="text-center bg-black/30 p-4 rounded-lg">
            <div className="text-2xl md:text-3xl font-bold text-primary">98%</div>
            <div className="text-sm text-gray-400">Recommend</div>
          </div>
          <div className="text-center bg-black/30 p-4 rounded-lg">
            <div className="text-2xl md:text-3xl font-bold text-primary">100%</div>
            <div className="text-sm text-gray-400">Verified</div>
          </div>
        </div>

        {/* Submit Review Button */}
        <div className="text-center mb-8">
          <Button 
            onClick={() => setShowSubmitForm(!showSubmitForm)}
            variant="primary"
            className="text-lg px-8 py-4"
          >
            ✍️ Write a Review
          </Button>
        </div>

        {/* Submit Review Form */}
        {showSubmitForm && (
          <div className="card p-6 mb-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Share Your Experience</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="rating" className="block text-sm font-medium text-gray-300 mb-2">
                    Rating *
                  </label>
                  <select
                    id="rating"
                    name="rating"
                    className="form-input"
                    value={formData.rating}
                    onChange={handleChange}
                    disabled={isLoading}
                  >
                    <option value={5}>5 Stars - Excellent</option>
                    <option value={4}>4 Stars - Very Good</option>
                    <option value={3}>3 Stars - Good</option>
                    <option value={2}>2 Stars - Fair</option>
                    <option value={1}>1 Star - Poor</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="form-input"
                    value={formData.category}
                    onChange={handleChange}
                    disabled={isLoading}
                  >
                    <option value="Speaking">Speaking Engagement</option>
                    <option value="Books">Books</option>
                    <option value="Merchandise">Merchandise</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                  Review Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="form-input"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Summarize your experience"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Review *
                </label>
                <textarea
                  id="content"
                  name="content"
                  rows={4}
                  className="form-input"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Share your detailed experience..."
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button type="submit" variant="primary" className="flex-1" disabled={isLoading}>
                  {isLoading ? 'Submitting...' : '📝 Submit Review'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowSubmitForm(false)}
                  className="flex-1"
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </div>

              {status && (
                <p className={`text-center mt-4 ${status.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
                  {status}
                </p>
              )}
            </form>
          </div>
        )}

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search reviews..."
                className="form-input pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              className="form-input"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              className="form-input"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Rated</option>
              <option value="helpful">Most Helpful</option>
            </select>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {filteredReviews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No reviews found matching your criteria.</p>
            </div>
          ) : (
            filteredReviews.map((review) => (
              <div key={review.id} className="card p-6 hover:shadow-red-glow transition-shadow duration-300">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <User className="text-primary" size={24} />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <div>
                        <h4 className="font-bold text-lg">{review.name}</h4>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="flex items-center">
                            {renderStars(review.rating)}
                          </div>
                          {review.verified && (
                            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                              ✓ Verified
                            </span>
                          )}
                          <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full">
                            {review.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-400 text-sm">
                        <Calendar size={14} className="mr-1" />
                        {formatDate(review.date)}
                      </div>
                    </div>
                    
                    <h5 className="font-semibold text-primary mb-2">{review.title}</h5>
                    <p className="text-gray-300 mb-4 leading-relaxed">{review.content}</p>
                    
                    <div className="flex items-center justify-between">
                      <button className="flex items-center text-gray-400 hover:text-primary transition-colors duration-300">
                        <ThumbsUp size={16} className="mr-1" />
                        <span className="text-sm">Helpful ({review.helpful})</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Load More Button (placeholder for future pagination) */}
        {filteredReviews.length > 0 && (
          <div className="text-center mt-8">
            <p className="text-gray-400">Showing {filteredReviews.length} reviews</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;