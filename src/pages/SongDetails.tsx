import React from "react";
import { useParams } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext";

// 假数据（你之后可以替换成 API 数据）
const songData = [
  {
    id: 1,
    title: "Blinding Lights",
    artist: "The Weeknd",
    image: "/images/song3.jpeg",
    audio: "/audio/song1.mp3",
    album: "After Hours",
    year: 2020,
    description:
      "《Blinding Lights》是一首由加拿大歌手The Weeknd演唱的流行合成器曲风单曲，2020年发行。歌曲融合了80年代复古电子音色与现代流行元素，是全球爆款单曲之一。",
  },
  {
    id: 2,
    title: "Shape of You",
    artist: "Ed Sheeran",
    image: "/images/song1.jpeg",
    audio: "/audio/song3.mp3",
    album: "÷ (Divide)",
    year: 2017,
    description:
      "《Shape of You》是英国歌手艾德·希兰的代表作之一，融合流行与热带浩室风格，旋律轻快，歌词描绘恋爱中的甜蜜与亲密感。",
  },
];

export default function SongDetails() {
  const { id } = useParams();
  const { playSong } = usePlayer();

  const song = songData.find((s) => s.id === Number(id));

  if (!song) {
    return <p className="text-white">未找到歌曲信息</p>;
  }

  return (
    <div className="text-white max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row items-center md:items-start space-x-0 md:space-x-6">
        <img
          src={song.image}
          alt={song.title}
          className="w-64 h-64 object-cover rounded-lg shadow-lg"
        />
        <div className="mt-4 md:mt-0">
          <h1 className="text-3xl font-bold">{song.title}</h1>
          <p className="text-lg text-gray-400">{song.artist}</p>
          <p className="mt-2 text-sm text-gray-400">
            专辑：{song.album} · {song.year}
          </p>
          <button
            onClick={() => playSong(song)}
            className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-400 rounded-full font-semibold"
          >
            ▶ 播放
          </button>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">歌曲简介</h2>
        <p className="text-gray-300 leading-relaxed">{song.description}</p>
      </div>
    </div>
  );
}
