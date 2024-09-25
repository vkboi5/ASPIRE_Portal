import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import MinistryLogo from '../../assets/Ministry AYUSH Logo.png';
import AspireLogo from '../../assets/logo2.png';
import { FaUserCircle } from 'react-icons/fa';

const navItems = [
  { name: 'Home', to: '/' },
  { name: 'Dashboard', to: '/dashboard', protected: true },
  { name: 'Apply', to: '/application-form', protected: true },
  { name: 'Notifications', to: '/notifications', protected: true },
  { name: 'FAQ', to: '/faq' },
  { name: 'About AYUSH', to: '/about' },
  { name: 'Resources', to: '/resources' },
  { name: 'Networks', to: '/networks' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState('English'); // Default language
  const location = useLocation();
  const isAuthenticated = useSelector(state => state.auth.auth);
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/login');
  };

  const isActive = (to) => location.pathname === to;

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'English' ? 'Hindi' : 'English'));
  };

  return (
    <>
      {/* Language Toggle Section */}
      <div className="bg-black text-white py-2 text-start px-4">
        Language : 
        <Button onClick={toggleLanguage} className="text-lg">
          {language}
        </Button>
        <div className="text-lg text-center py-2">
          Our Toll Free Number : 1800-123-4567
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-white shadow-lg border-b-4 border-blue-400 transition-all duration-300 ease-in-out">
        <nav className="mx-auto px-6 sm:px-0 lg:px-10" aria-label="Top">
          <div className="flex h-24 items-center justify-between">
            <div className="flex items-center">
              <Link to="/">
                <div className="flex items-center space-x-6">
                  <img
                    src={MinistryLogo}
                    alt="Ministry Logo"
                    style={{ height: '100px', width: '100px', objectFit: 'contain' }}
                  />
                  <img
                    src={AspireLogo}
                    alt="Aspire Logo"
                    style={{ height: '150px', width: '150px', objectFit: 'contain' }}
                  />
                </div>
              </Link>
            </div>

            {/* Centered navigation links */}
            <div className="hidden md:flex md:items-center md:space-x-10 mx-auto">
              {navItems.filter(item => !item.protected || isAuthenticated).map((item) =>
                <Link
                  key={item.name}
                  to={item.to}
                  className={`text-lg font-semibold ${  // Changed text-2xl to text-lg
                    isActive(item.to)
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                </Link>
              )}
            </div>

            {/* Right-aligned user-related icons */}
            <div className="hidden md:flex md:items-center space-x-6">
              {isAuthenticated ? (
                <>
                  <Button
                    onClick={handleLogout}
                    className="bg-blue-600 text-white hover:bg-orange-700 transition px-6 py-2 text-lg" // Adjusted text size for the button
                  >
                    Logout
                  </Button>
                  <User className="text-gray-700 h-10 w-10" />
                </>
              ) : (
                <Button asChild>
                  <Link to={'/login'} className='bg-blue-400 text-white hover:bg-blue-500 transition px-6 py-2 text-lg'>
                    Login
                  </Link>
                </Button>
              )}
              <Link to={'/login'}>
                <div className="pointer">
                  <FaUserCircle className="user-icon h-12 w-12 text-gray-700" />
                </div>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <X className="h-10 w-10" aria-hidden="true" />
                ) : (
                  <Menu className="h-10 w-10" aria-hidden="true" />
                )}
              </Button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-2 px-4 pb-4 pt-2">
              {navItems.filter(item => !item.protected || isAuthenticated).map((item) =>
                <Link
                  key={item.name}
                  to={item.to}
                  className={`block rounded-md px-4 py-3 text-lg font-medium ${ // Adjusted text size for mobile menu
                    isActive(item.to)
                      ? 'bg-orange-600 text-white'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                </Link>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
