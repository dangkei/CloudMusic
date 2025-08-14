import React from "react";
import { usePlayer } from "../contexts/PlayerContext";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaRandom,
  FaRedo,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";

const formatTime = (time: number) => {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const PlayBar = () => {
  const {
    currentSong,
    isPlaying,
    pauseSong,
    resumeSong,
    nextSong,
    prevSong,
    playMode,
    togglePlayMode,
    currentTime,
    duration,
    seekTo,
    volume,
    setVolume,
    isMuted,
    toggleMute,
  } = usePlayer();

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-3 flex items-center justify-between">
      {/* 歌曲信息 */}
      <div className="flex items-center space-x-4">
        <img
          src={currentSong.image}
          alt={currentSong.title}
          className="w-12 h-12 object-cover"
        />
        <div>
          <p className="text-sm font-bold">{currentSong.title}</p>
          <p className="text-xs text-gray-400">{currentSong.artist}</p>
        </div>
      </div>

      {/* 控制按钮 */}
      <div className="flex flex-col items-center w-1/3">
        <div className="flex items-center space-x-4">
          <button onClick={togglePlayMode} title="切换播放模式">
            {playMode === "shuffle" ? (
              <FaRandom />
            ) : playMode === "single" ? (
              <FaRedo />
            ) : (
              <span>循环</span>
            )}
          </button>
          <button onClick={prevSong}>
            <FaStepBackward />
          </button>
          {isPlaying ? (
            <button onClick={pauseSong}>
              <FaPause />
            </button>
          ) : (
            <button onClick={resumeSong}>
              <FaPlay />
            </button>
          )}
          <button onClick={nextSong}>
            <FaStepForward />
          </button>
        </div>

        {/* 进度条 */}
        <div className="flex items-center space-x-2 w-full">
          <span className="text-xs">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={currentTime}
            onChange={(e) => seekTo(parseFloat(e.target.value))}
            className="w-full"
          />
          <span className="text-xs">{formatTime(duration)}</span>
        </div>
      </div>

      {/* 音量控制 */}
      <div className="flex items-center space-x-2 w-36">
        <button onClick={toggleMute}>
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={isMuted ? 0 : volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
};

export default PlayBar;
