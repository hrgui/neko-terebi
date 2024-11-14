import { useLoaderData } from "react-router";
import { setFocus } from "@hrgui/spatial-navigation-core";
import { useEffect } from "react";
import type { IPokemon } from "pokeapi-typescript";
import { FocusableLink } from "../../components/FocusableLink/FocusableLink";

export function PokemonView({ name, img, id }: { name: string; img: string; id: number }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <img src={img} className="w-80 h-80" />
      <h1 className="text-4xl font-semibold mb-2 flex">
        <span className="mr-2">#{id}</span>
        <span>{name}</span>
      </h1>
    </div>
  );
}

export function PokemonNav({ id, children }: { id: number; children: React.ReactNode }) {
  const prev = id - 1;
  const next = id + 1;

  return (
    <div className="text-headline-xl flex gap-2 justify-center items-center w-full">
      {prev > 0 && (
        <FocusableLink
          focusKey="prev"
          className="text-primary/100 @asvw:p-[10px] @asvw:rounded-[10px]"
          focusClassName="bg-primary/100 text-white/100"
          to={`/pokemon/${prev}`}
        >
          &laquo;
        </FocusableLink>
      )}
      {children}
      <FocusableLink
        focusKey="next"
        to={`/pokemon/${next}`}
        className="text-primary/100 @asvw:p-[10px] @asvw:rounded-[10px]"
        focusClassName="bg-primary/100 text-white/100"
      >
        &raquo;
      </FocusableLink>
    </div>
  );
}

export function PokemonPage() {
  const { pokemon } = useLoaderData() as { pokemon: IPokemon };

  useEffect(() => {
    setFocus("next");
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div>
        <PokemonNav id={pokemon.id}>
          <PokemonView name={pokemon.name} id={pokemon.id} img={pokemon.sprites.front_default} />
        </PokemonNav>
      </div>
    </div>
  );
}
