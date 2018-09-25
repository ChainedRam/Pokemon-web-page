import * as React from "react";
import "./App.css";
import PokemonTeam from "./Components/PokemonTeam";
import TeamWeakness from "./Components/TeamWeakness";
import FilterMode from "./Components/FilterMode";
import * as DataType from "./data/dataType";
import { Card, Container, Row, Col } from "reactstrap";

interface ITeam {
  Team: DataType.Pokemon[];
  Types: DataType.Type[];
  pokemonList: DataType.Pokemon[];
  filteredList: DataType.Pokemon[];
}

class App extends React.Component<{}, ITeam> {
  state = {
    Team: [null, null, null, null, null, null] as DataType.Pokemon[],
    Types: DataType.GetTypeList(),
    pokemonList: DataType.GetPokemonList(),
    filteredList: DataType.GetPokemonList()
  };
  public onFilter = (filteredList: DataType.Pokemon[]) => {
    {
      this.setState({ filteredList });
    }
  };
  public pokemonSelectedHandler = (i, p) => {
    {
      const TeamCopy = [...this.state.Team];
      TeamCopy[i] = p;
      this.setState({ Team: TeamCopy });
    }
  };
  public render() {
    const types = DataType.GetTypeList();
    return (
      <Container>
        <Row>
          <Card>
            <Col md="4">
              <PokemonTeam
                selectablePokemon={this.state.filteredList}
                pokemonTeam={this.state.Team}
                onPokemonSelected={this.pokemonSelectedHandler}
              />
            </Col>
          </Card>
          <Card>
            <Col xl="auto">
              <TeamWeakness team={this.state.Team} />
            </Col>
          </Card>
        </Row>
        <FilterMode
          filteredSelection={types}
          pokemonList={this.state.pokemonList}
          onFiltered={this.onFilter}
        />
      </Container>
    );
  }
}

export default App;
