import React, { FunctionComponent } from "react";
import { Button } from "reactstrap";
import { IntroScreen } from "../IntroScreen/IntoScreen";
import { PokeDex } from "../PokeDex/PokeDex";
import "./Dashboard.scss";
import { usePokemonContext } from "../PokemonContext/PokemonContext";
import pokemonLogo from "../../utils/cyndaquil_sketched.jpg";
import shoppingBag from "../../utils/Shopping_Bag_icon-icons.com_67506.png";
import coinBag from "../../utils/Coin_Bag_icon-icons.com_67574.png";
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
              {/* <div className="logotype">
               
                <img src={pokemonLogo} alt="asdf" />
              </div> */}
              <div className="controls">
                <Button
                  className="pack"
                  onClick={buyPack}
                  disabled={cardArray.length > 0}
                >
                  <div className="shroud"></div>
                  <img className="bag" src={shoppingBag} alt="Shopping bag" />
                  <span>Buy Pack</span>
                </Button>

                <PokeDex />
                <div className="bag">
                  <img src={coinBag} alt="Coin bag" />
                  <span>Coins: {pokemonContext.coins}</span>
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
                    addPokemonClick={cardIsVisible ? () => handleCollectPokemon(pokemon, index) : undefined}
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
