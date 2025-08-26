import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white p-4">
      <h2 className="text-2xl font-bold mb-6">Cloud Music</h2>
      <nav className="space-y-4">
        <Link to="/" className="block hover:text-green-400">
          首页
        </Link>
        <Link to="/search" className="block hover:text-green-400">
          搜索
        </Link>
        <Link to="/playlist" className="block hover:text-green-400">
          歌单
        </Link>
      </nav>
    </div>
  );
}
