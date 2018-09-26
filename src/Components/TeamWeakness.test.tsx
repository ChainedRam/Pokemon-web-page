import * as React from "react";
import * as Renderer from "react-test-renderer";
import TeamWeakness from "./TeamWeakness";
import { Pokemon, Type } from "../data/dataType";

describe("TeamWeakness component", () => {
  let fakeType1: Type = {
    color: "ffffff",
    name: "fire",
    doubleDamageFrom: ["water"],
    halfDamageFrom: [],
    noDamageFrom: []
  };

  let fakeType2: Type = {
    color: "bbbbbb",
    name: "water",
    doubleDamageFrom: ["water"],
    halfDamageFrom: [],
    noDamageFrom: []
  };

  let pokemonTeam: Pokemon[] = [
    {
      name: "fakemon 1",
      learnableMoves: ["attack"],
      types: [fakeType1]
    },
    {
      name: "fakemon 2",
      learnableMoves: ["attack"],
      types: [fakeType2]
    },
    {
      name: "fakemon 3",
      learnableMoves: ["attack"],
      types: [fakeType1, fakeType2]
    }
  ];

  it("renders as snapshot", () => {
    let teamWeakness = Renderer.create(
      <TeamWeakness team={pokemonTeam} />
    ).toJSON();

    expect(teamWeakness).toMatchSnapshot();
  });
});
