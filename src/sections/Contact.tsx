import React, { useState, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import { Instagram, Facebook, Youtube, X } from 'lucide-react';
import emailjs from 'emailjs-com';

// Custom TikTok SVG Icon Component (from Bootstrap Icons)
const TikTokIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    fill="currentColor"
    className={className}
    viewBox="0 0 16 16"
  >
    <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z"/>
  </svg>
);

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize EmailJS with User ID
  useEffect(() => {
    emailjs.init('ceFfbNNJNC9zbuzGA'); // Your EmailJS User ID (Public Key)
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id.replace('contact-', '')]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('');

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_email: 'johnaliteofficially@gmail.com',
    };

    emailjs.send(
      'service_9fehd8u', // Your Service ID
      'template_ep8nfvm', // Your Template ID
      templateParams
    )
      .then((response) => {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
        setIsLoading(false);
      })
      .catch((error) => {
        setStatus('Failed to send message. Please try again.');
        console.error('EmailJS error:', error.text || error.message || error);
        setIsLoading(false);
      });
  };

  return (
    <section id="contact" className="section bg-dark-gray grain-texture">
      <div className="container max-w-4xl">
        <SectionTitle 
          title="Get in Touch" 
          subtitle="Connect with John on social media or send a direct message."
        />
        
        <div className="flex justify-center space-x-6 mb-12">
          {[
            { 
              icon: Facebook, 
              href: 'https://www.facebook.com/truejohnalite', 
              label: 'Facebook',
              className: 'text-[#1877F2]'
            },
            { 
              icon: Instagram, 
              href: 'https://www.instagram.com/johnalite', 
              label: 'Instagram',
              className: 'text-[#E4405F]'
            },
            { 
              icon: TikTokIcon, 
              href: 'https://www.tiktok.com/@johnalite', 
              label: 'TikTok',
              className: 'text-[#000000]'
            },
            { 
              icon: Youtube, 
              href: 'https://www.youtube.com/@johnalite', 
              label: 'YouTube',
              className: 'text-[#FF0000]'
            },
            { 
              icon: X, 
              href: 'https://x.com/johnalite', 
              label: 'X',
              className: 'text-[#000000]'
            },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300 ${social.className}`}
              aria-label={social.label}
            >
              <social.icon className="filter drop-shadow-[0_0_8px_currentColor] w-8 h-8" />
            </a>
          ))}
        </div>
        
        <div className="card p-8 hover:shadow-red-glow transition-shadow duration-300">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="contact-name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="contact-email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="form-input"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={isLoading}
              ></textarea>
            </div>
            
            <Button type="submit" variant="primary" className="w-full group" disabled={isLoading}>
              <span className="relative z-10 group-hover:animate-pulse">
                {isLoading ? 'Sending...' : 'Send Message'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary to-primary-dark bg-[length:200%_100%] group-hover:animate-[gradient_2s_ease-in-out_infinite]"></div>
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

export default Contact;