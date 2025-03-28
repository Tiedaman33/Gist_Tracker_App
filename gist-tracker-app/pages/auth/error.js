'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthErrorPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login after 5 seconds
    const timer = setTimeout(() => router.push('/auth/login'), 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Authentication Error</h1>
        <p className="text-gray-600">Redirecting to login page...</p>
      </div>
    </div>
  );
}