import { useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { open } from '@tauri-apps/plugin-dialog';

const supportedExtensions = ['mp3', 'wav'];

export default function MusicPlayer() {
  const [error, setError] = useState('');

  async function playMusic() {
    const filePath = await open({
      multiple: false,
      title: 'Select a music file',
      filters: [{ extensions: supportedExtensions, name: 'Music Files' }],
    });
    if (!filePath) return;

    await invoke('play_audio', { filePath }).catch(err => setError(err));
  }

  return (
    <div>
      <button
        onClick={playMusic}
        className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-300 ease-in-out"
      >
        Play Audio
      </button>
      {error && <p className="text-red-400 text-lg">{error}</p>}
    </div>
  );
}
