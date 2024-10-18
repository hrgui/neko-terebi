import eventEmitter from "../events/eventEmitter";

export function setupFetchPokemonListeners() {
  eventEmitter.on("FETCH_POKEMON", async (id) => {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon/" + id);
    const data = res.json();

    eventEmitter.emit("POKEMON_OBTAINED", data);

    return data;
  });
}
