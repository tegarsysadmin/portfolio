import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Server, Network, Globe, Waypoints, Workflow, Database } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  { name: 'Linux Server', icon: Server, proficiency: 85 },
  { name: 'Networking', icon: Network, proficiency: 80 },
  { name: 'Web Server', icon: Globe, proficiency: 75 },
  { name: 'DNS', icon: Waypoints, proficiency: 70 },
  { name: 'Automation', icon: Workflow, proficiency: 65 },
  { name: 'Database', icon: Database, proficiency: 60 },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animations
      const headers = section.querySelectorAll('.skills-header');
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

      // Cards staggered entrance
      const cards = section.querySelectorAll('.skill-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section.querySelector('.skills-grid'),
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Progress bar animations
      const progressBars = section.querySelectorAll('.skill-progress-fill');
      progressBars.forEach((bar) => {
        const target = (bar as HTMLElement).dataset.target;
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: `${target}%`,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section-gap container-pad"
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div className="text-center">
          <p
            className="skills-header section-label"
            style={{ opacity: 0, willChange: 'transform, opacity' }}
          >
            SKILLS & EXPERTISE
          </p>
          <h2
            className="skills-header text-display-m text-white font-display mt-3"
            style={{ opacity: 0, willChange: 'transform, opacity' }}
          >
            Technical Proficiency
          </h2>
          <p
            className="skills-header text-body-l mt-4 mx-auto"
            style={{ color: '#5B7EB3', maxWidth: 500, opacity: 0, willChange: 'transform, opacity' }}
          >
            A comprehensive toolkit for modern IT infrastructure
          </p>
        </div>

        {/* Skills Grid */}
        <div className="skills-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {SKILLS.map((skill) => {
            const IconComponent = skill.icon;
            return (
              <div
                key={skill.name}
                className="skill-card glassmorphism-card p-8"
                style={{ opacity: 0, willChange: 'transform, opacity' }}
              >
                <IconComponent size={48} style={{ color: '#8CB4FF' }} />
                <h3 className="text-heading-l text-white font-display mt-4">
                  {skill.name}
                </h3>

                {/* Progress Bar */}
                <div
                  className="w-full mt-4"
                  style={{
                    height: 6,
                    background: 'rgba(75, 131, 242, 0.15)',
                    borderRadius: 3,
                  }}
                >
                  <div
                    className="skill-progress-fill h-full"
                    data-target={skill.proficiency}
                    style={{
                      width: '0%',
                      background: 'linear-gradient(90deg, #4B83F2, #8CB4FF)',
                      borderRadius: 3,
                    }}
                  />
                </div>

                <p className="text-sm font-medium mt-2" style={{ color: '#5B7EB3' }}>
                  {skill.proficiency}% Proficiency
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
