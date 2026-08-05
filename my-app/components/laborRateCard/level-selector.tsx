"use client";

type LevelSelectorProps = {
  levels: string[];
  selectedLevel: string;
  onSelect: (level: string) => void;
  disabled?: boolean;
};

export function LevelSelector({
  levels,
  selectedLevel,
  onSelect,
  disabled = false,
}: LevelSelectorProps) {
  return (
    <label className="block w-full max-w-md text-sm font-medium text-zinc-800 dark:text-zinc-100">
      Level
      <select
        value={selectedLevel}
        disabled={disabled}
        className="mt-2 h-11 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-950 outline-none transition focus:border-zinc-700 focus:ring-2 focus:ring-zinc-200 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-300 dark:focus:ring-zinc-800 dark:disabled:bg-zinc-900"
        onChange={(event) => onSelect(event.target.value)}
      >
        <option value="">Choose a level</option>
        {levels.map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </select>
    </label>
  );
}
