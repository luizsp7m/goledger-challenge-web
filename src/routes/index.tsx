import { Routes as Switch, Route, Navigate } from "react-router-dom";
import { lazy } from "react";

const HomePage = lazy(() => import("../views/home"));

const ArtistList = lazy(() => import("../views/artists/ArtistList"));
const ArtistProfile = lazy(() => import("../views/artists/ArtistProfile"));

const AlbumList = lazy(() => import("../views/albums/AlbumList"));
const AlbumProfile = lazy(() => import("../views/albums/AlbumProfile"));

const SongList = lazy(() => import("../views/songs/SongList"));
const SongProfile = lazy(() => import("../views/songs/SongProfile"));

const PlaylistList = lazy(() => import("../views/playlists/PlaylistList"));
const PlaylistProfile = lazy(
  () => import("../views/playlists/PlaylistProfile")
);

export function Routes() {
  return (
    <Switch>
      <Route path="/" element={<HomePage />} />

      <Route path="/artists" element={<ArtistList />} />
      <Route path="/artists/:id" element={<ArtistProfile />} />

      <Route path="/albums" element={<AlbumList />} />
      <Route path="/albums/:id" element={<AlbumProfile />} />

      <Route path="/songs" element={<SongList />} />
      <Route path="/songs/:id" element={<SongProfile />} />

      <Route path="/playlists" element={<PlaylistList />} />
      <Route path="/playlists/:id" element={<PlaylistProfile />} />

      <Route path="*" element={<Navigate to={"/"} replace />} />
    </Switch>
  );
}
