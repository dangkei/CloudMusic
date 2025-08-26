import React, { useEffect, useMemo, useState } from "react";
import { useAdminAuth } from "../../contexts/AdminAuthContext";
import UploadSongForm from "../../components/admin/UploadSongForm";

type Song = {
  id: number;
  title: string;
  artist: string;
  duration?: number;
  audio: string;
  image?: string;
  lyrics?: string; // URL 或内容
};

const AdminDashboard: React.FC = () => {
  const { admin, logout } = useAdminAuth();
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  const songsUrl = import.meta.env.VITE_SONGS_URL; // e.g. https://pub-xxxxxx.r2.dev/songs.json

  useEffect(() => {
    (async () => {
      try {
        if (!songsUrl) throw new Error("Missing VITE_SONGS_URL");
        const res = await fetch(songsUrl, { cache: "no-store" });
        const data = await res.json();
        setSongs(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [songsUrl]);

  const nextId = useMemo(
    () => (songs.length ? Math.max(...songs.map((s) => s.id)) + 1 : 1),
    [songs]
  );

  return (
    <div className="min-h-screen bg-[#0b0f14] text-white">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-300">{admin?.email}</span>
            <button
              onClick={logout}
              className="px-3 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-sm"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid gap-6">
          <section className="bg-[#0f1620] rounded-2xl p-4">
            <h2 className="text-lg font-medium mb-3">Upload New Song</h2>
            <UploadSongForm
              nextId={nextId}
              onPrepared={(payload) => {
                console.log("Prepared payload:", payload);
                alert(
                  "已在控制台输出待上传的元数据。接下来接入后端 API 完成实际上传。"
                );
              }}
            />
          </section>

          <section className="bg-[#0f1620] rounded-2xl p-4">
            <h2 className="text-lg font-medium mb-3">Songs</h2>
            {loading ? (
              <div className="text-sm text-gray-400">Loading songs…</div>
            ) : (
              <div className="overflow-auto rounded-lg border border-gray-800">
                <table className="min-w-full text-sm">
                  <thead className="bg-[#0b1018] text-gray-300">
                    <tr>
                      <th className="text-left px-4 py-2">ID</th>
                      <th className="text-left px-4 py-2">Title</th>
                      <th className="text-left px-4 py-2">Artist</th>
                      <th className="text-left px-4 py-2">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {songs.map((s) => (
                      <tr key={s.id} className="border-t border-gray-800">
                        <td className="px-4 py-2 text-gray-400">{s.id}</td>
                        <td className="px-4 py-2">{s.title}</td>
                        <td className="px-4 py-2 text-gray-300">{s.artist}</td>
                        <td className="px-4 py-2 text-gray-400">
                          {s.duration
                            ? `${Math.floor(s.duration / 60)}:${(
                                s.duration % 60
                              )
                                .toString()
                                .padStart(2, "0")}`
                            : "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <p className="text-xs text-gray-500 mt-2">
              数据源：<code>VITE_SONGS_URL</code>（R2 公网的 songs.json）
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
