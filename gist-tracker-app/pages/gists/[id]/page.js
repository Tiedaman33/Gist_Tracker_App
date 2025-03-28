"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function GistPage() {
  const params = useParams();
  const router = useRouter();
  const [gist, setGist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const id = params?.id;

  useEffect(() => {
    if (!id) {
      setError("Gist ID is missing.");
      setLoading(false);
      return;
    }
    fetchGist();
  }, [id]);

  const fetchGist = async () => {
    try {
      const response = await fetch(`/api/gist/${id}`);
      if (!response.ok) throw new Error("Failed to fetch gist.");
      const data = await response.json();
      setGist(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteGist = async () => {
    if (!confirm("Are you sure you want to delete this gist?")) return;

    const response = await fetch(`/api/gist/${id}`, { method: "DELETE" });

    if (response.ok) {
      alert("Gist deleted!");
      router.push("/dashboard");
    } else {
      alert("Failed to delete gist.");
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading gist...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">{gist?.description || "Untitled Gist"}</h1>

      <div className="p-4 border rounded bg-gray-100">
        {gist?.files &&
          Object.entries(gist.files).map(([filename, file]) => (
            <div key={filename}>
              <h2 className="text-lg font-semibold">{filename}</h2>
              <pre className="mt-2 p-2 bg-white text-sm rounded overflow-auto">{file.content}</pre>
            </div>
          ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={deleteGist}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Delete Gist
        </button>
        <button
          onClick={() => router.push(`/gists/edit/${id}`)}
          className="px-4 py-2 bg-yellow-500 text-white rounded"
        >
          Edit Gist
        </button>
      </div>
    </div>
  );
}