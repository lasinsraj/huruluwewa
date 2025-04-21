
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <section className="section-spacing bg-white">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2">
            <h2 className="heading-2 text-hurulu-dark mb-4">Get in Touch</h2>
            <p className="text-lg text-gray-600 mb-8">
              Have questions about visiting Hurulu Wewa? Fill out the form and our team will get back to you shortly.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hurulu-teal focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hurulu-teal focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hurulu-teal focus:border-transparent"
                >
                  <option value="">Select a subject</option>
                  <option value="booking">Safari Booking</option>
                  <option value="inquiry">General Inquiry</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hurulu-teal focus:border-transparent"
                  placeholder="How can we help you?"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
          
          <div className="lg:w-1/2">
            <div className="h-64 md:h-80 lg:h-full rounded-lg overflow-hidden shadow-lg">
              <iframe
                title="Hurulu Wewa Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.55024608219!2d80.54768226729283!3d8.130713918878696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afcd5bf70cac095%3A0xd8b2f035f7ef4921!2sHurulu%20Eco%20Park!5e0!3m2!1sen!2sus!4v1713760323457!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            
            <div className="mt-8 space-y-4">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-hurulu-teal mt-1 mr-3" />
                <div>
                  <h4 className="font-medium text-hurulu-dark">Location</h4>
                  <p className="text-gray-600">Hurulu Eco Park, Habarana, Sri Lanka</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-hurulu-teal mt-1 mr-3" />
                <div>
                  <h4 className="font-medium text-hurulu-dark">Email</h4>
                  <p className="text-gray-600">info@huruluwewa.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-hurulu-teal mt-1 mr-3" />
                <div>
                  <h4 className="font-medium text-hurulu-dark">Phone</h4>
                  <p className="text-gray-600">+94 76 123 4567</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
