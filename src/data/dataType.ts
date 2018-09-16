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
