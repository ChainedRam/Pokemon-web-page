import * as React from "react";
import * as Renderer from "react-test-renderer";
import PokemonTeam from "./PokemonTeam";
import { Pokemon } from "../data/dataType";

describe("Pokemon Team component", () => {
  let pokemonList: Pokemon[] = [
    {
      name: "fakemon 1",
      learnableMoves: ["attack"],
      types: [{ name: "water", color: "blue" }]
    },
    {
      name: "fakemon 2",
      learnableMoves: ["attack"],
      types: [{ name: "fire", color: "red" }]
    },
    {
      name: "fakemon 3",
      learnableMoves: ["attack"],
      types: [{ name: "water", color: "blue" }, { name: "fire", color: "red" }]
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