import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', growth: 200 },
  { month: 'Feb', growth: 400 },
  { month: 'Mar', growth: 600 },
  { month: 'Apr', growth: 800 },
  { month: 'May', growth: 1000 },
  { month: 'Jun', growth: 1200 },
];

const GrowthProjectionChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="growth" stroke="#82ca9d" fill="#82ca9d" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default GrowthProjectionChart;