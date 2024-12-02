import { Routes as Switch, Route, Navigate } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";
import { UNAUTHENTICATED_ENTRY } from "~/configs/AppConfig";
import { lazy } from "react";

const ArtistsPage = lazy(() => import("../views/app-views/artists"));
const SongsPage = lazy(() => import("../views/app-views/songs"));
const AlbumsPage = lazy(() => import("../views/app-views/albums"));
const PlaylistsPage = lazy(() => import("../views/app-views/playlists"));

const LoginPage = lazy(() => import("../views/auth-views/login"));

export function Routes() {
  return (
    <Switch>
      <Route path="/" element={<PrivateRoutes />}>
        <Route path="/artists" element={<ArtistsPage />} />
        <Route path="/songs" element={<SongsPage />} />
        <Route path="/Albums" element={<AlbumsPage />} />
        <Route path="/playlists" element={<PlaylistsPage />} />
      </Route>

      <Route path="/" element={<PublicRoutes />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route
        path="*"
        element={<Navigate to={UNAUTHENTICATED_ENTRY} replace />}
      />
    </Switch>
  );
}
