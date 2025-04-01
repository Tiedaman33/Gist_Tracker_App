export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { description, filename, code } = req.body;

      if (!description || !filename || !code) {
        return res.status(400).json({ error: "All fields are required." });
      }

      const response = await fetch(`${process.env.GITHUB_API_URL}/gists`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description,
          public: true,
          files: {
            [filename]: { content: code },
          },
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        return res.status(response.status).json({ error: error.message || response.statusText });
      }

      const gist = await response.json();
      return res.status(201).json(gist);
    } catch (error) {
      console.error("POST Error details:", error);
      return res.status(500).json({ error: error.message || "Internal server error." });
    }
  } else if (req.method === "GET") {
    try {
      const { username, page = 1 } = req.query;

      if (!username) {
        return res.status(400).json({ error: "Username is required." });
      }

      const response = await fetch(`https://api.github.com/users/${username}/gists?page=${page}`, {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      });

      if (!response.ok) {
        return res.status(response.status).json({ error: "Failed to fetch gists." });
      }

      const gists = await response.json();
      return res.status(200).json(gists);
    } catch (error) {
      console.error("GET Error details:", error);
      return res.status(500).json({ error: error.message || "Internal server error." });
    }
    //patch method
  } else if (req.method === "PATCH") {
    try {
      const {description, filename, code } = req.body;

      if (!description || !filename || !code) {
        return res.status(400).json({ error: "All fields are required." });
      }

      const response = await fetch(`${process.env.GITHUB_API_URL}/gists/${gistId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description,
          files: {
            [filename]: { content: code },
          },
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        return res.status(response.status).json({ error: error.message || "Failed to update gist." });
      }

      const updatedGist = await response.json();
      return res.status(200).json(updatedGist);
    } catch (error) {
      console.error("PATCH Error details:", error);
      return res.status(500).json({ error: error.message || "Internal server error." });
    }
  //delete method
  } else if (req.method === "DELETE") {
    try {
      const { gistId } = req.body;

      if (!gistId) {
        return res.status(400).json({ error: "Gist ID is required." });
      }

      const response = await fetch(`${process.env.GITHUB_API_URL}/gists/${gistId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return res.status(response.status).json({ error: error.message || "Failed to delete gist." });
      }

      return res.status(204).end(); // No content
    } catch (error) {
      console.error("DELETE Error details:", error);
      return res.status(500).json({ error: error.message || "Internal server error." });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed. Use GET, POST, PATCH, or DELETE." });
  }
}
