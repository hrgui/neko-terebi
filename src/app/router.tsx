import { createHashRouter, redirect } from "react-router-dom";
import { Root } from "./Root";
import { PokemonPage } from "./pages/PokemonPage";
import ErrorPage from "./pages/ErrorPage";
import { pokemonLoader } from "./loaders/pokemonLoader";
import { queryClient } from "./queryClient";

export const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: ({ params }) => {
      if (!params.pokemon) {
        return redirect("/1");
      }
      return null;
    },
    children: [
      {
        path: "/:pokemon",
        element: <PokemonPage />,
        errorElement: <ErrorPage />,
        loader: pokemonLoader(queryClient),
      },
    ],
  },
]);
