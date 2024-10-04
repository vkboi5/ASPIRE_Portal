import { useEffect, useState } from 'react';
import { Bell, FileText, HelpCircle, Home, LogOut, Upload, User, ClipboardCheck, Search, Mail, Phone,Contact2} from 'lucide-react';
import { Button } from '@/components/ui/button';
import 'react-circular-progressbar/dist/styles.css';
import { FaCoins } from "react-icons/fa";
import { setUser } from '../../../redux/authSlice';
import { useDispatch } from 'react-redux';
import { Text, Icon } from '@chakra-ui/react';
import { useNavigate, Link } from 'react-router-dom';
import InvestmentPerformanceChart from './InvestmentPerformanceChart';
import RiskAssessmentChart from './RiskAssessmentChart';
import GrowthProjectionChart from './GrowthProjectionChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@chakra-ui/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');  // Track active section
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    dispatch(setUser(false));  // Set authentication to false on logout
    localStorage.removeItem("userInfo");  // Clear user info from localStorage
    navigate('/login');  // Redirect to login page after logout
  };

  const navigate = useNavigate();

  const faqs = [
    {
      question: "What is the AYUSH Startup Registration Portal?",
      answer: "The AYUSH Startup Registration Portal is a platform designed to facilitate the registration and support of startups in the fields of Ayurveda, Yoga, Unani, Siddha, and Homeopathy (AYUSH)."
    },
    {
      question: "How do I register my AYUSH startup?",
      answer: "To register your AYUSH startup, navigate to the 'Apply' section of our portal. Fill out the required information and submit your application."
    },
    // Add more FAQs as needed
  ];

  const filteredFaqs = faqs.filter(
    faq =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <section>
            <h2 className="text-2xl font-semibold mb-6">Investment Opportunities</h2>
            {/* Display investment opportunities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "FinTech Boost",
                  category: "FinTech",
                  fundingStage: "Series A",
                  investmentRange: "$100K - $1M",
                  growthRate: "30%",
                  riskLevel: "Medium",
                  description: "Revolutionizing the financial technology space."
                },
                {
                  name: "HealthifyMe",
                  category: "HealthTech",
                  fundingStage: "Seed",
                  investmentRange: "$50K - $200K",
                  growthRate: "45%",
                  riskLevel: "Low",
                  description: "A fitness and health monitoring app."
                },
                {
                  name: "AgriSmart",
                  category: "AgriTech",
                  fundingStage: "Series B",
                  investmentRange: "$250K - $1.5M",
                  growthRate: "20%",
                  riskLevel: "High",
                  description: "Optimizing agricultural practices using AI."
                },
                {
                  name: "EduMentor",
                  category: "EdTech",
                  fundingStage: "Series A",
                  investmentRange: "$500K - $2M",
                  growthRate: "50%",
                  riskLevel: "Low",
                  description: "An innovative learning platform."
                },
                {
                  name: "EcoRide",
                  category: "Transport",
                  fundingStage: "Pre-Seed",
                  investmentRange: "$75K - $500K",
                  growthRate: "65%",
                  riskLevel: "High",
                  description: "Promoting eco-friendly transportation."
                },
                {
                  name: "CleanEarth",
                  category: "Environmental",
                  fundingStage: "Series A",
                  investmentRange: "$300K - $1M",
                  growthRate: "40%",
                  riskLevel: "Medium",
                  description: "Environmental solutions to combat climate change."
                },
                {
                  name: "RoboTech",
                  category: "AI/Robotics",
                  fundingStage: "Series B",
                  investmentRange: "$1M - $5M",
                  growthRate: "25%",
                  riskLevel: "High",
                  description: "Advanced robotics and AI solutions."
                },
                {
                  name: "GreenEnergy",
                  category: "Energy",
                  fundingStage: "Series A",
                  investmentRange: "$250K - $1.2M",
                  growthRate: "30%",
                  riskLevel: "Medium",
                  description: "Clean and renewable energy provider."
                },
                {
                  name: "HomeSmart",
                  category: "Smart Home",
                  fundingStage: "Seed",
                  investmentRange: "$100K - $500K",
                  growthRate: "35%",
                  riskLevel: "Medium",
                  description: "Smart solutions for home automation."
                },
                {
                  name: "MedTech Innovators",
                  category: "MedTech",
                  fundingStage: "Series C",
                  investmentRange: "$2M - $10M",
                  growthRate: "55%",
                  riskLevel: "Low",
                  description: "Disruptive medical technologies."
                }
              ].map((startup, index) => (
                <div
                  key={index}
                  className="bg-pastel-blue border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 ease-in-out"
                >
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">{startup.name}</h3>
                  <p className="text-sm text-gray-500 mb-2"><strong>Category:</strong> {startup.category}</p>
                  <p className="text-sm text-gray-500 mb-2"><strong>Funding Stage:</strong> {startup.fundingStage}</p>
                  <p className="text-sm text-gray-500 mb-2"><strong>Investment Range:</strong> {startup.investmentRange}</p>
                  <p className="text-sm text-gray-500 mb-2"><strong>Growth Rate:</strong> {startup.growthRate}</p>
                  <p className="text-sm text-gray-500 mb-2"><strong>Risk Level:</strong> {startup.riskLevel}</p>
                  <p className="text-sm text-gray-500 mb-4">{startup.description}</p>
                  <Button variant="solid" className="bg-blue-300 text-blue-800 hover:bg-blue-400 px-4 py-2 rounded-lg">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </section>
        );

      case 'profile':
        return (
          <section>
            <h2 className="text-2xl font-semibold mb-6">Profile</h2>

            {/* Personal Information */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
              <h3 className="text-lg font-bold mb-4">Personal Information</h3>
              <p className="text-gray-700 mb-2"><strong>Name:</strong> John Doe</p>
              <p className="text-gray-700 mb-2"><strong>Email:</strong> johndoe@example.com</p>
              <p className="text-gray-700 mb-2"><strong>Contact:</strong> +1 234 567 890</p>
              <p className="text-gray-700 mb-2"><strong>Location:</strong> New York, USA</p>
            </div>

            {/* Current Investments */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
              <h3 className="text-lg font-bold mb-4">Current Investments</h3>
              <ul className="space-y-4">
                {[
                  { name: "FinTech Boost", amount: "$500K", status: "Growing" },
                  { name: "HealthifyMe", amount: "$300K", status: "Stable" },
                  { name: "EcoRide", amount: "$700K", status: "Expanding" },
                ].map((investment, index) => (
                  <li key={index} className="flex justify-between bg-pastel-green p-4 rounded-md shadow">
                    <div>
                      <h4 className="font-semibold text-lg">{investment.name}</h4>
                      <p className="text-sm text-gray-600">Status: {investment.status}</p>
                    </div>
                    <p className="font-bold text-lg">{investment.amount}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Performance Graph */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
              <h3 className="text-lg font-bold mb-4">Investment Performance</h3>
              <div className="w-full h-64">
                {/* Recharts Graph Example */}
                <InvestmentPerformanceChart />
              </div>
            </div>

            {/* Total Portfolio Value */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
              <h3 className="text-lg font-bold mb-4">Total Portfolio Value</h3>
              <p className="text-3xl font-bold text-green-500">$2.5M</p>
            </div>

            {/* Risk and Growth Analysis */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">Risk & Growth Analysis</h3>
              <p className="text-gray-600">Your current investments have an average growth rate of 35% with a medium risk profile.</p>
            </div>
          </section>
        );
        case 'investment':
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">Investment Opportunities</h2>
      <p className="text-gray-600 mb-6">Explore a curated list of potential investment opportunities tailored to your preferences. Review details such as funding stage, risk level, and projected returns to make informed decisions.</p>
      
      {/* Investment Opportunities List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            name: "FinTech Boost",
            category: "FinTech",
            fundingStage: "Series A",
            projectedReturns: "15% annually",
            riskLevel: "Medium",
            description: "An innovative platform revolutionizing payment solutions with AI-driven financial tools."
          },
          {
            name: "HealthifyMe",
            category: "HealthTech",
            fundingStage: "Seed",
            projectedReturns: "20% annually",
            riskLevel: "Low",
            description: "A fitness and health monitoring app improving lifestyles through personalized coaching."
          },
          {
            name: "AgriSmart",
            category: "AgriTech",
            fundingStage: "Series B",
            projectedReturns: "12% annually",
            riskLevel: "High",
            description: "An AI-powered solution for optimizing agricultural practices to boost productivity."
          },
          {
            name: "EduMentor",
            category: "EdTech",
            fundingStage: "Series A",
            projectedReturns: "18% annually",
            riskLevel: "Low",
            description: "A disruptive platform transforming the education industry with virtual learning tools."
          },
          {
            name: "CleanEnergy Innovations",
            category: "EnergyTech",
            fundingStage: "Series C",
            projectedReturns: "25% annually",
            riskLevel: "Medium",
            description: "Pioneering in clean energy solutions to reduce carbon emissions and save costs."
          },
          {
            name: "EcoTransport",
            category: "Transport",
            fundingStage: "Pre-Seed",
            projectedReturns: "30% annually",
            riskLevel: "High",
            description: "A green transport initiative promoting electric and eco-friendly vehicles."
          },
        ].map((opportunity, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 ease-in-out"
          >
            <h3 className="text-lg font-semibold mb-2 text-gray-800">{opportunity.name}</h3>
            <p className="text-sm text-gray-500 mb-2"><strong>Category:</strong> {opportunity.category}</p>
            <p className="text-sm text-gray-500 mb-2"><strong>Funding Stage:</strong> {opportunity.fundingStage}</p>
            <p className="text-sm text-gray-500 mb-2"><strong>Projected Returns:</strong> {opportunity.projectedReturns}</p>
            <p className="text-sm text-gray-500 mb-2"><strong>Risk Level:</strong> {opportunity.riskLevel}</p>
            <p className="text-sm text-gray-500 mb-4">{opportunity.description}</p>
            <Button variant="solid" className="bg-blue-300 text-blue-800 hover:bg-blue-400 px-4 py-2 rounded-lg">
              Learn More
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
      case 'analytics':
        return (
          <section className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Real-Time Analytics</h2>

            {/* Performance Overview */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">Portfolio Performance Overview</h3>
              <p className="text-gray-600 mb-4">Monitor the overall performance of your investments across different sectors in real-time.</p>
              <div className="w-full h-64">
                {/* Include a performance chart such as a line or area chart */}
                <InvestmentPerformanceChart />
              </div>
            </div>

            {/* Sector-Wise Breakdown */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">Sector-Wise Breakdown</h3>
              <p className="text-gray-600 mb-4">View how your investments are performing in different sectors such as FinTech, HealthTech, and AgriTech.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold text-blue-500">45%</div>
                  <p className="text-gray-600">FinTech</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold text-green-500">35%</div>
                  <p className="text-gray-600">HealthTech</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold text-yellow-500">20%</div>
                  <p className="text-gray-600">AgriTech</p>
                </div>
              </div>
            </div>

            {/* Risk Assessment */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">Risk Assessment</h3>
              <p className="text-gray-600 mb-4">Evaluate the risk associated with your current investments and how they compare with market trends.</p>
              <div className="w-full">
                {/* Add a risk assessment chart here, like a radar or bar chart */}
                <RiskAssessmentChart />
              </div>
            </div>

            {/* Comparisons */}
            <div className="bg-white shadow-md rounded-lg p-6 mt-6">
              <h3 className="text-xl font-bold mb-4 w-1/2">Comparisons with Market Benchmarks</h3>
              <p className="text-gray-600 w-1/2">
                Compare your investment performance with the overall market and benchmark indices.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                <div className="flex flex-col items-center justify-center">
                  <div className="text-4xl font-bold text-purple-500 mb-2">+12%</div>
                  <p className="text-gray-600">Your Portfolio</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <div className="text-4xl font-bold text-red-500 mb-2">+8%</div>
                  <p className="text-gray-600">Market Benchmark</p>
                </div>
              </div>
            </div>
          </section>
        );
      case 'notifications':
        return (
          <section className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Notifications</h2>

            {/* Investment Opportunities */}
            <div className="bg-white p-6 shadow-md rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-4">New Investment Opportunities</h3>
              <ul className="space-y-4">
                <li className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-medium">FinTech Boost has opened a new funding round (Series A)</p>
                    <p className="text-sm text-gray-500">Deadline to participate: 30th October 2024</p>
                  </div>
                  <Button variant="solid" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                    View Opportunity
                  </Button>
                </li>
                <li className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-medium">GreenEnergy is seeking new investors for expansion</p>
                    <p className="text-sm text-gray-500">Expected growth rate: 25% over the next year</p>
                  </div>
                  <Button variant="solid" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                    Learn More
                  </Button>
                </li>
              </ul>
            </div>

            {/* Performance Updates */}
            <div className="bg-white p-6 shadow-md rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-4">Performance Updates</h3>
              <ul className="space-y-4">
                <li className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-medium">HealthifyMe’s quarterly report shows 45% growth</p>
                    <p className="text-sm text-gray-500">View the full report to see detailed analytics.</p>
                  </div>
                  <Button variant="solid" className="bg-green-500 text-white px-4 py-2 rounded-lg">
                    View Report
                  </Button>
                </li>
                <li className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-medium">EcoRide's valuation has increased by 20%</p>
                    <p className="text-sm text-gray-500">This marks a significant milestone for early investors.</p>
                  </div>
                  <Button variant="solid" className="bg-green-500 text-white px-4 py-2 rounded-lg">
                    Track Growth
                  </Button>
                </li>
              </ul>
            </div>

            {/* Community News */}
            <div className="bg-white p-6 shadow-md rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-4">Community News & Updates</h3>
              <ul className="space-y-4">
                <li className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-medium">Investor Webinar: "Maximizing ROI in the HealthTech Sector"</p>
                    <p className="text-sm text-gray-500">Join us on 12th November 2024, 3:00 PM IST</p>
                  </div>
                  <Button variant="solid" className="bg-purple-500 text-white px-4 py-2 rounded-lg">
                    Register Now
                  </Button>
                </li>
                <li className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-medium">Exclusive Insights: “Trends in AI-driven investments for 2025”</p>
                    <p className="text-sm text-gray-500">Access expert reports and analysis.</p>
                  </div>
                  <Button variant="solid" className="bg-purple-500 text-white px-4 py-2 rounded-lg">
                    Read Insights
                  </Button>
                </li>
              </ul>
            </div>

            {/* Alerts */}
            <div className="bg-white p-6 shadow-md rounded-lg">
              <h3 className="text-xl font-bold mb-4">Alerts & Action Items</h3>
              <ul className="space-y-4">
                <li className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-medium">Deadline for FinTech Boost investment is approaching!</p>
                    <p className="text-sm text-red-500">Complete your investment by 30th October 2024.</p>
                  </div>
                  <Button variant="solid" className="bg-red-500 text-white px-4 py-2 rounded-lg">
                    Complete Investment
                  </Button>
                </li>
                <li className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-medium">Important: Document upload pending for CleanEarth investment</p>
                    <p className="text-sm text-red-500">Upload the required documents to avoid missing out.</p>
                  </div>
                  <Button variant="solid" className="bg-red-500 text-white px-4 py-2 rounded-lg">
                    Upload Documents
                  </Button>
                </li>
              </ul>
            </div>
          </section>
        );
      case 'incentives':
        return (
          <section className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Incentives & Rewards</h2>

            {/* Total Coins Earned */}
            <div className="flex items-center mb-6">
              <FaCoins className="w-8 h-8 mr-4 text-yellow-500" />
              <div>
                <h3 className="text-xl font-bold">Total Coins Earned</h3>
                <p className="text-lg">You have earned <strong>250</strong> coins!</p>
              </div>
            </div>

            {/* Reward Breakdown */}
            <div className="bg-white p-6 shadow-md rounded-lg mb-6">
              <h4 className="text-lg font-bold mb-4">Breakdown of Rewards</h4>
              <ul className="space-y-4">
                <li className="flex justify-between items-center">
                  <span>Investment Milestone Reward</span>
                  <span className="font-bold">100 Coins</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Referral Bonus</span>
                  <span className="font-bold">50 Coins</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Feedback Contribution</span>
                  <span className="font-bold">30 Coins</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Community Engagement</span>
                  <span className="font-bold">70 Coins</span>
                </li>
              </ul>
            </div>

            {/* Progress toward Next Reward */}
            <div className="bg-white p-6 shadow-md rounded-lg mb-6">
              <h4 className="text-lg font-bold mb-4">Progress Toward Next Reward</h4>
              <div className="mb-4">
                <p className="mb-1">Next Reward: Exclusive Investor Badge (500 Coins)</p>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="bg-blue-500 h-4 rounded-full" style={{ width: '50%' }}></div>
                </div>
                <p className="text-sm mt-2">250/500 Coins</p>
              </div>
            </div>

            {/* Special Offers */}
            <div className="bg-white p-6 shadow-md rounded-lg">
              <h4 className="text-lg font-bold mb-4">Special Offers & Bonuses</h4>
              <ul className="space-y-4">
                <li className="flex justify-between items-center">
                  <span>Earn double coins for every new startup investment this month</span>
                  <Button variant="solid" className="bg-green-500 text-white px-4 py-2 rounded-lg">
                    Invest Now
                  </Button>
                </li>
                <li className="flex justify-between items-center">
                  <span>Receive a bonus of 50 coins for referring new investors</span>
                  <Button variant="solid" className="bg-green-500 text-white px-4 py-2 rounded-lg">
                    Refer Now
                  </Button>
                </li>
              </ul>
            </div>

            {/* FAQ Section */}
            <div className="mt-8">
              <h4 className="text-lg font-bold mb-4">Frequently Asked Questions</h4>
              <ul className="space-y-4">
                <li>
                  <strong>How do I earn coins?</strong>
                  <p>Coins can be earned through various activities such as hitting investment milestones, contributing to community feedback, and referring new investors.</p>
                </li>
                <li>
                  <strong>What can I redeem with coins?</strong>
                  <p>Coins can be redeemed for badges, exclusive offers, and early access to new investment opportunities.</p>
                </li>
                <li>
                  <strong>Can I transfer coins to others?</strong>
                  <p>Currently, coins are non-transferable and can only be redeemed within the platform.</p>
                </li>
              </ul>
            </div>
          </section>
        );
      case 'help':
        return (
          <section className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">Help Center</h2>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto mb-8">
              <div className="flex items-center border rounded-md">
                <Input
                  type="text"
                  placeholder="Search for help..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-grow border-none focus:ring-0"
                />
                <Button variant="ghost" className="px-3">
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* FAQ Section */}
            <h3 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h3>
            <Accordion type="single" collapsible className="w-full">
              {filteredFaqs.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {filteredFaqs.length === 0 && (
              <p className="text-center text-muted-foreground mt-4">
                No results found. Please try a different search term or contact us for assistance.
              </p>
            )}

            {/* Contact Section */}
            <h3 className="text-2xl font-semibold mt-10 mb-4">Contact Support</h3>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Contact Us Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="mr-2" />
                    Contact Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">For any inquiries, please email us at:</p>
                  <a href="mailto:support@ayushstartup.gov.in" className="text-primary hover:underline">
                    support@ayushstartup.gov.in
                  </a>
                </CardContent>
              </Card>

              {/* Helpline Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="mr-2" />
                    Helpline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">For urgent assistance, call our helpline:</p>
                  <a href="tel:+911234567890" className="text-primary hover:underline">
                    +91 123 456 7890
                  </a>
                  <p className="text-sm text-muted-foreground mt-2">
                    (Monday to Friday, 9 AM to 5 PM IST)
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Chatbot Promo */}
            <p className="text-center text-lg mt-8 text-orange-500">
              For more queries, ask our Smart Chatbot <strong>Saksham</strong>.
            </p>
          </section>
        );
      default:
        return <p>Select a section from the sidebar.</p>;
    }
  };

  return (
    <main className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-400 shadow-md">
        <div className="p-4 bg-blue-600">
          <h2 className="text-2xl font-bold text-primary text-white"> 
            Investor Dashboard
            </h2>
        </div>
        <nav className="mt-6">
          <button
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left"
            onClick={() => setActiveSection('dashboard')}
          >
            <Home className="w-5 h-5 mr-2" />
            Dashboard
          </button>
          <button
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left"
            onClick={() => setActiveSection('profile')}
          >
            <User className="w-5 h-5 mr-2" />
            Profile
          </button>
          <button
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left"
            onClick={() => setActiveSection('investment')}
          >
            <FileText className="w-5 h-5 mr-2" />
            Investment Opportunities
          </button>
          <button
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left"
            onClick={() => setActiveSection('analytics')}
          >
            <Upload className="w-5 h-5 mr-2" />
            Analytics
          </button>
          <button
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left"
            onClick={() => setActiveSection('notifications')}
          >
            <Bell className="w-5 h-5 mr-2" />
            Notifications
          </button>
          <button
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left"
            onClick={() => setActiveSection('incentives')}
          >
            <FaCoins className="w-5 h-5 mr-2" />
            Incentives
          </button>
          <button
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left"
            onClick={() => setActiveSection('help')}
          >
            <HelpCircle className="w-5 h-5 mr-2" />
            Help Center
          </button>
          <button
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-2" />
            <Link >
              Logout
            </Link>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <header className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">
            <Contact2 className='w-8 h-8'/>
            Investor Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <Button onClick={() => setActiveSection('notifications')} variant="ghost">
              <Bell className="w-5 h-5" />
            </Button>
            <Button onClick={() => setActiveSection('profile')} variant="ghost">
              <User className="w-5 h-5" />
            </Button>
            <Button onClick={handleLogout} variant="ghost">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Dynamic Content */}
        {renderContent()}
      </main>
    </main>
  );
}
