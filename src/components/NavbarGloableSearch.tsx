import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { usePlayer, Song } from "../contexts/PlayerContext";

export default function Navbar() {
  const { playSong } = usePlayer();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Song[]>([]);

  const handleSearch = () => {
    // 这里替换成真实 API
    const fakeSongs: Song[] = [
      {
        id: 1,
        title: "Believer",
        artist: "Imagine Dragons",
        image: "/images/song1.jpeg",
        audio: "/audio/song1.mp3"
      },
      {
        id: 2,
        title: "Counting Stars",
        artist: "OneRepublic",
        image: "/images/song2.jpeg",
        audio: "/audio/song2.mp3"
      }
    ];
    const filtered = fakeSongs.filter((song) =>
      song.title.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-900">
      {/* Logo */}
      <h1 className="text-white text-xl font-bold">My Music App</h1>

      {/* 全局搜索框 */}
      <div className="w-1/3">
        <SearchBar
          value={query}
          onChange={setQuery}
          onSearch={handleSearch}
          placeholder="搜索歌曲..."
        />
      </div>

      {/* 如果有搜索结果，就显示一个下拉列表 */}
      {results.length > 0 && (
        <div className="absolute top-16 right-8 w-80 bg-gray-800 rounded-lg shadow-lg p-4 z-50">
          <h3 className="text-white text-sm mb-2">搜索结果</h3>
          <ul>
            {results.map((song) => (
              <li
                key={song.id}
                className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded cursor-pointer"
                onClick={() => playSong(song, results)}
              >
                <img src={song.image} alt={song.title} className="w-10 h-10 rounded" />
                <div>
                  <p className="text-white text-sm">{song.title}</p>
                  <p className="text-gray-400 text-xs">{song.artist}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
