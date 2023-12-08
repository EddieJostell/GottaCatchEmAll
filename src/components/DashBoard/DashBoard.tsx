import React, { FunctionComponent } from "react";
import { Button } from "reactstrap";
import { IntroScreen } from "../IntroScreen/IntoScreen";
import { PokeDex } from "../PokeDex/PokeDex";
import "./Dashboard.scss";
import { usePokemonContext } from "../PokemonContext/PokemonContext";
import pokemonLogo from "../../utils/International_Pokémon_logo.svg.png";
import { PokeCard } from "../PokeCard/PokeCard";
import { IdleQuests } from "../IdleQuests/IdleQuests";

interface IDashboardProps {
  startGame: boolean;
  buyPack: () => void;
  handleStartGame: () => void;
  collectedPokemons: [];
  allPokemons: any;
  cardClick: (pokemon: any) => void;
  handleCollectPokemon: (pokemon: any, index: number) => void;
  cardIsVisible: boolean;
  cardArray: [];
}

export const DashBoard: FunctionComponent<IDashboardProps> = (props: IDashboardProps): JSX.Element => {
  const { buyPack, handleStartGame, startGame, cardIsVisible, handleCollectPokemon, cardClick, cardArray } = props;

  const { pokemonContext } = usePokemonContext();

  return (
    <div className="Dashboard">
      <div className="Dashboard-container">
        {startGame ? (
          <IntroScreen handleStartGame={handleStartGame} />
        ) : (
          <>
            <div className="top">
              <div className="controls">
                <img className="pokemon-logo" alt="logo" src={pokemonLogo} />
                <div className="btns">
                  <Button className="pack" onClick={buyPack}>
                    Buy Pack, 5 Coins
                  </Button>
                  <PokeDex />
                  <IdleQuests />
                  <h2>Coins: {pokemonContext.coins}</h2>
                </div>
              </div>
              <div className="pokemon-container">
                {cardArray.map((pokemon: any, index: any) => (
                  <PokeCard
                    cardClick={() => cardClick(pokemon)}
                    key={index}
                    id={pokemon.id}
                    sprites={pokemon.sprites}
                    types={pokemon.types}
                    name={pokemon.name}
                    addPokemonClick={cardIsVisible ? () => handleCollectPokemon(pokemon, index) : undefined}
                    cardIsVisible={cardIsVisible}
                  />
                ))}
              </div>
            </div>
            <div className="bot"></div>
          </>
        )}
      </div>
    </div>
  );
};
