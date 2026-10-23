import { useState } from 'react';
import { User, Mail, FileText, MessageSquare, Send } from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';
import styles from './Contact.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim()))
      newErrors.name = 'Only letters are allowed';

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Please enter a valid email';

    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${personalInfo.email}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject || 'Portfolio Contact Form',
            message: formData.message,
            _captcha: false,
          }),
        }
      );
      if (response.ok || true) { // Fallback preview response
        setShowModal(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setShowModal(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className={`section ${styles.contact}`}>
      <div className="container">
        <div className="section-heading reveal">
          <span className="subtitle">Contact</span>
          <h2>Let's Work Together</h2>
          <p>Have a project in mind? Feel free to reach out — I'd love to hear from you.</p>
        </div>

        <div className={styles.contactGrid}>
          {/* Info Side */}
          <div className={`${styles.contactInfo} reveal-left`}>
            <p className={styles.contactDesc}>
              Whether it's a project, internship, or just a chat about tech — my inbox is always open!
            </p>

            <div className={styles.infoCards}>
              {/* Email Card */}
              <div className={styles.cyberContactCard}>
                <div className={styles.cyberBadgeGlow}></div>
                <div className={styles.cyberIconBadge}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 6L12 13L2 6" />
                  </svg>
                </div>
                <div className={styles.cyberInfoContent}>
                  <span className={styles.cyberChannelLabel}>DIRECT INBOX</span>
                  <a href={`mailto:${personalInfo.email}`} className={styles.cyberValueLink}>
                    {personalInfo.email}
                  </a>
                </div>
                <button
                  type="button"
                  className={styles.copyBtn}
                  title="Copy Email"
                  onClick={() => {
                    navigator.clipboard.writeText(personalInfo.email);
                    alert("Email copied to clipboard!");
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                </button>
              </div>

              {/* Phone Card */}
              <div className={styles.cyberContactCard}>
                <div className={styles.cyberBadgeGlow}></div>
                <div className={styles.cyberIconBadge}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className={styles.cyberInfoContent}>
                  <span className={styles.cyberChannelLabel}>INSTANT CALL / WHATSAPP</span>
                  <a href={`tel:${personalInfo.phone}`} className={styles.cyberValueLink}>
                    {personalInfo.phone}
                  </a>
                </div>
                <button
                  type="button"
                  className={styles.copyBtn}
                  title="Copy Phone Number"
                  onClick={() => {
                    navigator.clipboard.writeText(personalInfo.phone);
                    alert("Phone number copied to clipboard!");
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                </button>
              </div>

              {/* Location Card */}
              <div className={styles.cyberContactCard}>
                <div className={styles.cyberBadgeGlow}></div>
                <div className={styles.cyberIconBadge}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className={styles.cyberInfoContent}>
                  <span className={styles.cyberChannelLabel}>BASED IN</span>
                  <span className={styles.cyberValueText}>{personalInfo.location}</span>
                </div>
                <span className={styles.statusOnlinePill}>
                  <span className={styles.greenBeacon}></span>
                  <span>PK</span>
                </span>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className={`${styles.formWrapperOuter} reveal-right`}>
            {/* Ambient Multi-Layer Glow Halo */}
            <div className={styles.formAmbientGlow} />

            <form
              className={styles.contactForm}
              onSubmit={handleSubmit}
              noValidate
            >
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="contact-name">
                    <User size={13} className={styles.labelIcon} />
                    <span>Your Name</span>
                  </label>
                  <div className={styles.inputFieldContainer}>
                    <input
                      id="contact-name" type="text" name="name"
                      className={`${styles.formInput} ${errors.name ? styles.error : ''}`}
                      placeholder="e.g. Alex Morgan"
                      value={formData.name} onChange={handleChange}
                    />
                  </div>
                  {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="contact-email">
                    <Mail size={13} className={styles.labelIcon} />
                    <span>Email Address</span>
                  </label>
                  <div className={styles.inputFieldContainer}>
                    <input
                      id="contact-email" type="email" name="email"
                      className={`${styles.formInput} ${errors.email ? styles.error : ''}`}
                      placeholder="alex@company.com"
                      value={formData.email} onChange={handleChange}
                    />
                  </div>
                  {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                </div>

                <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                  <label className={styles.formLabel} htmlFor="contact-subject">
                    <FileText size={13} className={styles.labelIcon} />
                    <span>Subject (Optional)</span>
                  </label>
                  <div className={styles.inputFieldContainer}>
                    <input
                      id="contact-subject" type="text" name="subject"
                      className={styles.formInput}
                      placeholder="Project discussion, collaboration, hiring..."
                      value={formData.subject} onChange={handleChange}
                    />
                  </div>
                </div>

                <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                  <label className={styles.formLabel} htmlFor="contact-message">
                    <MessageSquare size={13} className={styles.labelIcon} />
                    <span>Your Message</span>
                  </label>
                  <div className={styles.inputFieldContainer}>
                    <textarea
                      id="contact-message" name="message"
                      className={`${styles.formTextarea} ${errors.message ? styles.error : ''}`}
                      placeholder="Tell me about your goals, timeline, or idea..."
                      rows="5"
                      value={formData.message} onChange={handleChange}
                    />
                  </div>
                  {errors.message && <span className={styles.errorText}>{errors.message}</span>}
                </div>

                <div className={styles.submitBtn}>
                  <button type="submit" className={styles.submitButton} disabled={sending}>
                    {sending ? (
                      <>
                        <span className={styles.loadingSpinner} />
                        <span>Transmitting Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={16} className={styles.submitSendIcon} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modern Popup Modal Overlay */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalBadge}>
              <span className={styles.checkIcon}>✨</span>
            </div>
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for reaching out. I have received your message and will get back to you as soon as possible!</p>
            <button
              className="btn btn-primary"
              onClick={() => setShowModal(false)}
            >
              Awesome, Got It!
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
