import React, { useState, useCallback, useContext } from "react";
import debounce from "lodash.debounce";
import SearchBar from "./SearchBar";
import { usePlayer } from "../contexts/PlayerContext";
import { UserContext } from "../contexts/UserContext";
import { Song } from "../types/Song";
import { Link } from "react-router-dom";

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
        audio: "/audio/song1.mp3",
      },
      {
        id: 2,
        title: "Counting Stars",
        artist: "OneRepublic",
        image: "/images/song2.jpeg",
        audio: "/audio/song2.mp3",
      },
      {
        id: 3,
        title: "Shape of You",
        artist: "Ed Sheeran",
        image: "/images/song3.jpeg",
        audio: "/audio/song3.mp3",
      },
      {
        id: 4,
        title: "Blinding Lights",
        artist: "The Weeknd",
        image: "/images/song4.jpeg",
        audio: "/audio/song4.mp3",
      },
      {
        id: 5,
        title: "Someone Like You",
        artist: "Adele",
        image: "/images/song5.jpeg",
        audio: "/audio/song5.mp3",
      },
      {
        id: 6,
        title: "Levitating",
        artist: "Dua Lipa",
        image: "/images/song6.jpeg",
        audio: "/audio/song6.mp3",
      },
      {
        id: 7,
        title: "Circles",
        artist: "Post Malone",
        image: "/images/song7.jpeg",
        audio: "/audio/song7.mp3",
      },
      {
        id: 8,
        title: "Stay",
        artist: "Rihanna",
        image: "/images/song8.jpeg",
        audio: "/audio/song8.mp3",
      },
      {
        id: 9,
        title: "Perfect",
        artist: "Ed Sheeran",
        image: "/images/song9.jpeg",
        audio: "/audio/song9.mp3",
      },
      {
        id: 10,
        title: "Dance Monkey",
        artist: "Tones and I",
        image: "/images/song10.jpeg",
        audio: "/audio/song10.mp3",
      },
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
  {/* 左侧区域：Logo + 搜索框（向左对齐） */}
  <div className="flex items-center gap-6"> {/* 用 gap 控制 Logo 和搜索框间距 */}
    {/* Logo */}
    <h1 className="text-white text-xl font-bold">SY Music</h1>

    {/* 搜索框 */}
    <div className="w-1/3"> {/* 保持原宽度，相对于父容器 */}
      <SearchBar
        value={query}
        onChange={handleChange}
        onSearch={() => searchSongs(query)}
        placeholder="搜索歌曲..."
      />
    </div>
  </div>

  {/* 搜索结果下拉（位置调整，避免受右侧元素影响） */}
  {results.length > 0 && (
    <div className="absolute top-16 left-[200px] w-80 bg-gray-800 rounded-lg shadow-lg p-4 z-50"> {/* 左偏移量根据 Logo 宽度调整 */}
      <h3 className="text-white text-sm mb-2">搜索结果</h3>
      <ul>
        {results.map((song) => (
          <li
            key={song.id}
            className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded cursor-pointer"
            onClick={() => playSong(song, results)}
          >
            <img
              src={song.image}
              alt={song.title}
              className="w-10 h-10 rounded"
            />
            <div>
              <p className="text-white text-sm">{song.title}</p>
              <p className="text-gray-400 text-xs">{song.artist}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )}

  {/* 右侧区域：用户信息（向右对齐） */}
  <div className="flex items-center gap-4"> {/* 用 gap 控制用户元素间距 */}
    {user ? (
      <>
        <img
          src={user.avatar}
          alt="头像"
          className="w-8 h-8 rounded-full border border-gray-500"
        />
        <span className="text-white">{user.name}</span>
        <button
          onClick={logout}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          退出
        </button>
        <Link
          to="/settings"
          className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600"
        >
          设置
        </Link>
      </>
    ) : (
      <Link
        to="/login"
        className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
      >
        登录
      </Link>
    )}
  </div>
</div>
  );
}
