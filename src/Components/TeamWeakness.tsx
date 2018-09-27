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
  typeDict = GetTypesDictionary();

  private getWeaknessList(pokemons: Pokemon[]): ITypeCountPair[] {
    let weaknessDict: { [n: string]: number } = {};

    //calculate weakness multiplier
    pokemons.forEach(pokemon => {
      if (pokemon == null) return;
      let weaknessMultiplier: { [n: string]: number } = {};
      pokemon.types.forEach(type => {
        type.doubleDamageFrom!.forEach(typeName => {
          if (weaknessMultiplier[typeName] == null)
            weaknessMultiplier[typeName] = 1;
          weaknessMultiplier[typeName] *= 2;
        });
        type.halfDamageFrom!.forEach(typeName => {
          if (weaknessMultiplier[typeName] == null)
            weaknessMultiplier[typeName] = 1;
          weaknessMultiplier[typeName] *= 0.5;
        });
        type.noDamageFrom!.forEach(typeName => {
          if (weaknessMultiplier[typeName] == null)
            weaknessMultiplier[typeName] = 1;
          weaknessMultiplier[typeName] *= 0.0;
        });
      });

      //count weaknesses
      for (let type in weaknessMultiplier) {
        //include abilities
        weaknessMultiplier[type] = pokemon.ability!.recieveDamageMultiplier(
          type,
          weaknessMultiplier[type]
        );
        if (weaknessMultiplier[type] > 1) {
          if (!weaknessDict[type]) weaknessDict[type] = 0;
          weaknessDict[type] += 1;
        }
      }
    });

    let weak: ITypeCountPair[] = [];
    for (let key in weaknessDict) {
      weak.push({ type: this.typeDict[key], count: weaknessDict[key] });
    }

    return weak.sort((a, b) => b.count - a.count);
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
