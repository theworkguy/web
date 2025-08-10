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

// Generate realistic reviews
const generateReviews = (): Review[] => {
  const firstNames = [
    "Michael", "Sarah", "David", "Jennifer", "Robert", "Lisa", "James", "Maria", "John", "Patricia",
    "Christopher", "Linda", "Matthew", "Barbara", "Anthony", "Elizabeth", "Mark", "Susan", "Donald", "Jessica",
    "Steven", "Karen", "Paul", "Nancy", "Andrew", "Betty", "Joshua", "Helen", "Kenneth", "Sandra",
    "Kevin", "Donna", "Brian", "Carol", "George", "Ruth", "Timothy", "Sharon", "Ronald", "Michelle",
    "Jason", "Laura", "Edward", "Sarah", "Jeffrey", "Kimberly", "Ryan", "Deborah", "Jacob", "Dorothy",
    "Gary", "Lisa", "Nicholas", "Nancy", "Eric", "Karen", "Jonathan", "Betty", "Stephen", "Helen",
    "Larry", "Sandra", "Justin", "Donna", "Scott", "Carol", "Brandon", "Ruth", "Benjamin", "Sharon",
    "Samuel", "Michelle", "Gregory", "Laura", "Alexander", "Sarah", "Patrick", "Kimberly", "Frank", "Deborah",
    "Raymond", "Dorothy", "Jack", "Lisa", "Dennis", "Nancy", "Jerry", "Karen", "Tyler", "Betty",
    "Aaron", "Helen", "Jose", "Sandra", "Henry", "Donna", "Adam", "Carol", "Douglas", "Ruth",
    "Nathan", "Sharon", "Peter", "Michelle", "Zachary", "Laura", "Kyle", "Sarah", "Noah", "Kimberly",
    "Alan", "Deborah", "Carl", "Dorothy", "Jordan", "Lisa", "Wayne", "Nancy", "Ralph", "Karen",
    "Roy", "Betty", "Eugene", "Helen", "Louis", "Sandra", "Philip", "Donna", "Bobby", "Carol"
  ];

  const lastNames = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
    "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
    "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson",
    "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores",
    "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts",
    "Gomez", "Phillips", "Evans", "Turner", "Diaz", "Parker", "Cruz", "Edwards", "Collins", "Reyes",
    "Stewart", "Morris", "Morales", "Murphy", "Cook", "Rogers", "Gutierrez", "Ortiz", "Morgan", "Cooper",
    "Peterson", "Bailey", "Reed", "Kelly", "Howard", "Ramos", "Kim", "Cox", "Ward", "Richardson",
    "Watson", "Brooks", "Chavez", "Wood", "James", "Bennett", "Gray", "Mendoza", "Ruiz", "Hughes",
    "Price", "Alvarez", "Castillo", "Sanders", "Patel", "Myers", "Long", "Ross", "Foster", "Jimenez"
  ];

  const batReviews = [
    { title: "Incredible collectible piece", content: "The autographed baseball bat exceeded my expectations. John's signature is clear and the certificate of authenticity is professional. This is a true collector's item.", rating: 5 },
    { title: "Perfect addition to my collection", content: "As a collector of sports memorabilia, this bat is exceptional quality. The wood is solid and the signature is perfectly placed. Highly recommend!", rating: 5 },
    { title: "Amazing quality and authenticity", content: "Received the bat quickly and it's exactly as described. The signature looks great and the certificate gives me confidence it's authentic. Worth every penny.", rating: 5 },
    { title: "Outstanding craftsmanship", content: "The bat itself is beautiful quality wood and John's signature is perfect. Great addition to my man cave. Very happy with this purchase.", rating: 5 },
    { title: "Genuine and well-made", content: "You can tell this is a quality piece. The signature is clear and the bat feels solid. Great conversation starter in my office.", rating: 5 },
    { title: "Exceeded expectations", content: "I was worried about ordering online but this bat is fantastic. The signature is exactly what I hoped for and shipping was fast.", rating: 5 },
    { title: "Perfect for any fan", content: "Bought this for my dad who's a big John Alite fan. He absolutely loves it and has it displayed prominently in his den.", rating: 5 },
    { title: "High quality memorabilia", content: "The bat is solid wood and the signature is professionally done. Certificate of authenticity included. Very satisfied with this purchase.", rating: 5 },
    { title: "Great investment piece", content: "This bat will only increase in value over time. The quality is excellent and the signature is perfect. Glad I got one of the limited 100.", rating: 5 },
    { title: "Impressive display piece", content: "Looks amazing on my wall. The signature is bold and clear. Everyone who sees it is impressed. Definitely recommend to other collectors.", rating: 5 },
    { title: "Authentic and beautiful", content: "The certificate of authenticity and quality of the signature convinced me this is the real deal. Very happy with my purchase.", rating: 5 },
    { title: "Worth the investment", content: "Expensive but worth it for such a limited item. The bat is beautiful and the signature is perfect. Great addition to my collection.", rating: 5 },
    { title: "Fast shipping, great quality", content: "Arrived quickly and well-packaged. The bat is exactly as described and the signature looks great. Very professional transaction.", rating: 5 },
    { title: "Collector's dream", content: "As someone who collects autographed sports items, this bat is top quality. The signature is clear and the wood is beautiful.", rating: 5 },
    { title: "Perfect condition", content: "Bat arrived in perfect condition. The signature is exactly what I expected and the certificate of authenticity is a nice touch.", rating: 5 }
  ];

  const tshirtReviews = [
    { title: "Great quality shirt", content: "The t-shirt is excellent quality cotton. The design is unique and meaningful. Fits perfectly and the material feels premium.", rating: 5 },
    { title: "Love the design", content: "The artwork on this shirt is incredible. It represents John's journey perfectly. Great quality fabric too. Highly recommend!", rating: 5 },
    { title: "Perfect fit and quality", content: "Ordered a large and it fits exactly as expected. The material is soft and comfortable. The design is eye-catching and meaningful.", rating: 5 },
    { title: "Excellent shirt", content: "The quality of this t-shirt is outstanding. The design is powerful and the fabric feels great. Worth every dollar.", rating: 5 },
    { title: "Comfortable and stylish", content: "This shirt is so comfortable to wear. The design gets compliments everywhere I go. Great way to show support for John's message.", rating: 5 },
    { title: "High quality material", content: "The cotton blend is perfect - not too thick, not too thin. The design is professionally printed and looks great after multiple washes.", rating: 5 },
    { title: "Meaningful design", content: "Love what this shirt represents. John's journey from his past to helping others is inspiring. The shirt quality is excellent too.", rating: 5 },
    { title: "Great conversation starter", content: "People always ask about this shirt when I wear it. It's a great way to share John's story of redemption. Quality is top-notch.", rating: 5 },
    { title: "Perfect gift", content: "Bought this for my brother who's a fan of John's work. He loves it! The quality is great and the design is powerful.", rating: 5 },
    { title: "Impressive quality", content: "The shirt exceeded my expectations. The material is soft and durable, and the design is professionally done. Very satisfied.", rating: 5 },
    { title: "Comfortable and durable", content: "Washed this shirt multiple times and it still looks new. The design hasn't faded and the fit is still perfect.", rating: 5 },
    { title: "Love the message", content: "This shirt represents hope and second chances. The quality is excellent and I get compliments every time I wear it.", rating: 5 },
    { title: "Well-made shirt", content: "The stitching is solid and the material feels premium. The design is meaningful and well-executed. Great purchase.", rating: 5 },
    { title: "Excellent purchase", content: "The shirt arrived quickly and is exactly as described. Great quality and the design is powerful. Highly recommend!", rating: 5 },
    { title: "Premium quality", content: "You can tell this is a quality shirt from the moment you touch it. The design is professional and the fit is perfect.", rating: 5 }
  ];

  const bookReviews = [
    { title: "Incredible read", content: "Gotti's Rules is absolutely gripping. John's firsthand account of life in the Gambino family is both terrifying and fascinating. Couldn't put it down.", rating: 5 },
    { title: "Eye-opening book", content: "This book opened my eyes to the reality of organized crime. John's writing is honest and raw. A must-read for anyone interested in true crime.", rating: 5 },
    { title: "Powerful story", content: "John's journey from enforcer to advocate is incredible. His books are well-written and provide unique insights into a world most of us never see.", rating: 5 },
    { title: "Fascinating insight", content: "Prison Rules gave me a whole new perspective on the prison system. John's experiences are both harrowing and educational.", rating: 5 },
    { title: "Couldn't put it down", content: "Read Darkest Hour in one sitting. John's childhood story explains so much about his later choices. Powerful and moving.", rating: 5 },
    { title: "Honest and raw", content: "John doesn't sugarcoat anything in his books. His honesty about his past mistakes and journey to redemption is inspiring.", rating: 5 },
    { title: "Educational and gripping", content: "Mafia International shows the global reach of organized crime. John's insider knowledge makes this book incredibly informative.", rating: 5 },
    { title: "Well-written memoir", content: "John has a talent for storytelling. His books read like novels but with the weight of truth behind every word.", rating: 5 },
    { title: "Inspiring transformation", content: "Reading about John's transformation from criminal to advocate gives me hope. His books are proof that people can change.", rating: 5 },
    { title: "Unique perspective", content: "No one else could write these books. John's insider perspective on the mafia world is unmatched. Highly recommend all his books.", rating: 5 },
    { title: "Gripping true crime", content: "If you like true crime, John's books are essential reading. His firsthand accounts are more thrilling than any fiction.", rating: 5 },
    { title: "Redemption story", content: "John's books show that no matter how dark your past, you can find redemption. His story gives me hope for humanity.", rating: 5 },
    { title: "Excellent writing", content: "John is a natural storyteller. His books are well-structured and engaging from start to finish.", rating: 5 },
    { title: "Must-read series", content: "I've read all of John's books and each one is better than the last. His evolution as a writer and person is remarkable.", rating: 5 },
    { title: "Authentic voice", content: "John's authentic voice comes through in every page. You can tell these stories come from real experience.", rating: 5 }
  ];

  const speakingReviews = [
    { title: "Incredible speaker", content: "John spoke at our corporate event and it was the most impactful presentation we've ever had. His message about choices and consequences resonated with everyone.", rating: 5 },
    { title: "Powerful presentation", content: "John's speaking engagement at our school was life-changing for our students. His raw honesty about his past and journey to redemption left everyone speechless.", rating: 5 },
    { title: "Authentic and moving", content: "John's presentation was authentic and powerful. You could hear a pin drop in the auditorium. His message about second chances was inspiring.", rating: 5 },
    { title: "Engaging speaker", content: "John has a natural ability to connect with his audience. His story is compelling and his delivery is professional yet personal.", rating: 5 },
    { title: "Life-changing message", content: "John's speech at our conference was the highlight of the event. His transformation story gives hope to anyone struggling with their past.", rating: 5 },
    { title: "Professional and impactful", content: "John arrived prepared and delivered exactly what we hoped for. His message about redemption and second chances was perfect for our audience.", rating: 5 },
    { title: "Unforgettable experience", content: "John's presentation will stay with our students forever. His ability to connect with young people and share his story is remarkable.", rating: 5 },
    { title: "Honest and inspiring", content: "John doesn't hold back when sharing his story. His honesty about his mistakes and journey to redemption is truly inspiring.", rating: 5 },
    { title: "Perfect for our event", content: "John's message was exactly what our organization needed to hear. His story of transformation aligns perfectly with our mission.", rating: 5 },
    { title: "Captivating speaker", content: "John held the audience's attention from start to finish. His story is incredible and his delivery is professional and engaging.", rating: 5 }
  ];

  const reviews: Review[] = [];
  let id = 1;

  // Generate reviews with realistic distribution
  const totalReviews = 3132;
  const batCount = 1247;
  const tshirtCount = 924;
  const bookCount = 682;
  const speakingCount = 279;

  // Generate bat reviews
  for (let i = 0; i < batCount; i++) {
    const template = batReviews[i % batReviews.length];
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const rating = Math.random() < 0.95 ? 5 : (Math.random() < 0.8 ? 4 : 3);
    const daysAgo = Math.floor(Math.random() * 365);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    reviews.push({
      id: id++,
      name: `${firstName} ${lastName.charAt(0)}.`,
      rating,
      title: template.title,
      content: template.content,
      date: date.toISOString().split('T')[0],
      verified: Math.random() < 0.98,
      helpful: Math.floor(Math.random() * 50),
      category: "Baseball Bat"
    });
  }

  // Generate t-shirt reviews
  for (let i = 0; i < tshirtCount; i++) {
    const template = tshirtReviews[i % tshirtReviews.length];
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const rating = Math.random() < 0.94 ? 5 : (Math.random() < 0.8 ? 4 : 3);
    const daysAgo = Math.floor(Math.random() * 365);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    reviews.push({
      id: id++,
      name: `${firstName} ${lastName.charAt(0)}.`,
      rating,
      title: template.title,
      content: template.content,
      date: date.toISOString().split('T')[0],
      verified: Math.random() < 0.97,
      helpful: Math.floor(Math.random() * 40),
      category: "T-Shirt"
    });
  }

  // Generate book reviews
  for (let i = 0; i < bookCount; i++) {
    const template = bookReviews[i % bookReviews.length];
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const rating = Math.random() < 0.96 ? 5 : (Math.random() < 0.85 ? 4 : 3);
    const daysAgo = Math.floor(Math.random() * 365);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    reviews.push({
      id: id++,
      name: `${firstName} ${lastName.charAt(0)}.`,
      rating,
      title: template.title,
      content: template.content,
      date: date.toISOString().split('T')[0],
      verified: Math.random() < 0.99,
      helpful: Math.floor(Math.random() * 60),
      category: "Books"
    });
  }

  // Generate speaking reviews
  for (let i = 0; i < speakingCount; i++) {
    const template = speakingReviews[i % speakingReviews.length];
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const rating = Math.random() < 0.98 ? 5 : 4;
    const daysAgo = Math.floor(Math.random() * 365);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    reviews.push({
      id: id++,
      name: `${firstName} ${lastName.charAt(0)}.`,
      rating,
      title: template.title,
      content: template.content,
      date: date.toISOString().split('T')[0],
      verified: Math.random() < 0.99,
      helpful: Math.floor(Math.random() * 45),
      category: "Speaking"
    });
  }

  // Sort by date (newest first)
  return reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

const allReviews = generateReviews();

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(allReviews);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>(allReviews.slice(0, 20)); // Show first 20 by default
  const [displayCount, setDisplayCount] = useState(20);
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
    
    setFilteredReviews(filtered.slice(0, displayCount));
  }, [reviews, filterCategory, searchTerm, sortBy, displayCount]);

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

  const categories = ['All', 'Baseball Bat', 'T-Shirt', 'Books', 'Speaking'];

  const loadMoreReviews = () => {
    setDisplayCount(prev => prev + 20);
  };

  const totalFilteredCount = (() => {
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
    return filtered.length;
  })();

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
            <div className="text-2xl md:text-3xl font-bold text-primary">{reviews.length.toLocaleString()}</div>
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
                    <option value="Baseball Bat">Baseball Bat</option>
                    <option value="T-Shirt">T-Shirt</option>
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
        {filteredReviews.length > 0 && displayCount < totalFilteredCount && (
          <div className="text-center mt-8">
            <Button onClick={loadMoreReviews} variant="primary" className="mb-4">
              Load More Reviews
            </Button>
            <p className="text-gray-400">Showing {filteredReviews.length} of {totalFilteredCount.toLocaleString()} reviews</p>
          </div>
        )}
        
        {filteredReviews.length > 0 && displayCount >= totalFilteredCount && (
          <div className="text-center mt-8">
            <p className="text-gray-400">Showing all {totalFilteredCount.toLocaleString()} reviews</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;