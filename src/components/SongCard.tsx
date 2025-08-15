import { Song } from "../types/Song";
import { useNavigate } from "react-router-dom";

interface SongCardProps {
  song: Song;
  onClick?: () => void;
}

export default function SongCard({ song, onClick }: SongCardProps) {
  const navigate = useNavigate();
  return (
    <div
      className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 cursor-pointer"
      onClick={() => navigate(`/song/${song.id}`)}
    >
      <img
        src={song.image}
        alt={song.title}
        className="w-full h-40 object-cover rounded mb-3"
      />
      <h3 className="text-white font-bold">{song.title}</h3>
      <p className="text-gray-400">{song.artist}</p>
    </div>
  );
}
