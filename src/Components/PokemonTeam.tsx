import * as React from "react";
import { Pokemon } from "../data/dataType";

interface ITeamListProps {
  list: Pokemon[];
  onPokemonSelected(index: number, pokemon: Pokemon): void;
}

export default class PokemonTeam extends React.Component<ITeamListProps, {}> {
  public onSelect = (i, e) => {
    this.props.onPokemonSelected(i, this.props.list[e.currentTarget.value]);
  };

  public render() {
    const maxTeam: any = [];
    const pokeItems = this.props.list.map((pokes, i) => (
      <option key={i} value={i}>
        {pokes.name}
      </option>
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
