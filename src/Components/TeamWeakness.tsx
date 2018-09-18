import * as React from "react";
import { Pokemon, Type, GetTypesDictionary } from "../data/dataType";
import { ListGroup, ListGroupItem, Badge } from "reactstrap";

export interface IWeakness {
  Type: Type;
  Count: number;
}
interface IWeaknessProps {
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

    let typeDict = GetTypesDictionary();

    for (let key in dictionary) {
      let w: IWeakness = { Type: typeDict[key], Count: dictionary[key] };
      weak.push(w);
    }
    return weak;
  }
  public render() {
    const totalWeakness = this.weakCalculator(this.props.TeamSelection);
    const fake = totalWeakness.map((team, i) => (
      <ListGroupItem key={i}>
        <Badge
          style={{ backgroundColor: `#${team.Type.color}`, color: "white" }}
        >
          {team.Type.name}
        </Badge>
        :{team.Count}
      </ListGroupItem>
    ));
    return <ListGroup>{fake}</ListGroup>;
  }
}
