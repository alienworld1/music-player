import { useContext, useState, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

import CurrentMusicContext from '../context/current-music';

export default function MusicPlayer() {
  const { play, pause, isPlaying, currentSong } =
    useContext(CurrentMusicContext);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const progressIntervalRef = useRef<number | null>(null);

  if (currentSong) {
    currentSong.setEventListener('load', () => {
      setDuration(currentSong.duration);
    });
  }

  const startProgressTracking = () => {
    if (currentSong) {
      progressIntervalRef.current = setInterval(() => {
        if (currentSong) {
          const currentProgress = currentSong.progress;
          setProgress(currentProgress * 100);
        }
      }, 1000);
    }
  };

  const stopProgressTracking = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  if (isPlaying) {
    startProgressTracking();
  } else {
    stopProgressTracking();
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 flex flex-col p-4 gap-3">
      <div className="flex">
        <button
          className="bg-emerald-500 p-2 rounded-full hover:bg-emerald-600 transition-colors duration-300 ease-in-out"
          onClick={isPlaying ? pause : play}
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
      </div>
      <div className="flex gap-4">
        <div className="h-2 bg-violet-300 rounded-full mt-2 relative flex-1">
          <div
            className="h-full bg-violet-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-slate-100 text-sm flex justify-between gap-2">
          <span>{formatTime(duration * (progress / 100))}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}
