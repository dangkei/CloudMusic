// src/components/PlaylistCard.tsx
import React from "react";

interface PlaylistCardProps {
  title: string;
  description: string;
  img: string;
}

export const PlaylistCard: React.FC<PlaylistCardProps> = ({
  title,
  description,
  img,
}) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-3 cursor-pointer">
      <img src={img} alt={title} className="rounded-lg mb-3" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
};
