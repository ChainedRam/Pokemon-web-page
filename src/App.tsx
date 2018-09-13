import * as React from "react";
import "./App.css";
import PokemonTeam from "./Components/PokemonTeam";
import TeamWeakness from "./Components/TeamWeakness";

class App extends React.Component {
  public render() {
    return (
      <div>
        <PokemonTeam />
        <TeamWeakness />
      </div>
    );
  }
}

export default App;
