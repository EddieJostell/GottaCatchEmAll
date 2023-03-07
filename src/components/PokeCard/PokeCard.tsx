import React, { Fragment, FunctionComponent, useState } from "react";
import { motion } from "framer-motion";
import "./pokeCard.scss";
interface ITypeProps {
  typeName: string;
}
export interface IPokeCardProps {
  id?: number;
  sprites: string;
  types: ITypeProps[];
  name: string;
  addPokemonClick: any;
}
export const PokeCard: FunctionComponent<IPokeCardProps> = (props: IPokeCardProps): JSX.Element => {
  const { id, sprites, types, name, addPokemonClick } = props;
  const [isHidden, setIsHidden] = useState<boolean>(true);

  const handleTypeArray = (valueType: ITypeProps[]) => {
    if (Array.isArray(valueType)) {
      return valueType.map((type: any, index: number) => {
        return <div key={index}>{type.type.name.toLocaleUpperCase()}</div>;
      });
    }
  };

  const renderCardBackSide = () => {
    return (
      <motion.div
        className="HiddenCard"
        onClick={() => setIsHidden(false)}
        whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
      ></motion.div>
    );
  };

  const renderCardFront = () => {
    return (
      <motion.div className="PokeCard">
        <div className="pokeIndex">{id}</div>
        <div className="pokeName">{name.toLocaleUpperCase()}</div>
        <img className="pokePic" alt="Pokemon Pic" src={sprites}></img>
        <div className="pokeType">{handleTypeArray(types)}</div>
        <button onClick={addPokemonClick}>Add to Pokedex</button>
      </motion.div>
    );
  };
  return <Fragment>{isHidden ? renderCardBackSide() : renderCardFront()}</Fragment>;
};
