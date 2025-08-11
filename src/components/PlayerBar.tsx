import React, { useRef, useEffect, useState } from "react";
import { usePlayer } from "../context/PlayerContext";

export default function PlayerBar() {
  const {
    currentSong,
    isPlaying,
    pauseSong,
    resumeSong,
    nextSong,
    prevSong,
  } = usePlayer();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.src = currentSong.audio;
      audioRef.current.play();
    }
  }, [currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying]);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value);
    }
  };

  return (
    currentSong && (
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={currentSong.image}
            alt={currentSong.title}
            className="w-14 h-14 object-cover rounded"
          />
          <div>
            <h4 className="font-bold">{currentSong.title}</h4>
            <p className="text-sm text-gray-400">{currentSong.artist}</p>
          </div>
        </div>

        {/* 中间：时间 & 进度条 */}
        <div className="flex-1 px-6 flex items-center space-x-2">
          <span className="text-sm">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="w-full"
          />
          <span className="text-sm">{formatTime(duration)}</span>
        </div>

        {/* 播放控制按钮 */}
        <div className="flex items-center space-x-3">
          <button onClick={prevSong} className="px-3 py-2 bg-gray-700 rounded-full">
            ⏮
          </button>
          {isPlaying ? (
            <button
              onClick={pauseSong}
              className="px-4 py-2 bg-green-500 rounded-full"
            >
              ❚❚
            </button>
          ) : (
            <button
              onClick={resumeSong}
              className="px-4 py-2 bg-green-500 rounded-full"
            >
              ▶
            </button>
          )}
          <button onClick={nextSong} className="px-3 py-2 bg-gray-700 rounded-full">
            ⏭
          </button>
        </div>

        {/* 隐藏的 audio 标签 */}
        <audio
          ref={audioRef}
          onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
          onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
          onEnded={nextSong} // 自动播放下一首
        />
      </div>
    )
  );
}
