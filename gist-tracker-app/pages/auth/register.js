"use client";

import AuthForm from "@/components/AuthForm";

export default function Register() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <AuthForm isSignup={true} />
    </div>
  );
}
