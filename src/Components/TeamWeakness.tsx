import * as React from "react";

export interface IWeakness {
  Type: string;
  Count: number;
}
interface IWeaknessProps {
  weakness: IWeakness[];
}

export default class TeamWeakness extends React.Component<IWeaknessProps, {}> {
  public render() {
    const fake = this.props.weakness.map(fakeTeam => (
      <li>
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
