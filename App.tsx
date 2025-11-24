import React, { useState, createContext, useEffect } from 'react';
import { ThemeContextType, SectionId } from './types';
import { SITE_CONTENT } from './constants';
import { AccessibilityTools } from './components/AccessibilityTools';
import { GeminiAssistant } from './components/GeminiAssistant';

// Styles for Lucide icons
import { Menu, X, Check, Mail, MapPin, Phone } from 'lucide-react';

// -- COMPONENT DEFINITIONS (Inline for Single File Constraint Adherence where possible, but split logically) --

// Create Context
export const ThemeContext = createContext<ThemeContextType>({
  fontSizeMult: 1,
  highContrast: false,
  toggleHighContrast: () => {},
  increaseFontSize: () => {},
  decreaseFontSize: () => {},
  resetSettings: () => {},
});

// -- SUB-COMPONENTS --

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { id: SectionId.HERO, label: 'Home' },
    { id: SectionId.ABOUT, label: 'About' },
    { id: SectionId.SERVICES, label: 'Services' },
    { id: SectionId.CONTACT, label: 'Contact' },
  ];

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-40 px-[5%] py-4 flex justify-between items-center transition-all duration-300">
      <a href={`#${SectionId.HERO}`} className="text-2xl md:text-3xl font-bold text-primary border-2 border-transparent focus:border-secondary p-1 rounded no-underline">
        Accessi<span className="text-dark">Web</span>
      </a>

      <button
        className="md:hidden text-primary p-2 focus:outline-none focus:ring-2 focus:ring-secondary rounded"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      <nav
        className={`${
          isMenuOpen ? 'flex' : 'hidden'
        } md:flex flex-col md:flex-row absolute md:static top-[70px] left-0 w-full md:w-auto bg-white md:bg-transparent shadow-lg md:shadow-none p-4 md:p-0 gap-4 md:gap-8 items-center transition-all`}
      >
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className="text-dark font-semibold text-lg py-2 px-4 rounded hover:bg-primary hover:text-white focus:bg-primary focus:text-white focus:outline-none focus:ring-4 focus:ring-secondary transition-all w-full md:w-auto text-center"
            onClick={() => setIsMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
};

const Hero: React.FC = () => {
  return (
    <section
      id={SectionId.HERO}
      className="mt-[80px] min-h-[85vh] flex items-center justify-center text-center px-[5%] bg-cover bg-center relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 86, 179, 0.9), rgba(0, 40, 90, 0.9)), url('https://images.unsplash.com/photo-1558002038-109177381793?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`
      }}
    >
      <div className="max-w-4xl text-white z-10 p-6">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          {SITE_CONTENT.hero.title}
        </h1>
        <p className="text-xl md:text-2xl mb-10 font-normal">
          {SITE_CONTENT.hero.subtitle}
        </p>
        <a
          href={`#${SectionId.CONTACT}`}
          className="inline-block bg-secondary text-black py-4 px-8 text-xl font-bold rounded-full border-4 border-transparent hover:scale-105 hover:border-white focus:outline-none focus:ring-4 focus:ring-white transition-all transform"
        >
          {SITE_CONTENT.hero.cta}
        </a>
      </div>
    </section>
  );
};

const About: React.FC = () => {
  return (
    <section id={SectionId.ABOUT} className="py-20 px-[5%] bg-white text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-primary mb-6">
          {SITE_CONTENT.about.title}
        </h2>
        <p className="text-xl md:text-2xl leading-relaxed">
          {SITE_CONTENT.about.text}
        </p>
      </div>
    </section>
  );
};

const Services: React.FC = () => {
  return (
    <section id={SectionId.SERVICES} className="py-20 px-[5%] bg-bg-gray">
      <h2 className="text-4xl font-bold text-primary text-center mb-12">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {SITE_CONTENT.services.map((service, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-xl shadow-lg border-2 border-transparent hover:-translate-y-2 hover:border-primary transition-all duration-300 group"
            tabIndex={0}
          >
            <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300" role="img" aria-hidden="true">
              {service.icon}
            </div>
            <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
            <p className="text-lg">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Features: React.FC = () => {
  return (
    <section id={SectionId.FEATURES} className="py-20 px-[5%] bg-white">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-12">
        <div className="flex-1 min-w-[300px]">
          <h2 className="text-4xl font-bold text-primary mb-8">Built-in Accessibility</h2>
          <ul className="space-y-4">
            {SITE_CONTENT.features.map((feature, idx) => (
              <li key={idx} className="flex items-center text-xl md:text-2xl">
                <Check className="text-green-600 w-8 h-8 mr-4 flex-shrink-0" strokeWidth={3} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 min-w-[300px]">
          <img 
            src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
            alt="Person using a screen reader on a laptop" 
            className="rounded-xl shadow-2xl border-4 border-bg-gray"
          />
        </div>
      </div>
    </section>
  );
};

const Contact: React.FC = () => {
  return (
    <section id={SectionId.CONTACT} className="py-20 px-[5%] bg-primary text-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-secondary">{SITE_CONTENT.contact.title}</h2>
        <p className="text-xl mb-12">{SITE_CONTENT.contact.intro}</p>
        
        <form className="bg-white text-dark p-8 rounded-xl shadow-2xl text-left">
          <div className="mb-6">
            <label htmlFor="name" className="block text-xl font-bold mb-2">Full Name</label>
            <input 
              type="text" 
              id="name" 
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-4 focus:ring-secondary outline-none transition-all"
              placeholder="Your Name"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="email" className="block text-xl font-bold mb-2">Email Address</label>
            <input 
              type="email" 
              id="email" 
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-4 focus:ring-secondary outline-none transition-all"
              placeholder="you@example.com"
            />
          </div>
          
          <div className="mb-8">
            <label htmlFor="message" className="block text-xl font-bold mb-2">How can we help?</label>
            <textarea 
              id="message" 
              rows={5}
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-4 focus:ring-secondary outline-none transition-all"
              placeholder="Tell us about your project..."
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-primary text-white text-2xl font-bold py-4 rounded-lg hover:bg-blue-800 hover:scale-[1.02] focus:ring-4 focus:ring-secondary focus:outline-none transition-all"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-gray-400 py-12 px-[5%] text-center">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
           <h3 className="text-white text-xl font-bold mb-4">AccessiWeb</h3>
           <p>Making the web open for everyone.</p>
        </div>
        <div>
          <h3 className="text-white text-xl font-bold mb-4">Contact</h3>
          <ul className="space-y-2">
            <li className="flex items-center justify-center gap-2"><Mail size={16} /> info@accessiweb.com</li>
            <li className="flex items-center justify-center gap-2"><Phone size={16} /> (555) 123-4567</li>
            <li className="flex items-center justify-center gap-2"><MapPin size={16} /> San Francisco, CA</li>
          </ul>
        </div>
        <div>
          <h3 className="text-white text-xl font-bold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white underline">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white underline">Accessibility Statement</a></li>
          </ul>
        </div>
      </div>
      <p className="border-t border-gray-700 pt-8">&copy; {new Date().getFullYear()} AccessiWeb. All rights reserved.</p>
    </footer>
  );
};

const SkipLink: React.FC = () => (
  <a 
    href={`#${SectionId.HERO}`} 
    className="fixed top-[-100px] left-4 bg-primary text-white p-4 z-[1001] transition-all focus:top-4 font-bold border-4 border-secondary rounded shadow-xl"
  >
    Skip to main content
  </a>
);

// -- MAIN APP COMPONENT --

export default function App() {
  const [fontSizeMult, setFontSizeMult] = useState(1);
  const [highContrast, setHighContrast] = useState(false);

  const toggleHighContrast = () => setHighContrast(!highContrast);
  const increaseFontSize = () => setFontSizeMult(prev => Math.min(prev + 0.25, 2));
  const decreaseFontSize = () => setFontSizeMult(prev => Math.max(prev - 0.25, 1));
  const resetSettings = () => {
    setFontSizeMult(1);
    setHighContrast(false);
  };

  const themeContextValue: ThemeContextType = {
    fontSizeMult,
    highContrast,
    toggleHighContrast,
    increaseFontSize,
    decreaseFontSize,
    resetSettings
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <div 
        className={`min-h-screen transition-all duration-300 font-sans ${highContrast ? 'grayscale contrast-125 brightness-110' : ''}`}
        style={{ fontSize: `${18 * fontSizeMult}px` }}
      >
        <SkipLink />
        <Header />
        <main>
          <Hero />
          <About />
          <Services />
          <Features />
          <Contact />
        </main>
        <Footer />
        
        {/* Helper Tools */}
        <AccessibilityTools />
        <GeminiAssistant />
      </div>
    </ThemeContext.Provider>
  );
}
