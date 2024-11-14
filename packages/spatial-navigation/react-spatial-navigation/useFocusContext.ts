import { useContext, createContext } from "react";
import { ROOT_FOCUS_KEY } from "@hrgui/spatial-navigation-core/SpatialNavigation";

export const FocusContext = createContext(ROOT_FOCUS_KEY);
FocusContext.displayName = "FocusContext";

/** @internal */
export const useFocusContext = () => useContext(FocusContext);
