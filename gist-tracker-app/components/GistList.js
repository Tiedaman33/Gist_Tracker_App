"use client";

import { useEffect, useState } from "react";
import GistCard from "./GistCard";

export default function GistList() {
  const [gists, setGists] = useState([]);

  const fetchGists = async () => {
    const response = await fetch("/api/gists");
    const data = await response.json();
    setGists(data);
  };

  useEffect(() => {
    fetchGists();
  }, []);

  return (
    <div>
      {gists.map((gist) => (
        <GistCard key={gist.id} gist={gist} />
      ))}
    </div>
  );
}