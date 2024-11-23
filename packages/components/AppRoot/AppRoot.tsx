//import LoadingOverlay from "@hrgui/neko-terebi-react-component-loading";
import AppLayout from "@hrgui/neko-terebi-react-component-app-layout";
import { FocusContext, useFocusable } from "@hrgui/react-spatial-navigation";
import { Outlet } from "@tanstack/react-router";

export function Root() {
  //const navigation = useNavigation();
  const { focusKey, ref } = useFocusable({ focusKey: "root" });

  return (
    <FocusContext.Provider value={focusKey}>
      <AppLayout ref={ref}>
        <Outlet />
      </AppLayout>
    </FocusContext.Provider>
  );
}
