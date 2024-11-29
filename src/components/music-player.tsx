import { useContext } from 'react';
import { Play, Pause } from 'lucide-react';

import CurrentMusicContext from '../context/current-music';
import ProgressBar from './progress-bar';

export default function MusicPlayer() {
  const { play, pause, isPlaying, currentSong } =
    useContext(CurrentMusicContext);

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
      <div className="h-2 bg-violet-300 rounded-full mt-2 relative">
        {currentSong && <ProgressBar currentSong={currentSong} />}
      </div>
    </div>
  );
}
