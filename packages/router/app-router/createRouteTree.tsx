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

import { createRootRouteWithContext, createRoute, redirect } from "@tanstack/react-router";
import { fetchAsEventsToPromise } from "@hrgui/neko-terebi-api-eda-client/fetchAsEventsToPromise";
import { Session } from "@hrgui/neko-terebi-api-eda-client/types";
import { QueryClient } from "@tanstack/react-query";

type Auth = {
  data?: Session;
  resolved?: boolean;
  loader: () => Promise<Session>;
  invalidate: () => void;
  loaderPromise?: Promise<Session>;
  startLoading: () => Promise<Session>;
};

export const auth: Auth = {
  resolved: false,
  loader: async () => {
    const data = await fetchAsEventsToPromise({
      id: "session",
      requestEventName: "session/request",
      responseEventName: "session/response",
      errorEventName: "session/error",
      cancelEventName: "session/cancel",
      requestParams: {},
    });
    auth.data = data as Session;
    auth.resolved = true;
    return data as Session;
  },
  startLoading: async () => {
    const promise = auth.loader();
    auth.loaderPromise = promise;
    const res = await auth.loaderPromise;
    return res;
  },
  invalidate: () => {
    auth.resolved = false;
    auth.data = undefined;
  },
};

const rootRoute = createRootRouteWithContext<{
  auth: Auth;
  queryClient: QueryClient;
}>()({
  component: Root,
  errorComponent: ErrorPage,
  loader: async ({ context }) => {
    if (context.auth.resolved) {
      return context.auth.data;
    } else {
      return context.auth.startLoading();
    }
  },
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  loader: async (params) => {
    await params.context.auth.loaderPromise;
    const sessionData = params.context.auth.data;
    if (!sessionData && params.route.path === "/") {
      throw redirect({ to: "/welcome" });
    } else {
      throw redirect({ to: "/home" });
    }
  },
});
const watchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/watch/$guid",
  component: VideoPlayerPage,
  errorComponent: ErrorPage,
});
const historyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/history",
  component: HistoryPage,
  errorComponent: ErrorPage,
});
const welcomeRoute = createRoute({
  getParentRoute: () => rootRoute,
  loader: async () => {
    return { foo: true };
  },
  path: "/welcome",
  component: EntryPage,
  errorComponent: ErrorPage,
});
const browseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/browse",
  component: BrowsePage,
  errorComponent: ErrorPage,
});
const seriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/series",
  component: SeriesPage,
  errorComponent: ErrorPage,
});
const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/search",
  component: SearchPage,
  errorComponent: ErrorPage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
  errorComponent: ErrorPage,
});
const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: SettingsPage,
  errorComponent: ErrorPage,
});
const watchlistRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/watchlist",
  component: WatchlistPage,
  errorComponent: ErrorPage,
});
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/home",
  component: HomePage,
  errorComponent: ErrorPage,
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  watchRoute,
  historyRoute,
  welcomeRoute,
  browseRoute,
  seriesRoute,
  searchRoute,
  loginRoute,
  settingsRoute,
  watchlistRoute,
  homeRoute,
]);
