// Dashboard.jsx

import { useEffect, useState, useRef,useMemo } from 'react';
import axios from 'axios';
import pancard from '../../assets/panCard.png';
import adhaar from '../../assets/adhaar.png';

import {
  Bell,
  FileText,
  HelpCircle,
  Home,
  LogOut,
  Upload,
  User,
  ClipboardCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import DAPPage from '../DAP/dap_page'; // Import the DAPPage component
import StartupRegistration from '../ApplicationForm/ApplicationForm';
import InAppCoins from '../ASPIRE_Coins/InAppCoins';
import { useDisclosure, HStack, Text, Icon, Badge } from '@chakra-ui/react';
import { FaCoins } from 'react-icons/fa'; // Import coin icon
import { useNavigate } from 'react-router-dom'; // Import useNavigate for React Router v6

export default function Dashboard() {
  const [progress, setProgress] = useState(65);
  const [activeSection, setActiveSection] = useState('Dashboard'); // Track the active section
  const [application, setApplication] = useState([]);
  const [chatInput, setChatInput] = useState(''); // For chatbot input
  const [chatResponses, setChatResponses] = useState([]); // Chat responses
  const chatContainerRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentDocIndex, setCurrentDocIndex] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [currentPreviewDoc, setCurrentPreviewDoc] = useState(null);
  const [documentsFetched, setDocumentsFetched] = useState(false);
  const fileInputRef = useRef(null);
  const [notifications] = useState([
    {
      message: 'Application submitted',
      timestamp: '2023-10-01',
      details: 'Your application was successfully submitted.',
    },
    {
      message: 'Document verification completed',
      timestamp: '2023-10-05',
      details: 'All your documents have been verified.',
    },
    {
      message: 'Application under review',
      timestamp: '2023-10-10',
      details: 'Your application is currently under review by our team.',
    },
    {
      message: 'Pending approval',
      timestamp: '2023-10-15',
      details: 'Your application is pending final approval.',
    },
  ]);
    // User information from localStorage
    const userInfo = useMemo(() => {
      return JSON.parse(localStorage.getItem('userInfo'));
    }, []);
  const unreadNotificationsCount = notifications.length; // Number of notifications
  const { isOpen, onOpen, onClose } = useDisclosure(); // Use Chakra UI's useDisclosure hook
  const [coins, setCoins] = useState(100); // State to store user's coins

  const dapRef = useRef();
  const navigate = useNavigate(); // Initialize useNavigate


  const handlePreview = (doc) => {
    setCurrentPreviewDoc(doc);
    setIsPreviewOpen(true);
  };
  
  const closePreview = () => {
    setIsPreviewOpen(false);
    setCurrentPreviewDoc(null);
  };


  // Add new state variables
  const [registrationStage, setRegistrationStage] = useState(0);
  const [registrationData, setRegistrationData] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);
  const [dapData, setDapData] = useState(null);

  useEffect(() => {
    axios
      .post('http://localhost:3000/api/v1/get-application', {}, { withCredentials: true })
      .then((response) => {
        setApplication(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    // Timezone-based greeting
    const hours = new Date().getHours();
    let greeting = '';
    if (hours < 12) {
      greeting = 'Good morning!';
    } else if (hours < 18) {
      greeting = 'Good afternoon!';
    } else {
      greeting = 'Good evening!';
    }
    setChatResponses([{ bot: `${greeting} Let's start the process, shall we?` }]);
  }, []);

  // Dummy tracking of an application with a circular progress bar
  const dummyApplication = {
    title: 'AYUSH Application',
    status: 'Status: Pending',
    founder: 'John Doe',
    progressValue: 25,
  };

  const handleDocumentUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const previewUrl = reader.result;

        setDocuments((prevDocuments) => [
          ...prevDocuments,
          {
            name: file.name,
            source: 'Uploaded',
            status: 'Uploaded',
            file: file,
            preview: previewUrl,
          },
        ]);
      };

      reader.readAsDataURL(file);
    }
  };

  // Fetch documents from Digilocker once when component mounts
  useEffect(() => {
    if (documentsFetched) {
      return; // Exit early if documents have already been fetched
    }

    const userEmail = userInfo?.email || 'guest';
    const fetched = localStorage.getItem(`documentsFetched_${userEmail}`) === 'true';

    if (fetched) {
      setDocumentsFetched(true);

      const digilockerDocuments = [
        {
          name: 'Aadhaar Card',
          source: 'Digilocker',
          preview: adhaar, // Update with actual paths
          status: 'Fetched',
        },
        {
          name: 'PAN Card',
          source: 'Digilocker',
          preview: pancard, // Update with actual paths
          status: 'Fetched',
        },
        // Add more fake documents if needed
      ];

      setDocuments((prevDocs) => [...digilockerDocuments, ...prevDocs]);
    }
  }, [documentsFetched, userInfo]);



  const handleChatSubmit = async () => {
    const userMessage = chatInput;
    setChatInput(''); // Clear input after sending
    let response = '';

    // Add the user's message to chatResponses
    setChatResponses((prevResponses) => [...prevResponses, { user: userMessage }]);

    if (registrationStage === 0) {
      // Not in registration process
      const lowerCaseMessage = userMessage.toLowerCase();

      if (lowerCaseMessage.includes('yes')) {
        response = "Would you like to start the application process? (yes/no)";
        setRegistrationStage('init');
      } else if (lowerCaseMessage.includes("let's start with the application process")) {
        response = "Would you like to start the application process? (yes/no)";
        setRegistrationStage('init');
      } else if (lowerCaseMessage.includes('hello')) {
        // Greet the user based on timezone
        const hours = new Date().getHours();
        if (hours < 12) {
          response = 'Good morning! How can I assist you today?';
        } else if (hours < 18) {
          response = 'Good afternoon! How can I assist you today?';
        } else {
          response = 'Good evening! How can I assist you today?';
        }
      } else if (lowerCaseMessage.includes('status')) {
        response = 'Your current application is in progress.';
      } else if (lowerCaseMessage.includes('help')) {
        response = 'You can visit the Help Center for FAQs and support.';
      } else {
        response = "I don't understand. Please ask something else.";
      }

      // Add the bot's response to chatResponses
      setChatResponses((prevResponses) => [...prevResponses, { bot: response }]);
    } else if (registrationStage === 'init') {
      // User is deciding whether to start the application process
      const lowerCaseMessage = userMessage.toLowerCase();
      if (['yes', 'yep', 'yeah'].includes(lowerCaseMessage)) {
        response =
          "Great! Let's start your application process.\nFirst, what's your startup's name?";
        setRegistrationStage(1);
      } else if (['no', 'nope', 'nah'].includes(lowerCaseMessage)) {
        response = 'Okay, let me know when you want to start the application process.';
        setRegistrationStage(0);
      } else {
        response =
          "Please answer with 'yes' or 'no'. Would you like to start the application process?";
      }

      // Add the bot's response to chatResponses
      setChatResponses((prevResponses) => [...prevResponses, { bot: response }]);
    } else {
      // In registration process
      switch (registrationStage) {
        case 1:
          // Collect Startup Name
          setRegistrationData((prevData) => ({ ...prevData, startupName: userMessage }));
          response = "What's your funding status?";
          setRegistrationStage(2);
          break;
        case 2:
          // Collect Funding Status
          setRegistrationData((prevData) => ({ ...prevData, fundingStatus: userMessage }));
          response = 'Please provide a brief description of your startup.';
          setRegistrationStage(3);
          break;
        case 3:
          // Collect Description
          setRegistrationData((prevData) => ({ ...prevData, description: userMessage }));
          response = "What's your Udyog Aadhaar number?";
          setRegistrationStage(4);
          break;
        case 4:
          // Collect Udyog Aadhaar
          setRegistrationData((prevData) => ({ ...prevData, udyogAadhaar: userMessage }));
          response = 'What is the nature of your entity?';
          setRegistrationStage(5);
          break;
        case 5:
          // Collect Nature of Entity
          setRegistrationData((prevData) => ({ ...prevData, natureOfEntity: userMessage }));
          response = 'Which industry does your startup belong to?';
          setRegistrationStage(6);
          break;
        case 6:
          // Collect Industry
          setRegistrationData((prevData) => ({ ...prevData, industry: userMessage }));
          response = 'What sector is your startup focused on?';
          setRegistrationStage(7);
          break;
        case 7:
          // Collect Sector
          setRegistrationData((prevData) => ({ ...prevData, sector: userMessage }));
          response = 'What services does your startup offer?';
          setRegistrationStage(8);
          break;
        case 8:
          // Collect Services
          setRegistrationData((prevData) => ({ ...prevData, services: userMessage }));
          response = 'What are your interests?';
          setRegistrationStage(9);
          break;
        case 9:
          // Collect Interest
          const updatedData = { ...registrationData, interest: userMessage };
          setRegistrationData(updatedData);

          // Prepare confirmation message using the updated data
          response =
            `Thank you! Please confirm your details:\n\n` +
            `Startup Name: ${updatedData.startupName}\n` +
            `Funding Status: ${updatedData.fundingStatus}\n` +
            `Description: ${updatedData.description}\n` +
            `Udyog Aadhaar: ${updatedData.udyogAadhaar}\n` +
            `Nature of Entity: ${updatedData.natureOfEntity}\n` +
            `Industry: ${updatedData.industry}\n` +
            `Sector: ${updatedData.sector}\n` +
            `Services: ${updatedData.services}\n` +
            `Interest: ${updatedData.interest}\n\n` +
            `Is this information correct? (yes/no)`;

          setRegistrationStage(10);
          break;
        case 10:
          // Confirm Details
          const lowerCaseMessage = userMessage.toLowerCase();
          if (['yes', 'yep', 'yeah'].includes(lowerCaseMessage)) {
            // Add 'Please wait...' message to chatResponses
            setChatResponses((prevResponses) => [
              ...prevResponses,
              { bot: 'Please wait while we process your registration...' },
            ]);

            // Set processing state to true
            setIsProcessing(true);

            // Scroll to the bottom to show the 'Please wait...' message
            if (chatContainerRef.current) {
              chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }

            // Send data to the server
            try {
              const res = await axios.post(
                'https://aspirebackend-gywyy55s.b4a.run/api/startup',
                registrationData
              );
              console.log('Registration successful:', res.data);
              response = 'You have been successfully registered!';

              // Set DAP data
              const dapData = {
                profilePicture: 'https://via.placeholder.com/100',
                name: registrationData.startupName,
                dapId: 'DAP123456789',
                qrCodeLink: 'https://example.com',
                category: registrationData.industry,
                specialization: registrationData.sector,
                contactDetails: registrationData.services,
                location: registrationData.udyogAadhaar,
                complianceStatus: registrationData.natureOfEntity,
                interest: registrationData.interest,
                email: userInfo.email, // Add email to dapData
              };

              setDapData(dapData);
              setIsRegistered(true);
            } catch (error) {
              console.error('Error during registration:', error);
              response = 'There was an error registering you. Please try again later.';
            }

            // Reset registration stage and data
            setRegistrationStage(0);
            setRegistrationData({});

            // Add the final response to chatResponses
            setChatResponses((prevResponses) => [...prevResponses, { bot: response }]);

            // Set processing state to false
            setIsProcessing(false);
          } else if (['no', 'nope', 'nah'].includes(lowerCaseMessage)) {
            response = "Registration cancelled. If you'd like to start over, please type 'yes'.";
            setRegistrationStage(0);
            setRegistrationData({});

            // Add the bot's response to chatResponses
            setChatResponses((prevResponses) => [...prevResponses, { bot: response }]);
          } else {
            response = "Please answer with 'yes' or 'no'. Is the information correct?";

            // Add the bot's response to chatResponses
            setChatResponses((prevResponses) => [...prevResponses, { bot: response }]);
          }
          break;
        default:
          response = "An error occurred. Please type 'register' to start over.";
          setRegistrationStage(0);
          setRegistrationData({});

          // Add the bot's response to chatResponses
          setChatResponses((prevResponses) => [...prevResponses, { bot: response }]);
          break;
      }

      // If not processing, add the bot's response to chatResponses
      if (!isProcessing && response) {
        setChatResponses((prevResponses) => [...prevResponses, { bot: response }]);
      }
    }

    // Auto-scroll chat container to the bottom
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const handleLogout = () => {
    // Clear user information from localStorage
    localStorage.removeItem('userInfo');

    // Redirect to the login page
    navigate('/login'); // Update the path to your login page
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatResponses]);

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
                <div className="max-h-full overflow-auto">
                  <div className="flex items-center justify-between mt-4 w-full">
                    <div className="w-full">
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
                <CardTitle>Application Progress</CardTitle>
                <CardDescription>Track your application milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="relative border-l border-gray-200 dark:border-gray-700">
                  {notifications.map((notification, index) => {
                    const isCurrent = index === notifications.length - 1;
                    return (
                      <li key={index} className="mb-10 ml-6">
                        <span className="flex absolute -left-3 justify-center items-center w-6 h-6">
                          <span
                            className={`relative inline-flex rounded-full h-6 w-6 ${
                              isCurrent ? 'bg-blue-500' : 'bg-gray-200'
                            }`}
                          >
                            {isCurrent && (
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            )}
                          </span>
                        </span>
                        <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                          {notification.message}
                          {isCurrent && (
                            <span className="bg-blue-100 text-blue-800 text-sm font-medium ml-3 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                              Current
                            </span>
                          )}
                        </h3>
                        <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                          {notification.timestamp}
                        </time>
                        <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                          {notification.details}
                        </p>
                      </li>
                    );
                  })}
                </ol>
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
                <CardDescription>
                  Mobile: {userInfo.mobile || '+91 9876543210'}
                </CardDescription>
                <CardDescription>Location: {userInfo.location || 'India'}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  This is the profile page where user information will be displayed.
                </p>

                {/* Coin Information */}
                <CardTitle className="mt-4">Coin Information</CardTitle>
                <Button
                  backgroundColor="yellow.200"
                  variant="solid"
                  onClick={onOpen}
                  mb={4}
                  width={'175px'} // Adjust width to fit content
                  px={4} // Add padding for better spacing
                >
                  <HStack spacing={2} alignItems="center">
                    <Icon as={FaCoins} color="yellow.500" boxSize={5} />
                    <Text fontSize="lg" fontWeight="bold">
                      My Coins:
                    </Text>
                    <Badge colorScheme="yellow" fontSize="lg">
                      {coins}
                    </Badge>
                  </HStack>
                </Button>

                {/* InAppCoins modal component */}
                <InAppCoins isOpen={isOpen} onClose={onClose} />
              </CardContent>
            </Card>
          </div>
        );
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Welcome, {userInfo?.username || 'User'}!</h2>
            {/* Dashboard content here */}
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
                  <Button
                    onClick={handleDocumentUpload}
                    className="mb-4 flex items-center"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Document
                  </Button>
        
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Document Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Source
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {documents.map((doc, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {doc.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-500">{doc.source}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {doc.status === 'Fetched' || doc.status === 'Uploaded' ? (
                              <span className="text-green-500">{doc.status}</span>
                            ) : (
                              <span className="text-red-500">{doc.status}</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {doc.preview && (
                              <Button
                                onClick={() => handlePreview(doc)}
                                className="flex items-center"
                              >
                                Preview
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
        
                  {/* Hidden file input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
        
                  {/* Preview Modal */}
                  {isPreviewOpen && currentPreviewDoc && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                      <div className="fixed inset-0 bg-black opacity-50"></div>
                      <div className="bg-white rounded-lg overflow-hidden shadow-lg z-50 max-w-lg">
                        <div className="p-4">
                          <h2 className="text-xl font-bold mb-4">{currentPreviewDoc.name}</h2>
                          <img
                            src={currentPreviewDoc.preview}
                            alt={currentPreviewDoc.name}
                            className="w-full h-auto object-contain"
                          />
                          <div className="mt-4 flex justify-end">
                            <Button onClick={closePreview}>Close</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
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
                <p className="text-gray-700">
                  Here you can find answers to common questions and support contacts.
                </p>
              </CardContent>
            </Card>
          </div>
        );
      case 'Chat':
        return (
          <div className="p-6">
            <Card>
              <CardHeader>
                <CardTitle>Chatbot Based Application Process</CardTitle>
                <CardDescription>Ask me anything!</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Chat Interface */}
                <div className="h-64 overflow-y-auto mb-4" ref={chatContainerRef}>
                  {chatResponses.map((response, index) => (
                    <div key={index} className="mb-4">
                      {/* User's message */}
                      {response.user && (
                        <div className="flex items-start justify-end">
                          <div className="bg-blue-500 text-white p-2 rounded-md max-w-xs">
                            {response.user}
                          </div>
                        </div>
                      )}
                      {/* Bot's message */}
                      {response.bot && (
                        <div className="flex items-start">
                          <div
                            className="bg-gray-200 text-gray-800 p-2 rounded-md max-w-xs"
                            style={{ whiteSpace: 'pre-wrap' }}
                          >
                            {response.bot}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Loading Animation */}
                  {isProcessing && (
                    <div className="flex items-start">
                      <div className="bg-gray-200 text-gray-800 p-2 rounded-md max-w-xs flex items-center">
                        {/* Loading Spinner */}
                        <svg
                          className="animate-spin h-5 w-5 mr-2 text-gray-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          ></path>
                        </svg>
                        <span>Processing...</span>
                      </div>
                    </div>
                  )}
                </div>
                <input
                  className="border rounded w-full px-3 py-2 mb-2"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type a message..."
                  disabled={isProcessing} // Disable input while processing
                />
                <Button
                  onClick={handleChatSubmit}
                  className="w-1/6 text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                  disabled={isProcessing}
                >
                  Send
                </Button>
              </CardContent>
            </Card>
            {/* If registration is complete, show DAPPage */}
            {isRegistered && (
              <div className="mt-6">
                <DAPPage data={dapData} ref={dapRef} />
              </div>
            )}
          </div>
        );
      case 'Your DAP':
        return (
          <div className="p-6">
            <DAPPage data={dapData} ref={dapRef} />
          </div>
        );
      case 'Complete Your Application':
        return <StartupRegistration />;
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
            className={`cursor-pointer ${
              activeSection === 'Dashboard' ? 'text-yellow-400' : ''
            }`}
            onClick={() => setActiveSection('Dashboard')}
          >
            <Home className="inline mr-2" /> Dashboard
          </li>
          <li
            className={`cursor-pointer ${
              activeSection === 'Profile' ? 'text-yellow-400' : ''
            }`}
            onClick={() => setActiveSection('Profile')}
          >
            <User className="inline mr-2" /> Profile
          </li>
          <li
            className={`cursor-pointer ${
              activeSection === 'Your DAP' ? 'text-yellow-400' : ''
            }`}
            onClick={() => setActiveSection('Your DAP')}
          >
            <FileText className="inline mr-2" /> Your DAP
          </li>
          <li
            className={`cursor-pointer ${
              activeSection === 'Notifications' ? 'text-yellow-400' : ''
            }`}
            onClick={() => setActiveSection('Notifications')}
          >
            <Bell className="inline mr-2" /> Notifications{' '}
            <span className="bg-red-600 text-white text-xs rounded-full px-2 py-1">
              {unreadNotificationsCount}
            </span>
          </li>
          <li
            className={`cursor-pointer ${
              activeSection === 'Documents' ? 'text-yellow-400' : ''
            }`}
            onClick={() => setActiveSection('Documents')}
          >
            <Upload className="inline mr-2" /> Documents
          </li>
          <li
            className={`cursor-pointer ${
              activeSection === 'Help Center' ? 'text-yellow-400' : ''
            }`}
            onClick={() => setActiveSection('Help Center')}
          >
            <HelpCircle className="inline mr-2" /> Help Center
          </li>
          <li
            className={`cursor-pointer ${
              activeSection === 'Chat' ? 'text-yellow-400' : ''
            }`}
            onClick={() => setActiveSection('Chat')}
          >
            <HelpCircle className="inline mr-2" /> Saksham (Chatbot)
          </li>
          <li
            className={`cursor-pointer ${
              activeSection === 'Complete Your Application' ? 'text-yellow-400' : ''
            }`}
            onClick={() => setActiveSection('Complete Your Application')}
          >
            <FileText className="inline mr-2" /> Complete Your Application
          </li>
          <li className="cursor-pointer hover:text-yellow-400" onClick={handleLogout}>
            <LogOut className="inline mr-2" /> Logout
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1">{renderContent()}</div>
    </div>
  );
}
