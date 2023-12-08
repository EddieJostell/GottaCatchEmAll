import React, { useEffect, useState } from "react";
import { DashBoard } from "./components/DashBoard/DashBoard";
import { usePokemonContext } from "./components/PokemonContext/PokemonContext";
import "./App.scss";

//Game Engine
function App() {
  //Context
  const { pokemonContext, setPokemonContext } = usePokemonContext();

  //Start Game State
  const [startGame, setStartGame] = useState<boolean>(true);

  //Engine State
  const [allPokemons, setAllPokemons] = useState<any>([]);
  const [loadPoke, setLoadPoke] = useState("https://pokeapi.co/api/v2/pokemon?limit=5");

  //Vi behöver localStorage här också, det är arrayen som visar pokemons man köpt innan dom hamnar i pokedex
  const [cardArray, setCardArray] = useState<any>([]);
  const [cardIsVisible, setCardIsVisible] = useState<boolean>(false);

  //Array of Collected Pokemons
  const [collectedPokemons, setCollectedPokemons] = useState(
    JSON.parse(localStorage.getItem("collectedPokemons") ?? "null") || []
  );

  useEffect(() => {
    localStorage.setItem("collectedPokemons", JSON.stringify(collectedPokemons));
    setPokemonContext({ ...pokemonContext, collectedPokemons: collectedPokemons });
  }, [collectedPokemons]);

  const handleStartGame = () => {
    setStartGame(!startGame);
    setCardArray([...cardArray]);
  };

  const getAllPokemons = async () => {
    const res = await fetch(loadPoke);
    const data = await res.json();
    setLoadPoke(data.next);

    function createPokemonObject(result: any[]) {
      result.forEach(async (pokemon) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        const data = await res.json();

        data.cardVisible = false;
        data.isBusyOnQuest = false;

        setAllPokemons((currentList: any) => [...currentList, data]);
      });
    }
    createPokemonObject(data.results);
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  useEffect(() => {
    const allCardsShown = cardArray.every((obj: { cardVisible: boolean }) => obj.cardVisible === true);
    setCardIsVisible(allCardsShown);

    if (cardArray.length === 0) {
      setCardIsVisible(false);
    }
  }, [cardArray]);

  const handleCollectPokemon = (poke: any, index: number) => {
    const indexOfPokemon = collectedPokemons.findIndex((item: any) => item.id === poke.id);

    if (indexOfPokemon !== -1) {
/*       collectedPokemons[indexOfPokemon].collected += 1;
      const updatedPokemons = Array.from(collectedPokemons);
      setCollectedPokemons(updatedPokemons); */
    } else {
/*       poke.collected = 1; */
      setCollectedPokemons((currentPokemons: any) => [...currentPokemons, poke]);
    }
    setCardArray(cardArray.filter((value: any, i: any) => i !== index));
  };

  const buyPack = () => {
    if (pokemonContext.coins >= 5 && cardArray.length === 0) {
      for (let i = 0; i < 5; i++) {
        const randomCard = allPokemons[Math.floor(Math.random() * allPokemons.length)];
        cardArray.push(randomCard);
        setCardArray([...cardArray]);
      }
      setPokemonContext({ ...pokemonContext, coins: pokemonContext.coins - 5 });
    }
  };

  const cardClick = (pokemon: any) => {
    pokemon.cardVisible = true;
    const allCardsShown = cardArray.every((obj: { cardVisible: boolean }) => obj.cardVisible === true);
    setCardIsVisible(allCardsShown);

    if (cardArray.length === 0) {
      setCardIsVisible(false);
    }
  };

  return (
    <>
      <DashBoard
        buyPack={buyPack}
        handleStartGame={handleStartGame}
        startGame={startGame}
        collectedPokemons={pokemonContext.collectedPokemons}
        allPokemons={allPokemons}
        cardClick={cardClick}
        cardIsVisible={cardIsVisible}
        cardArray={cardArray}
        handleCollectPokemon={handleCollectPokemon}
      />
    </>
  );
}

export default App;
