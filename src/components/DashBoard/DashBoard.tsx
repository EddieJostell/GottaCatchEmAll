import React, { FunctionComponent } from "react";
import { Button } from "reactstrap";
import { IntroScreen } from "../IntroScreen/IntoScreen";
import { PokeDex } from "../PokeDex/PokeDex";
import "./Dashboard.scss";
import { usePokemonContext } from "../PokemonContext/PokemonContext";
import pokemonLogo from "../../utils/cyndaquil_sketched.jpg";
import { PokeCard } from "../PokeCard/PokeCard";

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

export const DashBoard: FunctionComponent<IDashboardProps> = (
  props: IDashboardProps
): JSX.Element => {
  const {
    buyPack,
    handleStartGame,
    startGame,
    collectedPokemons,
    cardIsVisible,
    handleCollectPokemon,
    cardClick,
    cardArray,
  } = props;

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
                <div className="logotype">
                  {/* Insert generated logotype here */}
                  <img src={pokemonLogo} alt="asdf" />
                </div>
                <div className="btns">
                  <Button
                    className="pack"
                    onClick={buyPack}
                    disabled={cardArray.length > 0}
                  >
                    Buy Pack, 5 Coins
                  </Button>
                  <PokeDex collectedPokemons={collectedPokemons} />
                  <h2>Coins: {pokemonContext.coins}</h2>
                </div>
              </div>
            </div>
            <div className="bot">
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
            </div>
          </>
        )}
      </div>
    </div>
  );
};
