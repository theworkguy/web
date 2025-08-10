import React, { useState, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
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
    <section id="book-john" className="section bg-black grain-texture">
      <div className="container max-w-4xl">
        <SectionTitle 
          title="Book John" 
          subtitle="Bring the raw truth to your audience."
        />
        
        <div className="card p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
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
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
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
              <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                Service Type
              </label>
              <select
                id="service"
                className="form-input"
                value={formData.service}
                onChange={handleChange}
                disabled={isLoading}
              >
                <option value="speaking">Speaking Engagement</option>
                <option value="consulting">Consulting</option>
                <option value="podcast">Podcast Appearance</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-2">
                Preferred Date
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
              <label htmlFor="details" className="block text-sm font-medium text-gray-300 mb-2">
                Event Details
              </label>
              <textarea
                id="details"
                rows={4}
                className="form-input"
                value={formData.details}
                onChange={handleChange}
                required
                disabled={isLoading}
              ></textarea>
            </div>
            
            <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
              {isLoading ? 'Submitting...' : '🎤 BOOK NOW - GET INSTANT QUOTE'}
            </Button>
            
            {status && (
              <p className={`text-center mt-4 ${status.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
                {status}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookJohn;