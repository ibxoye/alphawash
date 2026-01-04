import React from "react";
import {FaStar} from 'react-icons/fa';

export function StarDisplay({ value = 0, size = 18 }) {
  const v = Math.max(0, Math.min(5, Number(value) || 0));

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar
          key={i}
          size={size}
          className="cursor-default"
          color={i + 1 <= v ? "#ffc107" : "#e4e5e9"}
        />
      ))}
      <span className="ml-2 text-sm text-zinc-400">{v}/5</span>
    </div>
  );
}