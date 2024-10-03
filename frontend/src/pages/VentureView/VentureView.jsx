import React from 'react';
import { Button } from '@/components/ui/button'; // Assuming you're using Tailwind CSS and UI components
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { FaTwitter, FaLinkedin, FaGlobe, FaRegChartBar, FaMoneyBillAlt, FaTag } from 'react-icons/fa';
import product1 from '../../assets/product1.png';
import product2 from '../../assets/product2.png';
import product3 from '../../assets/product3.png';
import profilepic1 from '../../assets/profilepic1.png';
import profilepic2 from '../../assets/profilepic2.png';
import profilepic3 from '../../assets/profilepic3.png';
import profilepic4 from '../../assets/profilepic4.png';


// import product3 from '../../assets/product3.png';
const VentureView = () => {
  return (
    <div className="container mx-auto p-6">
      {/* Main Profile Section */}
      <Card className="mb-8 shadow-lg border border-gray-300 rounded-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-blue-600">Vistara</h1>
              <p className="text-gray-600">Industry: Healthcare | Category: AI-Powered Solutions</p>
            </div>
            <div>
              <Button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600">
                Follow
              </Button>
            </div>
          </div>
          <div className="flex items-center mt-4 space-x-4">
            <FaTwitter className="text-blue-500 h-6 w-6 cursor-pointer" />
            <FaLinkedin className="text-blue-700 h-6 w-6 cursor-pointer" />
            <FaGlobe className="text-gray-700 h-6 w-6 cursor-pointer" />
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">About Us</h2>
              <p className="text-gray-600 mt-4">
                We are an AI-driven healthcare startup providing state-of-the-art diagnostic solutions to hospitals and
                healthcare centers. Our technology leverages data to enhance diagnostics and improve patient outcomes.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg shadow-inner">
              <h2 className="text-lg font-semibold text-blue-600">Statistics</h2>
              <div className="grid grid-cols-3 gap-4 mt-4 text-center">
                <div>
                  <FaRegChartBar className="text-blue-500 h-8 w-8 mx-auto" />
                  <p className="text-gray-800 font-semibold mt-2">75%</p>
                  <p className="text-gray-600">Growth</p>
                </div>
                <div>
                  <FaMoneyBillAlt className="text-green-500 h-8 w-8 mx-auto" />
                  <p className="text-gray-800 font-semibold mt-2">$1M</p>
                  <p className="text-gray-600">Funding Raised</p>
                </div>
                <div>
                  <FaTag className="text-yellow-500 h-8 w-8 mx-auto" />
                  <p className="text-gray-800 font-semibold mt-2">3 Patents</p>
                  <p className="text-gray-600">Filed</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">Our Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <img
              src={product1}
              alt="Product 1"
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">AI Diagnostic Tool</h3>
            <p className="text-gray-600 mt-2">
              Our flagship product revolutionizing healthcare diagnostics with AI-powered insights.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <img
              src={product2}
              alt="Product 2"
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">Patient Data Platform</h3>
            <p className="text-gray-600 mt-2">
              A comprehensive platform that securely manages and analyzes patient data for better care.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <img
              src={product3}
              alt="Product 3"
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">Telemedicine App</h3>
            <p className="text-gray-600 mt-2">
              Our latest innovation, bringing telehealth services to patients at their fingertips.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <img
              src={profilepic1}
              alt="Founder"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">Jane Doe</h3>
            <p className="text-gray-600">Founder & CEO</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <img
              src={profilepic2}
              alt="CTO"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">John Smith</h3>
            <p className="text-gray-600">Chief Technology Officer</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <img
              src={profilepic3}
              alt="COO"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">Alice Johnson</h3>
            <p className="text-gray-600">Chief Operating Officer</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <img
              src={profilepic4}
              alt="Head of Marketing"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">Bob Williams</h3>
            <p className="text-gray-600">Head of Marketing</p>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default VentureView;
