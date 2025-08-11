import React from "react";
import SongCard from "../components/SongCard";
import { usePlayer, Song } from "../context/PlayerContext";

const playlistSongs: Song[] = [
  { id: 1, title: "Blinding Lights", artist: "The Weeknd", image: "/images/song1.jpeg", audio: "/audio/song1.mp3" },
  { id: 2, title: "Shape of You", artist: "Ed Sheeran", image: "/images/song2.jpeg", audio: "/audio/song2.mp3" },
  { id: 3, title: "Someone Like You", artist: "Adele", image: "/images/song3.jpeg", audio: "/audio/song3.mp3" },
  { id: 4, title: "Levitating", artist: "Dua Lipa", image: "/images/song4.jpeg", audio: "/audio/song4.mp3" },
  { id: 5, title: "Circles", artist: "Post Malone", image: "/images/song5.jpeg", audio: "/audio/song5.mp3" },
];

export default function Playlist() {
  const { playSong } = usePlayer();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">我的歌单</h1>
      <button
        onClick={() => playSong(playlistSongs[0], playlistSongs)}
        className="mb-4 px-4 py-2 bg-green-500 rounded-full"
      >
        ▶ 播放全部
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {playlistSongs.map((song) => (
          <SongCard
            key={song.id}
            song={song}
            onClick={() => playSong(song, playlistSongs)}
          />
        ))}
      </div>
    </div>
  );
}
