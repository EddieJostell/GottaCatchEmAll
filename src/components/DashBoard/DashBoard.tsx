import React, { FunctionComponent } from 'react';
import { Button } from 'reactstrap';
import { IntroScreen } from '../IntroScreen/IntoScreen';
import { PokeDex } from '../PokeDex/PokeDex';
import './Dashboard.scss';

interface IDashboardProps {
  startGame: boolean;
  buyPack: () => void;
  handleStartGame: () => void;
  collectedPokemons: [];
}

export const DashBoard: FunctionComponent<IDashboardProps> = (
  props: IDashboardProps
): JSX.Element => {
  const {
    buyPack,
    handleStartGame,
    startGame,
    collectedPokemons,
  } = props;

  return (
    <div className='Dashboard'>
      {startGame ? (
        <IntroScreen handleStartGame={handleStartGame} />
      ) : (
        <div className='Dashboard-container'>
          <h1 className='title'>TIME TO CATCH EM ALL!</h1>
          <div className='controls'>
            <div className='bottom'>
              <div className='left'>
                <Button
                  className='pack'
                  onClick={buyPack}
                >
                  Buy Pack
                </Button>
              </div>

              <img
                alt='charizard'
                src={process.env.PUBLIC_URL + 'charizard.jpg'}
              />

              <div className='right'>
                <div className='dex'>
                  <PokeDex collectedPokemons={collectedPokemons} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
