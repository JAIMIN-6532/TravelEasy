import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBus, FaHome, FaInfoCircle, FaEnvelope, FaTicketAlt, FaUserCircle } from 'react-icons/fa';

function Navbar() {
  const navItems = [
    { to: "/", text: "Home", icon: <FaHome /> },
    { to: "/about", text: "About", icon: <FaInfoCircle /> },
    { to: "/contact", text: "Contact", icon: <FaEnvelope /> },
    { to: "/mybookings", text: "My Bookings", icon: <FaTicketAlt /> },
    { to: "/login", text: "Login", icon: <FaUserCircle /> }
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg sticky top-0 z-50"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold">
            <FaBus className="text-3xl" />
            <span className="hidden md:block">BusBooking</span>
          </Link>
          <div className="flex space-x-1 md:space-x-6">
            {navItems.map((item, index) => (
              <motion.div
                key={item.to}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.to}
                  className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="hidden md:block">{item.text}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;