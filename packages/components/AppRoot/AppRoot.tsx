//import LoadingOverlay from "@hrgui/neko-terebi-react-component-loading";
import AppLayout from "@hrgui/neko-terebi-react-component-app-layout";
import { FocusContext, useFocusable } from "@hrgui/react-spatial-navigation";
import { Outlet, useLoaderData, useRouterState } from "@tanstack/react-router";
import LoadingOverlay from "../Loading/LoadingOverlay";

export function Root() {
  const { isLoading } = useRouterState();
  const { focusKey, ref } = useFocusable({ focusKey: "root" });
  const sessionData = useLoaderData({ from: "__root__" });

  return (
    <FocusContext.Provider value={focusKey}>
      <AppLayout sessionData={sessionData} ref={ref}>
        {isLoading && <LoadingOverlay />}
        <Outlet />
      </AppLayout>
    </FocusContext.Provider>
  );
}
