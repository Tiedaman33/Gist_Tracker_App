'use client'; // Add this directive for client-side interactivity
import { signIn } from "next-auth/react";
import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
  const handleCredentialsSubmit = async (credentials) => {
    const result = await signIn('credentials', {
      redirect: false,
      ...credentials
    });
    
    if (result?.error) {
      console.error('Login failed:', result.error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <AuthForm 
        isSignup={false} 
        onSubmit={handleCredentialsSubmit}
      />
      
      {/* Add GitHub login button */}
      <button 
        onClick={() => signIn('github')}
        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
      >
        Continue with GitHub
      </button>
    </div>
  );
}