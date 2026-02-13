import { useState } from 'react';
import Logo from '../assets/image.png';
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiLinkedin, FiInstagram } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

// Animation variants for the main container
const menuVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    x: 50,
  },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
      staggerChildren: 0.07,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    x: 50,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

// Animation variants for each menu item
const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
};


const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuItems = ["Home", "About", "Services", "Contact", "Internship","Faq"];

  return (
    <header className='fixed w-full z-50 bg-neo-white border-b-4 border-black transition-all duration-300'>
      <div className='2xl:container mx-auto px-4 md:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between'>

        {/* Logo */}
        <motion.div
           initial={{ opacity: 0, x: -100 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{
             type: "spring",
             stiffness: 100,
             damping: 20,
             delay: 0.3,
             duration: 1.2,
           }}
           className='flex items-center gap-3'
         >
           <div className='h-[45px] w-[45px] border-2 border-black shadow-hard-sm rounded-lg overflow-hidden'>
             <img src={Logo} alt="relyce" className='h-full w-full object-cover' />
           </div>
           <span className='text-2xl font-black font-display text-neo-black uppercase tracking-tighter'>
             Relyce Infotech
           </span>
         </motion.div>

        {/* Desktop Nav */}
        <nav className='lg:flex hidden space-x-2'>
          {menuItems.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: 0.7 + index * 0.2,
              }}
            >
              <Link
                to={`/${item.toLowerCase()}`}
                 className='px-4 py-2 font-mono font-bold text-sm text-neo-black border-2 border-transparent hover:border-black hover:bg-neo-yellow hover:shadow-hard-sm transition-all duration-200 cursor-hover uppercase'
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* desktop social icons */}
        <div className='md:flex hidden items-center space-x-4'>
           <motion.a
             whileHover={{ scale: 1.1, rotate: 3 }}
             href="https://www.linkedin.com/company/relyce-infotech/"
             className='w-10 h-10 flex items-center justify-center bg-neo-blue border-2 border-black text-white shadow-hard-sm hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all'
           >
             <FiLinkedin className='w-5 h-5' />
           </motion.a>
           <motion.a
             whileHover={{ scale: 1.1, rotate: -3 }}
             href="https://chat.whatsapp.com/Faseq5B8hWgAjDdDpmhntt"
             className='w-10 h-10 flex items-center justify-center bg-neo-green border-2 border-black text-black shadow-hard-sm hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all'
           >
             <FaWhatsapp className='w-5 h-5' />
           </motion.a>
           <motion.a
             whileHover={{ scale: 1.1, rotate: 3 }}
             href="https://www.instagram.com/relyce_infotech/"
             className='w-10 h-10 flex items-center justify-center bg-neo-pink border-2 border-black text-black shadow-hard-sm hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all'
           >
             <FiInstagram className='w-5 h-5' />
           </motion.a>
         </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="relative w-10 h-10 flex flex-col justify-center items-center focus:outline-none bg-neo-yellow border-2 border-black shadow-hard-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
          >
            <span className="sr-only">Open main menu</span>
            <motion.span
              className="block h-0.5 w-6 bg-black"
              animate={isMobileMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block h-0.5 w-6 bg-black my-1.5"
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-0.5 w-6 bg-black"
              animate={isMobileMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
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
            className="absolute right-4 top-20 w-64 bg-neo-white border-2 border-black shadow-hard p-4 lg:hidden z-[60]"
          >
            {/* Menu Links */}
            <div className="flex flex-col space-y-2">
              {menuItems.map((item) => (
                <motion.a
                  key={item}
                  href={`${item.toLowerCase()}`}
                  variants={itemVariants}
                  className="block text-neo-black font-mono font-bold uppercase hover:bg-neo-yellow border-2 border-transparent hover:border-black px-3 py-2 transition-all hover:shadow-hard-sm"
                   onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </div>

            {/* Divider */}
            <motion.div variants={itemVariants} className="border-t-2 border-black my-4"></motion.div>

            {/* Social Icons */}
            <motion.div variants={itemVariants} className="flex items-center justify-around pt-1">
              <a href="https://www.linkedin.com/company/relyce-infotech/" className="w-10 h-10 flex items-center justify-center bg-neo-blue border-2 border-black text-white hover:shadow-hard-sm transition-all">
                <FiLinkedin className="w-5 h-5" />
              </a>
              <a href="https://chat.whatsapp.com/Faseq5B8hWgAjDdDpmhntt" className="w-10 h-10 flex items-center justify-center bg-neo-green border-2 border-black text-black hover:shadow-hard-sm transition-all">
                <FaWhatsapp className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/relyce_infotech/" className="w-10 h-10 flex items-center justify-center bg-neo-pink border-2 border-black text-black hover:shadow-hard-sm transition-all">
                 <FiInstagram className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
