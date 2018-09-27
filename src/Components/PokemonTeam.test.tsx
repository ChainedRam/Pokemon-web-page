import * as React from "react";
import * as Renderer from "react-test-renderer";
import PokemonTeam from "./PokemonTeam";
import { Pokemon } from "../data/dataType";

describe("Pokemon Team component", () => {
  let pokemonList: Pokemon[] = [
    {
      name: "fakemon 1",
      learnSet: ["attack"],
      moves: [],
      types: [{ name: "water", color: "blue" }],
      abilitySet: [],
      ability: { name: "fakebilty", recieveDamageMultiplier: (t, m) => m }
    },
    {
      name: "fakemon 2",
      learnSet: ["attack"],
      moves: [],
      types: [{ name: "fire", color: "red" }],
      abilitySet: [],
      ability: { name: "fakebilty", recieveDamageMultiplier: (t, m) => m }
    },
    {
      name: "fakemon 3",
      learnSet: ["attack"],
      moves: [],
      types: [{ name: "water", color: "blue" }, { name: "fire", color: "red" }],
      abilitySet: [],
      ability: { name: "fakebilty", recieveDamageMultiplier: (t, m) => m }
    }
  ];

  it("renders as snapshot", () => {
    let pokemonTeam = Renderer.create(
      <PokemonTeam
        pokemonTeam={[null]}
        selectablePokemon={pokemonList}
        onPokemonSelected={() => {}}
      />
    ).toJSON();

    expect(pokemonTeam).toMatchSnapshot();
  });
});
