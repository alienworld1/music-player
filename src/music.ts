import { IAudioMetadata, parseBuffer } from 'music-metadata';
import { readFile } from '@tauri-apps/plugin-fs';

class MusicError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MusicError';
  }
}

export default class Music {
  private filePath: string;
  private musicMetadata: IAudioMetadata | null = null;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async initialize() {
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

  get metadata() {
    return this.musicMetadata;
  }

  get path() {
    return this.filePath;
  }
}

export { MusicError };
