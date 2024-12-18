import { Routes as Switch, Route, Navigate } from "react-router-dom";
import { lazy } from "react";

import {
  ALBUMS_PREFIX_PATH,
  ARTISTS_PREFIX_PATH,
  HOME_PREFIX_PATH,
  PLAYLISTS_PREFIX_PATH,
  SONGS_PREFIX_PATH,
} from "~/configs/AppConfig";

const HomePage = lazy(() => import("../views/home"));

const ArtistList = lazy(() => import("../views/artists/ArtistList"));
const ArtistProfile = lazy(() => import("../views/artists/ArtistProfile"));

const AlbumList = lazy(() => import("../views/albums/AlbumList"));
const AlbumProfile = lazy(() => import("../views/albums/AlbumProfile"));

const SongList = lazy(() => import("../views/songs/SongList"));

const PlaylistList = lazy(() => import("../views/playlists/PlaylistList"));
const PlaylistProfile = lazy(
  () => import("../views/playlists/PlaylistProfile")
);

export function Routes() {
  return (
    <Switch>
      <Route path={HOME_PREFIX_PATH} element={<HomePage />} />

      <Route path={ARTISTS_PREFIX_PATH} element={<ArtistList />} />
      <Route path={`${ARTISTS_PREFIX_PATH}/:id`} element={<ArtistProfile />} />

      <Route path={ALBUMS_PREFIX_PATH} element={<AlbumList />} />
      <Route path={`${ALBUMS_PREFIX_PATH}/:id`} element={<AlbumProfile />} />

      <Route path={SONGS_PREFIX_PATH} element={<SongList />} />

      <Route path={PLAYLISTS_PREFIX_PATH} element={<PlaylistList />} />

      <Route
        path={`${PLAYLISTS_PREFIX_PATH}/:id`}
        element={<PlaylistProfile />}
      />

      <Route path="*" element={<Navigate to={HOME_PREFIX_PATH} replace />} />
    </Switch>
  );
}
