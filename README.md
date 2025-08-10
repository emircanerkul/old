# Audacious Player

Browse playlists from a folder and play them with the Audacious CLI.

Setup
- In Raycast, open the extension preferences and set "Playlists Folder" to the directory containing your playlists (.m3u/.m3u8/.pls).
- Set "Audacious Binary" to the full path of the CLI (default: /opt/homebrew/bin/audacious).

Usage
- Run the "Browse Playlists" command.
- The list shows all playlists in the configured folder.
- Press Enter or Cmd+O on a playlist to view its tracks.
- Press Cmd+P on a playlist to play it in Audacious.
- In the tracks view, select a track to play it in Audacious, or use Cmd+P to play the entire playlist.

Notes
- M3U/M3U8 with #EXTINF and PLS files are supported. Relative paths are resolved relative to the playlist file.
- The `audacious` CLI communicates with the running instance and won’t open another if it’s already running (no `audtool` needed).
