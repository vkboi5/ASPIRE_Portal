import 'regenerator-runtime/runtime';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import StartupDashboard from './pages/Dashboard/StartupDashboard';
import OtherUsersDashboard from './pages/Dashboard/OtherUserDashboard';
import InvestorDashboard from './pages/Dashboard/InvestorDashboard';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import ApplicationForm from './pages/ApplicationForm/ApplicationForm';
import DocumentUpload from './pages/DocumentUpload/DocumentUpload';
import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import AboutPage from './pages/About/About';
import FAQ from './pages/FAQ/FAQ';
import Help from './pages/Help/Help';
import Mentor from './pages/Mentor/Mentor';
import OtpVerify from './pages/OtpVerify/OtpVerify';
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes';
import PublicLayout from './components/PublicRoutes/PublicRoutes';
import Chat from './components/Chat/Chat';
import { useEffect } from 'react';
import { getCookie } from './lib/getCookie';
import { setUser } from './redux/authSlice';
import { useDispatch } from 'react-redux';
import MentorReg from './pages/MentorReg/MentorReg';
import Profile from './pages/Profile/Profile';
import DAP from './pages/DAP/DAP'
import InAppCoins from './pages/ASPIRE_Coins/InAppCoins'
import Resources from './pages/Resources/Resources.jsx';
import Networks from './pages/Networks/Networks';
import DigiLocker from './pages/DigiLocker/DigiLocker';
import DigiLockerPin from './pages/DigiLocker/OTPdigiLocker';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = getCookie('token');
    
    if (token) {
      dispatch(setUser(true)); // User is authenticated
    } else {
      dispatch(setUser(false)); // User is not authenticated
    }
  }, []);
  return (
    <Routes>
      {/* Protected routes */}
      <Route element={<PublicLayout />}>
        <Route path="/digilocker" element={<DigiLocker />} />
        <Route path="/digilocker/pin" element={<DigiLockerPin />} />
        <Route path="/startup/dashboard" element={<StartupDashboard />} />
        <Route path="/otherusers/dashboard" element={<OtherUsersDashboard />} />
        <Route path="/investor/dashboard" element={<InvestorDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/application-form" element={<ApplicationForm />} />
        <Route path="/document-upload" element={<DocumentUpload />} />
        <Route path="/startup/dap" element = {<DAP/>} />
        <Route path = "/chat" element = {<Chat />} />
        <Route path = "/mentor" element = {<Mentor />} />
        <Route path='/mentorReg' element={<MentorReg/>}/>
        <Route path="/startup/inappcoins" element={<InAppCoins />} />
      </Route>

      {/* Public routes with Navbar and Footer */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Main />} />
        <Route path="/dashboard/profile" element={<Profile />}></Route>
        <Route path="/user" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/help-center" element={<Help />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/networks" element={<Networks />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otpverify" element={<OtpVerify />} />


        {/* Startup routes */}

      </Route>
    </Routes>
  );
}


export default App;
