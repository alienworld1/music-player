import MusicPlayer from './components/music-player';

function App() {
  return (
    <main className="bg-gradient-to-r from-slate-900 to-slate-700 h-screen p-4 flex flex-col gap-3">
      <h1 className="text-3xl text-slate-50 font-semibold">Music Player</h1>
      <MusicPlayer />
    </main>
  );
}

export default App;
