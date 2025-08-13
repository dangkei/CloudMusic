import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Playlist from "./pages/Playlist";
import SongDetails from "./pages/SongDetails";
import PlayerBar from "./components/PlayerBar";
import { PlayerProvider } from "./contexts/PlayerContext";
import LoginPage from "./pages/LoginPage";

export default function App() {
  return (
<PlayerProvider>
      <div className="flex h-screen flex-col">
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Navbar />
            <main className="flex-1 overflow-auto p-6">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/playlist" element={<Playlist />} />
                <Route path="/song/:id" element={<SongDetails />} />
                <Route path="/login" element={<LoginPage />} />
              </Routes>
            </main>
          </div>
        </div>
        <PlayerBar />
      </div>
    </PlayerProvider>
  );
}
