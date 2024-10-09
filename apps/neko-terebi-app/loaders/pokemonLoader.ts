import { queryOptions } from "@tanstack/react-query";

export const pokemonLoaderQuery = (id: number) =>
  queryOptions({
    queryKey: ["pokemon", id],
    queryFn: async () => {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon/" + id);
      return res.json();
    },
  });

export const pokemonLoader =
  (queryClient: any) =>
  async ({ params }: any) => {
    const pokemon = await queryClient.ensureQueryData(pokemonLoaderQuery(params.pokemon));
    return { pokemon };
  };
