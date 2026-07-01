import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, Linkedin, Github } from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

const CONTACT_INFO = [
  { icon: Mail, label: 'Email', value: 'whendyadicipta@gmail.com' },
  { icon: Phone, label: 'WhatsApp', value: '+62 xxx xxxx xxxx' },
  { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/whendy' },
  { icon: Github, label: 'GitHub', value: 'github.com/whendyadicipta' },
];

const SOCIAL_LINKS = [
  { icon: Github, label: 'GitHub', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Mail, label: 'Email', href: 'mailto:whendyadicipta@gmail.com' },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const elements = section.querySelectorAll('.contact-animate');
      gsap.fromTo(
        elements,
        { opacity: 0, y: 30, filter: 'blur(12px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const inputStyle: React.CSSProperties = {
    background: 'rgba(75, 131, 242, 0.05)',
    border: '1px solid rgba(75, 131, 242, 0.15)',
    borderRadius: 12,
    padding: '14px 16px',
    color: '#FFFFFF',
    fontSize: '1rem',
    lineHeight: 1.6,
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-gap container-pad"
      style={{
        background: 'radial-gradient(ellipse at center, #0B1120 0%, #0F1A30 100%)',
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Header */}
        <div className="text-center">
          <p
            className="contact-animate section-label"
            style={{ opacity: 0, willChange: 'transform, opacity' }}
          >
            GET IN TOUCH
          </p>
          <h2
            className="contact-animate text-display-m text-white font-display mt-3"
            style={{ opacity: 0, willChange: 'transform, opacity' }}
          >
            Let's Connect
          </h2>
          <p
            className="contact-animate text-body-l mt-4 mx-auto"
            style={{ color: '#5B7EB3', maxWidth: 500, opacity: 0, willChange: 'transform, opacity' }}
          >
            I'm open to collaboration and new opportunities
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          {/* Left - Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="contact-animate glassmorphism-card p-8"
            style={{ opacity: 0, willChange: 'transform, opacity' }}
          >
            <div className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: '#5B7EB3' }}>
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  style={inputStyle}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#4B83F2';
                    e.currentTarget.style.background = 'rgba(75, 131, 242, 0.08)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(75, 131, 242, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(75, 131, 242, 0.15)';
                    e.currentTarget.style.background = 'rgba(75, 131, 242, 0.05)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: '#5B7EB3' }}>
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  style={inputStyle}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#4B83F2';
                    e.currentTarget.style.background = 'rgba(75, 131, 242, 0.08)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(75, 131, 242, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(75, 131, 242, 0.15)';
                    e.currentTarget.style.background = 'rgba(75, 131, 242, 0.05)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: '#5B7EB3' }}>
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Message subject"
                  style={inputStyle}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#4B83F2';
                    e.currentTarget.style.background = 'rgba(75, 131, 242, 0.08)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(75, 131, 242, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(75, 131, 242, 0.15)';
                    e.currentTarget.style.background = 'rgba(75, 131, 242, 0.05)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: '#5B7EB3' }}>
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Your message..."
                  style={{
                    ...inputStyle,
                    resize: 'vertical',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#4B83F2';
                    e.currentTarget.style.background = 'rgba(75, 131, 242, 0.08)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(75, 131, 242, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(75, 131, 242, 0.15)';
                    e.currentTarget.style.background = 'rgba(75, 131, 242, 0.05)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-body text-base font-semibold text-white transition-all duration-300 hover:scale-[1.01]"
                style={{ background: '#4B83F2' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#8CB4FF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#4B83F2';
                }}
              >
                Send Message
              </button>
            </div>
          </form>

          {/* Right - Contact Info */}
          <div
            className="contact-animate flex flex-col gap-6"
            style={{ opacity: 0, willChange: 'transform, opacity' }}
          >
            {CONTACT_INFO.map((info) => {
              const IconComponent = info.icon;
              return (
                <div key={info.label} className="flex items-center gap-4">
                  <div
                    className="flex-shrink-0 flex items-center justify-center rounded-full"
                    style={{
                      width: 40,
                      height: 40,
                      background: 'rgba(75, 131, 242, 0.06)',
                    }}
                  >
                    <IconComponent size={20} style={{ color: '#8CB4FF' }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: '#5B7EB3' }}>
                      {info.label}
                    </p>
                    <p className="text-base text-white">{info.value}</p>
                  </div>
                </div>
              );
            })}

            {/* Social Buttons */}
            <div className="flex items-center gap-3 mt-4">
              {SOCIAL_LINKS.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="flex items-center justify-center transition-all duration-300 hover:scale-105"
                    style={{
                      width: 48,
                      height: 48,
                      background: 'rgba(75, 131, 242, 0.06)',
                      border: '1px solid rgba(75, 131, 242, 0.15)',
                      borderRadius: 12,
                      color: '#8CB4FF',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#4B83F2';
                      e.currentTarget.style.color = '#FFFFFF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(75, 131, 242, 0.06)';
                      e.currentTarget.style.color = '#8CB4FF';
                    }}
                    aria-label={social.label}
                  >
                    <IconComponent size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
