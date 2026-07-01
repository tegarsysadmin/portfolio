const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      style={{
        background: '#080D1A',
        borderTop: '1px solid rgba(75, 131, 242, 0.1)',
      }}
    >
      <div
        className="container-pad py-12"
        style={{ maxWidth: 1200, margin: '0 auto' }}
      >
        {/* Top Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
          <div className="flex flex-wrap items-center gap-6">
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
          </div>
        </div>

        {/* Divider */}
        <div
          className="my-6"
          style={{ height: 1, background: 'rgba(75, 131, 242, 0.1)' }}
        />

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-sm font-medium" style={{ color: '#5B7EB3' }}>
            2026 Whendy Adi Cipta. All rights reserved.
          </p>
          <p className="text-sm font-medium" style={{ color: '#5B7EB3' }}>
            Built with passion & code
          </p>
        </div>
      </div>
    </footer>
  );
}
