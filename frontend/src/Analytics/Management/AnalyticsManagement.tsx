import React, { useState, useEffect } from 'react';
import { fetchAnalytics } from '../../utils/api';  // Change this line
import { Line } from 'react-chartjs-2';
import { AnalyticsData } from '../types/analyticsTypes';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsManagement: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        setIsLoading(true);
        const data = await fetchAnalytics();  // Change this line
        setAnalyticsData(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching analytics:', error);
        setError('Failed to load analytics data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    loadAnalytics();
  }, []);

  if (isLoading) return <div>Loading analytics data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!analyticsData) return <div>No analytics data available.</div>;

  const userGrowthData = {
    labels: analyticsData.user_growth.map(item => item.date),
    datasets: [
      {
        label: 'New Users',
        data: analyticsData.user_growth.map(item => item.count),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const userActivitiesData = {
    labels: analyticsData.user_activities.map(item => item.activity_type),
    datasets: [
      {
        label: 'Activity Count',
        data: analyticsData.user_activities.map(item => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      }
    ]
  };

  const performanceMetricsData = {
    labels: analyticsData.performance_metrics.map(item => item.metric_type),
    datasets: [
      {
        label: 'Average Value',
        data: analyticsData.performance_metrics.map(item => item.avg_value),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      }
    ]
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Analytics Management</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">User Growth</h3>
        <Line data={userGrowthData} />
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">User Activities</h3>
        <Line data={userActivitiesData} />
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Performance Metrics</h3>
        <Line data={performanceMetricsData} />
      </div>
    </div>
  );
};

export default AnalyticsManagement;