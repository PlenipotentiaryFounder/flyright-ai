import React from 'react';
import Button from "../../Common/Components/Button";
import Card from "../../Common/Components/Card";
import ScrollArea from "../../Common/Components/ScrollArea";
import { Upload, Check, X } from 'lucide-react';

const acsTopic = [
  { id: 1, name: "Pilot Qualifications", status: "completed" },
  { id: 2, name: "Airworthiness Requirements", status: "unsatisfactory" },
  { id: 3, name: "Weather Information", status: "unanswered" },
  { id: 4, name: "Cross-Country Flight Planning", status: "completed" },
  { id: 5, name: "Performance and Limitations", status: "unsatisfactory" },
  { id: 6, name: "Operation of Systems", status: "unanswered" },
  { id: 7, name: "Human Factors", status: "completed" },
  { id: 8, name: "Navigation Systems", status: "unanswered" },
];

interface ScenarioSidebarProps {
  handleDocumentUpload: () => void;
  handleGenerateDebriefing: () => void;
}

const ScenarioSidebar: React.FC<ScenarioSidebarProps> = ({ handleDocumentUpload, handleGenerateDebriefing }) => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col">
      <Card className="mb-4 p-4">
        <h3 className="font-semibold mb-2">Scenario</h3>
        <p className="text-sm text-gray-600">
          You are preparing for a cross-country flight from KJFK to KBOS. The examiner will ask questions related to this scenario.
        </p>
      </Card>
      <Button variant="outline" className="mb-4" onClick={handleDocumentUpload}>
        <Upload className="h-4 w-4 mr-2" />
        Upload Document
      </Button>
      <div className="flex-grow overflow-auto">
        <h3 className="font-semibold mb-2">ACS Topics</h3>
        <ScrollArea className="h-[calc(100vh-400px)]">
          {acsTopic.map((topic) => (
            <div key={topic.id} className="flex items-center mb-2">
              {topic.status === 'completed' && <Check className="h-4 w-4 text-sky-600 mr-2" />}
              {topic.status === 'unsatisfactory' && <X className="h-4 w-4 text-red-600 mr-2" />}
              {topic.status === 'unanswered' && <div className="w-4 mr-2" />}
              <span className={`text-sm ${
                topic.status === 'completed' ? 'text-sky-600' :
                topic.status === 'unsatisfactory' ? 'text-red-600' :
                'text-gray-900'
              }`}>
                {topic.name}
              </span>
            </div>
          ))}
        </ScrollArea>
      </div>
      <Button className="mt-4" onClick={handleGenerateDebriefing}>
        Generate Debriefing Report
      </Button>
    </aside>
  );
};

export default ScenarioSidebar;