import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bell, FileText, HelpCircle, Home, LogOut, Upload, User,ClipboardCheck } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import DAPPage from '../DAP/dap_page'; // Import the DAPPage component
import StartupRegistration from '../ApplicationForm/ApplicationForm'
import InAppCoins from '../ASPIRE_Coins/InAppCoins'
import { useDisclosure, HStack, Text, Icon, Badge } from '@chakra-ui/react';
import { FaCoins } from "react-icons/fa"; // Import coin icon

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
  const { isOpen, onOpen, onClose } = useDisclosure(); // Use Chakra UI's useDisclosure hook
  const [coins, setCoins] = useState(100); // State to store user's coins (set initial coins to 100 for now)

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
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">This is the profile page where user information will be displayed.</p>

                {/* Coin Information */}
                <CardTitle className="mt-4">Coin Information</CardTitle>
                <Button
                  backgroundColor="yellow.200"
                  variant="solid"
                  onClick={onOpen}
                  mb={4}
                  width={"175px"} // Adjust width to fit content
                  px={4} // Add padding for better spacing
                >
                  <HStack spacing={2} alignItems="center">
                    <Icon as={FaCoins} color="yellow.500" boxSize={5} />
                    <Text fontSize="lg" fontWeight="bold">My Coins:</Text>
                    <Badge colorScheme="yellow" fontSize="lg">{coins}</Badge>
                  </HStack>
                </Button>

                {/* InAppCoins modal component */}
                <InAppCoins isOpen={isOpen} onClose={onClose} />

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
        return (
          <StartupRegistration />
        );
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <div className="flex items-center mb-6">
          <ClipboardCheck className="w-6 h-6 mr-2" />
          <h1 className="text-2xl font-bold">Startup Dashboard</h1>
        </div>
        <ul className="space-y-4">
          <li
            className={`cursor-pointer ${activeSection === 'Dashboard' ? 'text-yellow-400' : ''}`}
            onClick={() => setActiveSection('Dashboard')}
          >
            <Home className="inline mr-2" /> Dashboard
          </li>
          <li
            className={`cursor-pointer ${activeSection === 'Profile' ? 'text-yellow-400' : ''}`}
            onClick={() => setActiveSection('Profile')}
          >
            <User className="inline mr-2" /> Profile
          </li>
          <li
            className={`cursor-pointer ${activeSection === 'Your DAP' ? 'text-yellow-400' : ''}`}
            onClick={() => setActiveSection('Your DAP')}
          >
            <FileText className="inline mr-2" /> Your DAP
          </li>
          <li
            className={`cursor-pointer ${activeSection === 'Notifications' ? 'text-yellow-400' : ''}`}
            onClick={() => setActiveSection('Notifications')}
          >
            <Bell className="inline mr-2" /> Notifications{' '}
            <span className="bg-red-600 text-white text-xs rounded-full px-2 py-1">
              {unreadNotificationsCount}
            </span>
          </li>
          <li
            className={`cursor-pointer ${activeSection === 'Documents' ? 'text-yellow-400' : ''}`}
            onClick={() => setActiveSection('Documents')}
          >
            <Upload className="inline mr-2" /> Documents
          </li>
          <li
            className={`cursor-pointer ${activeSection === 'Help Center' ? 'text-yellow-400' : ''}`}
            onClick={() => setActiveSection('Help Center')}
          >
            <HelpCircle className="inline mr-2" /> Help Center
          </li>
          <li
            className={`cursor-pointer ${activeSection === 'Chat' ? 'text-yellow-400' : ''}`}
            onClick={() => setActiveSection('Chat')}
          >
            <HelpCircle className="inline mr-2" /> Saksham (Chatbot)
          </li>
          <li
            className={`cursor-pointer ${activeSection === 'Complete Your Application' ? 'text-yellow-400' : ''}`}
            onClick={() => setActiveSection('Complete Your Application')}
          >
            <LogOut className="inline mr-2" /> Complete Your Application
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1">{renderContent()}</div>
    </div>
  );
}
