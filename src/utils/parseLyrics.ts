export interface LyricLine {
  time: number; // 秒
  text: string;
}

export function parseLyrics(lrc: string): LyricLine[] {
  const lines = lrc.split("\n");
  const result: LyricLine[] = [];

  for (let line of lines) {
    const match = line.match(/\[(\d{2}):(\d{2}\.\d{2})\](.*)/);
    if (match) {
      const minutes = parseInt(match[1]);
      const seconds = parseFloat(match[2]);
      const text = match[3].trim();
      result.push({ time: minutes * 60 + seconds, text });
    }
  }

  return result;
}
