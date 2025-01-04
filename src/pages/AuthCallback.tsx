import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleAuthCallback } from '../services/socialAuth';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const processAuth = async () => {
      try {
        await handleAuthCallback();
        navigate('/');
      } catch (error) {
        console.error('Auth callback error:', error);
        navigate('/login');
      }
    };

    processAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Completing sign in...</h2>
        <p className="text-text-grey">Please wait while we verify your credentials.</p>
      </div>
    </div>
  );
}