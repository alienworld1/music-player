import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

function App() {
  const [greetMsg, setGreetMsg] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name: 'bob' }));
  }

  return (
    <main className="container">
      <h1 className="text-3xl text-blue-700">Music</h1>
      <button onClick={greet} className="p-4 text-violet-600 rounded">Greet</button>
      <p className="text-red-600 text-lg">{greetMsg}</p>
    </main>
  );
}

export default App;
