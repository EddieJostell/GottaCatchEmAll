import React, { Fragment, useEffect, useState } from 'react';
import { Value } from 'sass';
import './App.scss';
import { IntroScreen } from './components/IntroScreen/IntoScreen';
import { PokeCard } from './components/PokeCard/PokeCard';

//Game Engine
function App() {
  //Start Game State
  const [startGame, setStartGame] = useState<boolean>(false);

  //Engine State
  const [allPokemons, setAllPokemons] = useState<any>([]);
  const [loadPoke, setLoadPoke] = useState(
    'https://pokeapi.co/api/v2/pokemon?limit=20'
  );
  const [collectedPokemons, setCollectedPokemons] = useState<any>([]);

  const [countCoins, setCountCoins] = useState<number>(5);

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
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
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

  const buyOneCard = () => {
    const oneCard = allPokemons[Math.floor(Math.random() * allPokemons.length)];
    cardArray.unshift(oneCard);
    setCardArray([...cardArray]);
    setCountCoins(countCoins - 1);
  };

  return (
    <Fragment>
      {startGame ? (
        <Fragment>
          <button>Show pokedex:</button>
          {countCoins !== 0 ? (
            <div>Coins: {countCoins}</div>
          ) : (
            <div>OH NOES YOU HAVE NO MORE COINS!</div>
          )}
          {countCoins !== 0 ? (
            <button onClick={buyOneCard}>Buy one card</button>
          ) : (
            <button>Earn more coins</button>
          )}

          <div className='pokemon-container'>
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
