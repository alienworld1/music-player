use rodio::{Decoder, OutputStream, Sink};
use std::{fs::File, io::BufReader};

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn play_audio(file_path: &str) -> Result<(), String> {
    let (_stream, stream_handle) = OutputStream::try_default().map_err(|err| err.to_string())?;
    let file = BufReader::new(File::open(file_path).map_err(|err| err.to_string())?);
    let source = Decoder::new(file).map_err(|err| err.to_string())?;
    
    println!("playing music at path {file_path}");

    let sink = Sink::try_new(&stream_handle).map_err(|err| err.to_string())?;
    sink.append(source);
    sink.sleep_until_end();

    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![greet, play_audio])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
