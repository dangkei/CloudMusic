// src/pages/PlaylistDetail.tsx
import { useParams } from "react-router-dom";
import { usePlaylists } from "../contexts/PlaylistContext";
import { usePlayer } from "../contexts/PlayerContext";

export default function PlaylistDetail() {
  const { id } = useParams();
  const { playlists, removeSongFromPlaylist } = usePlaylists();
  const { playSong } = usePlayer();

  const playlist = playlists.find((pl) => pl.id === Number(id));

  if (!playlist) {
    return <div>歌单不存在</div>;
  }

  const handlePlayAll = () => {
    if (playlist.songs.length > 0) {
      playSong(playlist.songs[0], playlist.songs);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{playlist.name}</h1>

      {/* 播放全部按钮 */}
      <button
        onClick={handlePlayAll}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded-full"
      >
        ▶ 播放全部
      </button>

      {/* 歌曲列表 */}
      {playlist.songs.length === 0 ? (
        <p>此歌单还没有歌曲</p>
      ) : (
        <ul>
          {playlist.songs.map((song) => (
            <li
              key={song.id}
              className="flex justify-between items-center py-2 border-b"
            >
              <div>
                <p className="font-semibold">{song.title}</p>
                <p className="text-sm text-gray-500">{song.artist}</p>
              </div>
              <button
                onClick={() => removeSongFromPlaylist(playlist.id, song.id)}
                className="text-red-500 hover:text-red-700"
              >
                删除
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
