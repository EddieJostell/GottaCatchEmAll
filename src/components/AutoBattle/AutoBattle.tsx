import React, { Fragment, FunctionComponent, useState } from "react";
import { usePokemonContext } from "../PokemonContext/PokemonContext";
import { Button } from "reactstrap";
import "./autoBattle.scss";

export interface IAutoBattle {
  collectedPokemons: any;
  allPokemons: any;
}

interface MyPokemon {
  myName: string;
  myHealth: number;
  myImage: string;
}
interface WildPokemon {
  wildName: string;
  wildHealth: number;
  wildImage: string;
}

export const AutoBattle: FunctionComponent<IAutoBattle> = (
  props: IAutoBattle
): JSX.Element => {
  const { allPokemons, collectedPokemons } = props;
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [fightIsActive, setFightIsActive] = useState<boolean>(false);
  const [endBattle, setEndBattle] = useState<boolean>(false);
  const [myPokemonStats, setMyPokemonStats] = useState<MyPokemon>({
    myName: "",
    myImage: "",
    myHealth: 0,
  });
  const [wildPokemonStats, setWildPokemonStats] = useState<WildPokemon>({
    wildImage: "",
    wildName: "",
    wildHealth: 0,
  });

  const { pokemonContext, setPokemonContext } = usePokemonContext();

  const handleStartFight = () => {
    setFightIsActive(true);
    setEndBattle(false);

    const myRandomPokemon =
      collectedPokemons[Math.floor(Math.random() * collectedPokemons.length)];
    const wildRandomPokemon =
      allPokemons[Math.floor(Math.random() * allPokemons.length)];

    let myPokemonHP = myRandomPokemon.hp;
    let wildPokemonHP = wildRandomPokemon.hp;

    setMyPokemonStats({
      myHealth: myPokemonHP,
      myImage: myRandomPokemon.sprites.front_default,
      myName: myRandomPokemon.name,
    });

    setWildPokemonStats({
      wildHealth: wildPokemonHP,
      wildImage: wildRandomPokemon.sprites.front_default,
      wildName: wildRandomPokemon.name,
    });

    const newBattleLog = [``];
    setBattleLog(newBattleLog);

    const attackLoop = () => {
      if (myPokemonHP <= 0 || wildPokemonHP <= 0) {
        return;
      }

      const myAttack = Math.floor(Math.random() * myRandomPokemon.attack) + 2;
      wildPokemonHP -= myAttack;

      setWildPokemonStats({
        wildImage: wildRandomPokemon.sprites.front_default,
        wildName: wildRandomPokemon.name,
        wildHealth: wildPokemonHP,
      });

      const myRandomAttack =
        myRandomPokemon.moves[Math.floor(Math.random() * 3) + 1].move.name;

      newBattleLog.push(
        `${myRandomPokemon.name} used ${myRandomAttack} ${myAttack} damage.`
      );
      setBattleLog([...newBattleLog]);

      if (wildPokemonHP <= 0) {
        newBattleLog.push(
          `${myRandomPokemon.name} defeats ${wildRandomPokemon.name}, you recieved 5 coins`
        );

        setPokemonContext({
          ...pokemonContext,
          coins: pokemonContext.coins + 5,
        });

        setBattleLog([...newBattleLog]);
        setEndBattle(true);

        return;
      }

      setTimeout(() => {
        const wildAttack =
          Math.floor(Math.random() * wildRandomPokemon.attack) + 1;
        myPokemonHP -= wildAttack;

        setMyPokemonStats({
          myImage: myRandomPokemon.sprites.front_default,
          myName: myRandomPokemon.name,
          myHealth: myPokemonHP,
        });

        const wildRandomAttack =
          wildRandomPokemon.moves[Math.floor(Math.random() * 3) + 1].move.name;

        newBattleLog.push(
          `${wildRandomPokemon.name} used ${wildRandomAttack} ${wildAttack} damage`
        );
        setBattleLog([...newBattleLog]);

        if (myPokemonHP <= 0) {
          newBattleLog.push(`${myRandomPokemon.name} has fainted.`);
          setBattleLog([...newBattleLog]);
          setEndBattle(true);
        } else {
          setTimeout(attackLoop, 500);
        }
      }, 500);
    };

    setTimeout(attackLoop, 1500);
  };

  const handleDisable = () => {
    if (fightIsActive) {
      return true;
    }
    if (collectedPokemons.length === 0) {
      return true;
    }
  };

  return (
    <Fragment>
      <Button onClick={handleStartFight} disabled={handleDisable()}>
        FIGHT For Cash!
      </Button>

      {fightIsActive && (
        <div className={`${fightIsActive ? "battle-log" : ""}`}>
          <div className="myPokemon">
            <p>{myPokemonStats.myName}</p>
            <img src={myPokemonStats.myImage} />
            <p>Health: {myPokemonStats.myHealth}</p>
          </div>
          {battleLog.map((log, index) => (
            <div key={index} className="text">
              {log}
            </div>
          ))}

          {endBattle && (
            <Button onClick={() => setFightIsActive(false)}>
              Victory! Go Back
            </Button>
          )}
          <div className="wildPokemon">
            <p>{wildPokemonStats.wildName}</p>
            <img src={wildPokemonStats.wildImage} />
            <p>Health: {wildPokemonStats.wildHealth}</p>
          </div>
        </div>
      )}
    </Fragment>
  );
};
