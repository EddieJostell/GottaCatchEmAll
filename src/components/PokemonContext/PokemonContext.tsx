import React, { createContext, useContext, useState } from "react";

export interface IPokemonProps {
  coins: number;
  berries: number,
  collectedPokemons: [];
}

export const initialPokemonContext: IPokemonProps = {
  coins: 100,
  berries: 0,
  collectedPokemons: [],
};

const PokemonContext = createContext<{
  pokemonContext: IPokemonProps;
  setPokemonContext: React.Dispatch<React.SetStateAction<IPokemonProps>>;
}>({
  pokemonContext: initialPokemonContext,
  setPokemonContext: () => {},
});

export function usePokemonContext() {
  return useContext(PokemonContext);
}

export function PlayerContextProvider({ children }: { children: React.ReactNode }) {
  const [pokemonContext, setPokemonContext] = useState<IPokemonProps>(initialPokemonContext);

  return <PokemonContext.Provider value={{ pokemonContext, setPokemonContext }}>{children}</PokemonContext.Provider>;
}
