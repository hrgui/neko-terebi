import VideoPlayerPage from "@hrgui/neko-terebi-video-player-page";
import BrowsePage from "@hrgui/neko-terebi-browse-page";
import SeriesPage from "@hrgui/neko-terebi-series-page";
import SearchPage from "@hrgui/neko-terebi-search-page";
import HistoryPage from "@hrgui/neko-terebi-history-page";
import { Root } from "@hrgui/neko-terebi-react-component-app-root";
import ErrorPage from "@hrgui/neko-terebi-error-page";
import EntryPage from "@hrgui/neko-terebi-entry-page";
import LoginPage from "@hrgui/neko-terebi-login-page";
import SettingsPage from "@hrgui/neko-terebi-settings-page";
import WatchlistPage from "@hrgui/neko-terebi-watchlist-page";
import HomePage from "@hrgui/neko-terebi-home-page";

import { createRootRoute, createRoute, redirect } from "@tanstack/react-router";
import { wait } from "../../utils/WaitUtils";

const rootRoute = createRootRoute({
  component: Root,
  errorComponent: ErrorPage,
});

export const routeTree = rootRoute.addChildren([
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    loader: (params) => {
      if (params.route.path === "/") {
        throw redirect({ to: "/welcome" });
      }
    },
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/watch/$guid",
    component: VideoPlayerPage,
    errorComponent: ErrorPage,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/history",
    component: HistoryPage,
    errorComponent: ErrorPage,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    loader: async () => {
      await wait(3000);

      return { foo: true };
    },
    path: "/welcome",
    component: EntryPage,
    errorComponent: ErrorPage,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/browse",
    component: BrowsePage,
    errorComponent: ErrorPage,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/series",
    component: SeriesPage,
    errorComponent: ErrorPage,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/search",
    component: SearchPage,
    errorComponent: ErrorPage,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/login",
    component: LoginPage,
    errorComponent: ErrorPage,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/settings",
    component: SettingsPage,
    errorComponent: ErrorPage,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/watchlist",
    component: WatchlistPage,
    errorComponent: ErrorPage,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/home",
    component: HomePage,
    errorComponent: ErrorPage,
  }),
]);
