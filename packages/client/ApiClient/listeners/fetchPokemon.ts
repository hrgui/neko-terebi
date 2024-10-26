import { createErrorFromResponse } from "../errors/createErrorFromResponse";
import eventEmitter from "../eventEmitter";
import { FetchEvents } from "../FetchEvents";

export function setupFetchPokemonListeners() {
  eventEmitter.on(FetchEvents.fetchPokemon, async (id) => {
    try {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon/" + id);
      if (!res.ok) {
        return eventEmitter.emit(
          FetchEvents.pokemonResponse,
          null,
          res,
          await createErrorFromResponse(res)
        );
      }
      const data = await res.json();
      eventEmitter.emit(FetchEvents.pokemonResponse, data, res, null);
      return data;
    } catch (e) {
      eventEmitter.emit(FetchEvents.pokemonResponse, null, null, e);
    }
  });
}
