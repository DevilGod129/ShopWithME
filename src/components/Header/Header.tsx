// src/components/Header.tsx
import { Link } from 'react-router';

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 h-fit z-50">
      <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-blue-600">
          ShopWithME
        </Link>
        <nav className="space-x-6 text-xl">
          <Link to="/" className="text-gray-700 hover:text-blue-500">
            Home
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-500">
            About
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-500">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
