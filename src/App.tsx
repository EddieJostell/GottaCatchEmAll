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
    "https://pokeapi.co/api/v2/pokemon?limit=200"
  );
  const [collectedPokemons, setCollectedPokemons] = useState<any>([]);
  const [cardArray, setCardArray] = useState<any>([]);
  const [cardIsVisible, setCardIsVisible] = useState<boolean>(false);

  const handleStartGame = () => {
    setStartGame(!startGame);
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

  const hasSameId = (arr: any[]) => {
    const ids = new Set(arr.map((obj) => obj.id));

    return ids.size !== arr.length;
  };

  useEffect(() => {
    const containSameId = hasSameId(collectedPokemons);
    if (containSameId) {
      const seen = new Set();
      setCollectedPokemons(
        collectedPokemons.filter((item: any) => {
          const duplicate = seen.has(item.id);
          seen.add(item.id);
          return !duplicate;
        })
      );
    }
  }, [collectedPokemons]);

  const handleCollectPokemon = (poke: any, index: number) => {
    setCollectedPokemons((currentPokemons: any) => [...currentPokemons, poke]);
    setCardArray(cardArray.filter((value: any, i: any) => i !== index));
  };

  const buyPack = () => {
    for (let i = 0; i < 5; i++) {
      const randomCard =
        allPokemons[Math.floor(Math.random() * allPokemons.length)];
      cardArray.push(randomCard);
      setCardArray([...cardArray]);
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

  return (
    <Fragment>
      <DashBoard
        buyPack={buyPack}
        handleStartGame={handleStartGame}
        startGame={startGame}
        collectedPokemons={collectedPokemons}
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
