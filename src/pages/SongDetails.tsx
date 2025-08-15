import { useParams } from "react-router-dom";
import { usePlaylists } from "../contexts/PlaylistContext";
import { usePlayer } from "../contexts/PlayerContext";
import songs from "../data/songs"; // 你的歌曲数据

export default function SongDetails() {
  const { id } = useParams();
  const song = songs.find((s) => s.id === Number(id));
  const { playlists, addSongToPlaylist } = usePlaylists();
  const { playSong } = usePlayer();

  if (!song) return <p>歌曲不存在</p>;

  const handleAddToPlaylist = async (playlistId: number) => {
    await addSongToPlaylist(playlistId, song);
    alert(`✅ 已将《${song.title}》加入歌单`);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto text-white">
      {/* 封面图 */}
      <div className="flex flex-col items-center">
        <img
          src={song.image}
          alt={song.title}
          className="w-56 h-56 rounded-lg shadow-lg object-cover"
        />
        <h2 className="text-3xl font-bold mt-4">{song.title}</h2>
        <p className="text-gray-400 text-lg">{song.artist}</p>
      </div>

      {/* 操作按钮 */}
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <button
          className="bg-green-500 hover:bg-green-600 px-6 py-2 text-white font-medium rounded-full shadow-md transition"
          onClick={() => playSong(song, [song])}
        >
          ▶ 播放
        </button>

        <button
          className="bg-indigo-500 hover:bg-indigo-600 px-6 py-2 text-white font-medium rounded-full shadow-md transition"
          onClick={() => {
            const targetPlaylist = playlists[0]; // 默认加第一个
            if (targetPlaylist) {
              addSongToPlaylist(targetPlaylist.id, song);
              alert(`已加入到歌单：${targetPlaylist.name}`);
            }
          }}
        >
          ➕ 加入歌单
        </button>
      </div>

      {/* 歌单选择下拉 */}
      <div className="mt-4 flex justify-center">
        <select
          onChange={(e) => addSongToPlaylist(Number(e.target.value), song)}
          className="bg-gray-800 border border-gray-700 px-4 py-2 rounded-full shadow-sm text-white focus:ring-2 focus:ring-indigo-400"
        >
          <option className="bg-gray-800">选择歌单</option>
          {playlists.map((pl) => (
            <option key={pl.id} value={pl.id} className="bg-gray-800">
              {pl.name}
            </option>
          ))}
        </select>
      </div>

      <div className="relative">
        <select
          onChange={(e) => {
            if (e.target.value) {
              handleAddToPlaylist(Number(e.target.value));
            }
          }}
          className="bg-gray-700 border border-gray-600 text-white px-4 py-2 rounded-full appearance-none focus:outline-none"
        >
          <option value="">➕ 加入歌单</option>
          {playlists.map((pl) => (
            <option key={pl.id} value={pl.id}>
              {pl.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-8 p-4 bg-gray-800 rounded-lg h-64 overflow-y-auto shadow-inner">
        <p className="text-center text-gray-400">🎵 歌词将在这里滚动显示...</p>
      </div>

      {/* 滚动歌词区域占位 */}
      <div className="mt-8 bg-gray-900 rounded-lg shadow-inner p-4 h-48 overflow-y-auto text-center text-gray-400">
        <p className="italic">
          🎵 滚动歌词显示区域（后续可替换为动态歌词组件） 🎵
        </p>
      </div>
    </div>
  );
}
