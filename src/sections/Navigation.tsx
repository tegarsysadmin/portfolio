import { useEffect, useState, useCallback } from 'react';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-shadow duration-300"
      style={{
        height: 64,
        background: 'rgba(11, 17, 32, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(75, 131, 242, 0.1)',
        boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      <div className="flex items-center justify-between h-full container-pad" style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-display text-xl font-semibold text-white tracking-tight"
        >
          Whendy
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium transition-colors duration-300 hover:text-[#8CB4FF]"
              style={{ color: '#5B7EB3' }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#"
            className="text-sm font-medium text-white px-5 py-2 rounded-xl transition-colors duration-300 hover:bg-[#8CB4FF]"
            style={{ background: '#4B83F2' }}
          >
            Download CV
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-5 h-0.5 bg-white transition-transform duration-300"
            style={{
              transform: mobileOpen ? 'rotate(45deg) translateY(4px)' : 'none',
            }}
          />
          <span
            className="block w-5 h-0.5 bg-white transition-opacity duration-300"
            style={{ opacity: mobileOpen ? 0 : 1 }}
          />
          <span
            className="block w-5 h-0.5 bg-white transition-transform duration-300"
            style={{
              transform: mobileOpen ? 'rotate(-45deg) translateY(-4px)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 py-4 px-6 flex flex-col gap-4"
          style={{
            background: 'rgba(11, 17, 32, 0.95)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(75, 131, 242, 0.1)',
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium py-2 transition-colors duration-300 hover:text-[#8CB4FF]"
              style={{ color: '#5B7EB3' }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#"
            className="text-sm font-medium text-white px-5 py-2.5 rounded-xl text-center transition-colors duration-300 hover:bg-[#8CB4FF]"
            style={{ background: '#4B83F2' }}
          >
            Download CV
          </a>
        </div>
      )}
    </nav>
  );
}
