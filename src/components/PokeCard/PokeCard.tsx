import React, { Fragment, FunctionComponent, useState } from "react";
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from "reactstrap";
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
        return <span key={index}>{type.type.name.toLocaleUpperCase()}</span>;
      });
    }
  };

  const renderCardBackSide = () => {
    return (
      <motion.div
        className="hiddenCard"
        onClick={() => setIsHidden(false)}
        whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
      ></motion.div>
    );
  };

  /*   console.log("Types", types); */

  const renderCardFront = () => {
    return (
      <motion.div className="pokeCard">
        <Card>
          <img className="pokeImg" alt="Pokemon Pic" src={sprites} />
          <CardBody>
            <CardTitle tag="h5">{id}</CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              {name.toLocaleUpperCase()}
            </CardSubtitle>
            <CardText>{handleTypeArray(types)}</CardText>
            <Button onClick={addPokemonClick}>Add to Pokedex</Button>
          </CardBody>
        </Card>
      </motion.div>
    );
  };
  return <Fragment>{isHidden ? renderCardBackSide() : renderCardFront()}</Fragment>;
};
