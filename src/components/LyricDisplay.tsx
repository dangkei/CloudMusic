import React, { useEffect, useState } from "react";
import { parseLyrics, LyricLine } from "../utils/parseLyrics";
import { usePlayer } from "../contexts/PlayerContext";

export default function LyricDisplay({ lyrics }: { lyrics: string }) {
  const { currentSong, audioRef } = usePlayer();
  const [lines, setLines] = useState<LyricLine[]>([]);
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    if (lyrics) {
      setLines(parseLyrics(lyrics));
      setCurrentLine(0);
    }
  }, [lyrics, currentSong?.id]);

  useEffect(() => {
    if (!audioRef.current) return;

    const interval = setInterval(() => {
      const time = audioRef.current!.currentTime;
      let idx = lines.findIndex(
        (line, i) =>
          i < lines.length - 1 && time >= line.time && time < lines[i + 1].time
      );
      if (idx === -1 && time >= lines[lines.length - 1]?.time) {
        idx = lines.length - 1;
      }
      if (idx !== -1 && idx !== currentLine) {
        setCurrentLine(idx);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [lines, audioRef, currentLine]);

  return (
    <div className="mt-6 h-64 overflow-y-auto bg-gray-900 bg-opacity-70 rounded-lg p-4 text-center text-white">
      {lines.map((line, i) => (
        <p
          key={i}
          className={`transition-all ${
            i === currentLine
              ? "text-green-400 text-lg font-bold"
              : "text-gray-400"
          }`}
        >
          {line.text}
        </p>
      ))}
    </div>
  );
}
