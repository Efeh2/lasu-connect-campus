
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { FormSkeleton } from '../components/ui/enhanced-skeleton';
import { useUser } from '../contexts/UserContext';
import { Button } from '../components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  level: z.string().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const [userType, setUserType] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error, clearError } = useUser();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      level: '100',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    clearError();
    try {
      await login(data.email, data.password, userType, data.level);
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const levels = ['100', '200', '300', '400', '500'];

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 bg-gray-50 py-12">
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <FormSkeleton fields={4} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="flex-1 bg-gray-50 py-12">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <img 
                src="/lovable-uploads/246bd794-2724-4037-8e0a-fe4845c23298.png" 
                alt="LASU Logo" 
                className="h-16 w-16 mx-auto mb-4"
              />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Sign in to your TSI account</p>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* User Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                I am a:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setUserType('student')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    userType === 'student'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('teacher')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    userType === 'teacher'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Teacher
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('admin')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    userType === 'admin'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Admin
                </button>
              </div>
            </div>

            {/* Login Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Level Selection for Students */}
                {userType === 'student' && (
                  <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Academic Level</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {levels.map((level) => (
                              <SelectItem key={level} value={level}>
                                {level} Level
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            className="pl-10 pr-12"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-purple-600 hover:text-purple-800">
                    Forgot password?
                  </a>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full ${
                    userType === 'student'
                      ? 'bg-purple-600 hover:bg-purple-700'
                      : userType === 'teacher'
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-purple-600 hover:bg-purple-700'
                  }`}
                >
                  {isLoading ? 'Signing In...' : `Sign In as ${userType.charAt(0).toUpperCase() + userType.slice(1)}`}
                  {userType === 'student' && form.watch('level') && ` (${form.watch('level')} Level)`}
                </Button>
              </form>
            </Form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="text-purple-600 hover:text-purple-800 font-semibold">
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
