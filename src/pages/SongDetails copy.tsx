// src/pages/SongDetails.tsx
import React from "react";
import { useParams, Link } from "react-router-dom";

const mockSongs = [
  {
    id: "1",
    title: "Shape of You",
    artist: "Ed Sheeran",
    image: "/images/song1.jpeg",
    lyrics: "The club isn't the best place to find a lover...",
  },
  {
    id: "2",
    title: "Blinding Lights",
    artist: "The Weeknd",
    image: "/images/song2.jpeg",
    lyrics: "I've been tryna call, I've been on my own for long enough...",
  },
  {
    id: "3",
    title: "Levitating",
    artist: "Dua Lipa",
    image: "/images/song3.jpeg",
    lyrics: "If you wanna run away with me, I know a galaxy...",
  },
];

export default function SongDetailsCopy() {
  const { id } = useParams<{ id: string }>();
  const song = mockSongs.find((s) => s.id === id);

  if (!song) {
    return <p className="text-red-500">歌曲不存在</p>;
  }

  return (
    <div>
      <Link to="/playlist" className="text-green-400 hover:underline mb-4 block">
        ← 返回歌单
      </Link>
      <div className="flex items-center mb-8">
        <img
          src={song.image}
          alt={song.title}
          className="w-48 h-48 object-cover rounded-lg shadow-lg mr-6"
        />
        <div>
          <h1 className="text-3xl font-bold">{song.title}</h1>
          <p className="text-gray-400">{song.artist}</p>
          <button className="mt-4 px-4 py-2 bg-green-500 rounded-lg hover:bg-green-400 transition">
            ▶ 播放
          </button>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">歌词</h2>
        <p className="whitespace-pre-line text-gray-300">{song.lyrics}</p>
      </div>
    </div>
  );
}
