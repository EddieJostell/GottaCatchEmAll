import React, { Fragment, useEffect, useState } from "react";
import { IntroScreen } from "./components/IntroScreen/IntoScreen";
import { PokeCard } from "./components/PokeCard/PokeCard";
import "./App.scss";

//Game Engine
function App() {
  //Start Game State
  const [startGame, setStartGame] = useState<boolean>(false);

  //Engine State
  const [allPokemons, setAllPokemons] = useState<any>([]);
  const [loadPoke, setLoadPoke] = useState("https://pokeapi.co/api/v2/pokemon?limit=20");
  const [collectedPokemons, setCollectedPokemons] = useState<any>([]);
  const [coins, setCoins] = useState<number>(50);
  const [cardArray, setCardArray] = useState<any>([]);

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

  const handleCollectPokemon = (poke: any, index: number) => {
    setCollectedPokemons((currentPokemons: any) => [...currentPokemons, poke]);
    setCardArray(cardArray.filter((value: any, i: any) => i !== index));
  };

  const buyPack = () => {
    for (let i = 0; i < 5; i++) {
      const randomCard = allPokemons[Math.floor(Math.random() * allPokemons.length)];
      cardArray.push(randomCard);
      setCardArray([...cardArray]);
      setCoins(coins - 25);
    }
  };

  const buyOneCard = () => {
    const randomCard = allPokemons[Math.floor(Math.random() * allPokemons.length)];
    cardArray.push(randomCard);
    setCardArray([...cardArray]);
    setCoins(coins - 5);
  };

  return (
    <Fragment>
      {startGame ? (
        <Fragment>
          <button onClick={() => setCoins(coins + 100)}>CHEAT BUTTON! GET 100 COINS</button>
          <button>Show pokedex:</button>
          <div>I HAVE Coins: {coins}</div>
          <button disabled={coins < 5} onClick={buyOneCard}>
            Buy one card: COST 5 COINS
          </button>
          <button disabled={coins < 25} onClick={buyPack}>
            Buy Pack (5): COST 25 COINS
          </button>
          <div className="pokemon-container">
            {cardArray.map((pokemon: any, index: any) => (
              <PokeCard
                key={index}
                id={pokemon.id}
                sprites={pokemon.sprites.front_default}
                types={pokemon.types}
                name={pokemon.name}
                addPokemonClick={() => handleCollectPokemon(pokemon, index)}
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
