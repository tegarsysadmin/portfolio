import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCES = [
  {
    date: '2024',
    title: 'LKS Winner — IT Network System Administrator',
    description:
      'Achieved victory at the LKS (Lomba Kompetensi Siswa) competition for IT Network System Administration, demonstrating excellence in network configuration and server management.',
  },
  {
    date: '2023',
    title: 'Internship — IT Support',
    description:
      'Completed internship providing IT support, troubleshooting hardware and software issues, and assisting with network maintenance and server administration.',
  },
  {
    date: 'Present',
    title: 'SSW Building Cleaning — Japan',
    description:
      'Currently working in Japan through the SSW (Specified Skilled Worker) program, developing international work experience while continuing to grow IT skills.',
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animations
      const headers = section.querySelectorAll('.exp-header');
      gsap.fromTo(
        headers,
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

      // Timeline cards staggered
      const cards = section.querySelectorAll('.timeline-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section.querySelector('.timeline-container'),
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-gap container-pad"
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div className="text-center">
          <p
            className="exp-header section-label"
            style={{ opacity: 0, willChange: 'transform, opacity' }}
          >
            EXPERIENCE
          </p>
          <h2
            className="exp-header text-display-m text-white font-display mt-3"
            style={{ opacity: 0, willChange: 'transform, opacity' }}
          >
            Journey & Growth
          </h2>
        </div>

        {/* Timeline */}
        <div className="timeline-container relative mt-16">
          {/* Timeline Line - Desktop */}
          <div
            className="hidden md:block timeline-line"
            style={{
              top: 0,
              bottom: 0,
            }}
          />

          {/* Timeline Line - Mobile */}
          <div
            className="md:hidden absolute"
            style={{
              width: 2,
              top: 0,
              bottom: 0,
              left: 8,
              background: 'linear-gradient(180deg, #4B83F2 0%, #8CB4FF 100%)',
              boxShadow: '0 0 10px rgba(75, 131, 242, 0.3)',
            }}
          />

          {/* Experience Items */}
          <div className="flex flex-col gap-12">
            {EXPERIENCES.map((exp, index) => (
              <div
                key={exp.title}
                className={`timeline-card relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                style={{ opacity: 0, willChange: 'transform, opacity' }}
              >
                {/* Card */}
                <div
                  className={`md:w-[calc(50%-32px)] ml-8 md:ml-0 ${
                    index % 2 === 0 ? 'md:mr-auto md:pr-0' : 'md:ml-auto md:pl-0'
                  }`}
                >
                  <div className="glassmorphism-card p-6">
                    {/* Date Badge */}
                    <span
                      className="inline-block font-mono text-xs font-medium px-3 py-1 rounded-md"
                      style={{
                        color: '#4B83F2',
                        background: 'rgba(75, 131, 242, 0.06)',
                      }}
                    >
                      {exp.date}
                    </span>

                    <h3 className="text-heading-l text-white font-display mt-3">
                      {exp.title}
                    </h3>
                    <p className="text-body-m mt-2" style={{ color: '#5B7EB3' }}>
                      {exp.description}
                    </p>
                  </div>
                </div>

                {/* Timeline Node - Desktop */}
                <div className="hidden md:block timeline-node" style={{ top: 24 }} />

                {/* Timeline Node - Mobile */}
                <div
                  className="md:hidden absolute"
                  style={{
                    width: 16,
                    height: 16,
                    background: '#4B83F2',
                    borderRadius: '50%',
                    left: 0,
                    top: 24,
                    transform: 'translateX(1px)',
                    boxShadow: '0 0 10px rgba(75, 131, 242, 0.5)',
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: '#4B83F2',
                      animation: 'pulse-glow 2s ease-in-out infinite',
                      zIndex: -1,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
