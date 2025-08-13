import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from "react-icons/fa";
import { usePlayer } from "../contexts/PlayerContext";

interface Song {
  id: number;
  title: string;
  artist: string;
  image: string;
  audio: string; // 音频路径
}

const mockSongs: Song[] = [
  {
    id: 1,
    title: "Shape of You",
    artist: "Ed Sheeran",
    image: "/images/song1.jpeg",
    audio: "/audio/song1.mp3",
  },
  {
    id: 2,
    title: "Blinding Lights",
    artist: "The Weeknd",
    image: "/images/song2.jpeg",
    audio: "/audio/song2.mp3",
  },
  {
    id: 3,
    title: "Levitating",
    artist: "Dua Lipa",
    image: "/images/song3.jpeg",
    audio: "/audio/song3.mp3",
  },
];

export default function PlayerBarCopy() {

    
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentSong = mockSongs[currentIndex];

  // 切换播放/暂停
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // 上一首
  const prevSong = () => {
    setCurrentIndex((prev) => (prev === 0 ? mockSongs.length - 1 : prev - 1));
    setIsPlaying(false);
  };

  // 下一首
  const nextSong = () => {
    setCurrentIndex((prev) => (prev === mockSongs.length - 1 ? 0 : prev + 1));
    setIsPlaying(false);
  };

  // 更新时间进度条
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progressPercent =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progressPercent);
    }
  };

  // 当歌曲切换时自动播放
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentIndex]);


  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white flex items-center justify-between p-4 border-t border-gray-800">
      {/* 歌曲信息 */}
      <div className="flex items-center space-x-4">
        <img
          src={currentSong.image}
          alt={currentSong.title}
          className="w-12 h-12 object-cover rounded"
        />
        <div>
          <h4 className="text-sm font-bold">{currentSong.title}</h4>
          <p className="text-xs text-gray-400">{currentSong.artist}</p>
        </div>
      </div>

      {/* 控制按钮 */}
      <div className="flex items-center space-x-4">
        <button onClick={prevSong}>
          <FaStepBackward />
        </button>
        <button
          onClick={togglePlay}
          className="p-2 bg-green-500 rounded-full hover:bg-green-400 transition"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button onClick={nextSong}>
          <FaStepForward />
        </button>
      </div>

      {/* 进度条 */}
      <div className="flex-1 mx-4">
        <div className="w-full bg-gray-700 h-1 rounded">
          <div
            className="bg-green-500 h-1 rounded"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 隐藏的 audio 元素 */}
      <audio
        ref={audioRef}
        src={currentSong.audio}
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextSong}
      />
    </div>
  );
}
