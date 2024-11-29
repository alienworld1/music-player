import { Music4 } from 'lucide-react';
import { useState } from 'react';

import Music from './music';
import CurrentMusicContext from './context/current-music';
import CurrentMusicSelector from './components/current-music-selector';
import MusicPlayer from './components/music-player';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState<Music | null>(null);

  const play = () => {
    if (!currentSong) return;
    currentSong.play();
    setIsPlaying(true);
  };

  const pause = () => {
    if (!currentSong) return;
    currentSong.pause();
    console.log('pause');
    setIsPlaying(false);
  };

  const changeSong = (song: Music) => {
    if (currentSong) {
      currentSong.pause();
    }
    setCurrentSong(song);
  };

  return (
    <main className="bg-gradient-to-r from-slate-900 to-slate-700 h-screen p-4 flex flex-col gap-3">
      <h1 className="text-3xl text-slate-50 font-semibold flex items-center gap-4">
        <Music4 className="font-bold text-2xl mt-1" size={30} strokeWidth={2} />{' '}
        <span>Music Player</span>
      </h1>
      <CurrentMusicContext.Provider
        value={{ currentSong, play, pause, isPlaying, changeSong }}
      >
        <CurrentMusicSelector />
        <MusicPlayer />
      </CurrentMusicContext.Provider>
    </main>
  );
}

export default App;
