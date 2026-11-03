import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { RefreshCw } from 'lucide-react';

const gold = '#C9A84C';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading, checkingAdmin, isAdmin, adminCheckError, signOut } = useAuth();

  if (loading || checkingAdmin) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#080808',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          color: '#e8dfc0',
        }}
      >
        <RefreshCw size={32} className="animate-spin" style={{ color: gold }} />
        <p style={{ fontSize: '0.9rem', color: '#8c7d58' }}>Authenticating admin access...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div style={{ minHeight: '100vh', background: '#080808', color: '#e8dfc0', display: 'grid', placeContent: 'center', textAlign: 'center', padding: '24px' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Admin access required</h1>
        <p style={{ color: '#8c7d58', marginBottom: '20px' }}>
          {adminCheckError
            ? `Could not verify your admin access: ${adminCheckError}`
            : 'This account is not on the Supabase admin email allowlist.'}
        </p>
        <button
          onClick={() => void signOut()}
          style={{ justifySelf: 'center', padding: '10px 18px', borderRadius: '8px', background: '#C9A84C', color: '#080808', border: 'none', cursor: 'pointer' }}
        >
          Sign out
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
