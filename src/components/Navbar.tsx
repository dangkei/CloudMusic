import React, { useState, useCallback, useContext } from "react";
import debounce from "lodash.debounce";
import SearchBar from "./SearchBar";
import { usePlayer, Song } from "../contexts/PlayerContext";
import { UserContext } from "../contexts/UserContext";
import { useUser } from "../contexts/UserContext";

export default function Navbar() {

  const { playSong } = usePlayer();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Song[]>([]);

  // 模拟搜索函数（可替换成真实 API）
  const searchSongs = (searchText: string) => {
    if (!searchText.trim()) {
      setResults([]);
      return;
    }

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
      },
      { id: 3, title: "Shape of You", artist: "Ed Sheeran", image: "/images/song3.jpeg", audio: "/audio/song3.mp3" },
      { id: 4, title: "Blinding Lights", artist: "The Weeknd", image: "/images/song4.jpeg", audio: "/audio/song4.mp3" },
      { id: 5, title: "Someone Like You", artist: "Adele", image: "/images/song5.jpeg", audio: "/audio/song5.mp3" },
      { id: 6, title: "Levitating", artist: "Dua Lipa", image: "/images/song6.jpeg", audio: "/audio/song6.mp3" },
      { id: 7, title: "Circles", artist: "Post Malone", image: "/images/song7.jpeg", audio: "/audio/song7.mp3" },
      { id: 8, title: "Stay", artist: "Rihanna", image: "/images/song8.jpeg", audio: "/audio/song8.mp3" },
      { id: 9, title: "Perfect", artist: "Ed Sheeran", image: "/images/song9.jpeg", audio: "/audio/song9.mp3" },
      { id: 10, title: "Dance Monkey", artist: "Tones and I", image: "/images/song10.jpeg", audio: "/audio/song10.mp3" },
    ];

    const filtered = fakeSongs.filter((song) =>
      song.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setResults(filtered);
  };

  // 防抖搜索函数（延迟 500ms 执行）
  const debouncedSearch = useCallback(
    debounce((text: string) => {
      searchSongs(text);
    }, 500),
    []
  );

  // 输入框变化时调用
  const handleChange = (text: string) => {
    setQuery(text);
    debouncedSearch(text); // 触发防抖搜索
  };

  const { user, logout } = useContext(UserContext)!;

  return (
    <div className="flex items-center justify-between p-4 bg-gray-900 relative">
      {/* Logo */}
      <h1 className="text-white text-xl font-bold">SY Music</h1>

      {/* 搜索框 */}
      <div className="w-1/3">
        <SearchBar
          value={query}
          onChange={handleChange}
          onSearch={() => searchSongs(query)} // 按下按钮立即搜索
          placeholder="搜索歌曲..."
        />
      </div>

      {/* 搜索结果下拉 */}
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
      {/* 用户信息和退出按钮 */}
      {user ? (
        <div className="flex items-center gap-4">
          <span>欢迎回来，{user.name}</span>
          <button
            onClick={logout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            退出
          </button>
        </div>
      ) : (
        <span>未登录</span>
      )}
    </div>
  );
}
