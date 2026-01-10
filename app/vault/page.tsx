'use client';

import { useState } from 'react';
import { Shield, Lock, User, KeyRound, ArrowRight, Eye, EyeOff, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const KeyboardScene = dynamic(() => import('@/components/keyboard-scene').then(mod => ({ default: mod.KeyboardScene })), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  ),
});

export default function VaultPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle authentication here
    console.log('Login attempt:', { email, password });
  };

  const handleAccessVault = () => {
    setShowKeyboard(true);
  };

  const handlePasswordSubmit = (enteredPassword: string) => {
    if (enteredPassword === '69') {
      // Password correct, redirect to partner portal
      alert('Access Granted! 🎉');
      setShowKeyboard(false);
      // You can redirect to actual partner portal or dashboard here
      // router.push('/partner-portal');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />

      {/* Gradient Orbs */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

      {/* Back to Home Button */}
      <div className="absolute top-6 left-6 z-10">
        <Link href="/">
          <Button
            variant="ghost"
            className="backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 text-white"
          >
            ← Back to Home
          </Button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 mb-6">
              <Shield className="w-10 h-10 text-purple-400" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Partner Vault</h1>
            <p className="text-gray-400">Secure access to partner resources</p>
          </div>

          {/* Login Card */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="partner@company.com"
                  className="w-full px-4 py-3 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-400 cursor-pointer hover:text-white transition-colors">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-white/20 bg-white/5 text-purple-500 focus:ring-purple-500 focus:ring-offset-0"
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <Button
                type="button"
                onClick={handleAccessVault}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
              >
                Access Vault
                <ArrowRight className="w-5 h-5" />
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 text-gray-500 bg-transparent">or</span>
              </div>
            </div>

            {/* Alternative Actions */}
            <div className="space-y-3">
              <button
                type="button"
                className="w-full backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
              >
                <KeyRound className="w-5 h-5" />
                Sign in with SSO
              </button>
            </div>

            {/* Footer Note */}
            <p className="text-center text-sm text-gray-500 mt-6">
              Need access?{' '}
              <button className="text-purple-400 hover:text-purple-300 transition-colors">
                Contact your account manager
              </button>
            </p>
          </div>

          {/* Security Badge */}
          <div className="text-center mt-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 text-sm text-gray-400">
              <Lock className="w-4 h-4 text-green-400" />
              <span>256-bit SSL Encryption</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Keyboard Modal */}
      {showKeyboard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-6xl h-[80vh] mx-4">
            {/* Close Button */}
            <button
              onClick={() => setShowKeyboard(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 text-white transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Keyboard Scene */}
            <div className="w-full h-full rounded-2xl backdrop-blur-xl bg-gradient-to-br from-slate-900/90 via-purple-900/90 to-slate-900/90 border border-white/10 overflow-hidden">
              <KeyboardScene onPasswordSubmit={handlePasswordSubmit} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
