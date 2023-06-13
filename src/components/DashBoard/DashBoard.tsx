import React, { FunctionComponent } from "react";
import { Button } from "reactstrap";
import { IntroScreen } from "../IntroScreen/IntoScreen";
import { PokeDex } from "../PokeDex/PokeDex";
import "./Dashboard.scss";
import { AutoBattle } from "../AutoBattle/AutoBattle";

interface IDashboardProps {
  startGame: boolean;
  buyPack: () => void;
  handleStartGame: () => void;
  collectedPokemons: [];
  coins: number;
  allPokemons: any;
  updateCoins: any;
}

export const DashBoard: FunctionComponent<IDashboardProps> = (
  props: IDashboardProps
): JSX.Element => {
  const {
    buyPack,
    handleStartGame,
    startGame,
    collectedPokemons,
    coins,
    allPokemons,
    updateCoins,
  } = props;

  return (
    <div className="Dashboard">
      {startGame ? (
        <IntroScreen handleStartGame={handleStartGame} />
      ) : (
        <div className="Dashboard-container">
          <h1 className="title">TIME TO CATCH EM ALL!</h1>
          <div className="controls">
            <div className="bottom">
              <div className="left">
                <Button className="pack" onClick={buyPack}>
                  Buy Pack, 5 Coins
                </Button>
              </div>

              <img
                alt="charizard"
                src={process.env.PUBLIC_URL + "charizard.jpg"}
              />

              <div className="right">
                <div className="dex">
                  <PokeDex collectedPokemons={collectedPokemons} />
                </div>
              </div>
            </div>
            <h2>Coins: {coins}</h2>
            <AutoBattle
              coins={coins}
              updateCoins={updateCoins}
              allPokemons={allPokemons}
              collectedPokemons={collectedPokemons}
            />
          </div>
        </div>
      )}
    </div>
  );
};
