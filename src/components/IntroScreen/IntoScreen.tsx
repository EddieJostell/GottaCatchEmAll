import React, { Fragment, FunctionComponent } from "react";

export interface IIntroScreen {
  onClick: () => void;
}

export const IntroScreen: FunctionComponent<IIntroScreen> = (props: IIntroScreen): JSX.Element => {
  const { onClick } = props;
  return (
    <Fragment>
      <h1>Welcome To App</h1>
      <button onClick={onClick}>Start Game</button>
    </Fragment>
  );
};
