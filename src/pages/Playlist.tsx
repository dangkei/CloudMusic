// src/pages/Playlist.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePlaylists } from "../contexts/PlaylistContext";

export default function Playlist() {
  // 使用 usePlaylists 获取歌单相关的上下文
  const {
    playlists,
    addPlaylist,
    removePlaylist,
    exportPlaylists,
    importPlaylists,
  } = usePlaylists();

  //
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const navigate = useNavigate();

  const handleCreate = () => {
    if (newPlaylistName.trim()) {
      addPlaylist(newPlaylistName.trim());
      setNewPlaylistName("");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">我的歌单</h1>

      {/* 创建新歌单 */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
          placeholder="输入歌单名"
          className="flex-2 p-2 bg-gray-800 text-white outline-none"
        />
        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          新建
        </button>
        <button
          onClick={exportPlaylists}
          className="bg-blue-500 px-4 py-2 rounded"
        >
          📤 导出歌单
        </button>

        <label className="bg-yellow-500 px-4 py-2 rounded cursor-pointer">
          📥 导入歌单
          <input
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) importPlaylists(e.target.files[0]);
            }}
          />
        </label>
      </div>

      {/* 歌单列表 */}
      <div className="grid grid-cols-2 gap-4">
        {playlists.map((pl) => (
          <div
            key={pl.id}
            className="border rounded p-4 cursor-pointer hover:bg-gray-100"
            onClick={() => navigate(`/playlist/${pl.id}`)}
          >
            <div className="flex justify-between items-center">
              <h2 className="font-semibold">{pl.name}</h2>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removePlaylist(pl.id);
                }}
                className="text-red-500 hover:text-red-700"
              >
                删除
              </button>
            </div>
            <p className="text-sm text-gray-500">{pl.songs.length} 首歌曲</p>
          </div>
        ))}
      </div>
    </div>
  );
}
