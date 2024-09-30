import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { 
  PlaneTakeoff, ChevronLeft, ChevronRight, HelpCircle, Share2, Settings, Check
} from 'lucide-react'

const navItems = ["Profile", "Chat", "Flash Cards", "Mock Oral", "Gouge"]

const examiners = [
  { id: 1, name: "John Smith" },
  { id: 2, name: "Jane Doe" },
  { id: 3, name: "Robert Johnson" },
]

const oralTopics = [
  "Pilot Qualifications",
  "Airworthiness Requirements",
  "Weather Information",
  "Cross-Country Flight Planning",
  "Performance and Limitations",
  "Operation of Systems",
  "Human Factors",
  "Navigation Systems",
]

const flightManeuvers = [
  "Takeoffs and Landings",
  "Performance Maneuvers",
  "Ground Reference Maneuvers",
  "Navigation",
  "Slow Flight and Stalls",
  "Basic Instrument Maneuvers",
  "Emergency Operations",
  "Night Operations",
]

const difficultyAreas = [
  "Regulations", "Weather", "Performance", "Systems", "Navigation", "Human Factors", "Risk Management", "ADM"
]

const resourceTypes = [
  "FAR/AIM", "POH", "ACS", "Charts", "E6B", "Other"
]

const steps = [
  "Examiner Selection",
  "First Impressions",
  "Check Ride Status",
  "Oral Portion",
  "Oral Topics",
  "Flight Portion",
  "Final Review",
]

export default function AddGougePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    examiner: "",
    firstImpressions: {
      stressLevel: "",
      examinerExplanation: "",
      examinerBehavior: "",
      professionalism: "",
    },
    oralPass: null,
    flightPass: null,
    oralDifficulties: [],
    oralDifficultiesText: "",
    oralResourceUsage: "",
    oralResourceTypes: [],
    oralUnexpected: "",
    oralTopicsRating: {},
    flightOverall: "",
    flightManeuversRating: {},
    flightCriticalFeedback: "",
    overallFeedback: "",
    isAnonymous: false,
  })

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    console.log("Submitting gouge:", formData)
    // Implement submission logic here
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Select Examiner</h2>
            <p className="text-sm text-gray-600 mb-4">Choose the examiner who conducted your check-ride. This helps other students prepare for their specific style.</p>
            <Select onValueChange={(value) => handleInputChange("examiner", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Choose an examiner" />
              </SelectTrigger>
              <SelectContent>
                {examiners.map((examiner) => (
                  <SelectItem key={examiner.id} value={examiner.id.toString()}>
                    {examiner.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )
      case 1:
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">First Impressions</h2>
            <p className="text-sm text-gray-600 mb-4">Share your initial feelings and observations about the check-ride experience. This helps others mentally prepare.</p>
            <div className="space-y-6">
              <div>
                <Label htmlFor="stress-level" className="text-base font-medium">Stress Level</Label>
                <p className="text-sm text-gray-600 mb-2">Did you feel stressed or at ease during the check-ride?</p>
                <Select 
                  value={formData.firstImpressions.stressLevel} 
                  onValueChange={(value) => handleInputChange("firstImpressions", {...formData.firstImpressions, stressLevel: value})}
                >
                  <SelectTrigger id="stress-level">
                    <SelectValue placeholder="Select stress level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="very-stressed">Very Stressed</SelectItem>
                    <SelectItem value="somewhat-stressed">Somewhat Stressed</SelectItem>
                    <SelectItem value="neutral">Neutral</SelectItem>
                    <SelectItem value="somewhat-at-ease">Somewhat at Ease</SelectItem>
                    <SelectItem value="very-at-ease">Very at Ease</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="examiner-explanation" className="text-base font-medium">Examiner Explanation</Label>
                <p className="text-sm text-gray-600 mb-2">How well did the examiner explain the check-ride process?</p>
                <Select 
                  value={formData.firstImpressions.examinerExplanation} 
                  onValueChange={(value) => handleInputChange("firstImpressions", {...formData.firstImpressions, examinerExplanation: value})}
                >
                  <SelectTrigger id="examiner-explanation">
                    <SelectValue placeholder="Select explanation quality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="very-clear">Very Clear</SelectItem>
                    <SelectItem value="somewhat-clear">Somewhat Clear</SelectItem>
                    <SelectItem value="neutral">Neutral</SelectItem>
                    <SelectItem value="somewhat-unclear">Somewhat Unclear</SelectItem>
                    <SelectItem value="very-unclear">Very Unclear</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="examiner-behavior" className="text-base font-medium">Examiner Behavior</Label>
                <p className="text-sm text-gray-600 mb-2">Was the examiner talkative or quiet during the check-ride?</p>
                <Select 
                  value={formData.firstImpressions.examinerBehavior} 
                  onValueChange={(value) => handleInputChange("firstImpressions", {...formData.firstImpressions, examinerBehavior: value})}
                >
                  <SelectTrigger id="examiner-behavior">
                    <SelectValue placeholder="Select examiner behavior" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="very-talkative">Very Talkative</SelectItem>
                    <SelectItem value="somewhat-talkative">Somewhat Talkative</SelectItem>
                    <SelectItem value="balanced">Balanced</SelectItem>
                    <SelectItem value="somewhat-quiet">Somewhat Quiet</SelectItem>
                    <SelectItem value="very-quiet">Very Quiet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="professionalism" className="text-base font-medium">Professionalism</Label>
                <p className="text-sm text-gray-600 mb-2">Did the examiner stick to business or go off-topic with stories?</p>
                <Select 
                  value={formData.firstImpressions.professionalism} 
                  onValueChange={(value) => handleInputChange("firstImpressions", {...formData.firstImpressions, professionalism: value})}
                >
                  <SelectTrigger id="professionalism">
                    <SelectValue placeholder="Select professionalism level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="very-professional">Very Professional (Strictly Business)</SelectItem>
                    <SelectItem value="mostly-professional">Mostly Professional (Few Off-topic Discussions)</SelectItem>
                    <SelectItem value="balanced">Balanced (Mix of Business and Stories)</SelectItem>
                    <SelectItem value="somewhat-casual">Somewhat Casual (Many Off-topic Discussions)</SelectItem>
                    <SelectItem value="very-casual">Very Casual (Mostly Off-topic)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )
      case 2:
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Check Ride Status</h2>
            <p className="text-sm text-gray-600 mb-4">Indicate whether you passed or failed each portion of the check-ride. This helps others understand the examiner's pass/fail rates.</p>
            <div className="space-y-6">
              <div>
                <Label className="text-base font-medium">Oral Portion</Label>
                <p className="text-sm text-gray-600 mb-2">Did you pass or fail the oral examination?</p>
                <RadioGroup onValueChange={(value) => handleInputChange("oralPass", value === "true")}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="true" id="oral-pass" />
                    <Label htmlFor="oral-pass">Pass</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id="oral-fail" />
                    <Label htmlFor="oral-fail">Fail</Label>
                  </div>
                </RadioGroup>
              </div>
              {formData.oralPass && (
                <div>
                  <Label className="text-base font-medium">Flight Portion</Label>
                  <p className="text-sm text-gray-600 mb-2">Did you pass or fail the flight examination?</p>
                  <RadioGroup onValueChange={(value) => handleInputChange("flightPass", value === "true")}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="flight-pass" />
                      <Label htmlFor="flight-pass">Pass</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="flight-fail" />
                      <Label htmlFor="flight-fail">Fail</Label>
                    </div>
                  </RadioGroup>
                </div>
              )}
            </div>
          </div>
        )
      case 3:
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Oral Portion Review</h2>
            <p className="text-sm text-gray-600 mb-4">Provide details about your oral examination experience. This information helps others focus their study efforts.</p>
            <div className="space-y-6">
              <div>
                <Label className="text-base font-medium">Areas of Difficulty</Label>
                <p className="text-sm text-gray-600 mb-2">Select the topics you found challenging during the oral exam.</p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {difficultyAreas.map((area) => (
                    <div key={area} className="flex items-center space-x-2">
                      <Checkbox
                        id={`difficulty-${area}`}
                        checked={formData.oralDifficulties.includes(area)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            handleInputChange("oralDifficulties", [...formData.oralDifficulties, area])
                          } else {
                            handleInputChange("oralDifficulties", formData.oralDifficulties.filter(a => a !== area))
                          }
                        }}
                      />
                      <Label htmlFor={`difficulty-${area}`}>{area}</Label>
                    </div>
                  ))}
                </div>
                <Textarea 
                  className="mt-4"
                  placeholder="Provide more details about the difficult areas..."
                  value={formData.oralDifficultiesText}
                  onChange={(e) => handleInputChange("oralDifficultiesText", e.target.value)}
                />
              </div>
              <div>
                <Label className="text-base font-medium">Resource Usage</Label>
                <p className="text-sm text-gray-600 mb-2">How often did you need to reference materials during the oral exam?</p>
                <Select 
                  value={formData.oralResourceUsage} 
                  onValueChange={(value) => handleInputChange("oralResourceUsage", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="How many times did you use resources?" />
                  </SelectTrigger>
                  <SelectContent>
                    {[0, 1, 2, 3, 4, '5+'].map((count) => (
                      <SelectItem key={count} value={count.toString()}>{count}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="mt-4">
                  <Label className="text-sm font-medium">Resource Types Used</Label>
                  <p className="text-sm text-gray-600 mb-2">Select the types of resources you referenced during the oral exam.</p>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {resourceTypes.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={`resource-${type}`}
                          checked={formData.oralResourceTypes.includes(type)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              handleInputChange("oralResourceTypes", [...formData.oralResourceTypes, type])
                            } else {
                              handleInputChange("oralResourceTypes", formData.oralResourceTypes.filter(t => t !== type))
                            }
                          }}
                        />
                        <Label htmlFor={`resource-${type}`}>{type}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="oral-unexpected" className="text-base font-medium">Unexpected Elements</Label>
                <p className="text-sm text-gray-600 mb-2">Were there any surprising questions or topics during the oral exam?</p>
                <Input
                  id="oral-unexpected"
                  placeholder="Describe any unexpected elements during the oral portion..."
                  value={formData.oralUnexpected}
                  onChange={(e) => handleInputChange("oralUnexpected", e.target.value)}
                />
              </div>
            </div>
          </div>
        )
      case 4:
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Oral Topics Depth Rating</h2>
            <p className="text-sm text-gray-600 mb-4">Rate how in-depth each topic was covered (1: surface-level, 5: highly detailed). This helps others gauge which areas to study more thoroughly.</p>
            <div className="space-y-8">
              {oralTopics.map((topic) => (
                <div key={topic} className="space-y-2">
                  <Label>{topic}</Label>
                  <Slider
                    min={1}
                    max={5}
                    step={1}
                    value={[formData.oralTopicsRating[topic] || 1]}
                    onValueChange={(value) => handleInputChange("oralTopicsRating", { ...formData.oralTopicsRating, [topic]: value[0] })}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      case 5:
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Flight Portion Review</h2>
            <p className="text-sm text-gray-600 mb-4">Provide details about your flight examination experience. This information helps others prepare for their practical test.</p>
            <div className="space-y-6">
              <div>
                <Label htmlFor="flight-overall" className="text-base font-medium">Overall Thoughts</Label>
                <p className="text-sm text-gray-600 mb-2">Share your general impressions of the flight portion.</p>
                <Textarea 
                  id="flight-overall"
                  placeholder="What were your general impressions of the flight portion?"
                  value={formData.flightOverall}
                  onChange={(e) => handleInputChange("flightOverall", e.target.value)}
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Maneuver Difficulty Rating</h3>
                <p className="text-sm text-gray-600 mb-4">Rate the examiner's rigor for each maneuver (1: lenient, 5: very critical). This helps others focus on areas where the examiner may be more demanding.</p>
                <div className="space-y-8">
                  {flightManeuvers.map((maneuver) => (
                    <div key={maneuver} className="space-y-2">
                      <Label>{maneuver}</Label>
                      <Slider
                        min={1}
                        max={5}
                        step={1}
                        value={[formData.flightManeuversRating[maneuver] || 1]}
                        onValueChange={(value) => handleInputChange("flightManeuversRating", { ...formData.flightManeuversRating, [maneuver]: value[0] })}
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="flight-critical-feedback" className="text-base font-medium">Critical Feedback</Label>
                <p className="text-sm text-gray-600 mb-2">Share any areas where the examiner was particularly stringent or provided important feedback.</p>
                <Textarea 
                  id="flight-critical-feedback"
                  placeholder="Describe areas where the examiner was particularly stringent..."
                  value={formData.flightCriticalFeedback}
                  onChange={(e) => handleInputChange("flightCriticalFeedback", e.target.value)}
                />
              </div>
            </div>
          </div>
        )
      case 6:
        return (
          <div>
            <h2 className="text-xl font-semibold mb-6">Final Review and Feedback</h2>
            <p className="text-sm text-gray-600 mb-4">Review your gouge report and provide any final thoughts. This comprehensive feedback is invaluable for future test-takers.</p>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-2">Examiner</h3>
                <p>{examiners.find(e => e.id.toString() === formData.examiner)?.name || 'Not selected'}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">First Impressions</h3>
                <p><strong>Stress Level:</strong> {formData.firstImpressions.stressLevel}</p>
                <p><strong>Examiner Explanation:</strong> {formData.firstImpressions.examinerExplanation}</p>
                <p><strong>Examiner Behavior:</strong> {formData.firstImpressions.examinerBehavior}</p>
                <p><strong>Professionalism:</strong> {formData.firstImpressions.professionalism}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Check Ride Status</h3>
                <p>Oral: {formData.oralPass ? 'Pass' : 'Fail'}</p>
                {formData.oralPass && <p>Flight: {formData.flightPass ? 'Pass' : 'Fail'}</p>}
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Oral Portion</h3>
                <p><strong>Difficult Areas:</strong> {formData.oralDifficulties.join(', ')}</p>
                <p><strong>Details:</strong> {formData.oralDifficultiesText}</p>
                <p><strong>Resource Usage:</strong> {formData.oralResourceUsage} times</p>
                <p><strong>Resources Used:</strong> {formData.oralResourceTypes.join(', ')}</p>
                <p><strong>Unexpected Elements:</strong> {formData.oralUnexpected}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Oral Topics Depth</h3>
                {Object.entries(formData.oralTopicsRating).map(([topic, rating]) => (
                  <p key={topic}><strong>{topic}:</strong> {rating}/5</p>
                ))}
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Flight Portion</h3>
                <p><strong>Overall Thoughts:</strong> {formData.flightOverall}</p>
                <h4 className="text-base font-semibold mt-2 mb-1">Maneuver Ratings:</h4>
                {Object.entries(formData.flightManeuversRating).map(([maneuver, rating]) => (
                  <p key={maneuver}><strong>{maneuver}:</strong> {rating}/5</p>
                ))}
                <p><strong>Critical Feedback:</strong> {formData.flightCriticalFeedback}</p>
              </div>
              <div>
                <Label htmlFor="overall-feedback" className="text-base font-medium">Overall Feedback</Label>
                <p className="text-sm text-gray-600 mb-2">Provide any final thoughts, advice, or key takeaways about the examiner and check ride experience.</p>
                <Textarea 
                  id="overall-feedback"
                  placeholder="Share your final thoughts, advice, or key takeaways..."
                  value={formData.overallFeedback}
                  onChange={(e) => handleInputChange("overallFeedback", e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="anonymous"
                  checked={formData.isAnonymous}
                  onCheckedChange={(checked) => handleInputChange("isAnonymous", checked)}
                />
                <Label htmlFor="anonymous">Submit anonymously</Label>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <PlaneTakeoff className="h-6 w-6 text-sky-600" />
          <span className="text-xl font-semibold text-sky-700">FlyRight AI</span>
        </div>
        <nav className="hidden md:flex space-x-4">
          {navItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className={item === "Gouge" ? "text-sky-600" : ""}
            >
              {item}
            </Button>
          ))}
        </nav>
        <Button variant="ghost" size="icon" aria-label="Settings">
          <Settings className="h-5 w-5" />
        </Button>
      </header>

      <main className="flex-grow p-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Add Gouge Report</h1>
          
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-2 bg-sky-600 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              {steps.map((step, index) => (
                <span key={index} className={currentStep >= index ? "text-sky-600" : ""}>{step}</span>
              ))}
            </div>
          </div>

          <Card className="p-6">
            {renderStep()}
          </Card>

          <div className="flex justify-between mt-6">
            <Button onClick={handlePrevious} disabled={currentStep === 0}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            {currentStep < steps.length - 1 ? (
              <Button onClick={handleNext} className="bg-sky-600 hover:bg-sky-700 text-white">
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white">
                Submit Gouge
                <Check className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 p-4 text-center text-sm text-gray-600">
        <p>Thank you for contributing to the FlyRight AI community!</p>
        <Button variant="link" className="text-sky-600">
          <Share2 className="h-4 w-4 mr-2" />
          Share your gouge
        </Button>
      </footer>
    </div>
  )
}