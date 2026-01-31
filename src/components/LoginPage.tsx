import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Lock, Mail, Shield, TrendingUp, Users, Leaf } from 'lucide-react';

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      navigate('/admin/dashboard');
    }, 1000);
  };

  const handleGoToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-blue-600 mb-4">
              <Leaf className="size-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Portal</h1>
            <p className="text-gray-600">Sign in to manage your platform</p>
          </div>

          {/* Login Form */}
          <Card className="p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300" />
                  Remember me
                </label>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-900 font-semibold mb-2">Demo Credentials:</p>
              <p className="text-xs text-blue-700">Email: admin@example.com</p>
              <p className="text-xs text-blue-700">Password: Any password</p>
            </div>
          </Card>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <button
              onClick={handleGoToHome}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-green-600 via-blue-600 to-purple-700 p-12 items-center justify-center">
        <div className="max-w-lg text-white">
          <Shield className="size-16 mb-6 opacity-90" />
          <h2 className="text-4xl font-bold mb-4">
            Powerful Management Tools
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Access comprehensive analytics, user management, and platform controls all in one place.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Users className="size-6 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">User Management</h3>
                <p className="text-sm opacity-80">Manage users, permissions, and VIP subscriptions</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <TrendingUp className="size-6 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Analytics Dashboard</h3>
                <p className="text-sm opacity-80">Track growth metrics and user engagement</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Leaf className="size-6 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Eco-Friendly Platform</h3>
                <p className="text-sm opacity-80">Promote sustainable transportation and rewards</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
