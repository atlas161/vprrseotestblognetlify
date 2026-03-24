import React, { useState, useEffect } from 'react';
import logoBeige from '../media/logo_beige.png';
import eagleBeige from '../media/aigle_beige.png';
import { Section } from '../types';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  activeSection: Section | null;
  scrollToSection: (section: Section) => void;
}

type NavLink =
  | { kind: 'section'; id: Section; label: string }
  | { kind: 'href'; href: string; label: string };

export const Navbar: React.FC<NavbarProps> = ({ activeSection, scrollToSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: NavLink[] = [
    { kind: 'section', id: Section.HERO, label: 'Accueil' },
    { kind: 'section', id: Section.GALLERY, label: 'Portfolio' },
    { kind: 'section', id: Section.SERVICES, label: 'Formules' },
    { kind: 'href', href: '/blog', label: 'Blog' },
    { kind: 'section', id: Section.ZONE, label: 'Zone' },
    { kind: 'href', href: '/a-propos', label: 'À propos' },
    { kind: 'section', id: Section.REVIEWS, label: 'Avis & FAQ' }
  ];

  const isSectionActive = (id: Section) => {
    if (pathname === '/') {
      if (id === Section.HERO) return activeSection === Section.HERO;
      return activeSection === id;
    }
    if (id === Section.SERVICES) return pathname === '/chantier' || pathname === '/inspection';
    if (id === Section.ZONE) return pathname === '/zone';
    if (id === Section.REVIEWS) return pathname === '/faq';
    return false;
  };

  const isHrefActive = (href: string) => {
    if (pathname === href || pathname.startsWith(`${href}/`)) return true;
    if (pathname === '/' && href === '/blog' && activeSection === Section.BLOG) return true;
    return false;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || isMobileMenuOpen 
          ? 'bg-background/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20 py-2' 
          : 'bg-black/20 backdrop-blur-sm py-4 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo & Brand Name */}
        <div 
          className="flex items-center gap-4 cursor-pointer group shrink-0"
          onClick={() => scrollToSection(Section.HERO)}
        >
          {/* Logo Complet sur Desktop */}
          <img 
            src={logoBeige} 
            alt="Eagle Production" 
            className="hidden md:block h-12 w-auto object-contain" 
          />
          
          {/* Aigle Seul sur Mobile */}
          <img 
            src={eagleBeige} 
            alt="Eagle" 
            className="md:hidden h-10 w-auto object-contain" 
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            link.kind === 'href' ? (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-5 py-2 rounded-full text-sm font-medium tracking-wider transition-all duration-300 ${
                  isHrefActive(link.href)
                    ? 'text-white bg-white/10 shadow-[0_0_10px_rgba(255,255,255,0.1)]'
                    : 'text-white/80 hover:text-white hover:bg-white/5 hover:shadow-[0_0_10px_rgba(255,255,255,0.05)]'
                }`}
              >
                {link.label}
              </a>
            ) : (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`relative px-5 py-2 rounded-full text-sm font-medium tracking-wider transition-all duration-300 ${
                  isSectionActive(link.id)
                    ? 'text-white bg-white/10 shadow-[0_0_10px_rgba(255,255,255,0.1)]'
                    : 'text-white/80 hover:text-white hover:bg-white/5 hover:shadow-[0_0_10px_rgba(255,255,255,0.05)]'
                }`}
              >
                {link.label}
              </button>
            )
          ))}
          <a
            href="/contact"
            className="ml-6 bg-accent text-background text-xs font-bold px-6 py-2.5 rounded-full hover:bg-white transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.3)]"
          >
            Devis Gratuit
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-textPrimary p-2 hover:bg-white/10 rounded-full transition-colors backdrop-blur-md bg-black/20 border border-white/10"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`lg:hidden absolute top-full left-0 w-full h-[calc(100vh-80px)] bg-background/95 backdrop-blur-2xl border-t border-white/10 px-6 py-8 flex flex-col gap-6 overflow-y-auto transition-all duration-300 ease-out ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
          {navLinks.map((link) => (
            link.kind === 'href' ? (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-2xl font-medium text-left transition-colors ${
                  isHrefActive(link.href) ? 'text-accent' : 'text-textPrimary'
                }`}
              >
                {link.label}
              </a>
            ) : (
              <button
                key={link.id}
                onClick={() => {
                  scrollToSection(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-2xl font-medium text-left transition-colors ${
                  isSectionActive(link.id) ? 'text-accent' : 'text-textPrimary'
                }`}
              >
                {link.label}
              </button>
            )
          ))}
          <a
            href="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-4 bg-accent text-background text-lg font-bold py-4 rounded-xl text-center shadow-lg shadow-accent/20"
          >
            Demander un devis
          </a>
        </div>
    </nav>
  );
};
