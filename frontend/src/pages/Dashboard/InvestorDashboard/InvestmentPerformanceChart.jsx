import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', FinTech: 30, HealthifyMe: 20, EcoRide: 40 },
  { name: 'Feb', FinTech: 35, HealthifyMe: 25, EcoRide: 45 },
  { name: 'Mar', FinTech: 40, HealthifyMe: 30, EcoRide: 50 },
  { name: 'Apr', FinTech: 50, HealthifyMe: 40, EcoRide: 60 },
  { name: 'May', FinTech: 55, HealthifyMe: 45, EcoRide: 70 },
];

const InvestmentPerformanceChart = function() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="FinTech" stroke="#8884d8" />
        <Line type="monotone" dataKey="HealthifyMe" stroke="#82ca9d" />
        <Line type="monotone" dataKey="EcoRide" stroke="#ffc658" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default InvestmentPerformanceChart