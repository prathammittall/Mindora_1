import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: { 
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2
      }
    },
    open: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false); // Close mobile menu after clicking
  };

  return (
    <motion.nav 
      className="bg-white shadow-lg fixed w-full z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <motion.div 
              className="flex-shrink-0 flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <button onClick={() => scrollToSection('home')} className="text-2xl font-bold text-blue-600">
                Mindora
              </button>
            </motion.div>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="flex space-x-8">
              {["Home", "Services", "Pricing", "Team", "FAQ"].map((item) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.button>
              ))}
            </div>
            <motion.div
              className="ml-8"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="https://basicloginauth.vercel.app/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              >
                Login
              </a>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <motion.button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <span className="sr-only">Open main menu</span>
              <div className="w-6 h-6 relative">
                <motion.span
                  className="absolute h-0.5 w-6 bg-current transform transition-transform duration-300 ease-in-out"
                  animate={{ 
                    rotate: isOpen ? 45 : 0,
                    translateY: isOpen ? 8 : 0
                  }}
                />
                <motion.span
                  className="absolute h-0.5 w-6 bg-current transform transition-opacity duration-300 ease-in-out"
                  animate={{ 
                    opacity: isOpen ? 0 : 1
                  }}
                  style={{ top: "50%", transform: "translateY(-50%)" }}
                />
                <motion.span
                  className="absolute h-0.5 w-6 bg-current transform transition-transform duration-300 ease-in-out"
                  animate={{ 
                    rotate: isOpen ? -45 : 0,
                    translateY: isOpen ? -8 : 0
                  }}
                  style={{ bottom: 0 }}
                />
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="sm:hidden overflow-hidden bg-white border-t border-gray-200"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {["Home", "Services", "Pricing", "Team", "FAQ"].map((item, i) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                  variants={itemVariants}
                  custom={i}
                >
                  {item}
                </motion.button>
              ))}
              <motion.div
                className="px-3 py-2"
                variants={itemVariants}
              >
                <a
                  href="https://basicloginauth.vercel.app/"
                  className="block w-full text-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                >
                  Login
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;