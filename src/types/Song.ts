export interface Song {
  id: number;
  title: string;
  artist: string;
  image: string; // 必须是 string，不允许 undefined
  audio: string;
  lyrics?:  string; // 歌词内容
  duration?: number; // 单位：秒，可选属性
}
export interface Playlist {
  id?: number; // 统一为 number 类型
  name: string;
  songs: Song[];
}