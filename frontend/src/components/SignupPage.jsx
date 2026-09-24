import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import AuthShell from './AuthShell';
import { FormField } from './FormField';
import { authService } from '../services/authService';

export default function SignupPage({ theme, navigate }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      await authService.register({ fullName, email, phone, password });
      setSuccess('Account created successfully. You can log in now.');
      setFullName('');
      setEmail('');
      setPhone('');
      setPassword('');
      setAgreed(false);
      setTimeout(() => navigate('Login'), 1200);
    } catch (err) {
      setError(err.message || 'Unable to create your account right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const footer = (
    <span>
      Already have an account?{' '}
      <button
        type="button"
        onClick={() => navigate('Login')}
        className="font-semibold transition-colors focus:outline-none hover:underline"
        style={{ color: theme.green }}
      >
        Log in
      </button>
    </span>
  );

  return (
    <AuthShell
      eyebrow="Get started"
      title="Create your account"
      subtitle="Set up your free SOLARA account to estimate savings, request quotes, and manage clean energy installations."
      footer={footer}
      theme={theme}
    >
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}
        {success && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {success}
          </div>
        )}

        <FormField
          label="Full name"
          type="text"
          placeholder="John Doe"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          theme={theme}
        />

        <FormField
          label="Email address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          theme={theme}
        />

        <FormField
          label="Phone number"
          type="tel"
          placeholder="(555) 000-0000"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          theme={theme}
        />

        <FormField
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          theme={theme}
        />

        {/* Checkbox: I agree to the Terms of Service and Privacy Policy */}
        <div className="pt-1">
          <label className="flex items-start gap-2.5 cursor-pointer text-xs sm:text-sm select-none" style={{ color: theme.textMuted }}>
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              required
              className="w-4 h-4 mt-0.5 rounded border cursor-pointer flex-shrink-0"
              style={{ accentColor: theme.green }}
            />
            <span>
              I agree to the{' '}
              <a href="#terms" className="underline font-medium" style={{ color: theme.green }}>
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#privacy" className="underline font-medium" style={{ color: theme.green }}>
                Privacy Policy
              </a>
              .
            </span>
          </label>
        </div>

        {/* Full-width filled green pill Create Account button */}
        <button
          type="submit"
          disabled={isSubmitting || !agreed}
          className="w-full inline-flex items-center justify-center gap-2.5 font-medium text-base px-6 py-3.5 rounded-full text-white transition-all duration-200 mt-2 focus:outline-none"
          style={{ backgroundColor: theme.green }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = theme.greenHover)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = theme.green)}
        >
          <span>{isSubmitting ? 'Creating account...' : 'Create Account'}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>
    </AuthShell>
  );
}
