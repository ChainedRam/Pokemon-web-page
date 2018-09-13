import * as React from "react";

export default class TeamWeakness extends React.Component {
  state = {};
  public FakeTeamWeakness = [
    { Type: "Fire", Count: 2 },
    { Type: "Water", Count: 4 },
    { Type: "Grass", Count: 6 }
  ];
  public render() {
    const fake = this.FakeTeamWeakness.map(fakeTeam => (
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
