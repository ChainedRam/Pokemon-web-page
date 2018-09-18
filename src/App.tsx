import * as React from "react";
import "./App.css";
import PokemonTeam from "./Components/PokemonTeam";
import TeamWeakness from "./Components/TeamWeakness";
import * as DataType from "./data/dataType";
import { Card, Container } from "reactstrap";

interface IFullTeam {
  fullTeam: DataType.Pokemon[];
}

class App extends React.Component<{}, IFullTeam> {
  EmptyPokemon: DataType.Pokemon = {
    name: "empty",
    types: [],
    learnableMoves: []
  };
  state = {
    fullTeam: [
      this.EmptyPokemon,
      this.EmptyPokemon,
      this.EmptyPokemon,
      this.EmptyPokemon,
      this.EmptyPokemon,
      this.EmptyPokemon
    ] as DataType.Pokemon[]
  };
  public render() {
    let pokemons = DataType.GetPokemonList();
    return (
      <Container className="row">
        <Card className="col-md-4">
          <PokemonTeam
            list={pokemons}
            onPokemonSelected={(i, p) => {
              const fullTeamCopy = [...this.state.fullTeam];
              fullTeamCopy[i] = p;
              this.setState({ fullTeam: fullTeamCopy });
            }}
          />
        </Card>
        <Card className="col-md-8">
          <TeamWeakness TeamSelection={this.state.fullTeam} />
        </Card>
      </Container>
    );
  }
}

export default App;
