import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, Settings, Bell, Edit, LogIn, LogOut } from 'lucide-react';
import MinistryLogo from '../../assets/Ministry AYUSH Logo.png';
import AspireLogo from '../../assets/logo2.png';
import { FaUserCircle } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/authSlice';

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [language, setLanguage] = useState('English');
  const isAuthenticated = useSelector(state => state.auth.auth);  // Fetch authentication state from Redux
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);  // Create a ref for the dropdown

  const handleLogout = () => {
    dispatch(setUser(false));  // Set authentication to false on logout
    localStorage.removeItem("userInfo");  // Clear user info from localStorage
    navigate('/login');  // Redirect to login page after logout
  };

  const isActive = (to) => location.pathname === to;

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'English' ? 'Hindi' : 'English'));
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
            <div className="hidden md:flex space-x-8">
              {navItems.filter(item => !item.protected || isAuthenticated).map((item, index) => (
                <Link key={index} to={item.to} className={`text-gray-800 hover:text-blue-500 ${isActive(item.to) ? 'font-bold' : ''}`}>
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right-aligned user-related icons */}
            <div className="relative hidden md:flex md:items-center space-x-6">
              {isAuthenticated ? (
                <>
                  <Button
                    onClick={handleLogout}
                    className="bg-blue-600 text-white hover:bg-orange-700 transition px-6 py-2 text-lg"
                  >
                    Logout
                  </Button>

                  {/* Profile Icon with Dropdown */}
                  <div
                    className="relative"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}  // Toggle dropdown on click
                    ref={dropdownRef}  // Attach the ref to the dropdown container
                  >
                    <FaUserCircle className="user-icon h-12 w-12 text-gray-700 cursor-pointer" />
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50">
                        <Link to="/profile" className="block px-4 py-2 text-blue-600 hover:bg-gray-100">
                          <User className="inline mr-2" />
                          View Profile
                        </Link>
                        <Link to="/edit-profile" className="block px-4 py-2 text-blue-600 hover:bg-gray-100">
                          <Edit className="inline mr-2" />
                          Edit Profile
                        </Link>
                        <Link to="/notifications" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                          <Bell className="inline mr-2" />
                          Notifications
                        </Link>
                        <Link to="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                          <Settings className="inline mr-2" />
                          Settings
                        </Link>
                        <Button onClick={handleLogout} className="block bg-white text-white px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-left">
                          <LogOut className="inline mr-2" />
                          Logout
                        </Button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <Button asChild>
                  <Link to={'/login'} className="bg-blue-400 text-white hover:bg-blue-500 transition px-6 py-2 text-lg">
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
                  className={`block rounded-md px-4 py-3 text-lg font-medium ${
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
