import { useState } from 'react';
import { ArrowUpRight, LoaderCircle, Mail, MapPin, Phone, Send } from 'lucide-react';
import { toast } from 'sonner';
import { submitContactForm } from '../services/api.js';
import { contactSchema } from '../validation/contactSchema.js';
import Reveal from './Reveal.jsx';

const initialForm = { name: '', email: '', message: '' };
const contactDetails = [
  { value: 'smiliesanjay@gmail.com', href: 'mailto:smiliesanjay@gmail.com', icon: Mail, label: 'Email' },
  { value: '+91 97900 68659', href: 'tel:+919790068659', icon: Phone, label: 'Phone' },
  { value: 'Coimbatore, Tamil Nadu', href: null, icon: MapPin, label: 'Location' },
];

function ContactSection() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', type: 'success' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    if (feedback.message) setFeedback({ message: '', type: 'success' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = contactSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(Object.fromEntries(Object.entries(fieldErrors).map(([key, messages]) => [key, messages?.[0]])));
      setFeedback({ message: 'Please check the highlighted fields and try again.', type: 'error' });
      toast.error('Please check the highlighted fields.');
      return;
    }

    setErrors({});
    setFeedback({ message: '', type: 'success' });
    setIsSending(true);

    try {
      const response = await submitContactForm(result.data);
      setForm(initialForm);
      if (response?.notificationSent === false) {
        const message = 'Your message was saved, but the email notification did not send. Please follow up by email.';
        setFeedback({ message, type: 'warning' });
        toast.warning(message);
      } else {
        const message = 'Thanks for reaching out. Your message has been received.';
        setFeedback({ message, type: 'success' });
        toast.success(message);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Your message could not be sent right now. Please try again.';
      setFeedback({ message, type: 'error' });
      toast.error(message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="section-wrap section-contact">
      <div className="content-width contact-panel">
        <Reveal className="contact-layout">
          <div className="contact-copy">
            <p className="eyebrow">Get in touch</p>
            <h2>Let&apos;s work<br />together<span>.</span></h2>
            <p className="contact-intro">Feel free to reach out for any project or collaboration.</p>
            <a className="button button-primary contact-email-cta" href="#contact-name">
              Send Message <ArrowUpRight size={16} aria-hidden="true" />
            </a>

            <ul className="contact-info">
              {contactDetails.map(({ value, href, icon: Icon, label }) => (
                <li key={label}>
                  <span className="contact-info-icon"><Icon size={17} aria-hidden="true" /></span>
                  <span><small>{label}</small>{href ? <a href={href}>{value}</a> : <span>{value}</span>}</span>
                </li>
              ))}
            </ul>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-heading">
              <span>Send a message</span>
              <span>Usually replies by email</span>
            </div>

            <div className="form-field">
              <label htmlFor="contact-name">Your name</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Enter your name"
                maxLength={80}
                required
                value={form.name}
                onChange={handleChange}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
              />
              {errors.name && <p className="field-error" id="contact-name-error">{errors.name}</p>}
            </div>

            <div className="form-field">
              <label htmlFor="contact-email">Your email</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                maxLength={254}
                required
                value={form.email}
                onChange={handleChange}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'contact-email-error' : undefined}
              />
              {errors.email && <p className="field-error" id="contact-email-error">{errors.email}</p>}
            </div>

            <div className="form-field">
              <label htmlFor="contact-message">Your message</label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder="Tell me a little about what you have in mind..."
                maxLength={3000}
                required
                value={form.message}
                onChange={handleChange}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'contact-message-error' : 'message-count'}
              />
              {errors.message ? (
                <p className="field-error" id="contact-message-error">{errors.message}</p>
              ) : (
                <p className="message-count" id="message-count">{form.message.length}/3000</p>
              )}
            </div>

            {feedback.message && (
              <p className={`form-feedback ${feedback.type}`} role={feedback.type === 'error' ? 'alert' : 'status'} aria-live="polite">
                {feedback.message}
              </p>
            )}

            <button className="button button-primary contact-submit" type="submit" disabled={isSending}>
              {isSending ? <LoaderCircle size={17} className="spin-icon" aria-hidden="true" /> : <Send size={16} aria-hidden="true" />}
              {isSending ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export default ContactSection;
