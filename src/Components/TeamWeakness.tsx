import * as React from "react";
import { Pokemon, Type, GetTypesDictionary } from "../data/dataType";
import { ListGroup, ListGroupItem, Badge } from "reactstrap";

interface ITypeCountPair {
  type: Type;
  count: number;
}
interface IWeaknessProps {
  team: Pokemon[];
}

export default class TeamWeakness extends React.Component<IWeaknessProps, {}> {
  private getWeaknessList(pokemons: Pokemon[]): ITypeCountPair[] {
    let weaknessDict = {};
    pokemons.forEach(pokemon => {
      if (pokemon == null) return;
      pokemon.types.forEach(type => {
        type.doubleDamageFrom!.forEach(TypeName => {
          if (!weaknessDict[TypeName]) weaknessDict[TypeName] = 0;
          weaknessDict[TypeName] += 1;
        });
      });
    });

    let typeDict = GetTypesDictionary();
    let weak: ITypeCountPair[] = [];
    for (let key in weaknessDict) {
      weak.push({ type: typeDict[key], count: weaknessDict[key] });
    }

    return weak.sort(a => -a.count);
  }
  public render() {
    const totalWeakness = this.getWeaknessList(this.props.team);

    return (
      <div>
        <ListGroup>
          {totalWeakness.map((team, i) => (
            <ListGroupItem key={i}>
              <Badge
                style={{
                  backgroundColor: `#${team.type.color}`,
                  color: "white"
                }}
              >
                {team.type.name}
              </Badge>
              <Badge pill>{team.count}</Badge>
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}
