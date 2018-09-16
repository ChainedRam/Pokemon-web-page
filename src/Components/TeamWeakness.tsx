import * as React from "react";

export interface IWeakness {
  Type: string;
  Count: number;
}
interface IWeaknessProps {
  weakness: IWeakness[];
  TeamSelection: string[];
}

export default class TeamWeakness extends React.Component<IWeaknessProps, {}> {
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
