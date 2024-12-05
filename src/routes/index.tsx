import { Routes as Switch, Route, Navigate } from "react-router-dom";
import { lazy } from "react";

const HomePage = lazy(() => import("../views/app-views/home"));
const ArtistsPage = lazy(() => import("../views/app-views/artists"));
const SongsPage = lazy(() => import("../views/app-views/songs"));
const AlbumsPage = lazy(() => import("../views/app-views/albums"));
const PlaylistsPage = lazy(() => import("../views/app-views/playlists"));

export function Routes() {
  return (
    <Switch>
      <Route path="/" element={<HomePage />} />
      <Route path="/artists" element={<ArtistsPage />} />
      <Route path="/songs" element={<SongsPage />} />
      <Route path="/Albums" element={<AlbumsPage />} />
      <Route path="/playlists" element={<PlaylistsPage />} />
      <Route path="*" element={<Navigate to={"/"} replace />} />
    </Switch>
  );
}
