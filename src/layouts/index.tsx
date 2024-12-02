import { lazy, Suspense } from "react";
import { LoadingPage } from "~/components/shared-components/LoadingPage";
import { useAppSelector } from "~/store/hooks/useAppSelector";
import { Views } from "~/views";

const AuthLayout = lazy(() => import("./AuthLayout"));
const AppLayout = lazy(() => import("./AppLayout"));

export function Layouts() {
  const { isAuthenticated } = useAppSelector((store) => store.auth);

  const Layout = isAuthenticated ? AppLayout : AuthLayout;

  return (
    <Suspense fallback={<LoadingPage />}>
      <Layout>
        <Views />
      </Layout>
    </Suspense>
  );
}
