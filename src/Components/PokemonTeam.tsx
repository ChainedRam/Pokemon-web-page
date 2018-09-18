import * as React from "react";
import { Pokemon } from "../data/dataType";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ListGroup
  //ListGroupItem
} from "reactstrap";

interface ITeamListProps {
  list: Pokemon[];
  selection: Pokemon[];
  onPokemonSelected(index: number, pokemon: Pokemon): void;
}

export default class PokemonTeam extends React.Component<ITeamListProps, {}> {
  public onSelect = (i, e) => {
    this.props.onPokemonSelected(i, this.props.list[e.currentTarget.value]);
  };

  public render() {
    return (
      <ListGroup>
        {this.props.selection.map((selectedPokemon, si) => (
          <UncontrolledDropdown>
            <DropdownToggle caret>{selectedPokemon.name}</DropdownToggle>
            <DropdownMenu>
              {this.props.list.map((pokemon, i) => (
                <DropdownItem value={i} onClick={e => this.onSelect(si, e)}>
                  {pokemon.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        ))}
      </ListGroup>
    );
  }
}
