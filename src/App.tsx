import React, { Fragment, useEffect, useState } from 'react';
import { Value } from 'sass';
import './App.scss';
import { IntroScreen } from './components/IntroScreen/IntoScreen';
import { PokeCard } from './components/PokeCard/PokeCard';

/* interface ICardsState {
  oneCard: boolean;
  onePack: boolean;

  pokemonArray: [];
} */

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

  const [showPokemons, setShowPokemons] = useState<boolean>(false);

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
  };

  return (
    <Fragment>
      {startGame ? (
        <Fragment>
          <button>Show pokedex:</button>
          <div>Coins: 5</div>
          <button onClick={buyOneCard}>Buy one card</button>
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
