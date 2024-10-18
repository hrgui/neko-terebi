import { queryOptions } from "@tanstack/react-query";
import eventEmitter from "../events/eventEmitter";

export const pokemonLoaderQuery = (id: number) =>
  queryOptions({
    queryKey: ["pokemon", id],
    queryFn: async () => {
      const promise = new Promise((resolve, reject) =>
        eventEmitter.once("POKEMON_OBTAINED", (pokemon) => {
          resolve(pokemon);
        })
      );

      eventEmitter.emit("FETCH_POKEMON", id);

      return promise;
    },
  });

export const pokemonLoader =
  (queryClient: any) =>
  async ({ params }: any) => {
    const pokemon = await queryClient.ensureQueryData(pokemonLoaderQuery(params.pokemon));
    return { pokemon };
  };
