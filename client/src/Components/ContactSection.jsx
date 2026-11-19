import { useState } from 'react';
import { LoaderCircle, Mail, MapPin, Phone, Send } from 'lucide-react';
import { toast } from 'sonner';
import { submitContactForm } from '../services/api.js';
import { contactSchema } from '../validation/contactSchema.js';

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = contactSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(Object.fromEntries(Object.entries(fieldErrors).map(([key, messages]) => [key, messages?.[0]])));
      toast.error('Please check the highlighted fields.');
      return;
    }

    setErrors({});
    setIsSending(true);

    try {
      const response = await submitContactForm(result.data);
      setForm(initialForm);
      if (response?.notificationSent === false) {
        toast.warning('Your message was saved, but the email notification did not send. Please follow up by email.');
      } else {
        toast.success('Thanks for reaching out. Your message has been received.');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Your message could not be sent right now. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="section-title"><h1>Get in touch</h1></div>

      <div className="contact-section">
        <div className="contact-left">
          <h2>Let&apos;s talk</h2>
          <p>
            I&apos;m currently available to take on new projects. Feel free to send me a message about anything you&apos;d like to work on. You can contact me anytime.
          </p>

          <ul className="contact-info">
            {contactDetails.map(({ value, href, icon: Icon, label }) => (
              <li className="contact-details" key={label}>
                <Icon aria-hidden="true" />
                {href ? <a href={href}>{value}</a> : <span>{value}</span>}
              </li>
            ))}
          </ul>
        </div>

        <form className="contact-right" onSubmit={handleSubmit} noValidate>
          <label htmlFor="contact-name">Your Name</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Enter your name"
            maxLength={80}
            value={form.name}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
          />
          {errors.name && <p className="field-error" id="contact-name-error">{errors.name}</p>}

          <label htmlFor="contact-email">Your Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            maxLength={254}
            value={form.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
          />
          {errors.email && <p className="field-error" id="contact-email-error">{errors.email}</p>}

          <label htmlFor="contact-message">Write your message here</label>
          <textarea
            id="contact-message"
            name="message"
            rows={6}
            placeholder="Enter your message"
            maxLength={3000}
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

          <button className="contact-submit" type="submit" disabled={isSending}>
            {isSending ? <LoaderCircle size={17} className="spin-icon" aria-hidden="true" /> : <Send size={16} aria-hidden="true" />}
            {isSending ? 'Sending...' : 'Submit Now'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default ContactSection;
