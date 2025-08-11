import React from "react";
import { Song } from "../context/PlayerContext";

interface SongCardProps {
  song: Song;
  onClick?: () => void;
}

export default function SongCard({ song, onClick }: SongCardProps) {
  return (
    <div
      className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 cursor-pointer"
      onClick={onClick}
    >
      <img
        src={song.image}
        alt={song.title}
        className="w-full h-40 object-cover rounded mb-3"
      />
      <h3 className="text-white font-bold">{song.title}</h3>
      <p className="text-gray-400">{song.artist}</p>
    </div>
  );
}
