import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bell, FileText, HelpCircle, Home, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('dashboard'); // Active section state
  const [application, setApplication] = useState([]);
  const [user, setUser] = useState({ name: '', email: '' }); // State for user info
  const navigate = useNavigate();

  // Fetch user and application data
  useEffect(() => {
    // Fetching user data (e.g., from local storage or API)
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || { name: 'User', email: 'user@example.com' }; // Default value
    setUser(userInfo);

    // Fetching application data
    axios.post('http://localhost:3000/api/v1/get-application', {}, { withCredentials: true })
      .then((response) => setApplication(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Logout Functionality
  const handleLogout = () => {
    // Clear user data from localStorage or perform any other necessary cleanup
    localStorage.removeItem('userInfo');
    // Redirect to login page
    navigate('/login');
  };

  const renderContent = () => {
    switch (activeSection) {
      // Dashboard Section with Welcome message
      case 'dashboard':
        return (
          <Card className="bg-green-100 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-green-900">Welcome, {user.email}</CardTitle>
              <CardDescription>Explore for more!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-h-full overflow-auto">
                {application.map((item, index) => (
                  <div key={index} className="flex items-center justify-between mt-4 w-full">
                    <div className="w-full">
                      <p className="text-sm text-green-800">{item.title}</p>
                      <p className="font-semibold">{item.status}</p>
                      <p className="text-sm text-green-800">{item.founder}</p>
                      {item.status === "Pending" ? (
                        <Progress value={0} className="w-full mt-2 bg-green-200" />
                      ) : item.status === "Approved" ? (
                        <Progress value={100} className="w-full mt-2 bg-green-500" />
                      ) : (
                        <Progress value={50} className="w-full mt-2 bg-green-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      // News and Articles Section
      case 'news-articles':
        return (
          <Card className="bg-green-50 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-green-900">News and Articles</CardTitle>
              <CardDescription>Latest updates on startups and investments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  {
                    title: 'Startup Ecosystem Thrives in 2024',
                    snippet: 'Startups in India are gaining traction with increased investor interest...',
                    link: '#',
                  },
                  {
                    title: 'Top 10 Most Promising Startups of the Year',
                    snippet: 'Check out the top 10 startups to watch in 2024...',
                    link: '#',
                  },
                  {
                    title: 'Investor Spotlight: Jane Doe',
                    snippet: 'An in-depth interview with Jane Doe, a leading investor in tech startups...',
                    link: '#',
                  },
                ].map((article, index) => (
                  <div key={index} className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <h3 className="text-lg font-semibold text-green-900">{article.title}</h3>
                    <p className="text-sm text-green-600 mt-2">{article.snippet}</p>
                    <a href={article.link} className="text-green-500 hover:underline mt-2 block">
                      Read more
                    </a>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      // Logout Section
      case 'logout':
        return (
          <Card className="bg-green-50 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-green-900">Logout</CardTitle>
              <CardDescription>Are you sure you want to log out?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                  Confirm Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return <p className="text-green-700">Select a section from the sidebar.</p>;
    }
  };

  return (
    <div className="flex h-screen bg-green-50">
      {/* Sidebar */}
      <aside className="w-64 bg-green-800 shadow-lg">
        <div className="p-6 text-center">
          <h2 className="text-3xl font-bold text-green-50">AYUSH Portal</h2>
        </div>
        <nav className="mt-8">
          {[
            { icon: Home, label: 'Dashboard', section: 'dashboard' },
            { icon: HelpCircle, label: 'Help Center', section: 'help' },
            { icon: FileText, label: 'News and Articles', section: 'news-articles' },
            { icon: LogOut, label: 'Logout', section: 'logout' }, // Added Logout to the sidebar
          ].map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveSection(item.section)}
              className="flex items-center px-4 py-3 text-green-50 hover:bg-green-700 transition-colors w-full"
            >
              <item.icon className="w-5 h-5 mr-2" />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-green-50 p-8">
        {/* Header */}
        <header className="bg-green-800 shadow-lg rounded-lg p-4 flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-green-50">User Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="w-6 h-6 text-green-50" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="w-6 h-6 text-green-50" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-6 h-6 text-green-50" />
            </Button>
          </div>
        </header>

        {/* Content Area with Right Sidebar */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Section */}
          <div className="lg:col-span-2">
            {renderContent()}
          </div>

          {/* Right Sidebar: Leaderboard, Highlights */}
          <div className="space-y-6">
            {/* Leaderboard Section */}
            <Card className="bg-green-100 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-green-900">Leaderboard</CardTitle>
                <CardDescription>Top Startups by Performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {[
                    { name: 'FinTech Innovators', rank: 1 },
                    { name: 'AgroTech Solutions', rank: 2 },
                    { name: 'HealthifyMe', rank: 3 },
                    { name: 'EduMentor', rank: 4 },
                  ].map((startup, index) => (
                    <li key={index} className="flex justify-between text-green-800">
                      <span>{startup.rank}. {startup.name}</span>
                      <span className="text-green-600 font-bold">+{Math.random().toFixed(2)}%</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Highlights Section */}
            <Card className="bg-green-100 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-green-900">Startup Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-green-900">AgroTech Expansion</h3>
                    <p className="text-sm text-green-600 mt-2">AgroTech Solutions expands its operations to South India...</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-green-900">FinTech Innovators Lead Market</h3>
                    <p className="text-sm text-green-600 mt-2">FinTech Innovators raised $5M in Series B funding...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
