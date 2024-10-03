import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from 'recharts';

const data = [
  { sector: 'FinTech', risk: 3 },
  { sector: 'HealthTech', risk: 1 },
  { sector: 'AgriTech', risk: 4 },
  { sector: 'EdTech', risk: 2 },
  { sector: 'Transport', risk: 5 },
];

const RiskAssessmentChart = () => {
  return (
    <RadarChart outerRadius={90} width={500} height={400} data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="sector" />
      <PolarRadiusAxis angle={30} domain={[0, 5]} />
      <Radar name="Risk" dataKey="risk" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      <Tooltip />
    </RadarChart>
  );
};

export default RiskAssessmentChart;
