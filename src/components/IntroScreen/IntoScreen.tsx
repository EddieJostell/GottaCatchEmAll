import React, { Fragment, FunctionComponent } from 'react';

export interface IIntroScreen {
  handleStartGame: () => void;
}

export const IntroScreen: FunctionComponent<IIntroScreen> = (
  props: IIntroScreen
): JSX.Element => {
  const { handleStartGame } = props;
  return (
    <Fragment>
      <button onClick={handleStartGame}>Start Game</button>
    </Fragment>
  );
};
