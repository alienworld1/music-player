import { createContext } from 'react';
import Music from '../music';

interface MusicContext {
  currentSong: Music | null;
  play: () => void;
  pause: () => void;
  isPlaying: boolean;
  changeSong: (song: Music) => void;
}

const CurrentMusicContext = createContext<MusicContext>({
  currentSong: null,
  play: () => {},
  pause: () => {},
  isPlaying: false,
  changeSong: () => {},
});

export default CurrentMusicContext;
