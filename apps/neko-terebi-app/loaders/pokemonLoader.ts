import { queryOptions } from "@tanstack/react-query";
import { fetchAsEventsToPromise } from "@hrgui/neko-terebi-api-eda-client/fetchAsEventsToPromise";
import { FetchEvents } from "@hrgui/neko-terebi-api-eda-client/FetchEvents";

export const pokemonLoaderQuery = (id: number) =>
  queryOptions({
    queryKey: ["pokemon", id],
    queryFn: async () => {
      return fetchAsEventsToPromise({
        fetchEventName: FetchEvents.fetchPokemon,
        responseEventName: FetchEvents.pokemonResponse,
        props: [id],
      });
    },
  });

export const pokemonLoader =
  (queryClient: any) =>
  async ({ params }: any) => {
    const pokemon = await queryClient.ensureQueryData(pokemonLoaderQuery(params.pokemon));
    return { pokemon };
  };
