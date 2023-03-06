import React, { useEffect, useState } from 'react';
import './App.scss';
import { PokeCard } from './components/PokeCard/PokeCard';

function App() {
  const [allPokemons, setAllPokemons] = useState<any>([]);
  const [loadPoke, setLoadPoke] = useState(
    'https://pokeapi.co/api/v2/pokemon?limit=50'
  );
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

  //console.log(allPokemons);

  /*   const randomizePokemons = () => {
    return 
  } */

  let randomizePokemons = allPokemons
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);
  console.log('ASDF', randomizePokemons);
  return (
    <div className='pokemon-container'>
      {randomizePokemons.map((pokemon: any, index: any) => (
        <PokeCard
          key={index}
          id={pokemon.id}
          sprites={pokemon.sprites.front_default}
          types={pokemon.types}
          name={pokemon.name}
        />
      ))}
    </div>
  );
}

export default App;
