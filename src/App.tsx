import React, { Fragment, useEffect, useState } from "react";
import "./App.scss";
import { IntroScreen } from "./components/IntroScreen/IntoScreen";
import { PokeCard } from "./components/PokeCard/PokeCard";

//Game Engine
function App() {
  //Start Game State
  const [startGame, setStartGame] = useState<boolean>(false);

  //Engine State
  const [allPokemons, setAllPokemons] = useState<any>([]);
  const [loadPoke, setLoadPoke] = useState("https://pokeapi.co/api/v2/pokemon?limit=50");
  const [collectedPokemons, setCollectedPokemons] = useState<any>([]);

  const handleStartGame = () => {
    setStartGame(true);
  };

  const getAllPokemons = async () => {
    const res = await fetch(loadPoke);
    const data = await res.json();
    setLoadPoke(data.next);

    function createPokemonObject(result: any[]) {
      result.forEach(async (pokemon) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        const data = await res.json();
        setAllPokemons((currentList: any) => [...currentList, data]);
      });
    }
    createPokemonObject(data.results);
  };
  useEffect(() => {
    getAllPokemons();
  }, []);

  let randomizePokemons = allPokemons.sort(() => 0.5 - Math.random()).slice(0, 3);

  console.log("Collected Pokemons", collectedPokemons);

  const handleCollectPokemon = (poke: any) => {
    setCollectedPokemons((currentPokemons: any) => [...currentPokemons, poke]);
  };

  return (
    <Fragment>
      {startGame ? (
        <Fragment>
          <button>Show pokedex:</button>
          <div>Coins: 5</div>
          <button>Buy cards</button>
          <div className="pokemon-container">
            {randomizePokemons.map((pokemon: any, index: any) => (
              <PokeCard
                key={index}
                id={pokemon.id}
                sprites={pokemon.sprites.front_default}
                types={pokemon.types}
                name={pokemon.name}
                addPokemonClick={() => handleCollectPokemon(pokemon)}
              />
            ))}
          </div>
        </Fragment>
      ) : (
        <IntroScreen onClick={handleStartGame} />
      )}
    </Fragment>
  );
}

export default App;
