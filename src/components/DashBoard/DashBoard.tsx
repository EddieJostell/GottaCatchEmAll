import React, { FunctionComponent } from 'react';
import { IntroScreen } from '../IntroScreen/IntoScreen';
import { PokeDex } from '../PokeDex/PokeDex';
import './Dashboard.scss';

interface IDashboardProps {
  coins: number;
  startGame: boolean;
  cheatButton: () => void;
  buyOneCard: () => void;
  buyPack: () => void;
  handleStartGame: () => void;
  collectedPokemons: [];
}

export const DashBoard: FunctionComponent<IDashboardProps> = (
  props: IDashboardProps
): JSX.Element => {
  const {
    buyOneCard,
    coins,
    buyPack,
    cheatButton,
    handleStartGame,
    startGame,
    collectedPokemons,
  } = props;
  return (
    <div className='Dashboard'>
      {startGame ? (
        <IntroScreen handleStartGame={handleStartGame} />
      ) : (
        <div>
          <div>
            <h1>TIME TO CATCH EM ALL!</h1>
          </div>
          <div className='controls'>
            <button onClick={cheatButton}>CHEAT BUTTON! GET 100 COINS</button>
            <PokeDex collectedPokemons={collectedPokemons} />
            <h2>Coins Collected: {coins}</h2>
            <button disabled={coins < 5} onClick={buyOneCard}>
              Buy one card: COST 5 COINS
            </button>
            <button disabled={coins < 25} onClick={buyPack}>
              Buy Pack (5): COST 25 COINS
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
