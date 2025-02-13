import { Bus, Home, Info, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Bus className="h-8 w-8" />
            <span className="text-xl font-bold">TravelEase</span>
          </div>
          <div className="flex space-x-8">
            <Link to="/" className="flex items-center space-x-1 hover:text-indigo-200 transition-colors">
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link to="/about" className="flex items-center space-x-1 hover:text-indigo-200 transition-colors">
              <Info className="h-5 w-5" />
              <span>About</span>
            </Link>
            <Link to="/contact" className="flex items-center space-x-1 hover:text-indigo-200 transition-colors">
              <Phone className="h-5 w-5" />
              <span>Contact</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;