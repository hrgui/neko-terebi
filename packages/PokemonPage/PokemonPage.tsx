import { useLoaderData } from "react-router";
import { useFocusable, setFocus } from "@noriginmedia/norigin-spatial-navigation";

import { Link } from "react-router-dom";
import { useEffect } from "react";

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

export function FocusableLink(props: any) {
  const { ref, focused } = useFocusable({ focusKey: props.focusKey });
  return (
    <Link
      {...props}
      ref={ref}
      className={`${props.className} ${focused ? props.focusClassName : ""}`}
    />
  );
}

export function PokemonNav({ id, children }: { id: number; children: React.ReactNode }) {
  const prev = id - 1;
  const next = id + 1;

  return (
    <div className="text-3xl flex gap-2 justify-center items-center w-full">
      {prev > 0 && (
        <FocusableLink
          focusKey="prev"
          className="text-blue-500/100"
          focusClassName="bg-blue-500/100 text-white/100"
          to={`/${prev}`}
        >
          &laquo;
        </FocusableLink>
      )}
      {children}
      <FocusableLink
        focusKey="next"
        to={`/${next}`}
        className="text-blue-500/100"
        focusClassName="bg-blue-500/100 text-white/100"
      >
        &raquo;
      </FocusableLink>
    </div>
  );
}

export function PokemonPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { pokemon } = useLoaderData() as any;

  useEffect(() => {
    setFocus("prev");
  }, []);

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
