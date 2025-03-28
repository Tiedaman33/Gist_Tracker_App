"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthForm({ isSignup, onSubmit }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!isSignup) {
      // Handle Login
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (res.error) {
        setError(res.error);
      } else {
        router.push("/dashboard"); // Redirect to dashboard after login
      }
    } else {
      // Handle Registration
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          router.push("/auth/login"); // Redirect to login page after signup
        } else {
          setError("error.");
        }
      } catch (error) {
        setError("Something went wrong.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">
        {isSignup ? "Create an Account" : "Sign in to Your Account"}
      </h1>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="w-80 flex flex-col">
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="p-2 mb-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="p-2 mb-4 border rounded"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Processing..." : isSignup ? "Sign Up" : "Login"}
        </button>
      </form>

      <hr className="my-4 w-full" />

      <button
  onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
  className="px-4 py-2 bg-black text-white rounded-md"
>
  Sign in with GitHub
</button>
    </div>
  );
}
