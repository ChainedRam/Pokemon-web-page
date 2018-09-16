import * as React from "react";
import "./App.css";
import PokemonTeam from "./Components/PokemonTeam";
import TeamWeakness from "./Components/TeamWeakness";
import * as pokeDict from "./data/dataType";

interface IFullTeam {
  fullTeam: pokeDict.Pokemon[];
}

class App extends React.Component<{}, IFullTeam> {
  EmptyPokemon: pokeDict.Pokemon = {
    name: "fake",
    types: [],
    learnableMoves: []
  };
  pokeDict: pokeDict.Pokemon = JSON.parse("./data/pokeDict.json");
  state = {
    fullTeam: [
      this.EmptyPokemon,
      this.EmptyPokemon,
      this.EmptyPokemon,
      this.EmptyPokemon,
      this.EmptyPokemon,
      this.EmptyPokemon
    ] as pokeDict.Pokemon[]
  };
  public render() {
    return (
      <div>
        <p>{...this.state.fullTeam}</p>
        <PokemonTeam
          list={["none", "Charmander", "Squirtle", "Bulbasaur"]}
          onPokemonSelected={(i, p) => {
            const fullTeamCopy = [...this.state.fullTeam];
            fullTeamCopy[i] = pokeDict[p];
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
