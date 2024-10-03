import React from 'react';
import Button from "../Components/Button";
import Card from "../Components/Card";
import { PlaneTakeoff, Book, Brain, FileText, Users, CheckCircle2 } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-sky-200">
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <PlaneTakeoff className="h-8 w-8 text-sky-600" />
          <span className="text-2xl font-bold text-sky-700">FlyRight AI</span>
        </div>
        <nav>
          <Button variant="ghost">Features</Button>
          <Button variant="ghost">How It Works</Button>
          <Button variant="ghost">Pricing</Button>
          <Button variant="outline">Log In</Button>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-12 md:py-24">
          <h1 className="text-4xl md:text-6xl font-bold text-sky-800 mb-4">
            Fly Smarter with FlyRight AI
          </h1>
          <p className="text-xl md:text-2xl text-sky-600 mb-8">
            Your personal AI co-pilot for mastering aviation knowledge, from student to ATP.
          </p>
          <Button size="large" className="bg-sky-600 hover:bg-sky-700 text-white">
            Start Your Free Trial
          </Button>
        </section>

        {/* What is FlyRight AI? */}
        <section className="py-12">
          <h2 className="text-3xl font-bold text-sky-800 mb-4">What is FlyRight AI?</h2>
          <p className="text-lg text-sky-600 mb-4">
            FlyRight AI is a mobile-first app designed to help pilots learn faster and study smarter with AI-powered tools.
            Our AI answers questions, creates personalized study materials, and simulates real exam scenarios, 
            making your journey from student to ATP more efficient and effective.
          </p>
        </section>

        {/* Core Features */}
        <section className="py-12">
          <h2 className="text-3xl font-bold text-sky-800 mb-8">Core Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <Brain className="h-12 w-12 text-sky-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI-Driven Aviation Queries</h3>
              <p>Get instant, accurate answers to your aviation questions anytime, anywhere.</p>
            </Card>
            <Card className="p-6">
              <Book className="h-12 w-12 text-sky-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Flashcards</h3>
              <p>Create, customize, and study flashcards tailored to your pilot level.</p>
            </Card>
            <Card className="p-6">
              <Users className="h-12 w-12 text-sky-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Mock Orals</h3>
              <p>Simulate check-ride scenarios and prepare confidently with mock oral exams.</p>
            </Card>
            <Card className="p-6">
              <FileText className="h-12 w-12 text-sky-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Document Management</h3>
              <p>Upload, manage, and access your aviation documents on the go.</p>
            </Card>
          </div>
        </section>

        {/* Who It's For */}
        <section className="py-12 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-sky-800 mb-6">Who It's For</h2>
          <p className="text-lg text-sky-600 mb-4">
            FlyRight AI is designed for pilots at every stage of their journey:
          </p>
          <ul className="list-disc list-inside text-sky-700 space-y-2">
            <li>Student pilots</li>
            <li>Private pilots</li>
            <li>Instrument-rated pilots</li>
            <li>Commercial pilots</li>
            <li>ATPs</li>
          </ul>
          <p className="mt-4 text-lg text-sky-600">
            Our app adapts to each level, helping you prepare for your next certification with ease.
          </p>
        </section>

        {/* How It Works */}
        <section className="py-12">
          <h2 className="text-3xl font-bold text-sky-800 mb-8">How It Works</h2>
          <div className="space-y-6">
            {[
              { step: 1, title: "Sign Up", description: "Create a profile tailored to your current pilot level." },
              { step: 2, title: "Interact with AI", description: "Ask questions, study with flashcards, and simulate mock orals." },
              { step: 3, title: "Track Your Progress", description: "Monitor your study sessions and see where you need to improve." },
              { step: 4, title: "Stay Prepared", description: "Access study tools and resources anytime you need them." }
            ].map((item) => (
              <div key={item.step} className="flex items-start">
                <div className="bg-sky-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">{item.step}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose FlyRight AI? */}
        <section className="py-12 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-sky-800 mb-6">Why Choose FlyRight AI?</h2>
          <ul className="space-y-4">
            {[
              "Personalized learning experience",
              "Accessible on-the-go",
              "AI-enhanced study sessions",
              "Seamless document management"
            ].map((benefit, index) => (
              <li key={index} className="flex items-center">
                <CheckCircle2 className="h-6 w-6 text-green-500 mr-2" />
                <span className="text-lg text-sky-700">{benefit}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Call to Action */}
        <section className="py-12 text-center">
          <h2 className="text-3xl font-bold text-sky-800 mb-4">Ready to Elevate Your Learning?</h2>
          <p className="text-xl text-sky-600 mb-8">
            Join FlyRight AI today and take your aviation knowledge to new heights.
          </p>
          <div className="space-x-4">
            <Button size="large" className="bg-sky-600 hover:bg-sky-700 text-white">
              Sign Up Today
            </Button>
            <Button size="large" variant="outline">
              Learn More
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-sky-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-xl font-semibold mb-4">FlyRight AI</h3>
              <p>Elevate Your Learning. Elevate Your Flight.</p>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Support</a></li>
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                <li><a href="#" className="hover:underline">Terms of Service</a></li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <p>Email: support@flyrightai.com</p>
              <p>Phone: (555) 123-4567</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2023 FlyRight AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;