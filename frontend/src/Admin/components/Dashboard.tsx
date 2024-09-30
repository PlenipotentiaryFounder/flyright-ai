import React, { useEffect, useState } from 'react';
import fetchDashboardSummary from '../../utils/api'; // Changed to default import

interface DashboardSummary {
  total_users: number;
  new_users_last_week: number;
  total_mock_orals: number;
  new_mock_orals_last_week: number;
  total_gouges: number;
  new_gouges_last_week: number;
  total_flashcard_decks: number;
  total_flashcards: number;
}

const Dashboard: React.FC = () => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const args = /* get arguments from somewhere */ {} || {};
        const response = await fetchDashboardSummary(args);
        setSummary(response.data);
      } catch (error) {
        console.error('Error fetching dashboard summary:', error);
      }
    };
    loadSummary();
  }, []);

  if (!summary) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Total Users</h3>
          <p className="text-2xl">{summary.total_users}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">New Users (Last Week)</h3>
          <p className="text-2xl">{summary.new_users_last_week}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Total Mock Orals</h3>
          <p className="text-2xl">{summary.total_mock_orals}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">New Mock Orals (Last Week)</h3>
          <p className="text-2xl">{summary.new_mock_orals_last_week}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Total Gouges</h3>
          <p className="text-2xl">{summary.total_gouges}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">New Gouges (Last Week)</h3>
          <p className="text-2xl">{summary.new_gouges_last_week}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Total Flashcard Decks</h3>
          <p className="text-2xl">{summary.total_flashcard_decks}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Total Flashcards</h3>
          <p className="text-2xl">{summary.total_flashcards}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;