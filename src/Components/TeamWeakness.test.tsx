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
      learnSet: ["attack"],
      types: [fakeType1],
      moves: [],
      abilitySet: [],
      ability: { name: "fakebilty", recieveDamageMultiplier: (t, m) => m }
    },
    {
      name: "fakemon 2",
      learnSet: ["attack"],
      types: [fakeType2],
      moves: [],
      abilitySet: [],
      ability: { name: "fakebilty", recieveDamageMultiplier: (t, m) => m }
    },
    {
      name: "fakemon 3",
      learnSet: ["attack"],
      types: [fakeType1, fakeType2],
      moves: [],
      abilitySet: [],
      ability: { name: "fakebilty", recieveDamageMultiplier: (t, m) => m }
    }
  ];

  it("renders as snapshot", () => {
    let teamWeakness = Renderer.create(
      <TeamWeakness team={pokemonTeam} />
    ).toJSON();

    expect(teamWeakness).toMatchSnapshot();
  });
});
