import { Navigate, Outlet } from "react-router-dom";
import { UNAUTHENTICATED_ENTRY } from "~/configs/AppConfig";
import { useAppSelector } from "~/store/hooks/useAppSelector";

export function PrivateRoutes() {
  const { isAuthenticated } = useAppSelector((store) => store.auth);

  if (!isAuthenticated) {
    return <Navigate to={UNAUTHENTICATED_ENTRY} replace />;
  }

  return <Outlet />;
}
