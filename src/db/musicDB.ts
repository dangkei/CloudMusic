import Dexie, { Table } from "dexie";

export interface Song {
  id: number;
  title: string;
  artist: string;
  image: string;
  audio: string;
}

export interface Playlist {
  id: number;
  name: string;
  songs: Song[];
}

class MusicDB extends Dexie {
  playlists!: Table<Playlist, number>;

  constructor() {
    super("musicDB");
    this.version(1).stores({
      playlists: "++id,name" // 主键自增
    });
  }
}

export const db = new MusicDB();
