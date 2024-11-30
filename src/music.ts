import { IAudioMetadata, parseBuffer } from 'music-metadata';
import { readFile } from '@tauri-apps/plugin-fs';
import { Howl } from 'howler';

type MusicEvents =
  | 'load'
  | 'play'
  | 'pause'
  | 'stop'
  | 'end'
  | 'seek'
  | 'volume'
  | 'rate'
  | 'mute'
  | 'fade';

class MusicError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MusicError';
  }
}

export default class Music {
  private filePath: string;
  private musicMetadata: IAudioMetadata | null = null;
  private song: Howl | null = null;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async loadMetadata() {
    try {
      const file = await readFile(this.filePath);
      const metadata = await parseBuffer(file, { mimeType: 'audio/mpeg' });
      this.musicMetadata = metadata;
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        throw new MusicError(err.message);
      }
    }
  }

  async loadSong() {
    try {
      const file = await readFile(this.filePath);
      const musicBlob = new Blob([file], { type: 'audio/mpeg' });
      const musicUrl = URL.createObjectURL(musicBlob);

      this.song = new Howl({
        src: [musicUrl],
        html5: true,
        format: ['mp3'],
      });
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        throw new MusicError(err.message);
      }
    }
  }

  get metadata() {
    return this.musicMetadata;
  }

  get path() {
    return this.filePath;
  }

  play() {
    if (this.song) {
      this.song.play();
    }
  }

  pause() {
    if (this.song) {
      this.song.pause();
    }
  }

  get progress() {
    if (this.song) {
      return this.song.seek() / this.song.duration();
    }
    return 0;
  }

  get duration() {
    if (this.song) {
      return this.song.duration();
    }
    return 0;
  }

  setEventListener(event: MusicEvents, callback: () => void) {
    if (this.song) {
      this.song.on(event, callback);
    }
  }
}

export { MusicError };
