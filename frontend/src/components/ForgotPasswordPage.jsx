import React, { useState } from 'react';
import { Send, Mail, ArrowRight } from 'lucide-react';
import AuthShell from './AuthShell';
import { FormField } from './FormField';
import { authService } from '../services/authService';

export default function ForgotPasswordPage({ theme, navigate }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setError('');
    setIsSubmitting(true);
    try {
      await authService.forgotPassword(email.trim());
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Unable to send reset instructions right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const footer = (
    <span>
      Remember your password?{' '}
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
      eyebrow="Reset password"
      title="Forgot your password?"
      subtitle="Enter your email and we'll send you a link to reset it."
      footer={footer}
      theme={theme}
    >
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <FormField
            label="Email address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            theme={theme}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2.5 font-medium text-base px-6 py-3.5 rounded-full text-white transition-all duration-200 mt-2 focus:outline-none"
            style={{ backgroundColor: theme.green }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = theme.greenHover)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = theme.green)}
          >
            <span>{isSubmitting ? 'Sending...' : 'Send Reset Link'}</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      ) : (
        <div className="py-4 text-center space-y-4">
          <div
            className="w-16 h-16 rounded-full mx-auto flex items-center justify-center"
            style={{ backgroundColor: theme.greenSoft, color: theme.green }}
          >
            <Mail className="w-8 h-8" />
          </div>

          <h3 className="text-2xl font-bold tracking-tight" style={{ color: theme.text }}>
            Check your inbox
          </h3>

          <p className="text-sm sm:text-base leading-relaxed max-w-sm mx-auto" style={{ color: theme.textMuted }}>
            If an account exists for <span className="font-semibold" style={{ color: theme.text }}>{email}</span>, we've sent a link to reset your password.
          </p>

          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-4 text-xs font-semibold uppercase tracking-wider hover:underline focus:outline-none"
            style={{ color: theme.green }}
          >
            Send to a different email
          </button>
        </div>
      )}
    </AuthShell>
  );
}
