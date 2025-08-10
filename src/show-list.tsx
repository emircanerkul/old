import { ActionPanel, Action, Icon, List, getPreferenceValues, Toast, showToast } from "@raycast/api";
import { useEffect, useState } from "react";
import { promises as fs } from "node:fs";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

type Preferences = {
  playlistsFolder: string;
  audaciousBinary: string;
};

type Playlist = {
  name: string;
  path: string;
  type: "m3u" | "m3u8" | "pls" | "unknown";
};

type Track = {
  title: string;
  path: string; // original path or URL from playlist
  realPath?: string; // resolved, normalized existing filesystem path (if any)
  exists?: boolean; // whether realPath exists
  isURL?: boolean;
};

export default function Command() {
  const prefs = getPreferenceValues<Preferences>();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setError(undefined);
      try {
        const entries = await fs.readdir(prefs.playlistsFolder, { withFileTypes: true });
        const pls = entries
          .filter((e) => e.isFile())
          .map((e) => e.name)
          .filter((name) => /\.(m3u|m3u8|pls)$/i.test(name))
          .map((name) => {
            const ext = path.extname(name).toLowerCase().replace(".", "");
            return {
              name: path.basename(name, path.extname(name)),
              path: path.join(prefs.playlistsFolder, name),
              type: (ext as Playlist["type"]) || "unknown",
            } as Playlist;
          })
          .sort((a, b) => a.name.localeCompare(b.name));
        setPlaylists(pls);
      } catch (e: any) {
        setError(e?.message || String(e));
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [prefs.playlistsFolder]);

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Filter playlists...">
      {error ? (
        <List.EmptyView icon={Icon.Warning} title="Failed to load playlists" description={error} />
      ) : playlists.length === 0 ? (
        <List.EmptyView
          icon={Icon.Music}
          title="No playlists found"
          description="Add .m3u/.m3u8/.pls files to your configured Playlists Folder"
        />
      ) : (
        playlists.map((playlist) => (
          <List.Item
            key={playlist.path}
            icon={Icon.Music}
            title={playlist.name}
            accessories={[{ text: playlist.type.toUpperCase() }]}
            actions={<PlaylistActions playlist={playlist} />}
          />
        ))
      )}
    </List>
  );
}

function PlaylistActions({ playlist }: { playlist: Playlist }) {
  return (
    <ActionPanel>
      <Action.Push
        title="View Tracks"
        target={<TracksList playlist={playlist} />}
        icon={Icon.List}
        shortcut={{ modifiers: ["cmd"], key: "o" }}
      />
      <Action
        title="Play Playlist"
        icon={Icon.Play}
        onAction={() => playWithAudacious([playlist.path])}
        shortcut={{ modifiers: ["cmd", "shift"], key: "p" }}
      />
      <Action.ShowInFinder path={playlist.path} />
    </ActionPanel>
  );
}

function TracksList({ playlist }: { playlist: Playlist }) {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setError(undefined);
      try {
        const raw = await parsePlaylist(playlist);
        // Resolve existence and real paths
        const withMeta = await Promise.all(
          raw.map(async (t) => {
            if (t.isURL) return { ...t, exists: false };
            const real = await findExistingPath(t.path);
            return { ...t, realPath: real, exists: !!real };
          }),
        );
        setTracks(withMeta);
      } catch (e: any) {
        setError(e?.message || String(e));
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [playlist.path]);

  return (
    <List isLoading={isLoading} searchBarPlaceholder={`Tracks in ${playlist.name}`}>
      {error ? (
        <List.EmptyView icon={Icon.Warning} title="Failed to load tracks" description={error} />
      ) : tracks.length === 0 ? (
        <List.EmptyView icon={Icon.Music} title="No tracks" />
      ) : (
        tracks.map((t) => (
          <List.Item
            key={t.path}
            title={t.title}
            subtitle={t.path}
            icon={Icon.Music}
            accessories={t.exists === false && !t.isURL ? [{ icon: Icon.Warning, text: "Missing" }] : []}
            actions={
              <ActionPanel>
                <Action
                  title="Play"
                  icon={Icon.Play}
                  onAction={() => playWithAudacious([t.isURL ? t.path : t.realPath || t.path])}
                />
                {!t.isURL && t.exists && <Action.OpenWith path={t.realPath || t.path} />}
                {!t.isURL && t.exists && <Action.ShowInFinder path={t.realPath || t.path} />}
                <Action
                  title="Play Entire Playlist"
                  icon={Icon.Play}
                  shortcut={{ modifiers: ["cmd", "shift"], key: "p" }}
                  onAction={() => playWithAudacious([playlist.path])}
                />
              </ActionPanel>
            }
          />
        ))
      )}
    </List>
  );
}

async function parsePlaylist(playlist: Playlist): Promise<Track[]> {
  const content = await fs.readFile(playlist.path, "utf8");
  const dir = path.dirname(playlist.path);
  if (playlist.type === "pls") {
    // Simple PLS parser: lines like File1=..., Title1=...
    const lines = content.split(/\r?\n/);
    const files: Record<number, string> = {};
    const titles: Record<number, string> = {};
    for (const line of lines) {
      const mFile = /^File(\d+)=\s*(.+)$/.exec(line);
      if (mFile) {
        const idx = Number(mFile[1]);
        files[idx] = mFile[2];
        continue;
      }
      const mTitle = /^Title(\d+)=\s*(.+)$/.exec(line);
      if (mTitle) {
        const idx = Number(mTitle[1]);
        titles[idx] = mTitle[2];
      }
    }
    const indices = Object.keys(files)
      .map(Number)
      .sort((a, b) => a - b);
    return indices.map((i) => {
      const p = resolveMaybeRelative(dir, files[i]);
      return { title: titles[i] ?? path.basename(p), path: p };
    });
  }

  // M3U/M3U8 parser
  const tracks: Track[] = [];
  const lines = content.split(/\r?\n/);
  let pendingTitle: string | undefined;
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.length === 0) continue;
    if (trimmed.startsWith("#EXTINF:")) {
      const comma = trimmed.indexOf(",");
      if (comma !== -1) {
        pendingTitle = trimmed.slice(comma + 1).trim();
      }
      continue;
    }
    if (trimmed.startsWith("#")) continue; // comment
    if (isProbablyURL(trimmed)) {
      tracks.push({ title: pendingTitle ?? trimmed, path: trimmed, isURL: true });
      pendingTitle = undefined;
      continue;
    }
    const absolutePath = resolveMaybeRelative(dir, trimmed);
    tracks.push({ title: pendingTitle ?? path.basename(absolutePath), path: absolutePath });
    pendingTitle = undefined;
  }
  return tracks;
}

function resolveMaybeRelative(baseDir: string, p: string) {
  if (/^[a-zA-Z]+:\\/.test(p)) {
    // Windows style absolute path, unlikely on macOS but handle anyway
    return p;
  }
  // expand ~
  if (p.startsWith("~")) {
    p = path.join(process.env.HOME || "", p.slice(1));
  }
  if (path.isAbsolute(p)) return p;
  return path.normalize(path.join(baseDir, p));
}

function isProbablyURL(s: string) {
  return /^https?:\/\//i.test(s);
}

async function pathExists(p: string) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function findExistingPath(p: string): Promise<string | undefined> {
  // Try original
  if (await pathExists(p)) return p;
  // Try macOS Unicode normalization variants
  if (process.platform === "darwin") {
    const nfd = p.normalize("NFD");
    if (nfd !== p && (await pathExists(nfd))) return nfd;
    const nfc = p.normalize("NFC");
    if (nfc !== p && (await pathExists(nfc))) return nfc;
  }
  return undefined;
}

async function playWithAudacious(paths: string[]) {
  const prefs = getPreferenceValues<Preferences>();
  const bin = (prefs.audaciousBinary || "/opt/homebrew/bin/audacious").trim();
  try {
    // Resolve filesystem paths (skip URLs)
    const resolvedArgs: string[] = [];
    for (const p of paths) {
      if (isProbablyURL(p)) {
        resolvedArgs.push(p);
      } else {
        const real = await findExistingPath(p);
        if (!real) {
          await showToast({ style: Toast.Style.Failure, title: "Track not found", message: p });
          return;
        }
        resolvedArgs.push(real);
      }
    }

    // Use the Audacious CLI. When an instance is already running, this will reuse it.
    await execFileAsync(bin, ["--play", ...resolvedArgs]);
    await showToast({ style: Toast.Style.Success, title: "Playing in Audacious" });
  } catch (e: any) {
    await showToast({
      style: Toast.Style.Failure,
      title: "Failed to launch Audacious",
      message: e?.stderr || e?.message || String(e),
    });
  }
}
