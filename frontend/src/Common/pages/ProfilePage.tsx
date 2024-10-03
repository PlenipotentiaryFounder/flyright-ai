import React, { useState } from 'react';
import Button from "../Components/Button";
import Card from "../Components/Card";
import { Input } from "../Components/Input";
import { Label } from "../Components/label";
import Checkbox from "../Components/Checkbox";
import ScrollArea from "../Components/ScrollArea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../Components/Tabs";
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import {
  PlaneTakeoff, User, BarChart2, CreditCard, Settings, Shield, FileText,
  Bell, LogOut, ChevronRight, Award, Zap, Target, AlertTriangle
} from 'lucide-react';
import Progress from "../Components/Progress";

const navItems = [
  { icon: User, label: "Overview" },
  { icon: BarChart2, label: "Progress" },
  { icon: CreditCard, label: "Account" },
  { icon: Settings, label: "Settings" },
  { icon: Shield, label: "Privacy & Security" },
  { icon: FileText, label: "Reports" },
];

const achievements = [
  { icon: Award, label: "First Mock Oral Completed", date: "2023-09-15" },
  { icon: Zap, label: "Perfect Score on Weather Quiz", date: "2023-09-20" },
  { icon: Target, label: "Completed 100 Flashcards", date: "2023-09-25" },
];

const recentActivity = [
  { icon: FileText, label: "Submitted Gouge Report", date: "2023-09-28" },
  { icon: BarChart2, label: "Completed Mock Oral", date: "2023-09-26" },
  { icon: Zap, label: "Reviewed 50 Flashcards", date: "2023-09-24" },
];

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  const renderContent = () => {
    switch (activeTab) {
      case "Overview":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Proficiency Score</h3>
                <div className="flex items-center justify-between">
                  <Progress value={75} className="w-2/3" />
                  <span className="text-2xl font-bold">75%</span>
                </div>
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Current Stage</h3>
                <div className="flex items-center justify-between">
                  <span className="text-lg">Private Pilot</span>
                  <Progress value={60} className="w-1/2" />
                </div>
              </Card>
            </div>
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <activity.icon className="h-5 w-5 text-sky-600" />
                    <div>
                      <p className="font-medium">{activity.label}</p>
                      <p className="text-sm text-gray-500">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Achievements & Badges</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <achievement.icon className="h-8 w-8 text-yellow-500" />
                    <div>
                      <p className="font-medium">{achievement.label}</p>
                      <p className="text-sm text-gray-500">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        );
      case "Progress":
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Training Analytics</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Oral Exam Readiness</p>
                  <Progress value={80} className="mt-2" />
                </div>
                <div>
                  <p className="font-medium">Flight Maneuvers Proficiency</p>
                  <Progress value={65} className="mt-2" />
                </div>
                <div>
                  <p className="font-medium">Overall Progress</p>
                  <Progress value={72} className="mt-2" />
                </div>
              </div>
            </Card>
            {/* ... rest of the Progress content ... */}
          </div>
        );
      // Add other cases (Progress, Account, Settings, etc.) here...
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header 
        navItems={["Profile", "Chat", "Flash Cards", "Mock Oral", "Gouge"]} 
        placeholderConversations={[]} // Add this line
      />
      
      <main className="flex-grow flex p-4 space-x-4 overflow-hidden">
        <aside className="w-64 bg-white border-r border-gray-200 p-4">
          <div className="flex items-center space-x-2 mb-6">
            <PlaneTakeoff className="h-6 w-6 text-sky-600" />
            <span className="text-xl font-semibold text-sky-700">FlyRight AI</span>
          </div>
          <nav className="space-y-2">
            {navItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className={`w-full justify-start ${activeTab === item.label ? 'bg-sky-100 text-sky-700' : ''}`}
                onClick={() => setActiveTab(item.label)}
              >
                <item.icon className="h-5 w-5 mr-2" />
                {item.label}
              </Button>
            ))}
          </nav>
        </aside>

        <ScrollArea className="flex-grow">
          <div className="max-w-4xl mx-auto">
            <header className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">{activeTab}</h1>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </header>

            {renderContent()}
          </div>
        </ScrollArea>
      </main>

      <Footer clearChat={() => {/* Implement clearChat function */}} />
    </div>
  );
};

export default ProfilePage;