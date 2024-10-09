import { Outlet, useNavigation } from "react-router";
import LoadingOverlay from "./components/Loading/LoadingOverlay";
import AppLayout from "./components/AppLayout/AppLayout";

export function Root() {
  const navigation = useNavigation();

  return (
    <AppLayout>
      {navigation.state === "loading" && <LoadingOverlay />}
      <Outlet />
    </AppLayout>
  );
}
