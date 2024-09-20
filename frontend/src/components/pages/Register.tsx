import React, { useState } from 'react';
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// Ensure the import path matches the case of the filename
import Checkbox from "@/components/ui/checkbox";
import { PlaneTakeoff, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch('/api/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password1: password, password2: password }),  // Match Django's form expectations
        });
        const data = await response.json();
        if (data.success) {
            // Handle successful registration (e.g., redirect to login page)
        } else {
            setError(Object.values(data.errors).join(', ')); // Improve error display
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-100 to-sky-200 flex flex-col items-center justify-center px-4 py-8">
            <Card className="w-full max-w-md p-6 bg-white/80 backdrop-blur-sm">
                <div className="flex items-center justify-center mb-6">
                    <PlaneTakeoff className="h-8 w-8 text-sky-600 mr-2" />
                    <span className="text-2xl font-bold text-sky-700">Pilot AI</span>
                </div>
                
                <h1 className="text-2xl font-bold text-center text-sky-800 mb-6">
                    Create your account
                </h1>
                
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <div className="relative">
                            <Input 
                                id="username" 
                                type="text" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="John Doe" 
                                className="pl-10" 
                            />
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-sky-500" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                            <Input 
                                id="email" 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com" 
                                className="pl-10" 
                            />
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-sky-500" />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input 
                                id="password" 
                                type={showPassword ? "text" : "password"} 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••" 
                                className="pl-10 pr-10"
                            />
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-sky-500" />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-1 top-1/2 transform -translate-y-1/2"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5 text-sky-500" />
                                ) : (
                                    <Eye className="h-5 w-5 text-sky-500" />
                                )}
                                <span className="sr-only">
                                    {showPassword ? "Hide password" : "Show password"}
                                </span>
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms" className="text-sm text-sky-700">
                            I agree to the{" "}
                            <a href="#" className="text-sky-600 hover:underline">
                                Terms of Service
                            </a>{" "}
                            and{" "}
                            <a href="#" className="text-sky-600 hover:underline">
                                Privacy Policy
                            </a>
                        </Label>
                    </div>
                    
                    <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-white">
                        Create Account
                    </Button>
                    {error && <div className="error text-red-500 mt-2">{error}</div>}
                </form>
                
                <div className="mt-6 text-center">
                    <p className="text-sm text-sky-700">
                        Already have an account?{" "}
                        <a href="#" className="font-semibold text-sky-600 hover:underline">
                            Log in
                        </a>
                    </p>
                </div>
            </Card>
        </div>
    );
}

export default Register;