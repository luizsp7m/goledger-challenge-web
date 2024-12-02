import { Routes as Switch, Route, Navigate } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";
import { UNAUTHENTICATED_ENTRY } from "~/configs/AppConfig";
import { lazy } from "react";

const ArtistsPage = lazy(() => import("../views/app-views/artists"));
const LoginPage = lazy(() => import("../views/auth-views/login"));

export function Routes() {
  return (
    <Switch>
      <Route path="/" element={<PrivateRoutes />}>
        <Route path="/artists" element={<ArtistsPage />} />
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
