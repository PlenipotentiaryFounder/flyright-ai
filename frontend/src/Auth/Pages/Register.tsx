import React, { useState } from 'react';
import Button from "../../Common/Components/Button";
import Card from "../../Common/Components/Card";
import { Input } from "../../Common/Components/Input";
import { Label } from "../../Common/Components/label";
import Checkbox from "../../Common/Components/Checkbox";
import { PlaneTakeoff, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!agreeTerms) {
            setError('You must agree to the Terms of Service and Privacy Policy');
            return;
        }
        try {
            const response = await api.post('/users/register/', { username, email, password1: password, password2: password });
            if (response.data.success) {
                navigate('/login');
            } else {
                setError(response.data.error || 'Registration failed. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-100 to-sky-200 flex flex-col items-center justify-center px-4 py-8">
            <Card className="w-full max-w-md p-6 bg-white/80 backdrop-blur-sm">
                <div className="flex items-center justify-center mb-6">
                    <PlaneTakeoff className="h-8 w-8 text-sky-600 mr-2" />
                    <span className="text-2xl font-bold text-sky-700">FlyRight AI</span>
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
                        <Checkbox 
                            id="terms" 
                            checked={agreeTerms}
                            onChange={(event) => setAgreeTerms(event.target.checked)}
                        />
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
                        <a href="/login" className="font-semibold text-sky-600 hover:underline">
                            Log in
                        </a>
                    </p>
                </div>
            </Card>
        </div>
    );
}

export default Register;