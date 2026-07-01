import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const INTERESTS = [
  'Linux',
  'Networking',
  'Server Admin',
  'Automation',
  'Problem Solving',
  'Continuous Learning',
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const elements = section.querySelectorAll('.about-animate');
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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-gap container-pad"
    >
      <div
        className="grid grid-cols-1 md:grid-cols-[55%_45%] gap-12 items-center"
        style={{ maxWidth: 1200, margin: '0 auto' }}
      >
        {/* Left Column - Text */}
        <div>
          <p className="about-animate section-label" style={{ opacity: 0, willChange: 'transform, opacity' }}>
            ABOUT ME
          </p>
          <h2
            className="about-animate text-display-m text-white font-display mt-3"
            style={{ opacity: 0, willChange: 'transform, opacity' }}
          >
            Building the Future with Technology
          </h2>
          <p
            className="about-animate text-body-l mt-6"
            style={{ color: '#5B7EB3', opacity: 0, willChange: 'transform, opacity' }}
          >
            I am a fresh graduate passionate about IT infrastructure, network systems, and server administration.
            My journey in technology started with a deep curiosity about how systems work, and it has grown into a dedicated career path.
          </p>
          <p
            className="about-animate text-body-l mt-4"
            style={{ color: '#5B7EB3', opacity: 0, willChange: 'transform, opacity' }}
          >
            With hands-on experience in Linux server management, network configuration, and automation tools, I am ready to contribute to innovative IT solutions.
            I am continuously learning and expanding my skill set to stay at the forefront of technology.
          </p>

          {/* Interest Tags */}
          <div
            className="about-animate flex flex-wrap gap-2 mt-8"
            style={{ opacity: 0, willChange: 'transform, opacity' }}
          >
            {INTERESTS.map((tag) => (
              <span key={tag} className="interest-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column - Visual */}
        <div
          className="about-animate gradient-border"
          style={{ opacity: 0, willChange: 'transform, opacity' }}
        >
          <div className="glassmorphism-card-enhanced overflow-hidden" style={{ position: 'relative', zIndex: 1 }}>
            <img
              src="/images/about-visual.jpg"
              alt="Network Administrator Workspace"
              className="w-full h-auto object-cover"
              style={{ borderRadius: 15 }}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
