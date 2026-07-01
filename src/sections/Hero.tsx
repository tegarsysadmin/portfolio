import { useRef, useEffect } from 'react';
import PlasmaCanvas, { type PlasmaCanvasRef } from '@/components/PlasmaCanvas';
import gsap from 'gsap';

const STATS = [
  { value: '8+', label: 'Projects' },
  { value: '1000+', label: 'Learning Hours' },
  { value: '7+', label: 'Technologies' },
  { value: '3+', label: 'Certificates' },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const plasmaRef = useRef<PlasmaCanvasRef>(null);

  useEffect(() => {
    // IntersectionObserver to pause/resume plasma shader
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            plasmaRef.current?.resume();
          } else {
            plasmaRef.current?.pause();
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(section);

    // Entrance animations
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(
        '.hero-headline',
        { opacity: 0, y: 40, filter: 'blur(12px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' }
      )
        .fromTo(
          '.hero-subtitle',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(
          '.hero-desc',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(
          '.hero-cta',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(
          '.hero-stat',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
          '-=0.3'
        );
    }, sectionRef);

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, []);

  const handleScrollTo = (id: string) => {
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100vh', minHeight: 600 }}
    >
      {/* WebGL Plasma Background */}
      <PlasmaCanvas ref={plasmaRef} />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center h-full container-pad"
        style={{ maxWidth: 800, margin: '0 auto' }}
      >
        {/* Headline */}
        <h1
          className="hero-headline text-display-l text-white text-center font-display"
          style={{
            textShadow: '0 0 40px rgba(75, 131, 242, 0.3)',
            opacity: 0,
            willChange: 'transform, opacity',
          }}
        >
          IT Network System Administrator
        </h1>

        {/* Subtitle */}
        <p
          className="hero-subtitle font-mono text-xs mt-4"
          style={{
            color: '#8CB4FF',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            opacity: 0,
            willChange: 'transform, opacity',
          }}
        >
          Linux · Networking · Server · Automation
        </p>

        {/* Description */}
        <p
          className="hero-desc text-body-l text-center mt-6"
          style={{
            color: '#5B7EB3',
            maxWidth: 600,
            opacity: 0,
            willChange: 'transform, opacity',
          }}
        >
          Passionate about building reliable infrastructure, managing servers, and automating systems.
          Experienced in Linux administration, network configuration, and always eager to learn new technologies.
        </p>

        {/* CTA Buttons */}
        <div
          className="hero-cta flex flex-wrap items-center justify-center gap-4 mt-10"
          style={{ opacity: 0, willChange: 'transform, opacity' }}
        >
          <button
            onClick={() => handleScrollTo('#projects')}
            className="px-8 py-3.5 rounded-xl font-body text-base font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: '#4B83F2',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 30px rgba(75, 131, 242, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            View Projects
          </button>
          <button
            onClick={() => handleScrollTo('#contact')}
            className="px-8 py-3.5 rounded-xl font-body text-base font-semibold text-white transition-all duration-300 hover:text-[#8CB4FF] hover:border-[#8CB4FF]"
            style={{
              background: 'transparent',
              border: '1px solid #5B7EB3',
            }}
          >
            Contact Me
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div
        ref={statsRef}
        className="absolute bottom-0 left-0 right-0 z-10 flex flex-wrap items-center justify-center gap-6 md:gap-12 pb-12 container-pad"
      >
        {STATS.map((stat, i) => (
          <div key={stat.label} className="flex items-center gap-6 md:gap-12">
            <div
              className="hero-stat flex flex-col items-center"
              style={{ opacity: 0, willChange: 'transform, opacity' }}
            >
              <span className="stat-number">{stat.value}</span>
              <span className="text-sm font-medium mt-1" style={{ color: '#5B7EB3' }}>
                {stat.label}
              </span>
            </div>
            {i < STATS.length - 1 && (
              <div
                className="hidden md:block"
                style={{
                  width: 1,
                  height: 40,
                  background: 'rgba(75, 131, 242, 0.15)',
                }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
