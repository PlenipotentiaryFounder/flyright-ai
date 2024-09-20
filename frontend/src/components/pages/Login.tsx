import React, { useState, FormEvent } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import  Button  from "@/components/ui/button";
import  Card  from "@/components/ui/card";
import { Eye, EyeOff, PlaneTakeoff, Mail, Lock } from 'lucide-react';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const response = await fetch('/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Include CSRF token handling here if necessary
            },
            body: JSON.stringify({ username: email, password }),
        });
        const data = await response.json();
        if (data.success) {
            // Handle successful login (e.g., redirect to dashboard)
        } else {
            setError(Object.values(data.errors).join(', ')); // Improve error display
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-100 to-sky-200 flex flex-col items-center justify-center px-4">
            <Card className="w-full max-w-md p-6 bg-white/80 backdrop-blur-sm">
                <div className="flex items-center justify-center mb-6">
                    <PlaneTakeoff className="h-8 w-8 text-sky-600 mr-2" />
                    <span className="text-2xl font-bold text-sky-700">FlyRight AI</span>
                </div>
                
                <h1 className="text-2xl font-bold text-center text-sky-800 mb-6">
                    Log in to your account
                </h1>
                
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                            <Input 
                                id="email" 
                                type="email" 
                                placeholder="you@example.com" 
                                className="pl-10" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                placeholder="••••••••" 
                                className="pl-10 pr-10"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-sky-500" />
                            <Button
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
                    
                    <Button
                        className="w-full bg-sky-600 hover:bg-sky-700 text-white"
                    >
                        Log In
                    </Button>
                    {error && <div className="error text-red-500 text-center mt-2">{error}</div>}
                </form>
                
                <div className="mt-4 text-center">
                    <a href="#" className="text-sm text-sky-600 hover:underline">
                        Forgot your password?
                    </a>
                </div>
                
                <div className="mt-6 text-center">
                    <p className="text-sm text-sky-700">
                        Don't have an account?{" "}
                        <a href="#" className="font-semibold text-sky-600 hover:underline">
                            Create one now
                        </a>
                    </p>
                </div>
            </Card>
        </div>
    );
}
