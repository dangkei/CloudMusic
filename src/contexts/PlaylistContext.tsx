import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { db, Playlist, Song } from "../db/musicDB";

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
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  // 初始化加载 IndexedDB 数据
  // 从 IndexedDB 加载数据
  useEffect(() => {
    const fetchPlaylists = async () => {
      const data = await db.playlists.toArray();
      setPlaylists(data);
    };
    fetchPlaylists();
  }, []);

  // 添加歌单
  const addPlaylist = async (name: string) => {
    const id = await db.playlists.add({ id: Date.now(), name, songs: [] });
    const newList = await db.playlists.toArray();
    setPlaylists(newList);
  };

  // 删除歌单
  const removePlaylist = async (id: number) => {
    await db.playlists.delete(id);
    const newList = await db.playlists.toArray();
    setPlaylists(newList);
  };

  // 添加歌曲到歌单
  const addSongToPlaylist = async (playlistId: number, song: Song) => {
    const playlist = await db.playlists.get(playlistId);
    if (!playlist) return;

    // 防止重复添加
    if (!playlist.songs.some((s) => s.id === song.id)) {
      playlist.songs.push(song);
      await db.playlists.put(playlist);
      setPlaylists(await db.playlists.toArray());
    }
  };

  // 从歌单移除歌曲
  const removeSongFromPlaylist = async (playlistId: number, songId: number) => {
    const playlist = await db.playlists.get(playlistId);
    if (!playlist) return;

    playlist.songs = playlist.songs.filter((s) => s.id !== songId);
    await db.playlists.put(playlist);
    setPlaylists(await db.playlists.toArray());
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
