import * as React from "react";

interface ITeamListProps {
  list: string[];
  onPokemonSelected(index: number, name: string): void;
}

export default class PokeTeam extends React.Component<ITeamListProps, {}> {
  public onSelect = (i, e) => {
    this.props.onPokemonSelected(i, e.currentTarget.value);
  };

  public render() {
    const maxTeam: any = [];
    const pokeItems = this.props.list.map((pokes, i) => (
      <option key={i}>{pokes}</option>
    ));
    for (let i = 0; i < 6; i++) {
      maxTeam.push(
        <li key={i}>
          <select
            className="btn btn-secondary"
            onChange={e => this.onSelect(i, e)}
          >
            {pokeItems}
          </select>
        </li>
      );
    }
    return (
      <div>
        <ul>{maxTeam}</ul>
      </div>
    );
  }
}
