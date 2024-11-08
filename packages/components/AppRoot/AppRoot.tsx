import { Outlet, useNavigation } from "react-router";
import LoadingOverlay from "@hrgui/neko-terebi-react-component-loading";
import AppLayout from "@hrgui/neko-terebi-react-component-app-layout";
import { FocusContext, useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { ScrollRestoration } from "react-router-dom";

export function Root() {
  const navigation = useNavigation();
  const { focusKey, ref } = useFocusable({ focusKey: "root" });

  return (
    <FocusContext.Provider value={focusKey}>
      <AppLayout ref={ref}>
        {navigation.state === "loading" && <LoadingOverlay />}
        <Outlet />
        <ScrollRestoration />
      </AppLayout>
    </FocusContext.Provider>
  );
}
