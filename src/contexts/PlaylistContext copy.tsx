import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { db, Playlist } from "../db/musicDB";
import { Song } from "../types/Song";

interface PlaylistContextType {
  playlists: Playlist[];
  addPlaylist: (name: string) => void;
  removePlaylist: (id: number) => void;
  addSongToPlaylist: (playlistId: number, song: Song) => void;
  removeSongFromPlaylist: (playlistId: number, songId: number) => void;
  exportPlaylists: () => void; // ✅ 新增
  importPlaylists: (file: File) => void; // ✅ 新增
}

// 创建一个上下文
// 用于管理歌单相关的状态和操作
const PlaylistContext = createContext<PlaylistContextType | undefined>(
  undefined
);

// 创建一个 Provider 组件
// 用于包裹应用的根组件
export const PlaylistProvider = ({ children }: { children: ReactNode }) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([
    // 可以给一个默认歌单
    {
      id: Date.now(),
      name: "默认歌单",
      songs: [],
    },
  ]);

  // ✅ 页面加载时，从 localStorage 读取
  useEffect(() => {
    const stored = localStorage.getItem("playlists");
    if (stored) {
      setPlaylists(JSON.parse(stored));
    }
  }, []);

  // ✅ 每次 playlists 改变时保存到 localStorage
  useEffect(() => {
    localStorage.setItem("playlists", JSON.stringify(playlists));
  }, [playlists]);

  // ✅ 创建新歌单
  const addPlaylist = (name: string) => {
    const newPlaylist: Playlist = {
      id: Date.now(),
      name,
      songs: [],
    };
    setPlaylists((prev) => [...prev, newPlaylist]);
  };

  // ✅ 删除歌单
  const removePlaylist = (id: number) => {
    setPlaylists((prev) => prev.filter((pl) => pl.id !== id));
  };

  // ✅ 向歌单添加歌曲
  const addSongToPlaylist = (playlistId: number, song: Song) => {
    setPlaylists((prev) =>
      prev.map((pl) =>
        pl.id === playlistId
          ? {
              ...pl,
              songs: pl.songs.some((s) => s.id === song.id)
                ? pl.songs // 已存在则不添加
                : [...pl.songs, song],
            }
          : pl
      )
    );
  };

  // ✅ 从歌单移除歌曲
  const removeSongFromPlaylist = (playlistId: number, songId: number) => {
    setPlaylists((prev) =>
      prev.map((pl) =>
        pl.id === playlistId
          ? { ...pl, songs: pl.songs.filter((s) => s.id !== songId) }
          : pl
      )
    );
  };

  // ✅ 导出歌单为 JSON 文件
  const exportPlaylists = () => {
    const data = JSON.stringify(playlists, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "playlists.json";
    a.click();

    URL.revokeObjectURL(url);
  };

  // ✅ 从 JSON 文件导入歌单
  const importPlaylists = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        if (Array.isArray(imported)) {
          setPlaylists(imported);
          localStorage.setItem("playlists", JSON.stringify(imported));
          alert("歌单导入成功！");
        } else {
          alert("文件格式不正确");
        }
      } catch {
        alert("导入失败，JSON 格式有误");
      }
    };
    reader.readAsText(file);
  };

  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        addPlaylist,
        removePlaylist,
        addSongToPlaylist,
        removeSongFromPlaylist,
        exportPlaylists,
        importPlaylists,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

// ✅ 自定义 Hook
export const usePlaylists = () => {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error("usePlaylists must be used within PlaylistProvider");
  }
  return context;
};
