import * as React from "react";
import * as Renderer from "react-test-renderer";
import PokemonTeam from "./PokemonTeam";
import { Pokemon } from "../data/dataType";

describe("Pokemon Team component", () => {
  let pokemonList: Pokemon[] = [
    {
      name: "fakemon 1",
      learnSet: ["attack"],
      types: [{ name: "water", color: "blue" }],
      abilitySet: []
    },
    {
      name: "fakemon 2",
      learnSet: ["attack"],
      types: [{ name: "fire", color: "red" }],
      abilitySet: []
    },
    {
      name: "fakemon 3",
      learnSet: ["attack"],
      types: [{ name: "water", color: "blue" }, { name: "fire", color: "red" }],
      abilitySet: []
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
