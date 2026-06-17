"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail, Lock, User, Compass, Smartphone, ArrowLeft, KeyRound } from "lucide-react";
import { signup } from "../actions";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, useTransition } from "react";
import { createClient } from "@/utils/supabase/client";
import SplashScreen from "@/components/shared/SplashScreen";

function SignupForm() {
  const searchParams = useSearchParams();
  const [errorMsg, setErrorMsg] = useState<string | null>(searchParams.get('error'));
  const [successMsg, setSuccessMsg] = useState<string | null>(searchParams.get('success'));
  
  const [authMethod, setAuthMethod] = useState<'password' | 'otp'>('password');
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  const [isPending, startTransition] = useTransition();
  const [isLoadingState, setIsLoadingState] = useState(false);

  const isMockMode =
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === 'your-anon-key';

  const handleGoogleSignup = async () => {
    setIsLoadingState(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    if (isMockMode) {
      setTimeout(() => {
        document.cookie = "auth-session=" + JSON.stringify({ email: "google-user@gmail.com", fullName: "Google Explorer", authenticated: true }) + "; path=/; max-age=604800";
        document.cookie = "mock_session=google-explorer; path=/; max-age=604800";
        window.location.href = "/";
      }, 800);
      return;
    }

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) {
        setErrorMsg(error.message);
        setIsLoadingState(false);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'An error occurred during Google sign up';
      setErrorMsg(msg);
      setIsLoadingState(false);
    }
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg("Email address is required for OTP sign up");
      return;
    }
    
    setIsLoadingState(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    if (isMockMode) {
      setTimeout(() => {
        setOtpSent(true);
        setSuccessMsg("Mock OTP code sent! Enter any 6-digit code to register.");
        setIsLoadingState(false);
      }, 1000);
      return;
    }

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          shouldCreateUser: true,
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        }
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        setOtpSent(true);
        setSuccessMsg("A one-time passcode has been sent to your email!");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to send OTP code';
      setErrorMsg(msg);
    } finally {
      setIsLoadingState(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode || otpCode.length < 6) {
      setErrorMsg("Please enter a valid 6-digit verification code");
      return;
    }

    setIsLoadingState(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    if (isMockMode) {
      setTimeout(() => {
        document.cookie = "auth-session=" + JSON.stringify({ email: email.trim(), fullName: email.split('@')[0], authenticated: true }) + "; path=/; max-age=604800";
        document.cookie = "mock_session=otp-user; path=/; max-age=604800";
        window.location.href = "/";
      }, 1000);
      return;
    }

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.verifyOtp({
        email: email.trim(),
        token: otpCode.trim(),
        type: 'email'
      });

      if (error) {
        setErrorMsg(error.message);
        setIsLoadingState(false);
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'OTP verification failed';
      setErrorMsg(msg);
      setIsLoadingState(false);
    }
  };

  if (isLoadingState) {
    return <SplashScreen message="Creating your account..." />;
  }

  return (
    <div className="space-y-5">
      {successMsg && (
        <div className="p-3 mb-4 text-sm text-green-700 bg-green-50 rounded-[1rem] font-medium border border-green-200">
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="p-3 mb-4 text-sm text-red-600 bg-red-50 rounded-[1rem] font-medium border border-red-200">
          {errorMsg}
        </div>
      )}

      <AnimatePresence mode="wait">
        {authMethod === 'password' ? (
          <motion.form 
            key="passwordForm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              setIsLoadingState(true);
              const target = e.target as HTMLFormElement;
              const data = new FormData(target);
              startTransition(async () => {
                await signup(data);
                setIsLoadingState(false);
              });
            }}
          >
            {/* Social Logins */}
            <div className="flex gap-4 mb-6">
              <button 
                type="button" 
                onClick={handleGoogleSignup}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-50 border border-gray-100 rounded-[1rem] hover:bg-gray-100 transition-colors text-organic-black font-bold text-sm cursor-pointer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                Google
              </button>
              <button 
                type="button" 
                onClick={() => { setAuthMethod('otp'); setSuccessMsg(null); setErrorMsg(null); }}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-50 border border-gray-100 rounded-[1rem] hover:bg-gray-100 transition-colors text-organic-black font-bold text-sm cursor-pointer"
              >
                <Smartphone className="w-5 h-5 text-organic-green" />
                Email OTP
              </button>
            </div>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-gray-100"></div>
              <span className="flex-shrink-0 mx-4 text-xs text-gray-400 uppercase tracking-wider font-bold">Or continue with email</span>
              <div className="flex-grow border-t border-gray-100"></div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-500">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  name="full_name"
                  required
                  placeholder="Aisha Sharma" 
                  className="w-full py-4 pl-12 pr-4 text-organic-black bg-gray-50 border border-gray-100 rounded-[1.5rem] focus:border-organic-green focus:outline-none focus:ring-1 focus:ring-organic-green font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-500">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="email" 
                  name="email"
                  required
                  placeholder="voyager@traverse.ai" 
                  className="w-full py-4 pl-12 pr-4 text-organic-black bg-gray-50 border border-gray-100 rounded-[1.5rem] focus:border-organic-green focus:outline-none focus:ring-1 focus:ring-organic-green font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-500">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="password" 
                  name="password"
                  required
                  placeholder="••••••••" 
                  className="w-full py-4 pl-12 pr-4 text-organic-black bg-gray-50 border border-gray-100 rounded-[1.5rem] focus:border-organic-green focus:outline-none focus:ring-1 focus:ring-organic-green font-medium"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isPending}
              className="w-full flex justify-center items-center py-4 text-white font-bold rounded-full bg-organic-black hover:scale-105 transition-transform mt-6 cursor-pointer"
            >
              {isPending ? "Creating Account..." : "Create Account"} <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </motion.form>
        ) : (
          <motion.div 
            key="otpForm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-5"
          >
            {/* Back to password toggle */}
            <button 
              type="button" 
              onClick={() => { setAuthMethod('password'); setOtpSent(false); setSuccessMsg(null); setErrorMsg(null); }}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-organic-black font-bold cursor-pointer mb-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Standard Sign Up
            </button>

            {!otpSent ? (
              <form onSubmit={handleSendOTP} className="space-y-5">
                <div className="text-center p-4 bg-gray-50 rounded-[1.5rem] border border-gray-100">
                  <Smartphone className="w-10 h-10 text-organic-green mx-auto mb-2" />
                  <h3 className="font-bold text-organic-black">Passwordless OTP Registration</h3>
                  <p className="text-xs text-gray-500 font-medium">We will send a one-time registration passcode to your email inbox.</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-500">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="voyager@traverse.ai" 
                      className="w-full py-4 pl-12 pr-4 text-organic-black bg-gray-50 border border-gray-100 rounded-[1.5rem] focus:border-organic-green focus:outline-none focus:ring-1 focus:ring-organic-green font-medium"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full flex justify-center items-center py-4 text-white font-bold rounded-full bg-organic-black hover:scale-105 transition-transform mt-6 cursor-pointer"
                >
                  Send OTP Code <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-5">
                <div className="text-center p-4 bg-gray-50 rounded-[1.5rem] border border-gray-100">
                  <KeyRound className="w-10 h-10 text-organic-green mx-auto mb-2" />
                  <h3 className="font-bold text-organic-black">Verify Registration OTP</h3>
                  <p className="text-xs text-gray-500 font-medium">Enter the 6-digit code sent to {email}</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-500">Verification Code</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="text" 
                      required
                      maxLength={6}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                      placeholder="123456" 
                      className="w-full py-4 pl-12 pr-4 text-center tracking-[1em] text-xl font-bold text-organic-black bg-gray-50 border border-gray-100 rounded-[1.5rem] focus:border-organic-green focus:outline-none focus:ring-1 focus:ring-organic-green"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs font-semibold px-2">
                  <span className="text-gray-400">Didn&apos;t get code?</span>
                  <button 
                    type="button" 
                    onClick={handleSendOTP}
                    className="text-organic-black hover:underline font-bold cursor-pointer"
                  >
                    Resend Code
                  </button>
                </div>

                <button 
                  type="submit" 
                  className="w-full flex justify-center items-center py-4 text-white font-bold rounded-full bg-organic-green hover:scale-105 transition-transform mt-6 cursor-pointer"
                >
                  Verify & Sign Up <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SignupClient() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 pt-20 pb-12 relative overflow-hidden bg-organic-light dark:bg-organic-green-dark">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md p-8 sm:p-10 bg-white dark:bg-white/5 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 dark:border-white/10"
      >
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-full bg-organic-black flex items-center justify-center shadow-lg">
            <Compass className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h2 className="mb-2 text-3xl font-black text-center text-organic-black dark:text-white">Join Traverse</h2>
        <p className="mb-8 text-center text-gray-500 font-medium">Create your intelligent travel passport.</p>

        <Suspense fallback={<div className="h-64 flex items-center justify-center"><div className="w-8 h-8 border-4 border-organic-green rounded-full border-t-transparent animate-spin"></div></div>}>
          <SignupForm />
        </Suspense>

        <p className="mt-8 text-center text-sm text-gray-500 font-medium">
          Already have an account? <Link href="/auth/login" className="text-organic-black dark:text-white hover:underline font-bold">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
