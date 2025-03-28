"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [gists, setGists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [description, setDescription] = useState("");
  const [filename, setFilename] = useState("gistfile.txt");
  const [code, setCode] = useState("");
  const [editMode, setEditMode] = useState(null);
  const [editDescription, setEditDescription] = useState("");
  const [editFilename, setEditFilename] = useState("");
  const [editCode, setEditCode] = useState("");
  const [page, setPage] = useState(1);
  const [showCreateForm, setShowCreateForm] = useState(false); // Toggle form visibility

  useEffect(() => {
    if (status === "authenticated") {
      fetchGists();
    }
  }, [status, page]);

  const fetchGists = async () => {
    try {
      const response = await fetch(
        `/api/gists?username=${session?.user?.name}&page=${page}`
      );
      if (!response.ok) throw new Error("Failed to fetch gists.");
      const data = await response.json();
      setGists(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createGist = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/gists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, filename, code }),
      });

      if (!response.ok) throw new Error("Failed to create gist.");
      await fetchGists();
      setDescription("");
      setFilename("gistfile.txt");
      setCode("");
      setShowCreateForm(false); // Hide the form after creation
    } catch (err) {
      alert(err.message);
    }
  };

  const deleteGist = async (gistId) => {
    if (!confirm("Are you sure you want to delete this gist?")) return;
    try {
      const response = await fetch(`/api/gists/${gistId}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete gist.");
      await fetchGists();
      alert("Gist deleted successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  const editGist = async (gistId) => {
    try {
      const response = await fetch(`/api/gists/${gistId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: editDescription,
          filename: editFilename,
          code: editCode,
        }),
      });
  
      if (!response.ok) throw new Error("Failed to update gist.");
      await fetchGists(); // Refresh the list of gists
      setEditMode(null); // Exit edit mode after saving
      alert("Gist updated successfully!");
    } catch (err) {
      alert(err.message);
    }
  };
  

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-1">
        <p className="text-red-500 text-lg">
          You need to be logged in to view this page.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white h-[calc(100vh-8rem)] p-4 border-r fixed top-16 left-0 overflow-y-auto">
        <div className="flex items-center mb-8">
          <img
            src={session?.user?.image || "/default-avatar.png"}
            alt="Avatar"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h2 className="font-semibold">
              {session?.user?.name || "Anonymous User"}
            </h2>
            <p className="text-sm text-gray-500">
              {session?.user?.email || "No email available"}
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)} // Toggle the form
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {showCreateForm ? "View Gists" : "Create New Gist"}
        </button>
      </div>

      {/* Main Content */}
      <div className="ml-64 mt-16 mb-16 p-8 overflow-y-auto w-full">
        {showCreateForm ? (
          // Create New Gist Form
          <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Create New Gist</h2>
            <form onSubmit={createGist} className="space-y-4">
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Gist Description"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                  placeholder="Filename"
                  className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Code content..."
                  className="p-2 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Create Gist
              </button>
            </form>
          </div>
        ) : (
          // Gist List
          <>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Gists</h1>
            {loading ? (
              <div className="animate-pulse space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
            ) : error ? (
              <div className="bg-red-50 p-4 rounded-lg text-red-700">{error}</div>
            ) : gists.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No gists found. Create your first one!
              </div>
            ) : (
              <div className="grid gap-4">
                {gists.map((gist) => (
                  <div
                    key={gist.id}
                    className="bg-white rounded-xl shadow-sm p-6"
                  >
                    {/* Gist Details */}
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {gist.description || "Untitled Gist"}
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-500 mb-2">
                        {Object.keys(gist.files)[0]}
                      </div>
                      <pre className="text-sm font-mono text-gray-800 overflow-x-auto">
                        {Object.values(gist.files)[0]?.content ||
                          "No content available"}
                      </pre>
                    </div>
                    <div className="flex space-x-2 mt-4">
  <button
    onClick={() => {
      setEditMode(gist.id);
      setEditDescription(gist.description);
      setEditFilename(Object.keys(gist.files)[0]);
      setEditCode(Object.values(gist.files)[0]?.content || "");
    }}
    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
  >
    Edit
  </button>
  <button
    onClick={() => deleteGist(gist.id)}
    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
  >
    Delete
  </button>
</div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}