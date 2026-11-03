import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, Database, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

const gold = '#C9A84C';

export default function AdminLogin() {
  const { signIn, isConfigured, user, isAdmin, checkingAdmin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // If already logged in, redirect directly to /admin
  if (user && isAdmin && !checkingAdmin) {
    navigate('/admin');
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await signIn(email, password);
      if (res.error) {
        setError(res.error);
      } else {
        navigate('/admin');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePasswordReset = async () => {
    setError(null);
    setNotice(null);
    if (!email.trim()) {
      setError('Enter your admin email address first.');
      return;
    }
    if (!supabase) {
      setError('Password reset requires a configured Supabase project.');
      return;
    }

    setSubmitting(true);
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      });
      if (resetError) throw resetError;
      setNotice('If this email has an account, Supabase will send a password reset link. Check your inbox and spam folder.');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Could not send password reset email.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#080808',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 16px 60px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background ambient gold lighting */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '550px',
          height: '550px',
          background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '460px',
          background: '#0e0900',
          border: '1px solid rgba(201,168,76,0.25)',
          borderRadius: '18px',
          padding: '40px 32px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.8), 0 0 32px rgba(201,168,76,0.08)',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.05))',
              border: '1px solid rgba(201,168,76,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              color: gold,
            }}
          >
            <ShieldCheck size={26} />
          </div>

          <h1
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '2rem',
              fontWeight: 600,
              color: '#e8dfc0',
              marginBottom: '6px',
            }}
          >
            Admin Portal
          </h1>
          <p style={{ fontSize: '0.86rem', color: '#8c7d58' }}>
            Anthia & Ornaments Catalog Management
          </p>

          {/* Backend Status Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '0.72rem',
              fontWeight: 600,
              marginTop: '12px',
              background: isConfigured ? 'rgba(34,197,94,0.12)' : 'rgba(234,179,8,0.12)',
              color: isConfigured ? '#4ade80' : '#facc15',
              border: `1px solid ${isConfigured ? 'rgba(34,197,94,0.3)' : 'rgba(234,179,8,0.3)'}`,
            }}
          >
            <Database size={12} />
            {isConfigured ? 'Supabase Connected' : 'Local Preview / Setup Mode'}
          </div>
        </div>

        {/* Error notification */}
        {error && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 16px',
              borderRadius: '8px',
              background: 'rgba(239,68,68,0.12)',
              border: '1px solid rgba(239,68,68,0.3)',
              color: '#f87171',
              fontSize: '0.84rem',
              marginBottom: '20px',
            }}
          >
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}
        {notice && (
          <div
            role="status"
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              background: 'rgba(34,197,94,0.12)',
              border: '1px solid rgba(34,197,94,0.3)',
              color: '#4ade80',
              fontSize: '0.84rem',
              marginBottom: '20px',
            }}
          >
            {notice}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#c4b58e',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail
                size={18}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#6b5e3a',
                }}
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@anthiaandornament.com"
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 42px',
                  background: '#080808',
                  border: '1px solid rgba(201,168,76,0.3)',
                  borderRadius: '10px',
                  color: '#e8dfc0',
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => (e.target.style.borderColor = gold)}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(201,168,76,0.3)')}
              />
            </div>
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#c4b58e',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock
                size={18}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#6b5e3a',
                }}
              />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 42px',
                  background: '#080808',
                  border: '1px solid rgba(201,168,76,0.3)',
                  borderRadius: '10px',
                  color: '#e8dfc0',
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => (e.target.style.borderColor = gold)}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(201,168,76,0.3)')}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '14px 24px',
              marginTop: '6px',
              borderRadius: '10px',
              fontWeight: 600,
              fontSize: '0.9rem',
              letterSpacing: '0.04em',
              background: `linear-gradient(135deg, ${gold}, #E8C96A)`,
              color: '#080808',
              border: 'none',
              cursor: submitting ? 'not-allowed' : 'pointer',
              opacity: submitting ? 0.7 : 1,
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
          >
            {submitting ? 'Authenticating...' : 'Sign In to Dashboard'}
            <ArrowRight size={18} />
          </button>
        </form>

        {isConfigured && (
          <button
            type="button"
            onClick={handlePasswordReset}
            disabled={submitting}
            style={{
              display: 'block',
              margin: '16px auto 0',
              padding: '6px',
              background: 'transparent',
              border: 'none',
              color: gold,
              fontSize: '0.82rem',
              textDecoration: 'underline',
              cursor: submitting ? 'wait' : 'pointer',
            }}
          >
            {submitting ? 'Sending reset link...' : 'Forgot password? Send reset link'}
          </button>
        )}

        {/* Helpful mode note */}
        <div
          style={{
            marginTop: '28px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(201,168,76,0.15)',
            fontSize: '0.78rem',
            color: '#7a6f50',
            lineHeight: 1.6,
          }}
        >
          {isConfigured ? (
            <p>
              Signed in with Supabase Authentication. Ensure this user is registered in your Supabase Auth dashboard.
            </p>
          ) : (
            <div>
              <p style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#c4b58e', marginBottom: '4px' }}>
                <Sparkles size={14} style={{ color: gold }} />
                <strong>Quick Access:</strong>
              </p>
              <p>
                Supabase credentials not detected yet. You can sign in right now with any email and password (min 4 characters) to test the admin features in local mode!
              </p>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link
            to="/"
            style={{
              fontSize: '0.82rem',
              color: '#8c7d58',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = gold)}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#8c7d58')}
          >
            ← Return to Anthia & Ornaments Store
          </Link>
        </div>
      </div>
    </div>
  );
}
