import { redirect } from "react-router-dom";
import { Root } from "@hrgui/neko-terebi-react-component-app-root";
import { PokemonPage } from "@hrgui/neko-terebi-pokemon-page";
import ErrorPage from "@hrgui/neko-terebi-error-page";
import { pokemonLoader } from "@hrgui/neko-terebi-pokemon-single-loader";
import { queryClient } from "@hrgui/neko-terebi-query-client";
import EntryPage from "@hrgui/neko-terebi-entry-page";
import LoginPage from "@hrgui/neko-terebi-login-page";
import SettingsPage from "@hrgui/neko-terebi-settings-page";
import WatchlistPage from "@hrgui/neko-terebi-watchlist-page";
import HomePage from "@hrgui/neko-terebi-home-page";
import VideoPlayerPage from "@hrgui/neko-terebi-video-player-page";
import BrowsePage from "@hrgui/neko-terebi-browse-page";
import SeriesPage from "@hrgui/neko-terebi-series-page";
import SearchPage from "@hrgui/neko-terebi-search-page";
import HistoryPage from "@hrgui/neko-terebi-history-page";

export function createRouterConfig() {
  return [
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      loader: (params: any) => {
        const request: Request = params.request;
        const url = new URL(request.url);
        console.log(url);
        if (url.pathname === "/") {
          return redirect("/welcome");
        }

        return null;
      },
      children: [
        {
          path: "/watch/:guid",
          element: <VideoPlayerPage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/history",
          element: <HistoryPage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/welcome",
          element: <EntryPage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/browse",
          element: <BrowsePage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/series",
          element: <SeriesPage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/search",
          element: <SearchPage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/settings",
          element: <SettingsPage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/watchlist",
          element: <WatchlistPage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/home",
          element: <HomePage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/pokemon/:pokemon",
          element: <PokemonPage />,
          errorElement: <ErrorPage />,
          loader: pokemonLoader(queryClient),
        },
      ],
    },
  ];
}
