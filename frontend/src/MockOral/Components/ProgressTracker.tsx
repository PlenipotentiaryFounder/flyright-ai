import React from 'react';
import { Topic } from '../mockOralTypes';

interface ProgressTrackerProps {
  acsTopic: Topic[];
  currentSession: Topic[] | null;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ acsTopic, currentSession }) => {
  const topics = currentSession || acsTopic;
  const completedTopics = topics.filter((topic) => topic.status === 'completed').length;
  const totalTopics = topics.length;
  const progressPercentage = (completedTopics / totalTopics) * 100;

  return (
    <div className="w-64 bg-white border-l border-gray-200 p-4">
      <h3 className="font-semibold mb-2">Progress Tracker</h3>
      <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
        <div
          className="bg-sky-600 h-4 rounded-full"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600">
        {completedTopics} of {totalTopics} topics completed
      </p>
      <div className="mt-4">
        {topics.map((topic) => (
          <div key={topic.id} className="flex items-center mb-2">
            <div className={`w-3 h-3 rounded-full mr-2 ${
              topic.status === 'completed' ? 'bg-green-500' :
              topic.status === 'unsatisfactory' ? 'bg-red-500' :
              'bg-gray-300'
            }`}></div>
            <span className="text-sm">{topic.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressTracker;