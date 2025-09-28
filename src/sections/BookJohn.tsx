import React, { useState, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import { Star, Users, Award, Clock } from 'lucide-react';
import emailjs from 'emailjs-com';

const BookJohn: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'speaking',
    date: '',
    details: '',
  });
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize EmailJS with User ID
  useEffect(() => {
    emailjs.init('ceFfbNNJNC9zbuzGA'); // Your EmailJS User ID (Public Key)
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('');

    // Combine booking-specific fields into the message field to match the Contact template
    const messageContent = `
      Service Type: ${formData.service}
      Preferred Date: ${formData.date}
      Event Details: ${formData.details}
    `;

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: messageContent.trim(),
      to_email: 'johnaliteofficially@gmail.com',
    };

    emailjs.send(
      'service_9fehd8u', // Your Service ID
      'template_ep8nfvm', // Using the provided Template ID (same as Contact)
      templateParams
    )
      .then((response) => {
        setStatus('Booking request sent successfully!');
        setFormData({ name: '', email: '', service: 'speaking', date: '', details: '' });
        setIsLoading(false);
      })
      .catch((error) => {
        setStatus('Failed to send booking request. Please try again.');
        console.error('EmailJS error:', error.text || error.message || error);
        setIsLoading(false);
      });
  };

  return (
    <section id="book-john" className="section bg-gradient-to-b from-dark-gray via-black to-dark-gray relative overflow-hidden">
      <div className="container max-w-4xl">
        <SectionTitle 
          title="BOOK JOHN ALITE" 
          subtitle="Professional speaking engagements, corporate events, and educational presentations."
        />
        
        {/* Social Proof Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="testimonial-card p-6 rounded-2xl text-center">
            <Star className="w-8 h-8 text-gold mx-auto mb-3" />
            <div className="text-2xl font-black text-gold">Professional</div>
            <div className="text-gray-400">Speaker</div>
          </div>
          <div className="testimonial-card p-6 rounded-2xl text-center">
            <Users className="w-8 h-8 text-primary mx-auto mb-3" />
            <div className="text-2xl font-black text-primary">Experienced</div>
            <div className="text-gray-400">Presenter</div>
          </div>
          <div className="testimonial-card p-6 rounded-2xl text-center">
            <Award className="w-8 h-8 text-gold mx-auto mb-3" />
            <div className="text-2xl font-black text-gold">Authentic</div>
            <div className="text-gray-400">Story</div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="testimonial-card p-8 rounded-2xl mb-8 text-center">
          <div className="flex justify-center mb-4">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} className="w-6 h-6 text-gold fill-current" />
            ))}
          </div>
          <p className="text-xl italic text-white mb-4">
            "John's presentation was incredibly impactful. His authentic story of transformation and redemption resonated deeply with our audience. Highly professional and engaging."
          </p>
          <p className="text-gold font-bold">- Event Organizer</p>
        </div>
        
        <div className="card p-8 md:p-12 border-2 border-gold/30">
          <h3 className="text-2xl md:text-3xl font-black text-center mb-8 text-gold gold-glow">REQUEST BOOKING INFORMATION</h3>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-base font-bold text-white mb-3">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-base font-bold text-white mb-3">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="service" className="block text-base font-bold text-white mb-3">
                Event Type *
              </label>
              <select
                id="service"
                className="form-input"
                value={formData.service}
                onChange={handleChange}
                disabled={isLoading}
              >
                <option value="speaking">Speaking Engagement</option>
                <option value="keynote">Keynote Speaker</option>
                <option value="corporate">Corporate Training</option>
                <option value="school">School/University</option>
                <option value="podcast">Podcast Appearance</option>
                <option value="consulting">Consulting</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="date" className="block text-base font-bold text-white mb-3">
                Preferred Date *
              </label>
              <input
                type="date"
                id="date"
                className="form-input"
                value={formData.date}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
            
            <div>
              <label htmlFor="details" className="block text-base font-bold text-white mb-3">
                Event Details & Requirements *
              </label>
              <textarea
                id="details"
                rows={5}
                className="form-input"
                placeholder="Please provide details about your event, audience size, venue, and any specific requirements..."
                value={formData.details}
                onChange={handleChange}
                required
                disabled={isLoading}
              ></textarea>
            </div>
            
            <Button type="submit" variant="gold" className="w-full text-xl py-6" disabled={isLoading}>
              <span className="flex items-center justify-center gap-3">
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
                    SUBMITTING REQUEST...
                  </>
                ) : (
                  <>
                    <Clock size={24} />
                    SUBMIT BOOKING REQUEST
                    <Clock size={24} />
                  </>
                )}
              </span>
            </Button>
            
            {status && (
              <p className={`text-center mt-6 text-lg font-bold ${status.includes('successfully') ? 'text-green-400' : 'text-red-400'}`}>
                {status}
              </p>
            )}
          </form>
          
          {/* Additional Info */}
          <div className="mt-8 pt-8 border-t border-gold/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
              <div>
                <h4 className="font-black text-white mb-2">RESPONSE TIME</h4>
                <p className="text-gold font-bold">Within 48 Hours</p>
              </div>
              <div>
                <h4 className="font-black text-white mb-2">PROFESSIONAL SERVICE</h4>
                <p className="text-gold font-bold">Guaranteed Quality</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookJohn;