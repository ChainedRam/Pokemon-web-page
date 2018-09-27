export interface Pokemon {
  name: string;
  types: Type[];
  moves: string[];
  learnSet: string[];
  abilitySet: Ability[];

  ability?: Ability;
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
  recieveDamageMultiplier: (type: string, multiplier: number) => number;
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

export function GetTypesNamesList(): String[] {
  return require("./typeList.json");
}

export function GetPokemonList(): Pokemon[] {
  let pokeList: Pokemon[] = [];
  let typeDict = GetTypesDictionary();

  let rawPokeList = require("./pokeList.json") as any[];

  let i = 0;
  let testAbility = [
    "volt-absorb",
    "water-absorb",
    "levitate",
    "flash-fire",
    "lightning-rod",
    "thick-fat",
    "motor-drive",
    "heatproof",
    "dry-skin",
    "storm-drain",
    "sap-sipper",
    "water-bubble",
    "fluffy"
  ];

  rawPokeList.forEach(p => {
    pokeList.push({
      name: p.name,
      types: p.types.map(t => typeDict[t]),
      learnSet: p.moves,
      abilitySet: [] /*p.abilities.map(a => {
        return {
          name: a,
          recieveDamageMultiplier: GetAbilityLambdaNamed(a)
        };
      })*/,
      ability: {
        name: testAbility[i % testAbility.length],
        recieveDamageMultiplier: GetAbilityLambdaNamed(
          testAbility[i++ % testAbility.length]
        )
      }
    } as Pokemon);
  });

  return pokeList;
}

export function GetPokeDictionary(): PokemonDictionary {
  let pokeList = GetPokemonList();

  let pokeDict = {};

  pokeList.forEach(p => {
    pokeDict[p.name] = p;
  });

  return pokeDict;
}

function GetAbilityLambdaNamed(
  abilityName: string
): (t: string, m: number) => number {
  let builder = (s, tm = 1, fm = 1) => {
    return (t: string, m: number) => (t == s ? m * tm : m * fm);
  };

  let heal = s => {
    return builder(s, -1);
  };

  let immune = s => {
    return builder(s, 0);
  };

  let resist = s => {
    return builder(s, 0.5);
  };

  let double = s => {
    return builder(s, 2);
  };

  switch (abilityName) {
    case "volt-absorb":
      return heal("electric");
    case "water-absorb":
      return heal("water");
    case "levitate":
      return immune("ground");
    case "flash-fire":
      return immune("fire");
    case "lightning-rod":
      return immune("electric");
    case "thick-fat":
      return (t, m) => (t == "fire" || t == "ice" ? 0.5 : m);
    case "motor-drive":
      return immune("electric");
    case "heatproof":
      return (t, m) => (t == "fire" ? 0.5 : m);
    case "dry-skin":
      return (t, m) => (t == "water" ? -m : t == "fire" ? m * 1.25 : m);
    // case "filter":
    //   return ???;
    case "storm-drain":
      return immune("water");
    case "sap-sipper":
      return immune("grass");
    case "water-bubble":
      return resist("fire");
    case "fluffy": //#TODO: halves damage taken from oves that make direct contact.
      return double("fire");

    default:
      return (t, m) => m;
  }
}
