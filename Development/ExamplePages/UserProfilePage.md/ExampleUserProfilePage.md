import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  PlaneTakeoff, User, BarChart2, CreditCard, Settings, Shield, FileText, 
  Bell, LogOut, ChevronRight, Award, Zap, Target, AlertTriangle
} from 'lucide-react'

const navItems = [
  { icon: User, label: "Overview" },
  { icon: BarChart2, label: "Progress" },
  { icon: CreditCard, label: "Account" },
  { icon: Settings, label: "Settings" },
  { icon: Shield, label: "Privacy & Security" },
  { icon: FileText, label: "Reports" },
]

const achievements = [
  { icon: Award, label: "First Mock Oral Completed", date: "2023-09-15" },
  { icon: Zap, label: "Perfect Score on Weather Quiz", date: "2023-09-20" },
  { icon: Target, label: "Completed 100 Flashcards", date: "2023-09-25" },
]

const recentActivity = [
  { icon: FileText, label: "Submitted Gouge Report", date: "2023-09-28" },
  { icon: BarChart2, label: "Completed Mock Oral", date: "2023-09-26" },
  { icon: Zap, label: "Reviewed 50 Flashcards", date: "2023-09-24" },
]

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState("Overview")

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
        )
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
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Strengths & Areas of Improvement</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-green-600 mb-2">Strengths</h4>
                  <ul className="list-disc list-inside">
                    <li>Weather Interpretation</li>
                    <li>Navigation</li>
                    <li>Emergency Procedures</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-red-600 mb-2">Areas for Improvement</h4>
                  <ul className="list-disc list-inside">
                    <li>Regulations</li>
                    <li>Performance Calculations</li>
                    <li>Radio Communications</li>
                  </ul>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Milestones</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Solo Flight</span>
                  <span className="text-green-600">Completed</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Cross-Country Requirements</span>
                  <span className="text-yellow-600">In Progress</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Night Flying</span>
                  <span className="text-gray-400">Not Started</span>
                </div>
              </div>
            </Card>
            <Button className="w-full">Generate Progress Report</Button>
          </div>
        )
      case "Account":
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Account Status</h3>
              <p><strong>Current Plan:</strong> Premium</p>
              <p><strong>Renewal Date:</strong> October 15, 2023</p>
              <p><strong>Plan Benefits:</strong> Unlimited access to all features</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Manage Subscription</h3>
              <div className="space-y-4">
                <Button variant="outline" className="w-full">Upgrade Plan</Button>
                <Button variant="outline" className="w-full">Cancel Subscription</Button>
              </div>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Billing Information</h3>
              <p><strong>Payment Method:</strong> Visa ending in 1234</p>
              <Button variant="link" className="p-0">Update Payment Method</Button>
            </Card>
          </div>
        )
      case "Settings":
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Personalization Options</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Theme</span>
                  <select className="border rounded p-1">
                    <option>Light</option>
                    <option>Dark</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span>Language</span>
                  <select className="border rounded p-1">
                    <option>English</option>
                    <option>Spanish</option>
                  </select>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Email Notifications</span>
                  <input type="checkbox" />
                </div>
                <div className="flex items-center justify-between">
                  <span>Push Notifications</span>
                  <input type="checkbox" />
                </div>
              </div>
            </Card>
          </div>
        )
      case "Privacy & Security":
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Data Management</h3>
              <div className="space-y-4">
                <Button variant="outline" className="w-full">Download Personal Data</Button>
                <Button variant="outline" className="w-full text-red-600">Delete Account</Button>
              </div>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Connected Devices</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>iPhone 12</span>
                  <Button variant="link" className="text-red-600">Revoke Access</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>MacBook Pro</span>
                  <Button variant="link" className="text-red-600">Revoke Access</Button>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Two-Factor Authentication</span>
                  <input type="checkbox" />
                </div>
                <Button variant="outline" className="w-full">Change Password</Button>
              </div>
            </Card>
          </div>
        )
      case "Reports":
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Generate & Share Reports</h3>
              <div className="space-y-4">
                <Button className="w-full">Generate New Report</Button>
                <div>
                  <label htmlFor="email" className="block mb-2">Share Report via Email</label>
                  <div className="flex space-x-2">
                    <input id="email" type="email" placeholder="Enter email" className="border rounded p-2 flex-grow" />
                    <Button>Share</Button>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Report History</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Progress Report - September 2023</span>
                  <Button variant="link">View</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Quarterly Review - Q3 2023</span>
                  <Button variant="link">View</Button>
                </div>
              </div>
            </Card>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
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

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
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
      </main>
    </div>
  )
}