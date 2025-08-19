import Dexie, { Table } from "dexie";

export interface Song {
  id: number;
  title: string;
  artist: string;
  image: string;
  audio: string;
  duration?: number; // 单位：秒
}

export interface Playlist {
  id: number;
  name: string;
  songs: Song[];
}
class MusicDB extends Dexie {
  songs!: Dexie.Table<Song, number>;
  playlists!: Dexie.Table<Playlist, number>;

  constructor() {
    super("MusicDB");
    this.version(2).stores({
      songs: "id, title, artist, duration", // 新增 duration
      playlists: "id, name"
    });
  }
}

export const db = new MusicDB();
