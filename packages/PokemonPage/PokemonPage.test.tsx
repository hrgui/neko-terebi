import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter } from "react-router-dom";
import { createRouterConfig } from "@hrgui/neko-terebi-app/createRouterConfig";
import { AppProvider } from "@hrgui/neko-terebi-app/AppProvider";
import eventEmitter from "@hrgui/neko-terebi-api-eda-client/eventEmitter";
import { FetchEvents } from "@hrgui/neko-terebi-api-eda-client/FetchEvents";

test("should get a pokemon1 rendered", async () => {
  //arrange

  // mock using events
  eventEmitter.once(FetchEvents.fetchPokemon, (req) => {
    eventEmitter.emit(
      FetchEvents.pokemonResponse,
      {
        id: req,
        name: "pokemon" + req,
        sprites: {
          front_default: "foo",
        },
      },
      new Response("data")
    );
  });

  //act
  const router = createMemoryRouter(createRouterConfig(), { initialEntries: ["/1"] });
  render(<AppProvider router={router} />);

  //assert
  expect(await screen.findByText("pokemon1")).toBeInTheDocument();
});
