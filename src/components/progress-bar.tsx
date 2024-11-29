import { useMemo } from 'react';
import Music from '../music';

export default function ProgressBar({ currentSong }: { currentSong: Music }) {
  const percentage = useMemo(() => currentSong.progress, [currentSong]);

  return (
    <div
      className="h-full bg-violet-500 rounded-full"
      style={{ width: `${percentage}%` }}
    />
  );
}
