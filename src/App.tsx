import * as React from "react";
import "./App.css";
import PokemonTeam from "./Components/PokemonTeam";
import TeamWeakness from "./Components/TeamWeakness";

class App extends React.Component {
  public render() {
    return (
      <div>
        <PokemonTeam
          list={["Charmander", "Squirtle", "Bulbasaur"]}
          onPokemonSelected={(i, p) => {
            console.log(i, p);
          }}
        />
        <TeamWeakness
          weakness={[{ Type: "Fire", Count: 2 }, { Type: "Water", Count: 4 }]}
        />
      </div>
    );
  }
}

export default App;
