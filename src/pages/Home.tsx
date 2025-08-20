import SongCard from "../components/SongCard";
import { usePlayer } from "../contexts/PlayerContext";
import songs from "../data/songs.json"; // 你的歌曲数据

const Home = () => {
  const baseUrl = import.meta.env.BASE_URL;
  const { playSong } = usePlayer();

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">今日推荐</h2>
      <div className="grid grid-cols-3 gap-6">
        {songs.map((song, i) => (
          <SongCard key={i} song={song} onClick={() => playSong(song, songs)} />
        ))}
      </div>
    </section>
  );
};

export default Home;
