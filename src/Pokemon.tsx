import { useQuery } from "@tanstack/react-query";

type Props = {
  id: number;
};

const getPokemonById = async (id: number): Promise<unknown> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return await response.json();
};

function usePokemon(pokemonId: number) {
  return useQuery({
    queryKey: ["pokemon", pokemonId],
    queryFn: () => getPokemonById(pokemonId),
    enabled: !!pokemonId,
  });
}

const Pokemon = (props: Props) => {
  const { isLoading, data } = usePokemon(props.id);

  if (isLoading) {
    return <div>Is loading</div>;
  }

  return <div>{JSON.stringify(data)}</div>;
};

export default Pokemon;
