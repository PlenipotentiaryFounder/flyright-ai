import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface UserActivityData {
  activity_type: string;
  count: number;
}

interface UserActivitiesProps {
  data: UserActivityData[];
}

const UserActivities: React.FC<UserActivitiesProps> = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.activity_type),
    datasets: [
      {
        label: 'Activity Count',
        data: data.map(item => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      }
    ]
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-2">User Activities</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default UserActivities;