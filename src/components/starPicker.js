import React from "react";
import { FaStar } from "react-icons/fa";

export function StarPicker({ value, onChange, size = 24 }) {
  const v = Math.max(0, Math.min(5, Number(value) || 0));

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const starValue = i + 1;
        return (
          <button
            key={starValue}
            type="button"
            onClick={() => onChange?.(starValue)}
            className="p-0.5"
            aria-label={`Rate ${starValue} star${starValue > 1 ? "s" : ""}`}
          >
            <FaStar
              size={size}
              className="cursor-pointer"
              color={starValue <= v ? "#ffc107" : "#e4e5e9"}
            />
          </button>
        );
      })}
    </div>
  );
}
