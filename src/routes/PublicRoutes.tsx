import { Navigate, Outlet } from "react-router-dom";
import { AUTHENTICATED_ENTRY } from "~/configs/AppConfig";
import { useAppSelector } from "~/store/hooks/useAppSelector";

export function PublicRoutes() {
  const { isAuthenticated } = useAppSelector((store) => store.auth);

  if (isAuthenticated) {
    return <Navigate to={AUTHENTICATED_ENTRY} replace />;
  }

  return <Outlet />;
}
