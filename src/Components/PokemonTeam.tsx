import * as React from "react";
import { Pokemon } from "../data/dataType";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ListGroup
} from "reactstrap";

interface IPokemonTeamProps {
  selectablePokemon: Pokemon[];
  pokemonTeam: Pokemon[];
  onPokemonSelected(index: number, pokemon: Pokemon): void;
}

export default class PokemonTeam extends React.Component<
  IPokemonTeamProps,
  {}
> {
  public dropDownHandler = (index, event) => {
    this.props.onPokemonSelected(
      index,
      this.props.selectablePokemon[event.currentTarget.value]
    );
  };

  public render() {
    return (
      <ListGroup>
        {this.props.pokemonTeam.map((selectedPokemon, selectionIndex) => (
          <UncontrolledDropdown key={selectionIndex}>
            <DropdownToggle caret>
              {selectedPokemon ? selectedPokemon.name : "Select pokemon"}
            </DropdownToggle>
            <DropdownMenu>
              {this.props.selectablePokemon.map((pokemon, i) => (
                <DropdownItem
                  key={i}
                  value={i}
                  onClick={e => this.dropDownHandler(selectionIndex, e)}
                >
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
