import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [allPokemons, setAllPokemons] = useState<any>([]);
  const [loadPoke, setLoadPoke] = useState(
    'https://pokeapi.co/api/v2/pokemon?limit=20'
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
  //console.log('ASDF', randomizePokemons);
  return (
    <div className='app-container'>
      <div className='pokemon-container'>
        <div className='all-container'>
          {randomizePokemons.map((pokemon: any, index: any) => (
            <>
              <div>Name: {pokemon.name}</div>
              <div>ID: {pokemon.id}</div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
