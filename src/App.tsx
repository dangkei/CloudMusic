import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Playlist from "./pages/Playlist";
import SongDetails from "./pages/SongDetails";
import PlayerBar from "./components/PlayerBar";
import { PlayerProvider } from "./contexts/PlayerContext";
import { PlaylistProvider } from "./contexts/PlaylistContext";
import LoginPage from "./pages/Login";
import Settings from "./pages/Settings";
import { UserProvider } from "./contexts/UserContext";
import { i } from "framer-motion/client";
import PlaylistDetails from "./pages/PlaylistDetails";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";

export default function App() {
  return (
    <UserProvider>
      {/* 使用 PlayerProvider 包裹 App 组件 */}
      <PlayerProvider>
        {/* AdminAuthProvider 放在全局，使 /admin 路由可用 */}
        <AdminAuthProvider>
          <PlaylistProvider>
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
                      <Route
                        path="/playlist/:id"
                        element={<PlaylistDetails />}
                      />
                      <Route path="/song/:id" element={<SongDetails />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/settings" element={<Settings />} />{" "}
                      {/* Admin */}
                      <Route path="/admin/login" element={<AdminLogin />} />
                      <Route
                        path="/admin"
                        element={
                          <ProtectedRoute>
                            <AdminDashboard />
                          </ProtectedRoute>
                        }
                      />
                    </Routes>
                  </main>
                </div>
              </div>
              <PlayerBar />
            </div>
          </PlaylistProvider>
        </AdminAuthProvider>
      </PlayerProvider>
    </UserProvider>
  );
}
