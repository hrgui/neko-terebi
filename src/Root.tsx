import { Outlet, useNavigation } from "react-router";
import LoadingOverlay from "./components/LoadingOverlay";

export function Root() {
  const navigation = useNavigation();

  return (
    <>
      {navigation.state === "loading" && <LoadingOverlay />}
      <Outlet />
    </>
  );
}
