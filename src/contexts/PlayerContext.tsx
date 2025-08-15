import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  ReactNode,
} from "react";

import { Song } from "../types/Song";

type PlayMode = "loop" | "single" | "shuffle";

interface PlayerContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  playlist: Song[];
  currentIndex: number;
  playSong: (song: Song, playlist?: Song[]) => void;
  pauseSong: () => void;
  resumeSong: () => void;
  nextSong: () => void;
  prevSong: () => void;
  togglePlayMode: () => void;
  playMode: PlayMode;
  setPlayMode: (mode: PlayMode) => void;

  // 进度条
  currentTime: number;
  duration: number;
  seekTo: (time: number) => void;

  // 音量控制
  volume: number;
  isMuted: boolean;
  setVolume: (value: number) => void;
  toggleMute: () => void;

  // audio ref
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const [playMode, setPlayMode] = useState<PlayMode>("loop");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentSong = playlist[currentIndex] || null;

  const playSong = (song: Song, list?: Song[]) => {
    if (list && list.length > 0) {
      setPlaylist(list);
      const index = list.findIndex((s) => s.id === song.id);
      setCurrentIndex(index >= 0 ? index : 0);
    } else {
      setPlaylist([song]);
      setCurrentIndex(0);
    }
    setIsPlaying(true);
  };

  const pauseSong = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const resumeSong = () => {
    if (currentSong) {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  const nextSong = () => {
    if (playlist.length === 0) return;

    if (playMode === "shuffle") {
      const randomIndex = Math.floor(Math.random() * playlist.length);
      setCurrentIndex(randomIndex);
    } else {
      setCurrentIndex((prev) => (prev + 1) % playlist.length);
    }
    setIsPlaying(true);
  };

  const prevSong = () => {
    if (playlist.length === 0) return;

    if (playMode === "shuffle") {
      const randomIndex = Math.floor(Math.random() * playlist.length);
      setCurrentIndex(randomIndex);
    } else {
      setCurrentIndex((prev) => (prev === 0 ? playlist.length - 1 : prev - 1));
    }
    setIsPlaying(true);
  };

  const togglePlayMode = () => {
    setPlayMode((prev) =>
      prev === "loop" ? "single" : prev === "single" ? "shuffle" : "loop"
    );
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  // 播放事件监听
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);
    const handleEnded = () => {
      if (playMode === "single") {
        seekTo(0);
        resumeSong();
      } else {
        nextSong();
      }
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [playMode, playlist]);

  // 播放或暂停时操作 audio
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentIndex]);

  // 音量控制
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        playlist,
        currentIndex,
        playSong,
        pauseSong,
        resumeSong,
        nextSong,
        prevSong,
        togglePlayMode,
        playMode,
        setPlayMode,
        currentTime,
        duration,
        seekTo,
        volume,
        isMuted,
        setVolume,
        toggleMute,
        audioRef,
      }}
    >
      {children}
      <audio ref={audioRef} src={currentSong?.audio} />
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer 必须在 PlayerProvider 内使用");
  }
  return context;
};
