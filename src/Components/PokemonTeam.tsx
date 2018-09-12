import * as React from "react";

export default class PokeTeam extends React.Component {
  public pokemon = ["jirachi", "Terrakion", "Mawile", "Giratina", "Beelzebub"];

  public render() {
    const maxTeam: any = [];
    const pokeItems = this.pokemon.map((pokes, i) => (
      <option key={i}>{pokes}</option>
    ));
    for (let i = 0; i < 6; i++) {
      maxTeam.push(
        <li>
          <select className="btn btn-secondary">{pokeItems}</select>
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
