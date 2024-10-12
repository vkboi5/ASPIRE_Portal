import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, Settings, Bell, Edit, LogIn, LogOut } from 'lucide-react';
import MinistryLogo from '../../assets/MinistryAYUSH_Logo.png';
import AspireLogo from '../../assets/logo2.png';
import { FaUserCircle } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/authSlice';

const navItems = [
  { name: 'Home', to: '/' },
  { name: 'FAQ', to: '/faq' },
  { name: 'About AYUSH', to: '/about' },
  { name: 'Resources', to: '/resources' },
  { name: 'Networks', to: '/networks' },
  { name: 'Events', to: '/events' }
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false); // For language dropdown
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false); // For user dropdown
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const isAuthenticated = useSelector(state => state.auth.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const languageDropdownRef = useRef(null);
  const userDropdownRef = useRef(null);
  const location = useLocation();

  const handleLogout = () => {
    dispatch(setUser(false));
    localStorage.removeItem("userInfo");
    navigate('/login');
  };

  const isActive = (to) => location.pathname === to;

  const changeLanguage = (lang) => {
    setSelectedLanguage(lang);
    setIsLanguageDropdownOpen(false); // Close language dropdown after selection
    // Add functionality to change the app language here
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
        setIsLanguageDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Top Bar with Marquee for Toll-Free Number and News */}
      <div className="bg-blue-700 text-white py-1 px-4 flex justify-between items-center text-sm">
        {/* Language Dropdown */}
        <div className="relative">
          <Button
            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
            className="text-sm bg-transparent hover:bg-transparent relative z-20 border-2 "
          >
            {selectedLanguage} ▼
          </Button>
          {isLanguageDropdownOpen && (
            <div
              ref={languageDropdownRef}
              className="absolute left-0 mt-1 bg-white text-black rounded shadow-lg py-1 w-32 z-50"
              style={{ top: '100%', zIndex: 100 }}
            >
              {['English', 'Hindi', 'Marathi', 'Tamil', 'Telugu'].map(lang => (
                <div
                  key={lang}
                  onClick={() => changeLanguage(lang)}
                  className="cursor-pointer px-4 py-1 hover:bg-gray-200"
                >
                  {lang}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Marquee for Toll-Free Number and News */}
        <marquee className="text-sm">
          Our Toll Free Number: 1800-123-4567 | AYUSH Ministry Updates: Health initiatives, new projects, and the latest news related to AYUSH
        </marquee>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-50 bg-white shadow-lg border-b-4 border-gray-200">
        <nav className="mx-auto px-6 sm:px-0 lg:px-10 max-w-7xl" aria-label="Top">
          <div className="flex h-16 items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <Link to="/">
                <img
                  src={MinistryLogo}
                  alt="Ministry Logo"
                  style={{ height: '60px', width: 'auto' }}
                />
              </Link>
              <Link to="/">
                <img
                  src={AspireLogo}
                  alt="Aspire Logo"
                  style={{ height: '100px', width: 'auto' }}
                />
              </Link>
            </div>

            {/* Centered Navigation Links */}
            <div className="hidden md:flex space-x-8 justify-center flex-1">
              {navItems.filter(item => !item.protected || isAuthenticated).map((item, index) => (
                <Link
                  key={index}
                  to={item.to}
                  className={`relative text-gray-800 hover:text-blue-500 text-sm ${isActive(item.to) ? 'font-bold' : ''}`}
                >
                  {item.name}
                  {isActive(item.to) && (
                    <span className="absolute bottom-[-8px] left-0 right-0 h-2 w-2 mx-auto bg-blue-600 rounded-full"></span>
                  )}
                </Link>
              ))}
            </div>

            {/* Right-Aligned Search and Profile Icon */}
            <div className="relative hidden md:flex md:items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search here"
                  className="rounded-md border-2 border-orange-400 px-2 py-1 text-sm bg-gray"
                />
                <Button className="ml-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md px-4 py-1 text-sm border-2 border-blue-600 p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 11a4 4 0 108 0 4 4 0 00-8 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M22 22l-4-4" />
                  </svg>
                </Button>
              </div>

              {isAuthenticated ? (
                <>
                  <Button
                    onClick={handleLogout}
                    className="bg-blue-600 text-white hover:bg-orange-700 transition px-4 py-1 text-sm"
                  >
                    Logout
                  </Button>

                  {/* Profile Icon with Dropdown */}
                  <div
                    className="relative"
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)} // Control user dropdown
                    ref={userDropdownRef}
                  >
                    <FaUserCircle className="user-icon h-8 w-8 text-gray-700 cursor-pointer" />
                    {isUserDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-2 z-50">
                        <Link to="/profile" className="block px-4 py-2 text-blue-600 hover:bg-gray-100 text-sm">
                          <User className="inline mr-2" />
                          View Profile
                        </Link>
                        <Link to="/edit-profile" className="block px-4 py-2 text-blue-600 hover:bg-gray-100 text-sm">
                          <Edit className="inline mr-2" />
                          Edit Profile
                        </Link>
                        <Link to="/notifications" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 text-sm">
                          <Bell className="inline mr-2" />
                          Notifications
                        </Link>
                        <Link to="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 text-sm">
                          <Settings className="inline mr-2" />
                          Settings
                        </Link>
                        <Button onClick={handleLogout} className="block bg-white text-red-600 px-4 py-2 hover:bg-gray-100 w-full text-left text-sm">
                          <LogOut className="inline mr-2" />
                          Logout
                        </Button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <Button asChild>
                  <Link to={'/login'} className="bg-blue-400 text-white hover:bg-blue-500 transition px-4 py-1 text-sm">
                    Login
                  </Link>
                </Button>
              )}
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
                  <X className="h-8 w-8" aria-hidden="true" />
                ) : (
                  <Menu className="h-8 w-8" aria-hidden="true" />
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
                  className={`block rounded-md px-4 py-2 text-sm font-medium ${
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
