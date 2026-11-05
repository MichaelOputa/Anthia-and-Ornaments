import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, Eye, EyeOff, Lock, ShieldCheck } from 'lucide-react';
import { supabase } from '../lib/supabase';

const gold = '#C9A84C';

export default function AdminResetPassword() {
  const navigate = useNavigate();
  const [checkingLink, setCheckingLink] = useState(true);
  const [validLink, setValidLink] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;
    if (!supabase) {
      setError('Password reset is unavailable because Supabase is not configured.');
      setCheckingLink(false);
      return;
    }

    supabase.auth.getSession().then(({ data, error: sessionError }) => {
      if (!active) return;
      if (sessionError) setError(sessionError.message);
      setValidLink(Boolean(data.session));
      setCheckingLink(false);
    }).catch((sessionError: unknown) => {
      if (!active) return;
      setError(sessionError instanceof Error ? sessionError.message : 'Could not validate the reset link.');
      setCheckingLink(false);
    });

    return () => {
      active = false;
    };
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError('Choose a password with at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('The passwords do not match.');
      return;
    }
    if (!supabase) {
      setError('Password reset is unavailable because Supabase is not configured.');
      return;
    }

    setSubmitting(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) throw updateError;
      navigate('/admin', { replace: true });
    } catch (updateError: unknown) {
      setError(updateError instanceof Error ? updateError.message : 'Could not update password.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#080808', display: 'grid', placeItems: 'center', padding: '100px 16px 60px' }}>
      <div style={{ width: '100%', maxWidth: '460px', background: '#0e0900', border: '1px solid rgba(201,168,76,0.25)', borderRadius: '18px', padding: '40px 32px', color: '#e8dfc0' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <ShieldCheck size={34} style={{ color: gold, marginBottom: '12px' }} />
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', margin: 0 }}>Set a New Password</h1>
          <p style={{ color: '#8c7d58', fontSize: '0.86rem' }}>Choose a unique password for your admin account.</p>
        </div>

        {error && (
          <div role="alert" style={{ display: 'flex', gap: '8px', padding: '12px', borderRadius: '8px', background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', fontSize: '0.84rem', marginBottom: '18px' }}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {checkingLink ? (
          <p style={{ color: '#8c7d58', textAlign: 'center' }}>Checking password reset link...</p>
        ) : !validLink ? (
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#8c7d58', lineHeight: 1.6 }}>This reset link is invalid or expired. Request a fresh link from the admin sign-in page.</p>
            <Link to="/admin/login" style={{ color: gold }}>Back to admin sign in</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <label style={{ fontSize: '0.8rem', color: '#c4b58e' }}>
              New password
              <span style={{ position: 'relative', display: 'block', marginTop: '7px' }}>
                <Lock size={17} style={{ position: 'absolute', left: '13px', top: '14px', color: '#6b5e3a' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  style={{ boxSizing: 'border-box', width: '100%', padding: '12px 44px 12px 40px', background: '#080808', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '10px', color: '#e8dfc0' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? 'Hide new password' : 'Show new password'}
                  aria-pressed={showPassword}
                  style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', display: 'flex', padding: '6px', color: '#8c7d58', background: 'transparent', border: 'none', cursor: 'pointer' }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </span>
            </label>
            <label style={{ fontSize: '0.8rem', color: '#c4b58e' }}>
              Confirm new password
              <span style={{ position: 'relative', display: 'block', marginTop: '7px' }}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  style={{ boxSizing: 'border-box', width: '100%', padding: '12px 44px 12px 14px', background: '#080808', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '10px', color: '#e8dfc0' }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((visible) => !visible)}
                  aria-label={showConfirmPassword ? 'Hide confirmed password' : 'Show confirmed password'}
                  aria-pressed={showConfirmPassword}
                  style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', display: 'flex', padding: '6px', color: '#8c7d58', background: 'transparent', border: 'none', cursor: 'pointer' }}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </span>
            </label>
            <button type="submit" disabled={submitting} style={{ padding: '14px 24px', marginTop: '6px', borderRadius: '10px', fontWeight: 700, background: `linear-gradient(135deg, ${gold}, #E8C96A)`, color: '#080808', border: 'none', cursor: submitting ? 'wait' : 'pointer' }}>
              {submitting ? 'Updating password...' : 'Update Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
