import React, { createContext, useContext, useState, ReactNode } from "react";

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
  playlist: Song[];
  currentIndex: number;
  playSong: (song: Song, playlist?: Song[]) => void;
  pauseSong: () => void;
  resumeSong: () => void;
  nextSong: () => void;
  prevSong: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentSong = playlist[currentIndex] || null;

  const playSong = (song: Song, list?: Song[]) => {
    if (list && list.length > 0) {
      setPlaylist(list);
      const index = list.findIndex((s) => s.id === song.id);
      setCurrentIndex(index >= 0 ? index : 0);
    } else {
      // 如果没传 playlist，就只播放单曲
      setPlaylist([song]);
      setCurrentIndex(0);
    }
    setIsPlaying(true);
  };

  const pauseSong = () => {
    setIsPlaying(false);
  };

  const resumeSong = () => {
    if (currentSong) {
      setIsPlaying(true);
    }
  };

  const nextSong = () => {
    if (playlist.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % playlist.length);
      setIsPlaying(true);
    }
  };

  const prevSong = () => {
    if (playlist.length > 0) {
      setCurrentIndex((prev) =>
        prev === 0 ? playlist.length - 1 : prev - 1
      );
      setIsPlaying(true);
    }
  };

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
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};
