import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bell, FileText, HelpCircle, Home, LogOut, Upload, User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard'); // Active section state
  const [application, setApplication] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const applicationsPerPage = 5; // Applications to display per page

  const indexOfLastApplication = currentPage * applicationsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
  const currentApplications = application.slice(indexOfFirstApplication, indexOfLastApplication);

  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New application received', status: 'unread', date: '2024-10-11' },
    { id: 2, message: 'Document upload required', status: 'read', date: '2024-10-10' },
    { id: 3, message: 'Application status updated', status: 'unread', date: '2024-10-09' },
  ]);
  
  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((n) =>
        n.id === id ? { ...n, status: 'read' } : n
      )
    );
  };
  
  // Mark notification as unread
  const markAsUnread = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((n) =>
        n.id === id ? { ...n, status: 'unread' } : n
      )
    );
  };
  
  // Clear a specific notification
  const clearNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((n) => n.id !== id)
    );
  };
  
  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Handle Pagination
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (indexOfLastApplication < application.length) {
      setCurrentPage(currentPage + 1);
    }
  };
  const navigate = useNavigate();

  // Example KYC Data
  const kycData = {
    pending: 18,
    approved: 72,
    rejected: 10
  };

  // Graph Data for KYC Analytics (Example)
  const kycGraphData = {
    labels: ['Pending', 'Approved', 'Rejected'],
    datasets: [{
      data: [kycData.pending, kycData.approved, kycData.rejected],
      backgroundColor: ['#ffcc00', '#28a745', '#dc3545'],
      hoverBackgroundColor: ['#ffcc33', '#218838', '#c82333']
    }]
  };

  const barGraphData = {
    labels: ['Pending', 'Approved', 'Rejected'],
    datasets: [
      {
        label: 'KYC Status',
        backgroundColor: ['#ffcc00', '#28a745', '#dc3545'],
        data: [kycData.pending, kycData.approved, kycData.rejected]
      }
    ]
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login'); // Redirect to login page after logout
  };

  // UI Section Renderer
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <Card className="bg-[#F9FAFB] shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-[#1A73E8]">Dashboard Overview</CardTitle>
              <CardDescription>Monitor and track the progress of startup applications.</CardDescription>
            </CardHeader>

            <CardContent className="mt-4 space-y-8">
              {/* Application Summary */}
              <div>
                <h3 className="text-xl font-semibold text-[#1A73E8] mb-2">Application Summary</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-sm text-gray-600">Total Applications</p>
                    <p className="text-2xl font-bold text-[#1A73E8]">150</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-sm text-gray-600">Pending Applications</p>
                    <p className="text-2xl font-bold text-[#ffcc00]">40</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-sm text-gray-600">Approved Applications</p>
                    <p className="text-2xl font-bold text-[#28a745]">90</p>
                  </div>
                </div>
              </div>

              {/* Graphical Overview */}
              <div>
                <h3 className="text-xl font-semibold text-[#1A73E8] mb-4">Graphical Overview</h3>
                <Bar
                  data={{
                    labels: ['Pending', 'Approved', 'Rejected'],
                    datasets: [{
                      label: 'Applications Status',
                      data: [40, 90, 20],
                      backgroundColor: ['#ffcc00', '#28a745', '#dc3545'],
                      hoverBackgroundColor: ['#ffcc33', '#218838', '#c82333']
                    }]
                  }}
                  options={{
                    scales: {
                      y: { beginAtZero: true } // Linear scale for Y-axis
                    }
                  }}
                />
              </div>

              {/* Recent Applications */}
              <div>
                <h3 className="text-xl font-semibold text-[#1A73E8] mb-4">Recent Applications</h3>
                <div className="overflow-auto max-h-60">
                  {application.slice(0, 5).map((item, index) => (
                    <div key={index} className="bg-white p-4 mb-2 rounded-lg shadow flex items-center justify-between">
                      <div className="w-full">
                        <p className="text-sm text-[#1A73E8] font-semibold">{item.title}</p>
                        <p className="text-xs text-gray-500">{item.founder}</p>
                        <p className={`font-semibold mt-1 ${item.status === "Approved" ? "text-[#28a745]" : item.status === "Pending" ? "text-[#ffcc00]" : "text-[#dc3545]"}`}>
                          {item.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Application Progress */}
              <div>
                <h3 className="text-xl font-semibold text-[#1A73E8] mb-4">All Applications Progress</h3>
                <div className="max-h-96 overflow-auto">
                  {application.map((item, index) => (
                    <div key={index} className="bg-white p-4 mb-2 rounded-lg shadow">
                      <div className="flex items-center justify-between">
                        <div className="w-full">
                          <p className="text-sm text-[#1A73E8]">{item.title}</p>
                          <p className="font-semibold">{item.status}</p>
                          <p className="text-xs text-[#1A73E8]">{item.founder}</p>
                          <Progress value={item.status === "Pending" ? 20 : item.status === "Approved" ? 100 : 50} className="w-full mt-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'kyc':
        return (
          <Card className="bg-[#F9FAFB] shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-[#1A73E8]">KYC Analytics</CardTitle>
              <CardDescription>Track the KYC progress of startups.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {/* Pie Chart */}
                <div>
                  <h4 className="text-lg font-semibold text-[#1A73E8]">KYC Status Overview</h4>
                  <Pie data={kycGraphData} />
                </div>
                {/* Bar Chart */}
                <div>
                  <h4 className="text-lg font-semibold text-[#1A73E8]">KYC Progress</h4>
                  <Bar data={barGraphData} />
                </div>
              </div>
            </CardContent>
          </Card>
        );

        case 'settings':
          return (
            <Card className="bg-[#F9FAFB] shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-[#1A73E8]">Admin Settings</CardTitle>
                <CardDescription>Manage account settings, system settings, security, notifications, and more.</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Account Settings */}
                <section className="mb-6">
                  <h3 className="text-lg font-semibold text-[#1A73E8] mb-3">Account Settings</h3>
                  <Button onClick={() => navigate("/admin/settings/account")} className="w-full bg-[#1A73E8] hover:bg-[#0052cc] text-white">
                    <Settings className="w-4 h-4 mr-2 text-white" />
                    Account Settings
                  </Button>
                  <p className="text-sm text-gray-600 mt-2">Manage your personal account details, such as your name, email, and password.</p>
                </section>
      
                {/* Notification Settings */}
                <section className="mb-6">
                  <h3 className="text-lg font-semibold text-[#1A73E8] mb-3">Notification Settings</h3>
                  <Button onClick={() => navigate("/admin/settings/notifications")} className="w-full bg-[#1A73E8] hover:bg-[#0052cc] text-white">
                    <Bell className="w-4 h-4 mr-2 text-white" />
                    Notification Settings
                  </Button>
                  <p className="text-sm text-gray-600 mt-2">Customize how you receive notifications, such as email alerts, in-app notifications, and SMS.</p>
                </section>
      
                {/* System Settings */}
                <section className="mb-6">
                  <h3 className="text-lg font-semibold text-[#1A73E8] mb-3">System Settings</h3>
                  <Button onClick={() => navigate("/admin/settings/system")} className="w-full bg-[#1A73E8] hover:bg-[#0052cc] text-white">
                    <Settings className="w-4 h-4 mr-2 text-white" />
                    System Settings
                  </Button>
                  <p className="text-sm text-gray-600 mt-2">Configure system-wide settings, including integrations, API management, and performance monitoring.</p>
                </section>
      
                {/* Security Settings */}
                <section className="mb-6">
                  <h3 className="text-lg font-semibold text-[#1A73E8] mb-3">Security Settings</h3>
                  <Button onClick={() => navigate("/admin/settings/security")} className="w-full bg-[#1A73E8] hover:bg-[#0052cc] text-white">
                    <Settings className="w-4 h-4 mr-2 text-white" />
                    Security Settings
                  </Button>
                  <p className="text-sm text-gray-600 mt-2">Manage security settings such as two-factor authentication (2FA), password policies, and login activity.</p>
                </section>
      
                {/* Privacy Settings */}
                <section className="mb-6">
                  <h3 className="text-lg font-semibold text-[#1A73E8] mb-3">Privacy Settings</h3>
                  <Button onClick={() => navigate("/admin/settings/privacy")} className="w-full bg-[#1A73E8] hover:bg-[#0052cc] text-white">
                    <Settings className="w-4 h-4 mr-2 text-white" />
                    Privacy Settings
                  </Button>
                  <p className="text-sm text-gray-600 mt-2">Control privacy settings, including data collection preferences, data sharing, and consent management.</p>
                </section>
      
                {/* System Monitoring */}
                <section className="mb-6">
                  <h3 className="text-lg font-semibold text-[#1A73E8] mb-3">System Monitoring</h3>
                  <Button onClick={() => navigate("/admin/settings/monitoring")} className="w-full bg-[#1A73E8] hover:bg-[#0052cc] text-white">
                    <Settings className="w-4 h-4 mr-2 text-white" />
                    System Monitoring
                  </Button>
                  <p className="text-sm text-gray-600 mt-2">Monitor system performance, uptime, and error logs to ensure optimal system health.</p>
                </section>
      
                {/* API Management */}
                <section>
                  <h3 className="text-lg font-semibold text-[#1A73E8] mb-3">API Management</h3>
                  <Button onClick={() => navigate("/admin/settings/api")} className="w-full bg-[#1A73E8] hover:bg-[#0052cc] text-white">
                    <Settings className="w-4 h-4 mr-2 text-white" />
                    API Management
                  </Button>
                  <p className="text-sm text-gray-600 mt-2">Manage API keys, access levels, and monitor API usage.</p>
                </section>
              </CardContent>
            </Card>
          );

        case 'help':
    return (
      <Card className="bg-[#F9FAFB] shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-[#1A73E8]">Help Center</CardTitle>
          <CardDescription>Get help with frequently asked questions, guides, and support options.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* FAQs Section */}
          <section className="mb-6">
            <h3 className="text-lg font-semibold text-[#1A73E8] mb-3">Frequently Asked Questions (FAQs)</h3>

            <div className="space-y-4">
              {/* FAQ Item 1 */}
              <div>
                <p className="font-semibold text-sm">Q: How do I manage applications?</p>
                <p className="text-sm">A: Go to the monitoring section and review the applications listed. You can filter by status and search for specific applications.</p>
              </div>

              {/* FAQ Item 2 */}
              <div>
                <p className="font-semibold text-sm">Q: How do I upload documents?</p>
                <p className="text-sm">A: Navigate to the Documents section in the dashboard to upload necessary files such as identity verification or compliance documents.</p>
              </div>

              {/* FAQ Item 3 */}
              <div>
                <p className="font-semibold text-sm">Q: How do I track the progress of my application?</p>
                <p className="text-sm">A: You can track your application status in the Dashboard under the Application Status section. Progress bars will show the current stage.</p>
              </div>

              {/* FAQ Item 4 */}
              <div>
                <p className="font-semibold text-sm">Q: What should I do if my application is rejected?</p>
                <p className="text-sm">A: Review the reasons provided for rejection and resubmit your application with the required changes. You can contact support if you need further assistance.</p>
              </div>
            </div>
          </section>

          {/* Guides & Tutorials Section */}
          <section className="mb-6">
            <h3 className="text-lg font-semibold text-[#1A73E8] mb-3">Guides & Tutorials</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-[#1A73E8]">Guide: How to Manage Your Startup Applications</p>
                <p className="text-sm text-gray-600">This guide provides a step-by-step process for managing your startup applications, including submitting documents, tracking status, and reviewing feedback.</p>
                <Button variant="link" className="text-[#1A73E8]">Read Guide</Button>
              </div>

              <div>
                <p className="text-sm font-semibold text-[#1A73E8]">Video Tutorial: Uploading Documents</p>
                <p className="text-sm text-gray-600">Watch this tutorial to learn how to properly upload documents for your application.</p>
                <Button variant="link" className="text-[#1A73E8]">Watch Video</Button>
              </div>
            </div>
          </section>

          {/* Submit a Ticket Section */}
          <section className="mb-6">
            <h3 className="text-lg font-semibold text-[#1A73E8] mb-3">Submit a Support Ticket</h3>
            <p className="text-sm mb-4">If you are facing issues or need further assistance, you can submit a ticket to our support team, and we will get back to you shortly.</p>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700">Your Name</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Enter your name" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">Your Email</label>
                <input type="email" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Enter your email" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">Issue Description</label>
                <textarea className="w-full p-2 border border-gray-300 rounded-lg" rows="4" placeholder="Describe your issue"></textarea>
              </div>
              <Button type="submit" className="bg-[#1A73E8] hover:bg-[#0052cc] text-white">Submit Ticket</Button>
            </form>
          </section>

          {/* Contact Support Section */}
          <section className="mb-6">
            <h3 className="text-lg font-semibold text-[#1A73E8] mb-3">Contact Support</h3>
            <p className="text-sm mb-4">For further assistance, please contact our support team using the options below:</p>
            <ul className="space-y-2">
              <li><strong>Email:</strong> <a href="mailto:support@ayush.gov.in" className="text-[#1A73E8]">support@ayush.gov.in</a></li>
              <li><strong>Phone:</strong> +91-1234-567-890 (Mon-Fri, 10 AM - 6 PM)</li>
              <li><strong>Live Chat:</strong> <Button variant="link" className="text-[#1A73E8]">Start a Live Chat</Button></li>
            </ul>
          </section>
        </CardContent>
      </Card>
    );

    case 'notifications':
      return (
        <Card className="bg-[#F9FAFB] shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-[#1A73E8]">Notifications</CardTitle>
            <CardDescription>View and manage recent notifications.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Notifications List */}
            <section className="mb-6">
              <h3 className="text-lg font-semibold text-[#1A73E8] mb-3">Recent Notifications</h3>
              <div className="max-h-60 overflow-auto">
                {/* Example notification data */}
                {[
                  { id: 1, message: 'New application received', status: 'unread', date: '2024-10-11' },
                  { id: 2, message: 'Document upload required', status: 'read', date: '2024-10-10' },
                  { id: 3, message: 'Application status updated', status: 'unread', date: '2024-10-09' },
                ].map((notification) => (
                  <div key={notification.id} className={`p-4 mb-2 rounded-lg shadow flex justify-between items-center ${notification.status === 'unread' ? 'bg-[#EAF2FA]' : 'bg-white'}`}>
                    <div className="w-full">
                      <p className={`text-sm font-semibold ${notification.status === 'unread' ? 'text-[#1A73E8]' : 'text-gray-600'}`}>
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500">{notification.date}</p>
                    </div>
                    <div className="flex space-x-2">
                      {notification.status === 'unread' ? (
                        <Button
                          className="text-[#1A73E8] text-xs"
                          variant="link"
                          onClick={() => markAsRead(notification.id)}
                        >
                          Mark as Read
                        </Button>
                      ) : (
                        <Button
                          className="text-[#1A73E8] text-xs"
                          variant="link"
                          onClick={() => markAsUnread(notification.id)}
                        >
                          Mark as Unread
                        </Button>
                      )}
                      <Button
                        className="text-red-600 text-xs"
                        variant="link"
                        onClick={() => clearNotification(notification.id)}
                      >
                        Clear
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
  
            {/* Clear All Notifications */}
            <Button
              className="bg-[#dc3545] hover:bg-[#c82333] text-white"
              onClick={clearAllNotifications}
            >
              Clear All Notifications
            </Button>
          </CardContent>
        </Card>
      );


        case 'monitoring':
          return (
            <Card className="bg-[#F9FAFB] shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-[#1A73E8]">Manage Applications</CardTitle>
                <CardDescription>Review and manage all startup applications from users.</CardDescription>
              </CardHeader>
      
              <CardContent className="space-y-8">
                {/* Application Statistics */}
                <div>
                  <h3 className="text-lg font-semibold text-[#1A73E8]">Application Statistics</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow">
                      <p className="text-sm text-gray-600">Total Applications</p>
                      <p className="text-2xl font-bold text-[#1A73E8]">150</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                      <p className="text-sm text-gray-600">Pending Applications</p>
                      <p className="text-2xl font-bold text-[#ffcc00]">40</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                      <p className="text-sm text-gray-600">Approved Applications</p>
                      <p className="text-2xl font-bold text-[#28a745]">90</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                      <p className="text-sm text-gray-600">Rejected Applications</p>
                      <p className="text-2xl font-bold text-[#dc3545]">20</p>
                    </div>
                  </div>
                </div>
      
                {/* Interactive Filters */}
                <div>
                  <h3 className="text-lg font-semibold text-[#1A73E8] mb-2">Filter by Status</h3>
                  <div className="flex space-x-4">
                    <Button className="bg-[#1A73E8] text-white hover:bg-[#0052cc]" onClick={() => filterApplications("all")}>All</Button>
                    <Button className="bg-[#ffcc00] text-white hover:bg-[#ffb300]" onClick={() => filterApplications("pending")}>Pending</Button>
                    <Button className="bg-[#28a745] text-white hover:bg-[#218838]" onClick={() => filterApplications("approved")}>Approved</Button>
                    <Button className="bg-[#dc3545] text-white hover:bg-[#c82333]" onClick={() => filterApplications("rejected")}>Rejected</Button>
                  </div>
                </div>
      
                {/* Search Bar */}
                <div>
                  <h3 className="text-lg font-semibold text-[#1A73E8] mb-2">Search Applications</h3>
                  <input 
                    type="text" 
                    placeholder="Search by title or founder..." 
                    className="w-full p-2 border border-gray-300 rounded-lg" 
                    onChange={(e) => searchApplications(e.target.value)} 
                  />
                </div>
      
                {/* Recent Applications */}
                <div>
                  <h3 className="text-lg font-semibold text-[#1A73E8] mb-2">Recent Applications</h3>
                  <div className="max-h-60 overflow-auto">
                    {application.slice(0, 5).map((item, index) => (
                      <div key={index} className="bg-white p-4 mb-2 rounded-lg shadow flex items-center justify-between">
                        <div className="w-full">
                          <p className="text-sm text-[#1A73E8] font-semibold">{item.title}</p>
                          <p className="text-xs text-gray-500">{item.founder}</p>
                          <p className={`font-semibold mt-1 ${item.status === "Approved" ? "text-[#28a745]" : item.status === "Pending" ? "text-[#ffcc00]" : "text-[#dc3545]"}`}>
                            {item.status}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
      
                {/* View All Applications */}
                <div>
                  <h3 className="text-lg font-semibold text-[#1A73E8] mb-2">All Applications</h3>
                  <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead>
                      <tr className="text-left border-b-2 border-gray-300">
                        <th className="px-4 py-2">Title</th>
                        <th className="px-4 py-2">Founder</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Date Submitted</th>
                        <th className="px-4 py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {application.map((app, index) => (
                        <tr key={index} className="border-b">
                          <td className="px-4 py-2">{app.title}</td>
                          <td className="px-4 py-2">{app.founder}</td>
                          <td className={`px-4 py-2 ${app.status === "Approved" ? "text-[#28a745]" : app.status === "Pending" ? "text-[#ffcc00]" : "text-[#dc3545]"}`}>
                            {app.status}
                          </td>
                          <td className="px-4 py-2">{app.dateSubmitted}</td>
                          <td className="px-4 py-2">
                            <Button className="bg-[#1A73E8] hover:bg-[#0052cc] text-white">View Details</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
      
                  {/* Pagination */}
                  <div className="flex justify-between items-center mt-4">
                    <Button className="bg-gray-300 hover:bg-gray-400 text-black" onClick={prevPage}>Previous</Button>
                    <Button className="bg-gray-300 hover:bg-gray-400 text-black" onClick={nextPage}>Next</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
      default:
        return <p>Select a section from the sidebar.</p>;
    }
  };

  return (
    <div className="flex h-screen bg-[#F1F3F4]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1A73E8] shadow-md">
        <div className="p-6 text-center text-white">
          <h2 className="text-3xl font-bold">Admin Dashboard</h2>
        </div>
        <nav className="mt-8">
          {[
            { icon: Home, label: 'Dashboard', section: 'dashboard' },
            { icon: FileText, label: 'Monitoring', section: 'monitoring' },
            { icon: Settings, label: 'Settings', section: 'settings' },
            { icon: Bell, label: 'Notifications', section: 'notifications' },
            { icon: HelpCircle, label: 'Help Center', section: 'help' },
            { icon: FileText, label: 'KYC', section: 'kyc' }, // New KYC Section
            { icon: LogOut, label: 'Logout', section: 'logout' }
          ].map((item, index) => (
            <button
              key={index}
              onClick={() => {
                if (item.label === 'Logout') {
                  handleLogout(); // Call the handleLogout function
                } else {
                  setActiveSection(item.section); // Switch between sections
                }
              }}
              className="flex items-center px-4 py-3 text-white hover:bg-[#003399] transition-colors w-full"
            >
              <item.icon className="w-5 h-5 mr-2" />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[#F9FAFB] p-8">
        {/* Header */}
        <header className="bg-[#EAF2FA] shadow-lg rounded-lg p-4 flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-[#1A73E8]">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="w-6 h-6 text-[#1A73E8]" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="w-6 h-6 text-[#1A73E8]" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-6 h-6 text-[#1A73E8]" />
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
            <Card className="bg-[#EAF2FA] shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-[#1A73E8]">Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Uptime: 99.9%</p>
                <p>Pending KYC: 18 Startups</p>
              </CardContent>
            </Card>

            <Card className="bg-[#EAF2FA] shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-[#1A73E8]">Recent Highlights</CardTitle>
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
