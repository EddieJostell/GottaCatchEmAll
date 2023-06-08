import React, { FunctionComponent, useEffect, useState } from 'react';
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

interface IClockState {
  time: string;
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

  const [currentTime, setCurrentTime] = useState<IClockState>({ time: '' });

  useEffect(() => {
    let timeArray = new Date().toLocaleString().split(' ');
    let time = timeArray[1];
    let timer = setInterval(() => {
      setCurrentTime({ ...currentTime, time: time });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  });

  return (
    <div className='Dashboard'>
      {startGame ? (
        <IntroScreen handleStartGame={handleStartGame} />
      ) : (
        <div className='Dashboard-container'>
          <h1 className='title'>TIME TO CATCH EM ALL!</h1>
          <div className='controls'>
            <div className='top'>
              <h3 className='time'>{currentTime.time}</h3>
            </div>
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
