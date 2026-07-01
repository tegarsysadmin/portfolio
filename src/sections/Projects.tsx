import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Code2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: 'Debian Server Setup',
    tags: ['Linux', 'Debian', 'Server'],
    description: 'Complete server setup and hardening on Debian, including user management, SSH configuration, and security policies.',
    image: '/images/project-debian.jpg',
  },
  {
    title: 'DNS Server with BIND9',
    tags: ['DNS', 'BIND9', 'Networking'],
    description: 'Configured and deployed a DNS server using BIND9 for local network domain resolution and management.',
    image: '/images/project-dns.jpg',
  },
  {
    title: 'Nginx Web Server',
    tags: ['Nginx', 'Web Server', 'Linux'],
    description: 'Set up and optimized Nginx as a high-performance web server with reverse proxy and SSL configuration.',
    image: '/images/project-nginx.jpg',
  },
  {
    title: 'Apache Web Server',
    tags: ['Apache', 'Web Server', 'Linux'],
    description: 'Deployed and configured Apache web server with virtual hosts, modules, and performance tuning.',
    image: '/images/project-apache.jpg',
  },
  {
    title: 'Ansible Automation',
    tags: ['Ansible', 'Automation', 'DevOps'],
    description: 'Created Ansible playbooks for automated server configuration, deployment, and maintenance tasks.',
    image: '/images/project-ansible.jpg',
  },
  {
    title: 'Mail Server',
    tags: ['Postfix', 'Dovecot', 'Email'],
    description: 'Built a complete mail server solution with Postfix and Dovecot, including spam filtering and SSL security.',
    image: '/images/project-mail.jpg',
  },
  {
    title: 'Virtual Lab Networking',
    tags: ['Networking', 'Virtualization', 'Cisco'],
    description: 'Designed and implemented virtual network labs for testing and learning network configurations.',
    image: '/images/project-lab.jpg',
  },
  {
    title: 'GitHub Portfolio',
    tags: ['GitHub', 'Portfolio', 'Web'],
    description: 'This portfolio website built with modern web technologies, featuring responsive design and smooth animations.',
    image: '/images/project-portfolio.jpg',
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animations
      const headers = section.querySelectorAll('.proj-header');
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
      const cards = section.querySelectorAll('.project-card');
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
            trigger: section.querySelector('.projects-grid'),
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
      id="projects"
      ref={sectionRef}
      className="section-gap container-pad"
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div className="text-center">
          <p
            className="proj-header section-label"
            style={{ opacity: 0, willChange: 'transform, opacity' }}
          >
            PROJECTS
          </p>
          <h2
            className="proj-header text-display-m text-white font-display mt-3"
            style={{ opacity: 0, willChange: 'transform, opacity' }}
          >
            Featured Work
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {PROJECTS.map((project) => (
            <div
              key={project.title}
              className="project-card glassmorphism-card overflow-hidden group"
              style={{
                opacity: 0,
                willChange: 'transform, opacity',
                borderRadius: 16,
              }}
            >
              {/* Image Area */}
              <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="project-image-overlay" />
              </div>

              {/* Content Area */}
              <div className="p-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs px-2.5 py-1 rounded-md"
                      style={{
                        background: 'rgba(75, 131, 242, 0.06)',
                        color: '#8CB4FF',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-heading-l text-white font-display mt-3">
                  {project.title}
                </h3>

                {/* Description */}
                <p
                  className="text-body-m mt-2 line-clamp-2"
                  style={{ color: '#5B7EB3' }}
                >
                  {project.description}
                </p>

                {/* Links */}
                <div className="flex items-center gap-4 mt-4">
                  <button
                    className="flex items-center gap-1.5 text-sm font-semibold transition-colors duration-300 hover:underline"
                    style={{ color: '#4B83F2' }}
                  >
                    View Project
                    <ArrowUpRight size={14} />
                  </button>
                  <button
                    className="flex items-center gap-1.5 text-sm font-medium transition-colors duration-300 hover:text-white"
                    style={{ color: '#5B7EB3' }}
                  >
                    <Code2 size={14} />
                    GitHub
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
