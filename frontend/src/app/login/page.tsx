'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { Lock, Mail, ShieldAlert, ArrowRight, User, CheckCircle2, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

type AuthView = 'login' | 'not-found' | 'signup' | 'verify' | 'forgot-password';

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/';
  const initialView = (searchParams.get('view') as AuthView) || 'login';

  const [view, setView] = useState<AuthView>(initialView);
  
  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState(searchParams.get('email') || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // UI State
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isShake, setIsShake] = useState(false);

  // Auto-redirect if already logged in and verified
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified && view !== 'verify') {
        router.push(redirectPath);
      }
    });
    return () => unsubscribe();
  }, [router, redirectPath, view]);

  const triggerError = (msg: string) => {
    setErrorMsg(msg);
    setIsShake(true);
    setTimeout(() => setIsShake(false), 500);
  };

  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (!pass) return { label: '', score: 0, color: 'bg-gray-200', width: '0%' };
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[a-z]/.test(pass)) score += 1;
    if (/\d/.test(pass)) score += 1;
    if (/[\W_]/.test(pass)) score += 1;

    if (score <= 1) return { label: 'Very Weak', score, color: 'bg-red-500', width: '20%' };
    if (score === 2) return { label: 'Weak', score, color: 'bg-orange-500', width: '40%' };
    if (score === 3) return { label: 'Medium', score, color: 'bg-yellow-500', width: '60%' };
    if (score === 4) return { label: 'Strong', score, color: 'bg-[#0F5132]', width: '80%' };
    return { label: 'Excellent', score, color: 'bg-[#146B43]', width: '100%' };
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      
      // Temporarily bypassed email verification for easier testing
      // if (!cred.user.emailVerified) {
      //   triggerError('Please verify your email before signing in.');
      //   await auth.signOut();
      //   setLoading(false);
      //   return;
      // }
      
      setSuccessMsg(`Welcome back, ${cred.user.displayName || 'friend'} 🌿`);
      setTimeout(() => {
        router.push(redirectPath);
      }, 1500);

    } catch (err: any) {
      // Intentionally not using console.error(err) to prevent Next.js Dev overlay from hijacking the UX
      if (err.code === 'auth/user-not-found') {
        setView('not-found');
      } else if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        // Fallback check for "not found" UX logic
        try {
          const methods = await fetchSignInMethodsForEmail(auth, email);
          if (methods.length === 0) {
            setView('not-found');
            setLoading(false);
            return;
          }
        } catch (e) {
          // Ignore if enumeration protection blocks it
        }
        triggerError('Incorrect email or password.');
      } else if (err.code === 'auth/too-many-requests') {
        triggerError('Too many attempts. Please wait 15 minutes.');
      } else if (err.message?.toLowerCase().includes('network')) {
        triggerError('Unable to connect. Please check your internet connection.');
      } else {
        triggerError('Something went wrong. Please try again.');
      }
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      triggerError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      triggerError('Passwords do not match.');
      setLoading(false);
      return;
    }

    const strength = getPasswordStrength(password);
    if (strength.score < 3) {
      triggerError('Please use a stronger password.');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName: fullName });
        await sendEmailVerification(userCredential.user);
        // Instead of forcing them to the 'verify' view, let's just log them in for now
        // await auth.signOut(); // Do not log them in until verified
        // setView('verify');
        setSuccessMsg(`Account created successfully! Welcome 🌿`);
        setTimeout(() => {
          router.push(redirectPath);
        }, 1500);
      }
    } catch (err: any) {
      // Intentionally not using console.error(err) to prevent Next.js Dev overlay from hijacking the UX
      if (err.code === 'auth/email-already-in-use') {
        triggerError('This email address is already in use.');
      } else {
        triggerError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      // Intentionally ignore to prevent email enumeration
    }
    setSuccessMsg("We've sent password reset instructions to your email.");
    setLoading(false);
  };

  const resendVerification = async () => {
    setLoading(true);
    try {
      // Re-auth temporarily to send email
      const cred = await signInWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(cred.user);
      await auth.signOut();
      setSuccessMsg("Verification email resent successfully.");
    } catch (err) {
      triggerError("Failed to resend. Please try logging in again.");
    }
    setLoading(false);
  };

  const strength = getPasswordStrength(password);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <motion.div 
      animate={isShake ? { x: [-5, 5, -5, 5, 0] } : {}}
      transition={{ duration: 0.4 }}
      className="w-[92%] md:w-full max-w-[480px] p-[24px] md:p-[40px] rounded-[32px] bg-[rgba(255,255,255,0.88)] backdrop-blur-[18px] shadow-[0_20px_60px_rgba(18,50,32,0.08)] relative z-10"
    >
      <div className="flex justify-center mb-6 md:mb-8">
        <div className="w-[56px] h-[56px] md:w-[64px] md:h-[64px] rounded-full bg-[#F5F8F3] flex items-center justify-center shadow-[0_4px_12px_rgba(18,50,32,0.04)]">
          <img src="/home/herbal_logo.png" alt="Herbal Tea Logo" className="w-[32px] h-[32px] md:w-[36px] md:h-[36px] object-contain" />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* --- VIEW: LOGIN --- */}
        {view === 'login' && (
          <motion.div key="login" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-[32px] md:text-[40px] font-bold text-[#0F5132] leading-[1.1]" style={{ fontFamily: 'Playfair Display, serif' }}>
                Welcome Back
              </h2>
              <p className="text-[#6E7C70] text-[15px] font-normal mt-3 mx-auto max-w-[340px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                Sign in to continue your wellness journey.
              </p>
            </div>

            {errorMsg && (
              <div className="flex items-center gap-3 rounded-[16px] bg-red-50 p-4 text-[14px] text-red-800 border border-red-100 mb-6">
                <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
                <p>{errorMsg}</p>
              </div>
            )}
            
            {successMsg && (
              <div className="flex items-center gap-3 rounded-[16px] bg-green-50 p-4 text-[14px] text-green-800 border border-green-100 mb-6">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />
                <p>{successMsg}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-[20px]">
              <div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-[20px] flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-[#0F5132]" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value.trim().toLowerCase())}
                    className="w-full pl-[52px] pr-[20px] h-[52px] rounded-[16px] border border-[#F8F5EE] bg-white text-[16px] text-[#1D2E25] focus:outline-none focus:border-[#0F5132] focus:ring-[4px] focus:ring-[rgba(15,81,50,0.08)] transition-all placeholder:text-[#A0AAB2]"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-[20px] flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-[#0F5132]" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-[52px] pr-[52px] h-[52px] rounded-[16px] border border-[#F8F5EE] bg-white text-[16px] text-[#1D2E25] focus:outline-none focus:border-[#0F5132] focus:ring-[4px] focus:ring-[rgba(15,81,50,0.08)] transition-all placeholder:text-[#A0AAB2]"
                    placeholder="Enter password"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-[20px] flex items-center text-[#A0AAB2] hover:text-[#0F5132] transition-colors">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-[#6E7C70] text-[14px]">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="w-[16px] h-[16px] rounded-[4px] border-[#F8F5EE] text-[#0F5132] focus:ring-[rgba(15,81,50,0.08)] cursor-pointer" />
                  <span className="group-hover:text-[#1D2E25] transition-colors">Remember Me</span>
                </label>
                <button type="button" onClick={() => { setErrorMsg(null); setView('forgot-password'); }} className="font-medium text-[#0F5132] hover:underline">
                  Forgot Password?
                </button>
              </div>

              <button type="submit" disabled={loading || !!successMsg} className="w-full h-[52px] rounded-[16px] bg-[#0F5132] text-white text-[16px] font-[600] hover:bg-[#146B43] focus:ring-[4px] focus:ring-[rgba(15,81,50,0.20)] transition-all disabled:opacity-70 flex items-center justify-center gap-2 group shadow-[0_8px_16px_rgba(15,81,50,0.15)] hover:scale-[1.02]">
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : successMsg ? <CheckCircle2 className="w-5 h-5" /> : <>Sign In <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>}
              </button>
            </form>
            
            <div className="mt-8 text-center text-[#6E7C70] text-[15px]">
              Don't have an account?{' '}
              <button onClick={() => { setErrorMsg(null); setView('signup'); }} className="text-[#0F5132] font-[600] hover:underline">Create Account</button>
            </div>
          </motion.div>
        )}

        {/* --- VIEW: NOT FOUND --- */}
        {view === 'not-found' && (
          <motion.div key="not-found" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="text-center">
            <div className="mb-8 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center">
                <User className="w-8 h-8 text-orange-500" />
              </div>
            </div>
            <h2 className="text-[28px] font-bold text-[#0F5132] mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
              We couldn't find an account with this email.
            </h2>
            <p className="text-[#6E7C70] text-[15px] mb-8 max-w-[300px] mx-auto">
              Create a secure account to begin your wellness journey with us today.
            </p>
            <div className="space-y-4">
              <button onClick={() => setView('signup')} className="w-full h-[52px] rounded-[16px] bg-[#0F5132] text-white text-[16px] font-[600] hover:bg-[#146B43] shadow-[0_8px_16px_rgba(15,81,50,0.15)] hover:scale-[1.02] transition-all">
                Create Account
              </button>
              <button onClick={() => setView('login')} className="w-full h-[52px] rounded-[16px] bg-[#F5F8F3] text-[#0F5132] text-[16px] font-[600] hover:bg-[#EAF0E7] transition-all">
                Try Another Email
              </button>
            </div>
          </motion.div>
        )}

        {/* --- VIEW: SIGN UP --- */}
        {view === 'signup' && (
          <motion.div key="signup" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-[32px] md:text-[40px] font-bold text-[#0F5132] leading-[1.1]" style={{ fontFamily: 'Playfair Display, serif' }}>
                Create Account
              </h2>
              <p className="text-[#6E7C70] text-[15px] mt-3">Join our wellness community today.</p>
            </div>

            {errorMsg && (
              <div className="flex items-center gap-3 rounded-[16px] bg-red-50 p-4 text-[14px] text-red-800 border border-red-100 mb-6">
                <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
                <p>{errorMsg}</p>
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-[20px]">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-[20px] flex items-center pointer-events-none"><User className="h-5 w-5 text-[#0F5132]" /></div>
                <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full pl-[52px] pr-[20px] h-[52px] rounded-[16px] border border-[#F8F5EE] focus:border-[#0F5132] focus:ring-[4px] focus:ring-[rgba(15,81,50,0.08)] transition-all" placeholder="Full Name" />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-[20px] flex items-center pointer-events-none"><Mail className="h-5 w-5 text-[#0F5132]" /></div>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value.trim().toLowerCase())} className="w-full pl-[52px] pr-[20px] h-[52px] rounded-[16px] border border-[#F8F5EE] focus:border-[#0F5132] focus:ring-[4px] focus:ring-[rgba(15,81,50,0.08)] transition-all" placeholder="Email Address" />
              </div>

              <div>
                <div className="relative group mb-2">
                  <div className="absolute inset-y-0 left-0 pl-[20px] flex items-center pointer-events-none"><Lock className="h-5 w-5 text-[#0F5132]" /></div>
                  <input type={showPassword ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-[52px] pr-[52px] h-[52px] rounded-[16px] border border-[#F8F5EE] focus:border-[#0F5132] focus:ring-[4px] focus:ring-[rgba(15,81,50,0.08)] transition-all" placeholder="Create a password" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-[20px] flex items-center text-[#A0AAB2] hover:text-[#0F5132]">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {password && (
                  <div className="flex items-center gap-3 px-1">
                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-full ${strength.color} transition-all duration-300`} style={{ width: strength.width }} />
                    </div>
                    <span className="text-[11px] font-medium text-gray-500 w-[60px] text-right">{strength.label}</span>
                  </div>
                )}
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-[20px] flex items-center pointer-events-none"><Lock className="h-5 w-5 text-[#0F5132]" /></div>
                <input type={showPassword ? 'text' : 'password'} required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full pl-[52px] pr-[20px] h-[52px] rounded-[16px] border border-[#F8F5EE] focus:border-[#0F5132] focus:ring-[4px] focus:ring-[rgba(15,81,50,0.08)] transition-all" placeholder="Confirm password" />
              </div>

              <label className="flex items-start gap-3 cursor-pointer group pt-2">
                <input type="checkbox" required checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} className="mt-1 w-[16px] h-[16px] rounded-[4px] border-[#F8F5EE] text-[#0F5132] focus:ring-[rgba(15,81,50,0.08)] cursor-pointer" />
                <span className="text-[13px] text-[#6E7C70] leading-snug">
                  I agree to the <Link href="/terms" className="text-[#0F5132] font-medium hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-[#0F5132] font-medium hover:underline">Privacy Policy</Link>
                </span>
              </label>

              <button type="submit" disabled={loading || !agreeTerms || password !== confirmPassword} className="w-full h-[52px] rounded-[16px] bg-[#0F5132] text-white text-[16px] font-[600] hover:bg-[#146B43] transition-all disabled:opacity-70 flex items-center justify-center gap-2 group shadow-[0_8px_16px_rgba(15,81,50,0.15)] hover:scale-[1.02]">
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Create Account <ArrowRight className="w-5 h-5 group-hover:translate-x-1" /></>}
              </button>
            </form>

            <div className="mt-8 text-center text-[#6E7C70] text-[15px]">
              Already have an account? <button onClick={() => { setErrorMsg(null); setView('login'); }} className="text-[#0F5132] font-[600] hover:underline">Sign In</button>
            </div>
          </motion.div>
        )}

        {/* --- VIEW: VERIFY EMAIL --- */}
        {view === 'verify' && (
          <motion.div key="verify" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="text-center">
            <div className="mb-8 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h2 className="text-[28px] font-bold text-[#0F5132] mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
              Verify Your Email
            </h2>
            <p className="text-[#6E7C70] text-[15px] mb-8 max-w-[300px] mx-auto">
              We've sent a verification link to <strong>{email}</strong>. Please verify your email before signing in.
            </p>
            
            {successMsg && <p className="text-green-600 text-sm mb-4 font-medium">{successMsg}</p>}
            {errorMsg && <p className="text-red-600 text-sm mb-4 font-medium">{errorMsg}</p>}

            <div className="space-y-4">
              <button onClick={() => setView('login')} className="w-full h-[52px] rounded-[16px] bg-[#0F5132] text-white text-[16px] font-[600] hover:bg-[#146B43] transition-all shadow-[0_8px_16px_rgba(15,81,50,0.15)]">
                Back to Login
              </button>
              <button onClick={resendVerification} disabled={loading} className="w-full h-[52px] rounded-[16px] bg-[#F5F8F3] text-[#0F5132] text-[16px] font-[600] hover:bg-[#EAF0E7] transition-all">
                {loading ? 'Sending...' : 'Resend Email'}
              </button>
            </div>
          </motion.div>
        )}

        {/* --- VIEW: FORGOT PASSWORD --- */}
        {view === 'forgot-password' && (
          <motion.div key="forgot-password" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-[28px] font-bold text-[#0F5132] mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                Reset Password
              </h2>
              <p className="text-[#6E7C70] text-[15px]">Enter your email to receive reset instructions.</p>
            </div>

            {successMsg ? (
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 rounded-[16px] bg-green-50 p-4 text-[14px] text-green-800 border border-green-100 mb-8">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <p>{successMsg}</p>
                </div>
                <button onClick={() => { setSuccessMsg(null); setView('login'); }} className="w-full h-[52px] rounded-[16px] bg-[#0F5132] text-white text-[16px] font-[600] hover:bg-[#146B43] transition-all shadow-[0_8px_16px_rgba(15,81,50,0.15)]">
                  Return to Login
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-[20px]">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-[20px] flex items-center pointer-events-none"><Mail className="h-5 w-5 text-[#0F5132]" /></div>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value.trim().toLowerCase())} className="w-full pl-[52px] pr-[20px] h-[52px] rounded-[16px] border border-[#F8F5EE] focus:border-[#0F5132] focus:ring-[4px] focus:ring-[rgba(15,81,50,0.08)] transition-all" placeholder="Email Address" />
                </div>
                <button type="submit" disabled={loading} className="w-full h-[52px] rounded-[16px] bg-[#0F5132] text-white text-[16px] font-[600] hover:bg-[#146B43] transition-all flex items-center justify-center disabled:opacity-70 shadow-[0_8px_16px_rgba(15,81,50,0.15)]">
                  {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Send Instructions'}
                </button>
                <button type="button" onClick={() => setView('login')} className="w-full h-[52px] rounded-[16px] bg-[#F5F8F3] text-[#0F5132] text-[16px] font-[600] hover:bg-[#EAF0E7] transition-all">
                  Back to Login
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function AuthPage() {
  return (
    <div className="flex w-full min-h-screen items-center justify-center bg-[#FAF8F2] relative px-4 py-8 overflow-hidden">
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[url('/assets/floral-pattern.png')] bg-no-repeat bg-contain opacity-[0.03] pointer-events-none transform rotate-180" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[url('/assets/floral-pattern.png')] bg-no-repeat bg-contain opacity-[0.03] pointer-events-none" />

      <div className="w-full relative flex items-center justify-center z-10">
        <Suspense fallback={<div className="w-[480px] h-[500px] rounded-[32px] bg-[rgba(255,255,255,0.5)] animate-pulse" />}>
          <AuthContent />
        </Suspense>
      </div>
    </div>
  );
}
