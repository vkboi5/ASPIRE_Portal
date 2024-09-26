import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

// Mock Data for the states
const stateData = {
  "Andhra Pradesh": { startups: 2000, investors: 50, mentors: 20, incubators: 10, accelerators: 2 },
  "Telangana": { startups: 1800, investors: 45, mentors: 18, incubators: 12, accelerators: 3 },
  "Karnataka": { startups: 3000, investors: 200, mentors: 50, incubators: 20, accelerators: 5 },
  "Maharashtra": { startups: 3200, investors: 180, mentors: 60, incubators: 15, accelerators: 4 },
  "Delhi": { startups: 2500, investors: 100, mentors: 40, incubators: 8, accelerators: 2 },
  // Add more states with mock data
};

// List of startups, investors, etc. (Mock data)
const entityList = {
  startups: [
    { name: "World Med Nexus Private Limited", stage: "Prototype", sector: "Healthcare IT", location: "Hyderabad, Telangana" },
    { name: "Flyspeck Digital Technologies", stage: "Prototype", sector: "Defence Equipment", location: "Gorakhpur, Uttar Pradesh" },
    // Add more startups
  ],
  investors: [
    { name: "Investor A", focus: "Healthcare", location: "Hyderabad, Telangana" },
    { name: "Investor B", focus: "Technology", location: "Bengaluru, Karnataka" },
    // Add more investors
  ],
  mentors: [
    { name: "Mentor A", expertise: "Startup Strategy", location: "Mumbai, Maharashtra" },
    { name: "Mentor B", expertise: "Funding", location: "New Delhi, Delhi" },
    // Add more mentors
  ],
  incubators: [
    { name: "Incubator A", focus: "Healthcare", location: "Chennai, Tamil Nadu" },
    { name: "Incubator B", focus: "Technology", location: "Bengaluru, Karnataka" },
    // Add more incubators
  ],
  accelerators: [
    { name: "Accelerator A", focus: "Tech Startups", location: "Pune, Maharashtra" },
    { name: "Accelerator B", focus: "Biotech", location: "Hyderabad, Telangana" },
    // Add more accelerators
  ]
};

const Networks = () => {
  const [hoveredState, setHoveredState] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('startups'); // Current selected category for chart

  // Prepare data for the graph based on the selected category
  const graphData = Object.keys(stateData).map((state) => ({
    name: state,
    value: stateData[state][selectedCategory]
  }));

  return (
    <div className="flex h-screen">
      {/* Sidebar for category selection and entity list */}
      <div className="w-1/4 bg-gray-100 p-6 flex flex-col">
        {/* Select Category */}
        <h2 className="text-xl font-bold mb-4">Select Category</h2>
        <div className="flex flex-col space-y-2 mb-6">
          {["startups", "investors", "mentors", "incubators", "accelerators"].map(category => (
            <button 
              key={category}
              className={`px-4 py-2 rounded ${selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Entity List based on the selected category */}
        <h3 className="text-lg font-bold mb-4">{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} List</h3>
        <div className="flex-1 overflow-y-auto">
          {entityList[selectedCategory].map((entity, index) => (
            <div key={index} className="border p-4 mb-4 rounded shadow hover:shadow-lg transition-shadow duration-300">
              <h4 className="font-semibold">{entity.name}</h4>
              <p className="text-gray-600">{entity.stage || entity.expertise || entity.focus}</p>
              <p className="text-gray-600">{entity.sector || entity.location}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main content with bar chart */}
      <div className="flex-1 p-6">
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={graphData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={({ payload }) => (
              payload[0] && (
                <motion.div
                  className="bg-white border p-2 rounded shadow-lg"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <h4 className="font-bold">{payload[0].payload.name}</h4>
                  <p>{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}: {payload[0].value}</p>
                </motion.div>
              )
            )} />
            <Bar dataKey="value" fill="#8884d8" onMouseEnter={(data) => setHoveredState(data.name)} onMouseLeave={() => setHoveredState(null)} />
          </BarChart>
        </ResponsiveContainer>

        {/* Hover Information */}
        {hoveredState && (
          <motion.div
            className="absolute bg-white border p-4 shadow-lg rounded"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{ top: '30%', left: '50%' }}
          >
            <h3 className="font-bold text-lg">{hoveredState}</h3>
            <p>Startups: {stateData[hoveredState]?.startups || 'Data not available'}</p>
            <p>Investors: {stateData[hoveredState]?.investors || 'Data not available'}</p>
            <p>Mentors: {stateData[hoveredState]?.mentors || 'Data not available'}</p>
            <p>Incubators: {stateData[hoveredState]?.incubators || 'Data not available'}</p>
            <p>Accelerators: {stateData[hoveredState]?.accelerators || 'Data not available'}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Networks;
