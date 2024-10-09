import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";

export function PokemonView({ name, img, id }: { name: string; img: string; id: number }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <img src={img} className="w-80 h-80" />
      <h1 className="text-4xl font-semibold mb-2">
        #{id} {name}
      </h1>
    </div>
  );
}

export function PokemonNav({ id, children }: { id: number; children: React.ReactNode }) {
  const prev = id - 1;
  const next = id + 1;
  return (
    <div className="text-3xl flex gap-2 justify-center items-center w-full">
      {prev > 0 && (
        <Link className="text-blue-500" to={`/${prev}`}>
          &laquo;
        </Link>
      )}
      {children}
      <Link to={`/${next}`} className="text-blue-500">
        &raquo;
      </Link>
    </div>
  );
}

export function PokemonPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { pokemon } = useLoaderData() as any;
  return (
    <div className="absolute w-full h-full flex items-center justify-center">
      <div>
        <PokemonNav id={pokemon.id}>
          <PokemonView name={pokemon.name} id={pokemon.id} img={pokemon.sprites.front_default} />
        </PokemonNav>
      </div>
    </div>
  );
}
