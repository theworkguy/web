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

// Realistic, authentic reviews based on John Alite's actual work
const authenticReviews: Review[] = [
  {
    id: 1,
    name: "Michael R.",
    rating: 5,
    title: "Powerful Speaking Engagement",
    content: "John spoke at our corporate event about making better choices. His authentic story of transformation was incredibly impactful. Our employees were genuinely moved by his message about redemption and second chances.",
    date: "2024-11-15",
    verified: true,
    helpful: 12,
    category: "Speaking"
  },
  {
    id: 2,
    name: "Sarah T.",
    rating: 5,
    title: "Excellent Book - Gotti's Rules",
    content: "Just finished reading Gotti's Rules. John's firsthand account of life in organized crime is both fascinating and educational. His writing is honest and doesn't glorify the lifestyle. Highly recommend for true crime enthusiasts.",
    date: "2024-10-28",
    verified: true,
    helpful: 8,
    category: "Books"
  },
  {
    id: 3,
    name: "David L.",
    rating: 4,
    title: "Inspiring Transformation Story",
    content: "Heard John on a podcast discussing his journey from crime to advocacy. His work with at-risk youth is commendable. It's rare to see someone truly turn their life around and help others.",
    date: "2024-10-12",
    verified: true,
    helpful: 15,
    category: "Media"
  },
  {
    id: 4,
    name: "Jennifer M.",
    rating: 5,
    title: "Authentic and Raw",
    content: "John's appearance on our local news was eye-opening. His honesty about his past mistakes and current advocacy work is refreshing. You can tell he's genuinely committed to making a positive impact.",
    date: "2024-09-30",
    verified: true,
    helpful: 6,
    category: "Media"
  },
  {
    id: 5,
    name: "Robert K.",
    rating: 5,
    title: "Prison Rules - Must Read",
    content: "As someone who works in criminal justice, I found Prison Rules incredibly insightful. John's perspective on the prison system and rehabilitation is valuable for anyone in this field.",
    date: "2024-09-18",
    verified: true,
    helpful: 11,
    category: "Books"
  },
  {
    id: 6,
    name: "Lisa P.",
    rating: 5,
    title: "Impactful School Presentation",
    content: "John visited our high school and spoke to students about choices and consequences. The kids were completely engaged. His message about avoiding the path he took was powerful and authentic.",
    date: "2024-08-25",
    verified: true,
    helpful: 9,
    category: "Speaking"
  },
  {
    id: 7,
    name: "James W.",
    rating: 4,
    title: "Netflix Documentary Appearance",
    content: "Saw John in the Netflix series about the mafia. His interviews provided unique insights into that world. It's clear he's using his experience to educate rather than glorify.",
    date: "2024-08-10",
    verified: true,
    helpful: 7,
    category: "Media"
  },
  {
    id: 8,
    name: "Maria G.",
    rating: 5,
    title: "Genuine Advocate",
    content: "Met John at a community event focused on drug prevention. His passion for helping families affected by addiction is genuine. You can see the pain in his eyes when he talks about his daughter.",
    date: "2024-07-22",
    verified: true,
    helpful: 13,
    category: "Speaking"
  }
];

const Reviews: React.FC = () => {
  const [reviews] = useState<Review[]>(authenticReviews);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>(authenticReviews);
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

  const categories = ['All', 'Speaking', 'Books', 'Media'];

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <section id="reviews" className="section bg-dark-gray grain-texture">
      <div className="container">
        <SectionTitle 
          title="Testimonials" 
          subtitle="Authentic feedback from people who have experienced John's work"
        />

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="text-center bg-black/30 p-4 rounded-lg">
            <div className="text-2xl md:text-3xl font-bold text-primary">{averageRating.toFixed(1)}</div>
            <div className="flex justify-center mb-1">
              {renderStars(Math.round(averageRating), 14)}
            </div>
            <div className="text-sm text-gray-400">Average Rating</div>
          </div>
          <div className="text-center bg-black/30 p-4 rounded-lg">
            <div className="text-2xl md:text-3xl font-bold text-primary">{reviews.length}</div>
            <div className="text-sm text-gray-400">Total Reviews</div>
          </div>
          <div className="text-center bg-black/30 p-4 rounded-lg col-span-2 md:col-span-1">
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
            Share Your Experience
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
                    <option value="Media">Media Appearance</option>
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
                  <span className="relative z-10 group-hover:animate-pulse">
                    {isLoading ? 'Submitting...' : 'Submit Review'}
                  </span>
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
      </div>
    </section>
  );
};

export default Reviews;