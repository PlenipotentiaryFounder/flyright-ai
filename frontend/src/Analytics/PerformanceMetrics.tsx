import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface PerformanceMetricData {
  metric_type: string;
  avg_value: number;
}

interface PerformanceMetricsProps {
  data: PerformanceMetricData[];
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.metric_type),
    datasets: [
      {
        label: 'Average Value',
        data: data.map(item => item.avg_value),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      }
    ]
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-2">Performance Metrics</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default PerformanceMetrics;