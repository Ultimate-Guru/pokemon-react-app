import { useState } from "react";
import axios from "axios";

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "",
    species: "",
    image: "",
    hp: "",
    attack: "", 
    defense: "",
    type: "",
  });

  const searchPokemon = () => { 
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`) // Added toLowerCase() to handle case sensitivity
      .then((response) => {
        setPokemon({
          name: pokemonName,
          species: response.data.species.name,
          image: response.data.sprites.front_default,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          type: response.data.types[0].type.name,
        });
        setPokemonChosen(true);
      })
      .catch((error) => { // Added error handling
        console.error(error);
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchPokemon();
    }
  }

  return (
    <div className="App">
      <div className="TitleSection">
        <h1>Pokemon Status</h1>
        <input
          type="text"
          value={pokemonName} 
          onChange={(event) => {
            setPokemonName(event.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
        <button onClick={searchPokemon}>Search Pokemon</button>
      </div>

      <div className="DisplaySection">
        {!pokemonChosen ? (
          <h1>Please choose a pokemon</h1>
        ) : (
          <>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.image} alt={pokemon.name} />
            <h3>Species: {pokemon.species}</h3>
            <h3>Type: {pokemon.type}</h3>
            <h4>Hp: {pokemon.hp}</h4>
            <h4>Attack: {pokemon.attack}</h4>
            <h4>Defense: {pokemon.defense}</h4>
          </>
        )}
      </div>
    </div>
  );
}

export default App;