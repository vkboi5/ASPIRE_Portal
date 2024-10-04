import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bell, FileText, HelpCircle, Home, LogOut, Upload, User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard'); // Active section state
  const [application, setApplication] = useState([]);
  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login'); // Redirect to login page after logout
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <Card className="bg-[#FFF8EB] shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-[#D86B27]">Application Status</CardTitle>
              <CardDescription>Monitor the status of registered applications.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-h-full overflow-auto">
                {application.map((item, index) => (
                  <div key={index} className="flex items-center justify-between mt-4 w-full">
                    <div className="w-full">
                      <p className="text-sm text-[#D86B27]">{item.title}</p>
                      <p className="font-semibold">{item.status}</p>
                      <p className="text-sm text-[#D86B27]">{item.founder}</p>
                      <Progress value={item.status === "Pending" ? 0 : item.status === "Approved" ? 100 : 50} className="w-full mt-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 'monitoring':
        return (
          <Card className="bg-[#FDEBC8] shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-[#D86B27]">Manage Applications</CardTitle>
              <CardDescription>Review and manage applications from users.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate("/admin/applications")} className="w-full bg-[#D86B27] hover:bg-[#C05E23] text-white">
                <FileText className="w-4 h-4 mr-2 text-white" />
                View Applications
              </Button>
            </CardContent>
          </Card>
        );

      case 'documents':
        return (
          <Card className="bg-[#FDEBC8] shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-[#D86B27]">Document Management</CardTitle>
              <CardDescription>Review and upload necessary documents.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate("/admin/document-upload")} className="w-full bg-[#D86B27] hover:bg-[#C05E23] text-white">
                <Upload className="w-4 h-4 mr-2 text-white" />
                Upload Documents
              </Button>
            </CardContent>
          </Card>
        );

      case 'notifications':
        return (
          <Card className="bg-[#FDEBC8] shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-[#D86B27]">Recent Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {['New application received', 'Document upload required', 'Application status updated'].map((notification, index) => (
                  <li key={index} className="flex items-center text-sm text-[#A84C3C]">
                    <Bell className="w-4 h-4 mr-2 text-[#D86B27]" />
                    {notification}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        );

      case 'settings':
        return (
          <Card className="bg-[#FFF8EB] shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-[#D86B27]">Admin Settings</CardTitle>
              <CardDescription>Manage account, system settings, and monitor important analytics.</CardDescription>
            </CardHeader>
            <CardContent>
              <section className="mb-6">
                <h3 className="text-lg font-semibold text-[#D86B27] mb-3">Account Settings</h3>
                <Button onClick={() => navigate("/admin/settings")} className="w-full bg-[#D86B27] hover:bg-[#C05E23] text-white">
                  <Settings className="w-4 h-4 mr-2 text-white" />
                  Go to Settings
                </Button>
              </section>

              {/* Analytics Section */}
              <section className="mb-6">
                <h3 className="text-lg font-semibold text-[#D86B27] mb-3">Analytics Overview</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white shadow-md rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-[#D86B27] mb-2">Video KYC Pending for Startups</h4>
                    <p className="text-3xl font-bold text-[#D86B27] mb-2">18 Startups</p>
                    <p className="text-sm text-[#A84C3C]">Pending for Verification</p>
                    <Progress value={40} className="mt-2" />
                  </div>
                  <div className="bg-white shadow-md rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-[#D86B27] mb-2">Completed Startups Registrations</h4>
                    <p className="text-3xl font-bold text-[#D86B27] mb-2">112 Registrations</p>
                    <p className="text-sm text-[#A84C3C]">Successfully Registered Startups</p>
                    <Progress value={80} className="mt-2" />
                  </div>
                </div>
              </section>
            </CardContent>
          </Card>
        );

      case 'logout':
        return (
          <Card className="bg-[#FFF8EB] shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-[#D86B27]">Logout</CardTitle>
              <CardDescription>Are you sure you want to logout?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end space-x-4">
                <Button onClick={handleLogout} className="bg-[#A84C3C] hover:bg-[#C05E23] text-white">
                  Yes, Logout
                </Button>
                <Button onClick={() => setActiveSection('dashboard')} className="bg-gray-500 hover:bg-gray-700 text-white">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return <p>Select a section from the sidebar.</p>;
    }
  };

  return (
    <div className="flex h-screen bg-[#F5F5F5]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#F5F5F5] shadow-md">
        <div className="p-6 text-center">
          <h2 className="text-3xl font-bold text-[#D86B27]">Admin Dashboard</h2>
        </div>
        <nav className="mt-8">
          {[
            { icon: Home, label: 'Dashboard', section: 'dashboard' },
            { icon: FileText, label: 'Monitoring', section: 'monitoring' },
            { icon: Upload, label: 'Documents', section: 'documents' },
            { icon: Settings, label: 'Settings', section: 'settings' },
            { icon: Bell, label: 'Notifications', section: 'notifications' },
            { icon: HelpCircle, label: 'Help Center', section: 'help' },
            { icon: LogOut, label: 'Logout', section: 'logout' },
          ].map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveSection(item.section)}
              className="flex items-center px-4 py-3 text-[#A84C3C] hover:bg-[#F9D2A3] transition-colors w-full"
            >
              <item.icon className="w-5 h-5 mr-2" />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[#FFF8EB] p-8">
        {/* Header */}
        <header className="bg-[#FDEBC8] shadow-lg rounded-lg p-4 flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-[#D86B27]">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="w-6 h-6 text-[#D86B27]" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="w-6 h-6 text-[#D86B27]" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-6 h-6 text-[#D86B27]" />
            </Button>
          </div>
        </header>

        {/* Dynamic Content Based on Sidebar Selection */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Left section */}
          <div className="lg:col-span-2">
            {renderContent()}
          </div>

          {/* Right Section */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-[#FDEBC8] shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-[#D86B27]">Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Uptime: 99.9%</p>
                <p>Pending KYC: 18 Startups</p>
              </CardContent>
            </Card>

            <Card className="bg-[#FDEBC8] shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-[#D86B27]">Recent Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <p>System Maintenance scheduled for 5th October</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
