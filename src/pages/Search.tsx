import React, { useState } from "react";
import SongCard from "../components/SongCard";
import SearchBar from "../components/SearchBar";
import { usePlayer, Song } from "../context/PlayerContext";

export default function Search() {
  const { playSong } = usePlayer();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Song[]>([]);

  const handleSearch = () => {
    const fakeSongs: Song[] = [
      {
        id: 1,
        title: "Believer",
        artist: "Imagine Dragons",
        image: "images/song1.jpeg",
        audio: "audio/song1.mp3"
      },
      {
        id: 2,
        title: "Counting Stars",
        artist: "OneRepublic",
        image: "images/song2.jpeg",
        audio: "audio/song2.mp3"   
      },
      {
        id: 3,
        title: "Shape of You",
        artist: "Ed Sheeran", 
        image: "images/song3.jpeg",
        audio: "audio/song3.mp3"
      },
      {
        id: 4,
        title: "Blinding Lights", 
        artist: "The Weeknd",
        image: "images/song4.jpeg",
        audio: "audio/song4.mp3"}
    ];
    const filtered = fakeSongs.filter((song) =>
      song.title.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">搜索歌曲</h2>

      {/* 可复用搜索组件 */}
      <div className="mb-6">
        <SearchBar
          value={query}
          onChange={setQuery}
          onSearch={handleSearch}
          placeholder="输入歌曲名..."
        />
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {results.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              onClick={() => playSong(song, results)}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-400">暂无搜索结果</p>
      )}
    </section>
  );
}
