import React from "react";
import { motion } from "framer-motion";
import { FiSearch, FiX } from "react-icons/fi";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = "搜索歌曲..."
}: SearchBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center bg-gray-800 rounded-lg overflow-hidden"
    >
      {/* 输入框 */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 p-2 bg-gray-800 text-white outline-none"
      />

      {/* 清空按钮 */}
      {value && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange("")}
          className="px-2 text-gray-400 hover:text-white"
        >
          <FiX size={18} />
        </motion.button>
      )}

      {/* 搜索按钮 */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onSearch}
        className="bg-green-500 px-4 py-2 text-white hover:bg-green-400"
      >
        <FiSearch size={18} />
      </motion.button>
    </motion.div>
  );
}
