import * as React from "react";
import "./App.css";
import PokemonTeam from "./Components/PokemonTeam";
import TeamWeakness from "./Components/TeamWeakness";
import * as DataType from "./data/dataType";

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
      <div>
        <PokemonTeam
          list={pokemons}
          onPokemonSelected={(i, p) => {
            const fullTeamCopy = [...this.state.fullTeam];
            fullTeamCopy[i] = p;
            this.setState({ fullTeam: fullTeamCopy });
          }}
        />
        <TeamWeakness
          weakness={[{ Type: "Fire", Count: 2 }, { Type: "Water", Count: 4 }]}
          TeamSelection={this.state.fullTeam}
        />
      </div>
    );
  }
}

export default App;
