import React, { FunctionComponent } from 'react';
import { IntroScreen } from '../IntroScreen/IntoScreen';
import './Dashboard.scss';

interface IDashboardProps {
  coins: number;
  startGame: boolean;
  cheatButton: () => void;
  buyOneCard: () => void;
  buyPack: () => void;
  handleStartGame: () => void;
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
  } = props;
  return (
    <div className='Dashboard'>
      <div>
        <h1>Welcome young trainer its time to begin your journey!</h1>
      </div>
      {startGame ? (
        <IntroScreen handleStartGame={handleStartGame} />
      ) : (
        <div className='controls'>
          <button onClick={cheatButton}>CHEAT BUTTON! GET 100 COINS</button>
          <button>Show pokedex:</button>
          <h2>Coins Collected: {coins}</h2>
          <button disabled={coins < 5} onClick={buyOneCard}>
            Buy one card: COST 5 COINS
          </button>
          <button disabled={coins < 25} onClick={buyPack}>
            Buy Pack (5): COST 25 COINS
          </button>
        </div>
      )}
    </div>
  );
};
