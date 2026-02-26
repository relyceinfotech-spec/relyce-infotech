import { useState, useEffect } from 'react';
import Logo from '../assets/image.png';
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const GEIST_MONO = "'Geist Mono', monospace";

// Animation variants for mobile menu
const menuVariants = {
  hidden: { opacity: 0, scale: 0.95, x: 50 },
  visible: {
    opacity: 1, scale: 1, x: 0,
    transition: { duration: 0.3, ease: 'easeOut', staggerChildren: 0.07 },
  },
  exit: {
    opacity: 0, scale: 0.95, x: 50,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
};

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const menuItems = [
    { label: "Home", path: "/home" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Careers", path: "/internship" },
    { label: "Contact", path: "/contact" },
    { label: "FAQ", path: "/faq" },
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header
      className="w-full z-50"
      style={{
        position: 'fixed',
        top: 0,
        backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease',
      }}
    >

      <div className="2xl:container mx-auto px-4 md:px-6 lg:px-10 h-16 flex items-center">

        {/* Left group: Logo + Nav together */}
        <div className="flex items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center shrink-0"
          >
            <Link to="/" className="flex items-center">
              <img src={Logo} alt="Relyce" className="h-[48px] w-[48px] rounded-xl" />
            </Link>
          </motion.div>

          {/* Desktop Nav — right next to logo */}
          <nav
            className="lg:flex hidden items-center ml-6"
            style={{ fontFamily: GEIST_MONO }}
          >
            {menuItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
              >
                <Link
                  to={item.path}
                  className="px-3 xl:px-4 py-1.5 text-[11px] xl:text-xs tracking-[0.14em] uppercase text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>

        {/* Spacer to push button right */}
        <div className="flex-1" />

        {/* Try Relyce AI — far right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="lg:flex hidden items-center shrink-0"
        >
          <a
            href="https://relyceai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 rounded-full text-[11px] xl:text-xs tracking-[0.14em] uppercase text-gray-300 hover:text-white hover:border-gray-400 transition-all duration-300"
            style={{
              fontFamily: GEIST_MONO,
              border: '1px solid rgba(255, 255, 255, 0.2)',
              textDecoration: 'none',
            }}
          >
            Try Relyce AI<span className="ml-1.5 text-[10px]">↗</span>
          </a>
        </motion.div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="relative w-8 h-8 flex flex-col justify-center items-center focus:outline-none"
          >
            <span className="sr-only">Open main menu</span>
            <motion.span
              className="block h-[1.5px] w-5 bg-gray-300 rounded-sm"
              animate={isMobileMenuOpen ? { rotate: 45, y: 4.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block h-[1.5px] w-5 bg-gray-300 rounded-sm my-[3px]"
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-[1.5px] w-5 bg-gray-300 rounded-sm"
              animate={isMobileMenuOpen ? { rotate: -45, y: -4.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute right-4 top-16 w-56 rounded-xl shadow-lg lg:hidden"
            style={{
              fontFamily: GEIST_MONO,
              border: '1px solid rgba(212, 168, 83, 0.15)',
              background: 'linear-gradient(145deg, rgba(18, 16, 12, 0.95), rgba(10, 10, 10, 0.95))',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              padding: '1rem',
            }}
          >
            <div className="flex flex-col space-y-1">
              {menuItems.map((item) => (
                <motion.div key={item.label} variants={itemVariants}>
                  <Link
                    to={item.path}
                    onClick={closeMobileMenu}
                    className="block rounded-md px-3 py-2 text-xs tracking-[0.14em] uppercase transition-colors"
                    style={{ color: 'rgba(200, 190, 170, 0.8)' }}
                    onMouseEnter={e => {
                      e.currentTarget.style.backgroundColor = 'rgba(212, 168, 83, 0.08)';
                      e.currentTarget.style.color = '#D4A853';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'rgba(200, 190, 170, 0.8)';
                    }}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              variants={itemVariants}
              style={{ borderTop: '1px solid rgba(212, 168, 83, 0.12)', margin: '0.75rem 0' }}
            />

            <motion.div variants={itemVariants} className="flex items-center justify-center pt-1">
              <a
                href="https://relyceai.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                className="block rounded-full px-4 py-2 text-xs tracking-[0.14em] uppercase text-center transition-all duration-300"
                style={{
                  color: '#D4A853',
                  border: '1px solid rgba(212, 168, 83, 0.3)',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(212, 168, 83, 0.6)';
                  e.currentTarget.style.backgroundColor = 'rgba(212, 168, 83, 0.08)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(212, 168, 83, 0.3)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Try Relyce AI ↗
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
