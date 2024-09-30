import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface UserGrowthData {
  date: string;
  count: number;
}

interface UserGrowthProps {
  data: UserGrowthData[];
}

const UserGrowth: React.FC<UserGrowthProps> = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.date),
    datasets: [
      {
        label: 'New Users',
        data: data.map(item => item.count),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-2">User Growth</h3>
      <Line data={chartData} />
    </div>
  );
};

export default UserGrowth;