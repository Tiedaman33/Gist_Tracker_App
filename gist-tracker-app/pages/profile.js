"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const { data: session } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: session?.user.name || "",
    bio: "",
    avatar: "",
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (response.ok) router.refresh();
  };

  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure you want to delete your account?");
    if (confirmDelete) {
      await fetch("/api/profile", { method: "DELETE" });
      router.push("/auth/login");
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Name"
          className="w-full p-2 border rounded"
        />
        <textarea
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          placeholder="Bio"
          className="w-full p-2 border rounded"
        />
        <input
          value={formData.avatar}
          onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
          placeholder="Avatar URL"
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Update Profile
        </button>
      </form>
      <button
        onClick={handleDelete}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
      >
        Delete Account
      </button>
    </div>
  );
}