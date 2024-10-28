import { Outlet, useNavigation } from "react-router";
import LoadingOverlay from "@hrgui/neko-terebi-react-component-loading";
import AppLayout from "@hrgui/neko-terebi-react-component-app-layout";
import { FocusRoot } from "@please/lrud";

export function Root() {
  const navigation = useNavigation();

  return (
    <FocusRoot pointerEvents>
      <AppLayout>
        {navigation.state === "loading" && <LoadingOverlay />}
        <Outlet />
      </AppLayout>
    </FocusRoot>
  );
}
