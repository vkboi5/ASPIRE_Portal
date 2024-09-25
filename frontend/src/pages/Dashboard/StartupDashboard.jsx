import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bell, FileText, HelpCircle, Home, LogOut, Upload, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import DAPPage from '../DAP/dap_page'; // Import the DAPPage component
import StartupRegistration from '../ApplicationForm/ApplicationForm'


export default function Dashboard() {
  const [progress, setProgress] = useState(65);
  const [activeSection, setActiveSection] = useState('Dashboard'); // Track the active section
  const [application, setApplication] = useState([]);
  const [chatInput, setChatInput] = useState(""); // For chatbot input
  const [chatResponses, setChatResponses] = useState([]); // Chat responses
  const [notifications] = useState([
    "Your application is under review.",
    "Document verification completed.",
    "Application is now pending approval.",
    "A new update is available for your application."
  ]);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const unreadNotificationsCount = notifications.length; // Number of notifications (4)

  useEffect(() => {
    axios.post('http://localhost:3000/api/v1/get-application', {}, { withCredentials: true })
      .then((response) => {
        setApplication(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Dummy tracking of an application with a circular progress bar
  const dummyApplication = {
    title: "AYUSH Application",
    status: "Status : Pending",
    founder: "John Doe",
    progressValue: 50
  };

  // Chatbot logic
  const handleChatSubmit = () => {
    let response = "I don't understand. Please ask something else.";

    if (chatInput.toLowerCase().includes('hello')) {
      response = "Hello! How can I assist you today?";
    } else if (chatInput.toLowerCase().includes('status')) {
      response = "Your current application is in progress.";
    } else if (chatInput.toLowerCase().includes('help')) {
      response = "You can visit the Help Center for FAQs and support.";
    }

    setChatResponses([...chatResponses, { user: chatInput, bot: response }]);
    setChatInput(""); // Clear input after sending
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'Dashboard':
        return (
          <div className="p-6 grid gap-6 md:grid-cols-2">
            {/* Application Status */}
            <Card>
              <CardHeader>
                <CardTitle>Application Status</CardTitle>
                <CardDescription>Track your registration progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='max-h-full overflow-auto'>
                  <div className="flex items-center justify-between mt-4 w-full">
                    <div className='w-full'>
                      <p className="text-sm text-gray-600">{dummyApplication.title}</p>
                      <p className="font-semibold">{dummyApplication.status}</p>
                      <p className="text-sm text-gray-600">{dummyApplication.founder}</p>
                      {/* Circular Progress Bar */}
                      <div className="w-16 h-16 mt-4">
                        <CircularProgressbar
                          value={dummyApplication.progressValue}
                          text={`${dummyApplication.progressValue}%`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 'Notifications':
        return (
          <div className="p-6">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>You have {unreadNotificationsCount} unread notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 text-gray-700">
                  {notifications.map((notification, index) => (
                    <li key={index}>{notification}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        );
      case 'Profile':
        return (
          <div className="p-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Name: {userInfo.name}</CardDescription>
                <CardDescription>Email: {userInfo.email}</CardDescription>
                <CardDescription>Mobile: {userInfo.mobile || "+91 9876543210"}</CardDescription>
                <CardDescription>Location: {userInfo.location || "India"}</CardDescription>
                <CardDescription>Your details</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">This is the profile page where user information will be displayed.</p>
              </CardContent>
            </Card>
          </div>
        );
      case 'Documents':
        return (
          <div className="p-6">
            <Card>
              <CardHeader>
                <CardTitle>Document Upload</CardTitle>
                <CardDescription>Submit required documents</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Documents
                </Button>
              </CardContent>
            </Card>
          </div>
        );
      case 'Help Center':
        return (
          <div className="p-6">
            <Card>
              <CardHeader>
                <CardTitle>Help Center</CardTitle>
                <CardDescription>Find FAQs and support options</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Here you can find answers to common questions and support contacts.</p>
              </CardContent>
            </Card>
          </div>
        );
      case 'Chat':
        return (
          <div className="p-6">
            <Card>
              <CardHeader>
                <CardTitle>Saksham</CardTitle>
                <CardDescription>Ask me anything!</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Chat Interface */}
                <div className="h-64 overflow-y-auto mb-4">
                  {chatResponses.map((response, index) => (
                    <div key={index} className="mb-4">
                      <p className="text-blue-600">You: {response.user}</p>
                      <p className="text-green-600">Bot: {response.bot}</p>
                    </div>
                  ))}
                </div>
                <input
                  className="border rounded w-full px-3 py-2 mb-2"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type a message..."
                />
                <Button onClick={handleChatSubmit} className="w-full">
                  Send
                </Button>
              </CardContent>
            </Card>
          </div>
        );
      case 'Your DAP':  // New case for rendering DAPPage
        return (
          <div className="p-6">
            <DAPPage /> {/* Render the DAPPage component */}
          </div>
        );
      case 'Complete Your Application':
        return(
          <StartupRegistration/>
        );
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-primary">AYUSH Portal</h2>
        </div>
        <nav className="mt-6">
          {[
            { icon: Home, label: 'Dashboard', section: 'Dashboard' },
            { icon: FileText, label: 'Application', section: 'Complete Your Application' },
            { icon: Upload, label: 'Documents', section: 'Documents' },
            { icon: User, label: 'Profile', section: 'Profile' },
            { icon: Bell, label: 'Notifications', section: 'Notifications' },
            { icon: HelpCircle, label: 'Help Center', section: 'Help Center' },
            { icon: HelpCircle, label: 'Chat', section: 'Chat' },
            { icon: FileText, label: 'Your DAP', section: 'Your DAP' }, // Add DAP to the sidebar
          ].map((item, index) => (
            <div
              key={index}
              onClick={() => setActiveSection(item.section)}
              className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 cursor-pointer ${
                activeSection === item.section ? "bg-gray-200 font-semibold" : ""
              }`}
            >
              <item.icon className="w-5 h-5 mr-2 relative">
                {/* Red circle with notification count */}
                {item.section === 'Notifications' && unreadNotificationsCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
                    {unreadNotificationsCount}
                  </span>
                )}
              </item.icon>
              {item.label}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <h1 className="text-xl font-semibold">{activeSection}</h1>
            <div className="flex items-center">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Render Content Based on Active Section */}
        {renderContent()}
      </main>
    </div>
  );
}
