import React, { useState } from 'react';
import { Input } from "../../Common/Components/Input";
import { Label } from "../../Common/Components/label";
import Button from "../../Common/Components/Button";
import Card from "../../Common/Components/Card";
import { PlaneTakeoff, Mail } from 'lucide-react';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/forgot-password/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
                setError('');
            } else {
                setError(data.error);
                setMessage('');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            setMessage('');
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
                    Forgot Password
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
                                required
                            />
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-sky-500" />
                        </div>
                    </div>
                    
                    <Button
                        type="submit"
                        className="w-full bg-sky-600 hover:bg-sky-700 text-white"
                    >
                        Reset Password
                    </Button>
                </form>
                
                {message && <div className="mt-4 text-green-600 text-center">{message}</div>}
                {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
                
                <div className="mt-6 text-center">
                    <p className="text-sm text-sky-700">
                        Remember your password?{" "}
                        <a href="/login" className="font-semibold text-sky-600 hover:underline">
                            Log in
                        </a>
                    </p>
                </div>
            </Card>
        </div>
    );
}