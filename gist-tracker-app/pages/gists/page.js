"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function GistsPage() {
  const [gists, setGists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchGists();
  }, [page]);

  const fetchGists = async () => {
    try {
      const response = await fetch(`/api/gist?page=${page}`);
      if (!response.ok) throw new Error("Failed to fetch gists.");
      const data = await response.json();
      setGists(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading gists...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Public Gists</h1>

      {gists.length === 0 ? (
        <p className="text-center text-gray-600">No gists found.</p>
      ) : (
        <div className="space-y-6">
          {gists.map((gist) => (
            <div key={gist.id} className="p-4 border rounded shadow bg-white">
              <h2 className="text-lg font-semibold">{gist.description || "Untitled Gist"}</h2>
              <pre className="mt-2 p-2 bg-gray-100 text-sm rounded overflow-auto">
                {Object.values(gist.files)[0]?.content.slice(0, 200) || "No content available"}...
              </pre>
              <Link
                href={`/gists/${gist.id}`}
                className="mt-3 inline-block px-4 py-2 bg-blue-600 text-white rounded"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="mr-2 px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
