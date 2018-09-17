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
interface IWeaknessState {}
//private WeakCalculator() {
//let WeakTo: string[]
//WeakTo.push()
//}

export default class TeamWeakness extends React.Component<
  IWeaknessProps,
  IWeaknessState
> {
  public render() {
    const fake = this.props.weakness.map((fakeTeam, i) => (
      <li key={i}>
        {fakeTeam.Type}
        {fakeTeam.Count}
      </li>
    ));
    return (
      <div>
        <ul>{fake}</ul>
      </div>
    );
  }
}
