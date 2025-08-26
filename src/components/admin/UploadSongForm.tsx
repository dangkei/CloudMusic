import React, { useMemo, useState } from "react";

function getAudioDuration(file: File): Promise<number> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const audio = new Audio(url);
    audio.addEventListener("loadedmetadata", () => {
      resolve(Math.floor(audio.duration || 0));
      URL.revokeObjectURL(url);
    });
  });
}

type NewSongForm = {
  id?: number;
  title: string;
  artist: string;
  audio?: File | null;
  image?: File | null;
  lyrics?: File | null;
};

const UploadSongForm: React.FC<{
  nextId?: number;
  onPrepared?: (payload: any) => void;
}> = ({ nextId = 1, onPrepared }) => {
  const [form, setForm] = useState<NewSongForm>({
    id: nextId,
    title: "",
    artist: "",
    audio: null,
    image: null,
    lyrics: null,
  });
  const [duration, setDuration] = useState<number>(0);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string>("");

  const canSubmit = useMemo(
    () => !!form.title && !!form.artist && !!form.audio && !!form.image,
    [form]
  );

  const handleFile = async (key: keyof NewSongForm, file?: File | null) => {
    setForm((s) => ({ ...s, [key]: file || null }));
    if (key === "audio" && file) {
      const d = await getAudioDuration(file);
      setDuration(d);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      setBusy(true);
      setMessage("");

      // ⚠️ 这里只是“准备数据”，真正上传需要后端（Cloudflare Worker）签名/代理。
      const filenameBase = `song${form.id ?? nextId}`;
      const payload = {
        id: form.id ?? nextId,
        title: form.title,
        artist: form.artist,
        duration,
        // 下面 URL 需由后端根据你的 R2 公网域名生成；这里仅示例。
        audioKey: `audio/${filenameBase}.mp3`,
        imageKey: `images/${filenameBase}.jpeg`,
        lyricKey: form.lyrics ? `lyrics/${filenameBase}.lrc` : undefined,
      };

      // 推荐做法：发送到后端 /admin/upload，后端完成上传 & 更新 songs.json
      // const fd = new FormData();
      // fd.append("meta", JSON.stringify(payload));
      // fd.append("audio", form.audio!);
      // fd.append("image", form.image!);
      // if (form.lyrics) fd.append("lyrics", form.lyrics);
      // await fetch(import.meta.env.VITE_ADMIN_API_URL + "/admin/upload", { method: "POST", body: fd });

      onPrepared?.(payload);
      setMessage("✅ 已准备好上传数据（等待接入后端 API 完成实际上传/更新）");
    } catch (err: any) {
      setMessage(`❌ 失败：${err.message || err.toString()}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#0f1620] rounded-2xl p-4 space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-300 mb-1">ID</label>
          <input
            type="number"
            className="w-full bg-[#0b1018] border border-gray-700 rounded-lg p-2 text-white"
            value={form.id}
            onChange={(e) =>
              setForm((s) => ({ ...s, id: Number(e.target.value) }))
            }
            placeholder={`${nextId}`}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Title</label>
          <input
            className="w-full bg-[#0b1018] border border-gray-700 rounded-lg p-2 text-white"
            value={form.title}
            onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
            placeholder="Song title"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Artist</label>
          <input
            className="w-full bg-[#0b1018] border border-gray-700 rounded-lg p-2 text-white"
            value={form.artist}
            onChange={(e) => setForm((s) => ({ ...s, artist: e.target.value }))}
            placeholder="Artist name"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Audio (.mp3){duration ? ` · ${duration}s` : ""}
          </label>
          <input
            type="file"
            accept="audio/mpeg"
            onChange={(e) => handleFile("audio", e.target.files?.[0])}
            className="w-full text-gray-300"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Cover (.jpeg)
          </label>
          <input
            type="file"
            accept="image/jpeg"
            onChange={(e) => handleFile("image", e.target.files?.[0])}
            className="w-full text-gray-300"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Lyrics (.lrc) 可选
          </label>
          <input
            type="file"
            accept=".lrc,text/plain"
            onChange={(e) => handleFile("lyrics", e.target.files?.[0])}
            className="w-full text-gray-300"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={!canSubmit || busy}
          className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white"
        >
          {busy ? "Processing..." : "Prepare Upload"}
        </button>
        {message && <span className="text-sm text-gray-300">{message}</span>}
      </div>

      <p className="text-xs text-gray-500">
        提示：此表单目前仅在前端拼装元数据，实际上传与更新{" "}
        <code>songs.json</code> 需要接入后端（Cloudflare Worker / Pages
        Function）处理签名与写入。
      </p>
    </form>
  );
};

export default UploadSongForm;
