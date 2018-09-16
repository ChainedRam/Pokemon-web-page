import * as React from "react";
import "./App.css";
import PokemonTeam from "./Components/PokemonTeam";
import TeamWeakness from "./Components/TeamWeakness";

interface IFullTeam {
  fullTeam: string[];
}

class App extends React.Component<{}, IFullTeam> {
  state = {
    fullTeam: ["", "", "", "", "", ""]
  };
  public render() {
    console.log(this.state.fullTeam);
    return (
      <div>
        <p>{...this.state.fullTeam}</p>
        <PokemonTeam
          list={["Charmander", "Squirtle", "Bulbasaur"]}
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
