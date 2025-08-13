import React, { createContext, useContext, useState, useRef } from "react";

export interface Song {
  id: number;
  title: string;
  artist: string;
  image: string;
  audio: string;
}

interface PlayerContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  progress: number;
  playSong: (song: Song) => void;
  togglePlay: () => void;
  nextSong: () => void;
  prevSong: () => void;
  setSongList: (songs: Song[]) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [songList, setSongListState] = useState<Song[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSong = (song: Song) => {
    setCurrentSong(song);
    const index = songList.findIndex((s) => s.id === song.id);
    if (index >= 0) setCurrentIndex(index);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    if (songList.length === 0) return;
    const nextIndex = (currentIndex + 1) % songList.length;
    setCurrentIndex(nextIndex);
    setCurrentSong(songList[nextIndex]);
    setIsPlaying(true);
  };

  const prevSong = () => {
    if (songList.length === 0) return;
    const prevIndex = (currentIndex - 1 + songList.length) % songList.length;
    setCurrentIndex(prevIndex);
    setCurrentSong(songList[prevIndex]);
    setIsPlaying(true);
  };

  const setSongList = (songs: Song[]) => {
    setSongListState(songs);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progressPercent =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progressPercent);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        progress,
        playSong,
        togglePlay,
        nextSong,
        prevSong,
        setSongList,
      }}
    >
      {children}
      <audio
        ref={audioRef}
        src={currentSong?.audio || ""}
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextSong}
        autoPlay={isPlaying}
      />
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within PlayerProvider");
  }
  return context;
};
