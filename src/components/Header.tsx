import React from 'react';
import { Link } from 'react-router-dom';
import { Code } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-xl font-bold hover:text-white/90 transition-colors"
        >
          <Code size={28} />
          <span>CodeShare</span>
        </Link>
        
        <nav>
          <ul className="flex gap-6">
            <li>
              <Link 
                to="/" 
                className="hover:text-white/90 transition-colors font-medium"
              >
                New Snippet
              </Link>
            </li>
            <li>
              <Link 
                to="/recent" 
                className="hover:text-white/90 transition-colors font-medium"
              >
                Recent
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className="hover:text-white/90 transition-colors font-medium"
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;