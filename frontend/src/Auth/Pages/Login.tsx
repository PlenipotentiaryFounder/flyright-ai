import React, { useState, FormEvent } from 'react';
import { Input } from "../../Common/Components/Input";
import { Label } from "../../Common/Components/label";
import Button from "../../Common/Components/Button";
import Card from "../../Common/Components/Card";
import { Eye, EyeOff, PlaneTakeoff, Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/users/login/', { username: email, password });
            if (response.data.success) {
                navigate('/profile');
            } else {
                setError(response.data.error || 'Login failed. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
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
                    
                    <Button
                        type="submit"
                        className="w-full bg-sky-600 hover:bg-sky-700 text-white"
                    >
                        Log In
                    </Button>
                    {error && <div className="error text-red-500 text-center mt-2">{error}</div>}
                </form>
                
                <div className="mt-4 text-center">
                    <a href="/forgot-password" className="text-sm text-sky-600 hover:underline">
                        Forgot your password?
                    </a>
                </div>
                
                <div className="mt-6 text-center">
                    <p className="text-sm text-sky-700">
                        Don't have an account?{" "}
                        <a href="/register" className="font-semibold text-sky-600 hover:underline">
                            Create one now
                        </a>
                    </p>
                </div>
            </Card>
        </div>
    );
}
