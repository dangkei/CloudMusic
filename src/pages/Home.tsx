import React from 'react'
import SongCard from '../components/SongCard'
import { usePlayer } from "../contexts/PlayerContext";
import { Song } from "../contexts/PlayerContext";


const Home = () => {
  const baseUrl = import.meta.env.BASE_URL;
    const { playSong } = usePlayer();
    const songs = [
    { id: 1, title: "Lost Stars", artist: "Adam Levine", image: "images/song1.jpeg", audio: "audio/song2.mp3" },
    { id: 2, title: "Blinding Lights", artist: "The Weeknd", image: "images/COVER2.jpeg", audio: "audio/song1.mp3" },
    { id: 3, title: "Shape of You", artist: "Ed Sheeran", image: "images/COVER3.jpeg", audio: "audio/song3.mp3" },
    { id: 4, title: "Someone Like You", artist: "Adele", image: "images/COVER4.jpeg", audio: "audio/song4.mp3" },
    { id: 5, title: "Levitating", artist: "Dua Lipa", image: "images/COVER3.jpeg", audio: "audio/song5.mp3" },
    { id: 6, title: "Circles", artist: "Post Malone", image: "images/COVER2.jpeg", audio: "audio/song6.mp3" },
    { id: 7, title: "Stay", artist: "Rihanna", image: "images/COVER1.jpeg", audio: "audio/song7.mp3" },
    { id: 8, title: "Perfect", artist: "Ed Sheeran", image: "images/COVER4.jpeg", audio: "audio/song2.mp3" },
    { id: 9, title: "Dance Monkey", artist: "Tones and I", image: "images/song5.jpeg", audio: "audio/song1.mp3" },
  ];

   
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">今日推荐</h2>
      <div className="grid grid-cols-3 gap-6">
        {songs.map((song, i) => (
           <SongCard
          key={i}
          song={song}
          onClick={() => playSong(song, songs)}
        />     
        ))}
      </div>
    </section>
  );
}

export default Home