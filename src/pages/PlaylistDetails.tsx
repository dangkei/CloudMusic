// src/pages/PlaylistDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePlaylists } from "../contexts/PlaylistContext";
import { usePlayer } from "../contexts/PlayerContext";
import { db } from "../db/musicDB";

export default function PlaylistDetail() {
  const { id } = useParams();
  const { playlists, removeSongFromPlaylist } = usePlaylists();
  const { playSong } = usePlayer();

  //
  const playlist = playlists.find((pl) => pl.id === Number(id));

  if (!playlist) {
    return <div>歌单不存在</div>;
  }

  const [durations, setDurations] = useState<{ [key: number]: number }>({});

  // 页面加载时，获取每首歌的时长
  // 优先从 IndexedDB 获取，如果没有则加载音频获取
  useEffect(() => {
    if (playlist) {
      playlist.songs.forEach(async (song) => {
        // 先查数据库
        const dbSong = await db.songs.get(song.id);
        if (dbSong?.duration) {
          setDurations((prev) => ({
            ...prev,
            [song.id]: dbSong.duration!,
          }));
        } else {
          // 没有缓存，加载音频获取
          const audio = new Audio(song.audio);
          audio.onloadedmetadata = async () => {
            const duration = audio.duration;
            setDurations((prev) => ({
              ...prev,
              [song.id]: duration,
            }));
            // 更新到 IndexedDB
            await db.songs.put({
              ...song,
              duration,
            });
          };
        }
      });
    }
  }, [playlist]);

  // 点击播放所有歌曲
  const handlePlayAll = () => {
    if (playlist.songs.length > 0) {
      playSong(playlist.songs[0], playlist.songs);
    }
  };

  //格式化时长
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };
  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">{playlist.name}</h1>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-600 text-gray-300">
            <th className="py-2 px-4">歌曲名</th>
            <th className="py-2 px-4">演唱者</th>
            <th className="py-2 px-4">时长</th>
          </tr>
        </thead>
        <tbody>
          {playlist.songs.map((song) => (
            <tr
              key={song.id}
              className="hover:bg-gray-800 cursor-pointer"
              onClick={() => playSong(song, playlist.songs)}
            >
              <td className="py-2 px-4">{song.title}</td>
              <td className="py-2 px-4">{song.artist}</td>
              <td className="p-3">{formatTime(durations[song.id])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
