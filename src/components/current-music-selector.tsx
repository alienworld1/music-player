import { open } from '@tauri-apps/plugin-dialog';
import { useContext, useState } from 'react';

import CurrentMusicContext from '../context/current-music';
import Music, { MusicError } from '../music';

export default function CurrentMusicSelector() {
  const { currentSong, changeSong, play } = useContext(CurrentMusicContext);
  const [error, setError] = useState<MusicError | null>(null);

  async function selectSong() {
    const file = await open({
      multiple: false,
      directory: false,
      filters: [{ name: 'Audio Files', extensions: ['mp3', 'wav', 'ogg'] }],
    });

    if (!file) return;

    try {
      const music = new Music(file);
      await music.loadMetadata();
      await music.loadSong();
      changeSong(music);
      play();
    } catch (err) {
      if (err instanceof MusicError) setError(err);
    }
  }

  return (
    <div className="flex flex-col gap-4 max-w-fit min-w-60">
      <button
        className="px-4 py-2 bg-emerald-500 rounded-xl hover:bg-emerald-600 transition-colors duration-300 ease-in-out w-fit"
        onClick={selectSong}
      >
        Select Song
      </button>
      {error && (
        <p className="text-red-400 text-lg font-medium">{error.message}</p>
      )}
      <hr className="border-4 border-lime-500" />
      {currentSong && (
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-2xl text-slate-50">
            Now Playing: {currentSong.metadata?.common.title}
          </h2>
          <p className="text-xl text-slate-300">
            {currentSong.metadata?.common.artist}
          </p>
          <p className="text-lg text-slate-300">
            {currentSong.metadata?.common.album}
          </p>
          <p className="text-sm text-slate-400">{currentSong.path}</p>
        </div>
      )}
    </div>
  );
}
