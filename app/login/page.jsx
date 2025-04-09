"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/authcontext';
export default function Login() {
  const auth = useAuth()
  console.log(auth)
  const {signInWithGoogle} = auth
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    if (typeof signInWithGoogle !== 'function') {
      console.error("signInWithGoogle is not a function", signInWithGoogle);
      setError("Authentication not properly initialized. Please try again later.");
      return;
    }
    try {
      setError(null);
      setLoading(true);
      await signInWithGoogle();
      router.push('/'); // Redirect to dashboard after login
    } catch (error) {
      setError(error.message);
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Sign In</h1>
          <p className="mt-2 text-gray-600">Sign in to your account to continue</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Sign in with Google'}
        </button>
      </div>
    </div>
  );
}
