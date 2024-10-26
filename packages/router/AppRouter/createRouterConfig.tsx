import { redirect } from "react-router-dom";
import { Root } from "@hrgui/neko-terebi-react-component-app-root";
import { PokemonPage } from "@hrgui/neko-terebi-pokemon-page";
import ErrorPage from "@hrgui/neko-terebi-error-page";
import { pokemonLoader } from "@hrgui/neko-terebi-pokemon-single-loader";
import { queryClient } from "../../queries/QueryClient/queryClient";

export function createRouterConfig() {
  return [
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      loader: ({ params }: { params: { pokemon?: string } }) => {
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
  ];
}
