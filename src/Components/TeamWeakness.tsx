import * as React from "react";
import { Pokemon } from "../data/dataType";

export interface IWeakness {
  Type: string;
  Count: number;
}
interface IWeaknessProps {
  weakness: IWeakness[];
  TeamSelection: Pokemon[];
}

export default class TeamWeakness extends React.Component<IWeaknessProps, {}> {
  private weakCalculator(Pokemon: Pokemon[]): IWeakness[] {
    let dictionary = {};
    let weak: IWeakness[] = [];
    Pokemon.forEach(selectedPokemon => {
      selectedPokemon.types.forEach(selectedType => {
        selectedType.doubleDamageFrom!.forEach(doubleDamage => {
          if (!dictionary[doubleDamage]) dictionary[doubleDamage] = 0;
          dictionary[doubleDamage] += 1;
        });
      });
    });
    for (let key in dictionary) {
      let w: IWeakness = { Type: key, Count: dictionary[key] };
      weak.push(w);
    }
    return weak;
  }
  public render() {
    const totalWeakness = this.weakCalculator(this.props.TeamSelection);
    const fake = totalWeakness.map((team, i) => (
      <li key={i}>
        {team.Type}
        {team.Count}
      </li>
    ));
    return (
      <div>
        <ul>{fake}</ul>
      </div>
    );
  }
}
