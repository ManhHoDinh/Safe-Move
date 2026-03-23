import { Droplets, Github, Linkedin, Twitter } from 'lucide-react';

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#solution' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Demo', href: '#demo' },
      { label: 'Pricing', href: '#cta' },
      { label: 'API Docs', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Team', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'Case Studies', href: '#' },
      { label: 'Research', href: '#' },
      { label: 'Status Page', href: '#' },
      { label: 'Changelog', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'Security', href: '#' },
    ],
  },
];

const socials = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' },
];

export default function Footer() {
  return (
    <footer className="relative bg-neutral-900 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        {/* Footer columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold tracking-[0.15em] text-neutral-400 uppercase mb-4">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-neutral-500 transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Droplets size={20} className="text-storm-blue" strokeWidth={2} />
            <span className="text-sm font-bold text-white tracking-tight">
              SafeMove AI
            </span>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-neutral-500 transition-colors duration-200 hover:text-white"
                >
                  <Icon size={18} strokeWidth={1.5} />
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <p className="text-xs text-neutral-600">
            &copy; {new Date().getFullYear()} SafeMove AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
