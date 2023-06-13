import React, { Fragment, useEffect, useState } from "react";
import { PokeCard } from "./components/PokeCard/PokeCard";
import { DashBoard } from "./components/DashBoard/DashBoard";
import "./App.scss";

//Game Engine
function App() {
  //Start Game State
  const [startGame, setStartGame] = useState<boolean>(true);

  //Engine State
  const [allPokemons, setAllPokemons] = useState<any>([]);
  const [loadPoke, setLoadPoke] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );
  const [collectedPokemons, setCollectedPokemons] = useState<any>([]);
  const [cardArray, setCardArray] = useState<any>([]);
  const [cardIsVisible, setCardIsVisible] = useState<boolean>(false);
  const [coins, setCoins] = useState<number>(100);

  const handleStartGame = () => {
    const randomCard =
      allPokemons[Math.floor(Math.random() * allPokemons.length)];
    setStartGame(!startGame);
    cardArray.push(randomCard);
    setCardArray([...cardArray]);
  };

  const getAllPokemons = async () => {
    const res = await fetch(loadPoke);
    const data = await res.json();
    setLoadPoke(data.next);

    function createPokemonObject(result: any[]) {
      result.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await res.json();

        data.cardVisible = false;
        data.hp = 10;
        data.attack = 2;

        setAllPokemons((currentList: any) => [...currentList, data]);
      });
    }
    createPokemonObject(data.results);
  };
  useEffect(() => {
    getAllPokemons();
  }, []);

  useEffect(() => {
    const allCardsShown = cardArray.every(
      (obj: { cardVisible: boolean }) => obj.cardVisible === true
    );
    setCardIsVisible(allCardsShown);

    if (cardArray.length === 0) {
      setCardIsVisible(false);
    }
  }, [cardArray]);

  const handleCollectPokemon = (poke: any, index: number) => {
    const indexOfPokemon = collectedPokemons.findIndex(
      (item: any) => item.id === poke.id
    );

    if (indexOfPokemon !== -1) {
      collectedPokemons[indexOfPokemon].collected += 1;
      const updatedPokemons = Array.from(collectedPokemons);
      setCollectedPokemons(updatedPokemons);
    } else {
      poke.collected = 1;
      setCollectedPokemons((currentPokemons: any) => [
        ...currentPokemons,
        poke,
      ]);
    }
    setCardArray(cardArray.filter((value: any, i: any) => i !== index));
  };

  const buyPack = () => {
    if (coins >= 5) {
      for (let i = 0; i < 5; i++) {
        const randomCard =
          allPokemons[Math.floor(Math.random() * allPokemons.length)];
        cardArray.push(randomCard);
        setCardArray([...cardArray]);
      }
      setCoins(coins - 5);
    }
  };

  const cardClick = (pokemon: any) => {
    pokemon.cardVisible = true;
    const allCardsShown = cardArray.every(
      (obj: { cardVisible: boolean }) => obj.cardVisible === true
    );
    setCardIsVisible(allCardsShown);

    if (cardArray.length === 0) {
      setCardIsVisible(false);
    }
  };

  const updateStateInAutoBattle = (newValue: number) => {
    setCoins(newValue);
  };

  return (
    <Fragment>
      <DashBoard
        updateCoins={updateStateInAutoBattle}
        buyPack={buyPack}
        handleStartGame={handleStartGame}
        startGame={startGame}
        collectedPokemons={collectedPokemons}
        coins={coins}
        allPokemons={allPokemons}
      />

      <Fragment>
        <div className="pokemon-container">
          {cardArray.map((pokemon: any, index: any) => (
            <PokeCard
              cardClick={() => cardClick(pokemon)}
              key={index}
              id={pokemon.id}
              sprites={pokemon.sprites}
              types={pokemon.types}
              name={pokemon.name}
              addPokemonClick={
                cardIsVisible
                  ? () => handleCollectPokemon(pokemon, index)
                  : undefined
              }
              cardIsVisible={cardIsVisible}
            />
          ))}
        </div>
      </Fragment>
    </Fragment>
  );
}

export default App;
