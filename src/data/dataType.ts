export interface Pokemon {
  name: string;
  types: Type[];
  moves: string[];
  abilities: Ability[];
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

export interface Ability {
  name: string;
  recieveDamageMultiplier: (type: string) => number;
}

export interface TypeDictionary {
  [pokeName: string]: Type;
}

export function GetTypesDictionary(): TypeDictionary {
  return require("./typeDict.json");
}

export function GetTypeList(): Type[] {
  return require("./typeList.json");
}

export function GetPokeDictionary(): PokemonDictionary {
  let rawPokeDict = require("./pokeDict.json");
  let pokeDict: PokemonDictionary = {};
  let typeDict = GetTypesDictionary();
  for (let key in rawPokeDict) {
    pokeDict[key] = {
      name: key,
      types: rawPokeDict[key].types.map(t => typeDict[t]),
      moves: [],
      abilities: rawPokeDict[key].abilities.map(a => {
        return {
          name: a.name,
          recieveDamageMultiplier: GetAbilityLambdaNamed(a.name)
        };
      })
    };
  }

  return pokeDict;
}

export function GetTypesNamesList(): String[] {
  return require("./typeList.json");
}

export function GetPokemonList(): Pokemon[] {
  let pokeList: Pokemon[] = [];
  let typeDict = GetTypesDictionary();

  let rawPokeList = require("./pokeList.json") as any[];

  rawPokeList.forEach(p => {
    pokeList.push({
      name: p.name,
      types: p.types.map(t => typeDict[t]),
      moves: [],
      abilities: p.abilities.map(a => {
        return {
          name: a.name,
          recieveDamageMultiplier: GetAbilityLambdaNamed(a.name)
        };
      })
    } as Pokemon);
  });

  return pokeList;
}

function GetAbilityLambdaNamed(abilityName: string): (t: string) => number {
  return t => 1;
}
