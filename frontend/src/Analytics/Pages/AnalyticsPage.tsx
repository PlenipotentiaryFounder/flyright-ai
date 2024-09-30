import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import UserGrowth from '../UserGrowth';
import UserActivities from '../UserActivities';
import PerformanceMetrics from '../PerformanceMetrics';
import Spinner from '../../Common/Components/Spinner';

interface AnalyticsData {
  user_growth: { date: string; count: number }[];
  user_activities: { activity_type: string; count: number }[];
  performance_metrics: { metric_type: string; avg_value: number }[];
}

const AnalyticsPage: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/api/analytics/dashboard/');
      setAnalyticsData(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      setError('Failed to load analytics data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><Spinner size="large" /></div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-8">{error}</div>;
  }

  if (!analyticsData) {
    return <div className="text-center mt-8">No analytics data available.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>
      <UserGrowth data={analyticsData.user_growth} />
      <UserActivities data={analyticsData.user_activities} />
      <PerformanceMetrics data={analyticsData.performance_metrics} />
    </div>
  );
};

export default AnalyticsPage;