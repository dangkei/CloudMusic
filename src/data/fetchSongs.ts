// src/data/fetchSongs.ts
export async function fetchSongs() {
  const res = await fetch("https://pub-4224473e360b4613b8662ff55888fa67.r2.dev/songs.json");
  if (!res.ok) throw new Error("Failed to fetch songs.json");
  return res.json();
}
