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
  color: string;

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

export function GetTypesDictionary(): TypeDictionary {
  return require("./typeDict.json");
}

export function GetPokeDictionary(): PokemonDictionary {
  let rawPokeDict = require("./pokeDict.json");
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

export function GetPokemonList(): Pokemon[] {
  let pokeList: Pokemon[] = [];
  let typeDict = GetTypesDictionary();

  let rawPokeList = require("./pokeList.json") as any[];

  rawPokeList.forEach(p => {
    pokeList.push({
      name: p.name,
      types: p.types.map(t => typeDict[t]),
      learnableMoves: []
    });
  });

  return pokeList;
}
