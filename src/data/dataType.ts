export interface Pokemon {
  name: string;
  types: Type[];
  learnableMoves: string[];
}

export interface PokemonDictionary {
  [pokeName: string]: Pokemon;
}

export interface Type {
  name: string;
  noDamageTo?: string[];
  halfDamageTo?: string[];
  doubleDamageTo?: string[];

  noDamageFrom?: string[];
  halfDamageFrom?: string[];
  doubleDamageFrom?: string[];
}

export interface TypeDictionary {
  [pokeName: string]: Type;
}

import rawTypeDict from "./typeDict.json";

export function GetTypesDictionary(): TypeDictionary {
  return rawTypeDict as TypeDictionary;
}

import rawPokeDict from "./pokeDict.json";

export function GetPokeDictionary(): PokemonDictionary {
  let pokeDict: PokemonDictionary = {};
  let typeDict = GetTypesDictionary();
  for (let key in rawPokeDict) {
    pokeDict[key] = {
      name: key,
      types: rawPokeDict[key].types.map(t => typeDict[t]),
      learnableMoves: []
    };
  }

  return pokeDict;
}

import rawPokeList from "./pokeList.json";

export function GetPokemonList(): Pokemon[] {
  let pokeList: Pokemon[] = [];
  let typeDict = GetTypesDictionary();

  rawPokeList.forEach(p => {
    pokeList.push({
      name: p.name,
      types: p.types.map(t => typeDict[t]),
      learnableMoves: []
    });
  });

  return pokeList;
}
